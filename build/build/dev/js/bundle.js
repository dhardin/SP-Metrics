var app = new Vue({
  el: '#SP-Metrics',
  mixins: [app_data],
  data: {
    listName: 'MetricsConfig', //name of SharePoint list where configuration is saved
    site: window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: ''), //site where the SharePoint configuration list is located
    editing: false,
    configFetched: true,
    isValidated: false,
    currentMetric: {},
    testing: window.location.host.indexOf('localhost') > -1,
    currentMetricIndex: -1,
    editingMetric: false,
    state_map: {
      isFiltered: false,
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
      Vue.set(this, 'metrics', this.buildDataMap(data));
    },
    buildDataMap: function(data){
      var dataMap = {};
      var i;
      var key = '';
      for(i = 0; i < data.length; i ++){
        key = this.config.isLookupField ? data[i][this.config.fieldName][this.config.lookupFieldName] : data[i][this.config.fieldName];
        //skip non-visible items
        if(this.config.metrics.hasOwnProperty(key) && !this.config.metrics[key].visible){
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
    generateMetrics: function(){
      this.toggleGenerating({isgenerating: true, showMessage: false, messageTitle: '', message: '', isError: false, isSuccess: false});
      (function(that){
        if(that.testing){
          that.toggleGenerating({isgenerating: false, showMessage: true, messageTitle: 'Success: Generating Metrics', message: '', isError: false, isSuccess: true});
          that.populateMetrics(that.metricData);
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
              if(data.length > 0){
                data.metrics = JSON.parse(data.metrics);
                _.assign(that.config, _.pick(data, _.keys(that.config)));
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
          this.setCurrentMetric([{ status: { errorCode: 0, message: 'Name already exists.' }}]);
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
        console.log('MSOWebPartPageFormName: ' + window.hasOwnProperty('MSOWebPartPageFormName'));
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
          if(that.config.ID > 0){
            that.getData(function(data){
              that.populateMetrics(data);
              resolve();
            }, function(error){
              that.toggleLoading({isloading: true, message: error.message, canCancel:false, canClose: true});
            });
          } else {
            if(that.testing){
              that.populateMetrics(that.metricData);
              resolve();
            } else {
              resolve();
            }
          }
        });
      }).then(function(result){
        if(Object.keys(that.config.metrics).length > 0 || that.editing){
          that.toggleLoading({isloading: false, message: '', canCancel:false, canClose: false});
        } else {
          that.toggleLoading({isloading: true, message: 'No Data Available', canCancel:false, canClose: false});
        }
      });
    })(this);
  }
});

var app_data = {
  methods: {
    getData: function(callback, errorCallback){
      var filterMap = {};
      var filters = '';
      var key;
      var i;
      var url;
      var subfilter = '';
      if(this.config.hasFilterDetection){
        if(this.state_map.filters.hasFilters){
          filterMap = this.state_map.filters.filterMap;
          for(key in filterMap){
            subfilter = '';
            for(i = 0; i < filterMap[key].length; i++){
              subfilter += (subfilter.length > 0 ? ' or ' : '' ) + "startswith("+key+",'"+filterMap[key][i]+"')";
            }
            filters += (filters.length > 0 ? ' and ' : '') + '(' + subfilter + ')';
          }
        }
      }
      url = this.config.siteUrl + "/_api/web/lists/GetByTitle('" + this.config.listName  + "')/Items?$select=Title,EncodedAbsUrl,"+ this.config.fieldName
      + (this.config.isLookupField ? "/"+ this.config.lookupFieldName+"&$expand="+ this.config.fieldName : "")
      + (this.state_map.filters.hasFilters
        ? '&$filter=' + filters + (this.config.isDocumentLibrary ? ' and FSObjType ' + this.config.fileObjectType : '')
        : (this.config.isDocumentLibrary ? '&$filter=(FSObjType eq ' + this.config.fileObjectType + ')' : '')) + '&$top=5000';

        return axios({
          url: url,
          method: "get",
          headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose"
          }
        }).then(function(response) {
          var data = response.data.d.results;
          if (callback) {
            callback(data);
          }
        }).catch(function(error) {
          if (errorCallback) {
            errorCallback(error);
          }
        });

      },
      getConfigData: function(callback, errorCallback) {
        return axios({
          url: this.site + "/_api/web/lists/GetByTitle('MetricsConfig')/Items?$filter=(startswith(Title,'" + window.location.pathname + "'))",
          method: "get",
          headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose"
          }
        }).then(function(response) {
          var data = response.data.d.results;
          if (callback) {
            callback(data);
          }
        }).catch(function(error) {
          if (errorCallback) {
            errorCallback(error);
          }
        });
      },
      saveConfigData: function(digest, callback, errorCallback){
        var listName = this.listName;
        var site = this.site;
        console.log(this.site);
        var url = site + "/_api/web/lists/GetByTitle('"+listName +"')" + (this.config.ID > 0 ? '/items('+this.config.ID+')' :  '/Items');
        var type = this.getItemTypeForListName(listName);
        var data = {
          Title: window.location.pathname
        };
        var headers = {
          "accept": "application/json;odata=verbose",
          "X-RequestDigest": digest,
          "content-Type": "application/json;odata=verbose"
        };

        if(this.config.ID > 0){
          _.extend(headers, {
            "IF-MATCH": "*",
            "X-HTTP-Method": "MERGE"
          });
        }
        _.extend(data, this.config, { '__metadata': { 'type': type } });
        data.metrics = JSON.stringify(this.config.metrics);
        //we don't need to pass in the id of the config data
        delete data.ID;
        return axios({
          url: url,
          method: "post",
          headers: headers,
          data: data
        }).then(function(response) {
          var data = response.data;
          if (callback) {
            callback(response.data.hasOwnProperty('d') ? response.data.d : []);
          }
        }).catch(function(error) {
          if (errorCallback) {
            errorCallback(error);
          }
        });
      },
      getDigest: function(callback, errorCallback){
        return axios({
          url: this.site +  "/_api/contextinfo",
          method: "post",
          headers: {
            "Accept": "application/json; odata=verbose"
          },
        }).then(function(response) {
          var digest = response.data.d.GetContextWebInformation.FormDigestValue;
          if(callback){
            callback(digest);
          }
        }).catch(function(error) {
          if (errorCallback) {
            errorCallback(error);
          }
        });
      },  // Get List Item Type metadata
      getItemTypeForListName: function (name) {
        return "SP.Data." + name.charAt(0).toUpperCase() + name.split(" ").join("").slice(1) + "ListItem";
      },
      parseQuery: function(queryString) {
        var query = {};
        var pairs = (queryString[0] === '#' ? queryString.substr(1) : queryString).split('&');
        for (var i = 0; i < pairs.length; i++) {
          var pair = pairs[i].split('=');
          query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
        }
        return query;
      },
      updateHash: function(settings){
        var key;
        var  hash = '';
        for(key in settings){
          hash += (hash.length > 0 ? '&' : '') + key + '=' + settings[key];
        }
        window.location.hash = hash;
      }
    }
  };

Vue.component('edit-metric', {
    template: '#edit-metric',
    props: {
        name: {
            type: String,
            default: 'New'
        },
        styleObj: {
            type: Object,
            default: function() {
                return {
                    color: '#fff',
                    backgroundColor: '#aaa'
                };
            }
        },
        status: {
            type: Object,
            default: function() {
                return {
                    errorCode: false,
                    message: '',
                    isSaving: false
                };
            }
        },
        visible: {
          type: Boolean,
          default: true
        }
    },
    watch: {
        name: function(newVal, oldVal) {
            this.editName = newVal;
        },
        visible: function(newVal, oldVal){
          this.editVisible = newVal;
        },
        styleObj: function(newVal, oldVal){
        	this.editStyleObj = JSON.parse(JSON.stringify(newVal));
        },
        status: {
            handler: function(newVal, oldVal) {
                this.hasError = this.status.errorCode === 0;
                if(oldVal.isSaving && !newVal.isSaving && !newVal.errorCode){
                 this.$emit('close');
                }
            },
            deep: true
        }
    },
    mounted: function() {
        (function(that) {
            $(that.$el).on('open.zf.reveal', function() {
                that.open();
                //watch doesn't fire when modal is re-opened on edited item
                //by default, we'd want these values to default to what they were previously.
                //only seems to be an issue with the visible property
                if(that.visible != that.editVisible){
                  that.editVisible = that.visible;
                }
            });
            $(that.$el).on('closed.zf.reveal', function() {
                that.close();
            });
        })(this);
    },
    methods: {
        save: function() {
            this.$emit('save', {
                name: this.editName,
                styleObj: this.editStyleObj,
                visible: this.editVisible,
            }, this.name);
        },
        onSaveComplete: function(results) {

        },
        open: function() {
            (function(that) {
                $(that.$refs.backgroundColor).spectrum('destroy');
                $(that.$refs.fontColor).spectrum('destroy');
                $(that.$refs.backgroundColor).spectrum({
                    color: that.styleObj.backgroundColor,
                    showPalette: true,
                    preferredFormat: "hex",
                    showInput: true,
                    selectionPalette: ['#337ab7','#3c763d','#31708f','#aa6708','#d9534f', '#6f5499', '#555'],
                    change: function(color) {
                        that.editStyleObj.backgroundColor = color.toHexString();
                    }
                });
                $(that.$refs.fontColor).spectrum({
                    color: that.styleObj.color,
                    showPalette: true,
                    preferredFormat: "hex",
                    showInput: true,
                    selectionPalette: ["#000", "#fff", '#337ab7','#3c763d','#31708f','#aa6708','#d9534f', '#6f5499', '#555'],
                    change: function(color) {
                        that.editStyleObj.color = color.toHexString();
                    }
                });
            })(this);
        },
        close: function() {

        },
        toggle: function() {

        }
    },
    data: function() {
        return {
            editName: this.name,
            hasError: false,
            editVisible: this.visible,
            editStyleObj: this.styleObj
        };
    }
});

Vue.component('metric-config', {
    template: '#metric-config',
    props: {
        name: {
            type: String,
            default: 'blank'
        },
        styleObj: {
            type: Object,
            default: function() {
                return {
                    color: '#fff',
                    backgroundColor: '#aaa'
                };
            }
        },
        sortOrder: {
            type: Number,
            default: 0
        },
        editing: {
            type: Boolean,
            default: false
        },
        index: {
          type: Number,
          default: 0
        },
        islast: {
          type: Boolean,
          default: false
        },
        id: {
            type: Number,
            default: 0
        },
        visible: {
          type: Boolean,
          default: true
        }
    },
    methods: {
        edit: function(e) {
            this.$emit('edit', this.name);
        },
        deleteMetric: function(e){
          this.$emit('deletemetric', this.name);
        },
        toggleVisibility: function(e){
          this.$emit('togglevisibility', this.name);
        },
        decreaseSortOrder: function(e){
          this.$emit('decreaseorder',
              this.name,
              this.index
            );
        },
        increaseSortOrder: function(e){
          this.$emit('increaseorder',
            this.name,
            this.index
          );
        }
    },
    data: function() {
        return { };
    }
});

Vue.component('loading', {
  template : '#loading-template',
  props: ['message', 'canCancel', 'canClose', 'showLoading', 'editing'],
  methods: {
    cancel: function(e){
      this.$emit('cancel');
    }
  },
  data: function(){
    return {

    };
  }
});

Vue.component('filters', {
  template: '#filter-template',
  props: [],
  mounted: function(){
    (function(that){
    $(that.$parent.$options.el).foundation();
    $(window).on('hashchange', function(){
      that.updateQuery();
    });
    })(this);
    //run filters first time during init
    this.updateQuery();
  },
  computed: {
    hasFilters: function(){
      return this.filters.length > 0
    }
  },
  methods: {
    getFilterMap: function(){
			var filterMap = {};
			var regex = /(FilterField[s]{0,1}[0-9]+)%3D([^-]+)-(FilterValue[s]{0,1}[0-9]+)%3D([^-]+)/g;
      //FilterField0%3DStatus-FilterValue0%3DStuff
			var hash = window.location.hash;
			var matches = [];
			while((matches = regex.exec(hash)) != null){
				var i;
				for(i = 2; i < matches.length && i + 2 < matches.length; i+=2){
						filterMap[matches[i]] = decodeURI(matches[i + 2]).split('%3B%23');
				}
			}
			return filterMap;
		},
    getFilterValueLength: function(filterMap, key){
      var valueArr = filterMap[key];
      var longestLength = 0;
      var i;
      for(i = 0; i < valueArr.length; i++){
        longestLength = valueArr[i].length > longestLength ? valueArr[i].length : longestLength;
      }
      return longestLength;
    },
    updateQuery: function(){
			var filterMap = this.getFilterMap();
			var queryRuleMap = this.generateQueryRules(filterMap);
			this.filters = [];
			for(var key in filterMap){
				this.filters.push({id: key, label: key, type: 'string', operators: ['equal'], size: this.getFilterValueLength(filterMap, key)});
			}
			if(this.queryInit){
				filterMap = this.getFilterMap();
				queryRuleMap = this.generateQueryRules(filterMap);
			 $(this.$refs.filters).queryBuilder('destroy');
				this.queryInit = false;
			}
			if(this.filters.length > 0){
				 $(this.$refs.filters).queryBuilder({
					filters: this.filters,
			  		rules: queryRuleMap
				});
				this.queryInit = true;
			}
      this.$emit('filterupdate',{filterMap: filterMap, hasFilters: this.filters.length});
		},
    generateQueryRules: function(filterMap){
			var key;
			var i;
			var rulesMap = {
				condition: '',
				rules: [],
				readonly: true
			};
			var rule = {};
			if(Object.keys(filterMap).length > 0){
				rulesMap.condition = 'AND';
			}
			for(key in filterMap){
				if(filterMap[key].length > 1){
					rule = {
						condition: 'OR',
						rules: [],
						readonly: true
					}
					for(i = 0; i < filterMap[key].length; i++){
						rule.rules.push({
							id: key,
							operator: 'equal',
							value: decodeURI(filterMap[key][i]),
							readonly: true
						});
					}
				} else {
					rule = {
						id: key,
						operator: 'equal',
						readonly: true,
						value: decodeURI(filterMap[key][0])
					}
				}
				rulesMap.rules.push(rule);
			}
			return rulesMap;
		}
  },
  data: function() {
    return {
      filters: [],
      queryInit: false
    };
  }
})

Vue.component('metric', {
    template: '#metric',
    props: {
        name: {
            type: String,
            default: 'blank'
        },
        styleObj: {
            type: Object,
            default: function() {
                return {
                    color: '#fff',
                    backgroundColor: '#aaa'
                };
            }
        },
        mincolumnwidth: {
          type: Number,
          default: 2
        },
        visible: {
          type: Boolean,
          default: true
        },
        sortOrder: {
            type: Number,
            default: 0
        },
        count: {
          type: Number,
          default: 0
        },
        hasdynamicwidth: {
          type: Boolean,
          default: true
        }
    },
    computed: {
      calcClassObj: function(){
        var className = this.hasdynamicwidth ? 'medium-auto' : 'small-' + this.mincolumnwidth;
        var classObj = {};
        classObj[className] = true;
        return classObj;
      }
    },
    data: function() {
        return {
        };
    }
});
