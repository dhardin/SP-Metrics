var app = new Vue({
  el: '#SP-Metrics',
  mixins: [app_data],
  data: {
    listName: 'MetricsConfig', //name of SharePoint list where configuration is saved
    site: window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: ''), //site where the SharePoint configuration list is located
    editing: false,
    configFetched: true,
    delayedFetch: false,
    isValidated: false,
    currentMetric: {},
    testing: window.location.host.indexOf('localhost') > -1 || window.location.hash.indexOf('testing=true') > -1,
    currentMetricIndex: -1,
    editingMetric: false,
    state_map: {
      isFiltered: false,
      listUrl: '',
      saving: {
        issaving: false,
        message: '',
        messageTitle: '',
        isError: false,
        isSuccess: false,
        showMessage: false
      },
      generating: {
        isgenerating: false,
        message: '',
        messageTitle: '',
        isError: false,
        isSuccess: false,
        showMessage: false
      },
      loading: {
        canCancel: false,
        canClose: false,
        showLoading: true,
        message: '',
        isloading: true
      },
      fieldMap: {},
      filters: {
        filterMap: {},
        hasFilters: false
      }
    },
    config: {
      ID: 0,
      hasFiltering: false,
      isDocumentLibrary: false,
      isLookupField: false,
      hasDynamicWidth: false,
      hasFilterDetection: false,
      fileObjectType: 0,
      minColumnWidth: 1,
      listName: '',
      siteUrl: '',
      fieldName: window.location.host.indexOf('localhost') > -1 ? 'Status' :  '',
      filterViewName: '',
      lookupFieldName: '',
      metrics: {}
    },
    metrics: {}
  },
  computed: {
    orderedMetrics: function(){
      var arr = [];
      arr = _.orderBy(this.config.metrics, 'sortOrder');
      return arr;
    },
    orderedDisplayMetrics: function(){
      return _.orderBy(this.metrics, 'sortOrder');
    }
  },
  watch: {
    config: function(newVal, oldVal){
    }
  },
  methods: {
    setCurrentMetric : function(optionsArr){
      var defaults = {
        name: '',
        sortOrder: 0,
        sytleObj: {
          backgroundColor: '',
          color: ''
        },
        visible: true,
        status: {
          errorCode: false,
          message: '',
          isSaving: false
        }
      };
      var i;
      this.currentMetric = JSON.parse(JSON.stringify(defaults));
      for(i = 0; i < optionsArr.length; i++){
        Object.assign(this.currentMetric, JSON.parse(JSON.stringify(optionsArr[i])));
      }
      Vue.set(this, 'currentMetric', this.currentMetric);
    },
    toggleSaving: function(options){
      options=  _.defaults(options, {issaving: false, message: '', messageTitle: '', isError: false, isSuccess: false, showMessage: false});
      Object.assign(this.state_map.saving, options);
    },
    toggleGenerating: function(options){
      options=  _.defaults(options, {isgenerating: false, message: '', messageTitle: '', isError: false, isSuccess: false, showMessage: false});
      Object.assign(this.state_map.generating, options);
    },
    populateMetrics: function(data){
      if(data.length > 0 && data[0].hasOwnProperty('EncodedAbsUrl')){
        this.state_map.listUrl = data[0].EncodedAbsUrl.substring(0, data[0].EncodedAbsUrl.lastIndexOf('/'));
      }
      Vue.set(this, 'metrics', this.buildDataMap(data));
    },
    buildDataMap: function(data){
      var dataMap = {};
      var i;
      var key = '';
      for(i = 0; i < data.length; i ++){
        key = this.config.isLookupField ? data[i][this.config.fieldName][this.config.lookupFieldName] : data[i][this.config.fieldName];
        //skip non-visible items
        if(key === undefined || this.config.metrics.hasOwnProperty(key) && !this.config.metrics[key].visible){
          continue;
        }
        dataMap[key] = dataMap[key] || {name: key, count: 0, sortOrder: this.config.metrics.hasOwnProperty(key) ? this.config.metrics[key].sortOrder : 0, styleObj: this.config.metrics.hasOwnProperty(key) ? this.config.metrics[key].styleObj : {}, minColumnWidth: this.config.minColumnWidth};
        dataMap[key].count = dataMap[key].count + 1;
      }
      //we also want to display counts for metrics that have been defined but have no data
      for(key in this.config.metrics){
        if(!dataMap.hasOwnProperty(key) && this.config.metrics[key].visible){
          dataMap[key] = {name: key, count: 0, sortOrder: this.config.metrics.hasOwnProperty(key) ? this.config.metrics[key].sortOrder : 0, styleObj: this.config.metrics.hasOwnProperty(key) ? this.config.metrics[key].styleObj : {}, minColumnWidth: this.config.minColumnWidth};
        }
      }
      return dataMap;
    },
    updateMetrics: function() {
      var key;
      for(key in this.config.metrics){
        if(this.metrics.hasOwnProperty(key) && this.config.metrics[key].visible){
          Object.assign(this.metrics[key], {sortOrder: this.config.metrics.hasOwnProperty(key) ? this.config.metrics[key].sortOrder : 0, styleObj: this.config.metrics.hasOwnProperty(key) ? this.config.metrics[key].styleObj : {}, minColumnWidth: this.config.minColumnWidth});
        }
      }
    },
    generateMetrics: function(){
      this.toggleGenerating({isgenerating: true, showMessage: false, messageTitle: '', message: '', isError: false, isSuccess: false});
      (function(that){
        if(that.testing){
          that.toggleGenerating({isgenerating: false, showMessage: true, messageTitle: 'Success: Generating Metrics', message: '', isError: false, isSuccess: true});
          that.populateMetrics([]);
        } else {
          that.getData(function(data){
            that.toggleGenerating({isgenerating: false, showMessage: true, messageTitle: 'Success: Generating Metrics', message: '', isError: false, isSuccess: true});
            that.populateMetrics(data);
          }, function(error){
            that.toggleGenerating({isgenerating: false, showMessage: true, messageTitle: 'Error: Generating Metrics', message: error.message, isError: true, isSuccess: false});
          });
        }
      })(this);
    },
    validateForm: function(){
      $(this.$refs.form).foundation("validateForm");
    },
    saveConfig: function(){
      this.toggleSaving({issaving: true, showMessage: false, messageTitle: '', message: '', isError: false, isSuccess: false});
      if(this.testing){
        this.generateMetrics();
        this.toggleSaving({issaving: false, showMessage: true, messageTitle: 'Success: Saving Config', message: result, isError: false, isSuccess: true});
      } else {
        (function(that){
          new Promise(function(resolve, reject){
            that.getDigest(function(digest){
              that.state_map.digest = digest;
              resolve();
            }, function(error){
              that.toggleSaving({issaving: false, showMessage: true, messageTitle: 'Error: Saving Config', message: error.message, isError: true, isSuccess: false});
            })
          }).then(function(result){
            return new Promise(function(resolve, reject){
              that.saveConfigData(that.state_map.digest, function(data){
                if(Object.keys(data).length > 0){
                  data.metrics = JSON.parse(data.metrics);
                  _.assign(that.config, _.pick(data, _.keys(that.config)));
                  that.generateMetrics();
                  resolve();
                } else {
                  resolve('No changes.');
                }
              }, function(error){
                //that.toggleLoading({isloading: true, message: error.message, canCancel:false, canClose: true});
                that.toggleSaving({issaving: false, showMessage: true, messageTitle: 'Error: Saving Config', message: error.message, isError: true, isSuccess: false});
              });
            })
          }).then(function(result){
            //hat.toggleLoading({isloading: false, message: '', canCancel:false, canClose: false});
            that.toggleSaving({issaving: false, showMessage: true, messageTitle: 'Success: Saving Config', message: result, isError: false, isSuccess: true});
          });
        })(this);
      }
    },
    addMetric: function() {
      var number = 1;
      if (!this.config.metrics.hasOwnProperty('_New')) {
        Vue.set(this.config.metrics, '_New', { name: '_New', sortOrder: Object.keys(this.config.metrics).length, visible: true, styleObj: {backgroundColor: '#aaa', color: '#fff'}});
      } else {
        while(this.config.metrics.hasOwnProperty('_New' + '('+number+')')){
          number++;
        }
        Vue.set(this.config.metrics, '_New' + '('+number+')', { name: '_New' + '('+number+')',  sortOrder: Object.keys(this.config.metrics).length, visible: true, styleObj: {backgroundColor: '#aaa', color: '#fff'}});
      }
    },
    onMetricUpdate: function( options, oldName) {
      var i;
      var updatedMetric;
      this.currentMetric.status.isSaving = true;
      var prevSettings;
      if (this.config.metrics.hasOwnProperty(oldName)) {
        //check to see if name changed
        if (oldName != options.name && !this.config.metrics.hasOwnProperty(options.name)) {
          prevSettings = JSON.parse(JSON.stringify(this.config.metrics[oldName]));
          Object.assign(prevSettings, options);
          Vue.delete(this.config.metrics, oldName);
          Vue.set(this.config.metrics, options.name, prevSettings);
          this.setCurrentMetric([this.config.metrics[options.name], { status: { errorCode: false, message: 'Added new name to metrics.'} }]);
          this.currentMetric.status.isSaving = false;
          $(this.$refs.modal.$el).foundation('close');
        } else if (oldName != options.name && this.config.metrics.hasOwnProperty(options.name)) {
          this.setCurrentMetric([options, { status: { errorCode: 0, message: 'Name already exists.' }}, {name: oldName}]);
          this.currentMetric.status.isSaving = false;
        } else {
          Object.assign(this.config.metrics[options.name], options);
          this.setCurrentMetric([this.config.metrics[options.name], {status: { errorCode: false, message: 'Updated metrics.', isSaving: false }}]);
          $(this.$refs.modal.$el).foundation('close');
        }
        return;
      }
    },
    onMetricEdit: function(name) {
      var i;
      var currentMetric;
      var key;
      if (this.config.metrics.hasOwnProperty(name)) {
        this.setCurrentMetric([this.config.metrics[name], {status: { errorCode: false, message: '', isSaving: false }}]);
        $(this.$refs.modal.$el).foundation('open');
      }
    },
    onMetricClose: function(){
      $(this.$refs.modal.$el).foundation('close');
    },
    onMetricDelete: function(name) {
      if(this.config.metrics.hasOwnProperty(name)){
        Vue.delete(this.config.metrics, name);
      }
      this.updateSortOrder();
    },
    updateSortOrder: function(){
      var i;
      for(i = 0; i < this.orderedMetrics.length; i++){
        this.orderedMetrics[i].sortOrder = i;
      }
    },
    onFilterUpdate: function(options){
      Object.assign(this.state_map.filters, options);
      this.toggleLoading({isloading: true, showLoading: true, message: "Loading", canCancel:true, canClose: false});
      (function(that){
        that.getData(function(data){
          that.toggleLoading({isloading: false, showLoading: false, message: "", canCancel:true, canClose: false});
          that.toggleGenerating({isgenerating: false, showMessage: true, messageTitle: 'Success: Generating Metrics', message: '', isError: false, isSuccess: true});
          that.populateMetrics(data);
        }, function(error){
          that.toggleLoading({isloading: true, message: error.message, canCancel:false, canClose: true});
          that.toggleGenerating({isgenerating: false, showMessage: true, messageTitle: 'Error: Generating Metrics', message: error.message, isError: true, isSuccess: false});
        });
      })(this);
    },
    onIncreaseOrder: function(name, index){
      var currentMetric = this.orderedMetrics[index];
      var tempOrder;
      var nextMetric;
      if(this.orderedMetrics.length <= index){
        return;
      }
      nextMetric = this.orderedMetrics[index + 1];
      //  tempOrder = nextMetric.sortOrder;
      nextMetric.sortOrder = index;
      currentMetric.sortOrder = index + 1;
    },
    onCancelLoading: function(){
      this.state_map.loading.isloading = false;
    },
    onDecreaseOrder: function(name, index){
      var currentMetric = this.orderedMetrics[index];
      var tempOrder;
      var prevMetric;
      if(index <= 0){
        return;
      }
      prevMetric = this.orderedMetrics[index - 1];
      //tempOrder = prevMetric.sortOrder;
      prevMetric.sortOrder = index;
      currentMetric.sortOrder = index - 1;
    },
    onToggleVisibility: function(name){
      this.config.metrics[name].visible = !this.config.metrics[name].visible;
    },
    toggleLoading: function(options){
      options=  _.defaults(options, {isLoading: false, showLoading: false, message: '', canCancel: false, canClose: false})
      Object.assign(this.state_map.loading, options);
      if(!options.isLoading){
        $(this.$options.el).foundation();
      }
    },
    checkEditMode: function(){
      this.editing = false;
      try {
        SP.Ribbon.PageState.Handlers.isPublishEnabled();
        this.editing = SP.Ribbon.PageState.Handlers.isInEditMode();
      }catch(err){
        if(window.hasOwnProperty('MSOWebPartPageFormName')){
          this.editing = document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value == '1';
        }
        this.editing = this.editing || window.location.hash.indexOf('edit=true') > -1;
      }
    }
  },
  mounted: function(){
    (function(that){
      $(document).on("formvalid.zf.abide", function(ev,frm) {
        that.saveConfig();
      });
      $(window).on('hashchange', function(e){
        that.checkEditMode();
      });

    })(this);
  },

  created: function() {
    this.checkEditMode();
    this.toggleLoading({isloading: true, showLoading: true, message: "Loading", canCancel:true, canClose: false});
    this.setCurrentMetric([]);
    (function(that){
      new Promise(function(resolve, reject){
        if(that.testing){
          resolve();
        } else {
          that.getConfigData(function(data){
            if(data.length > 0){
              data[0].metrics = JSON.parse(data[0].metrics);
              _.assign(that.config, _.pick(data[0], _.keys(that.config)));
            }
            resolve();
          }, function(error){
            that.toggleLoading({isloading: true, message: error.message, canCancel:false, canClose: true});
          });
        }
      }).then(function(result){
      return new Promise(function(resolve, reject){
          if(that.testing){
            resolve();
          } else {
            that.getListFileds(function(data){
              if(data.length > 0){
                fieldMap = data.reduce(function(map, obj) {
                    map[obj.Title] = obj;
                    return map;
                }, {});
                _.assign(that.state_map.fieldMap, fieldMap);
              }
              resolve();
            }, function(error){
              that.toggleLoading({isloading: true, message: error.message, canCancel:false, canClose: true});
            });
          }
        });
      }).then(function(result){
        return new Promise(function(resolve, reject){
          if(that.config.ID > 0 && !that.config.hasFilterDetection){
            //we'll want to wait on filters to be generated from out filter component first if they're needed
            //this way we avoid more web service calls.
            that.getData(function(data){
              that.populateMetrics(data);
              resolve();
            }, function(error){
              that.toggleLoading({isloading: true, message: error.message, canCancel:false, canClose: true});
            });
          } else if (that.config.hasFilterDetection){
            that.delayedFetch = true;
            resolve();
          } else if(that.testing){
            that.populateMetrics([]);
            resolve();
          } else {
            resolve();
          }
        });
      }).then(function(result){
        if(Object.keys(that.metrics).length > 0 || that.editing){
          that.toggleLoading({isloading: false, message: '', canCancel:false, canClose: false});
        } else if(!that.delayedFetch){
          that.toggleLoading({isloading: true, message: 'No Data Available', canCancel:false, canClose: false});
        }
      });
    })(this);
  }
});
