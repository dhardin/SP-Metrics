var app = new Vue({
  el: '#app',
  mixins: [app_data],
  data: {
    listName: 'MetricsConfig', //name of SharePoint list where configuration is saved
    site: window.location.origin, //site where the SharePoint configuration list is located
    editing: true,
    configFetched: true,
    isValidated: false,
    currentMetric: {},
    currentMetricIndex: -1,
    editingMetric: false,
    state_map: {
      saving: {
        issaving: false,
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
      fieldName: '',
      filterViewName: '',
      lookupFieldName: '',
      metrics: {}
    },
    metrics: []
  },
  computed: {
    orderedMetrics: function(){
      return _.orderBy(this.config.metrics, 'sortOrder');
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
        editing: false,
        id: 0,
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
    },
    toggleSaving: function(options){
      options=  _.defaults(options, {issaving: false, message: '', messageTitle: '', isError: false, isSuccess: false, showMessage: false});
      Object.assign(this.state_map.saving, options);
    },
    generateMetrics: function(){},
    saveConfig: function(){
          this.toggleSaving({issaving: true, showMessage: false, messageTitle: '', message: '', isError: false, isSuccess: false});
      (function(that){
        new Promise(function(resolve, reject){
          that.getDigest(function(digest){
            that.state_map.digest = digest;
            resolve();
            }, function(error){
              that.toggleSaving({issaving: false, showMessage: true, messageTitle: 'Error', message: error.message, isError: true, isSuccess: false});
            })
        }).then(function(result){
            return new Promise(function(resolve, reject){
            that.saveConfigData(that.config, that.state_map.digest, function(data){
              Object.assign(that.config, data);
              resolve();
            }, function(error){
              //that.toggleLoading({isloading: true, message: error.message, canCancel:false, canClose: true});
                  that.toggleSaving({issaving: false, showMessage: true, messageTitle: 'Error', message: error.message, isError: true, isSuccess: false});
            });
          })
        }).then(function(result){
          //hat.toggleLoading({isloading: false, message: '', canCancel:false, canClose: false});
            that.toggleSaving({issaving: false, showMessage: true, messageTitle: 'Success', message: result, isError: false, isSuccess: true});
        });
      })(this);
    },
    addMetric: function() {
      var number = 1;
      if (!this.config.metrics.hasOwnProperty('_New')) {
        Vue.set(this.config.metrics, '_New', { name: '_New', sortOrder: Object.keys(this.config.metrics).length });
      } else {
        while(this.config.metrics.hasOwnProperty('_New' + '('+number+')')){
          number++;
        }
        Vue.set(this.config.metrics, '_New' + '('+number+')', { name: '_New' + '('+number+')',  sortOrder: Object.keys(this.config.metrics).length});
      }
    },
    onMetricUpdate: function(object, options, oldName) {
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
          this.setCurrentMetric([this.config.metrics[options.name], { status: { errorCode: false, message: 'Added new name to metrics.', isSaving: false } }]);
        } else if (oldName != options.name && this.config.metrics.hasOwnProperty(options.name)) {
          this.setCurrentMetric([{ status: { errorCode: 0, message: 'Name already exists.', isSaving: false }}]);
        } else {
          Object.assign(this.config.metrics[options.name], options);
          this.setCurrentMetric([this.config.metrics[options.name], {status: { errorCode: false, message: 'Updated metrics.', isSaving: false }}]);
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
        $(this.$refs.modal.$el).foundation('open')
      }
    },
    onMetricDelete: function(name) {
      if(this.config.metrics.hasOwnProperty(name)){
        Vue.delete(this.config.metrics, name);
      }
    },
    onIncreaseOrder: function(name, index){
      var currentMetric = this.orderedMetrics[index];
      var tempOrder;
      var nextMetric;
      if(this.orderedMetrics.length <= index){
        return;
      }
      nextMetric = this.orderedMetrics[index + 1];
      tempOrder = nextMetric.sortOrder;
      nextMetric.sortOrder = currentMetric.sortOrder;
      currentMetric.sortOrder = tempOrder;
    },
    onCancelLoading: function(){
      this.state_map.loading.isloading = false;
    },
    onDecreaseOrder: function(name, index){
      var currentMetric = this.orderedMetrics[index];
      var tempOrder;
      var prevMetric;
      if(index < 0){
        return;
      }
      prevMetric = this.orderedMetrics[index - 1];
      tempOrder = prevMetric.sortOrder;
      prevMetric.sortOrder = currentMetric.sortOrder;
      currentMetric.sortOrder = tempOrder;
    },
    toggleLoading: function(options){
      options=  _.defaults(options, {isLoading: false, showLoading: false, message: '', canCancel: false, canClose: false})
      Object.assign(this.state_map.loading, options);
      if(!options.isLoading){
        $(document).foundation();
      }
    }
  },
  created: function() {
    if (!window.location.origin) {
      window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
    }

    this.toggleLoading({isloading: true, showLoading: true, message: "Loading", canCancel:true, canClose: false});
    this.setCurrentMetric([]);
    (function(that){
      new Promise(function(resolve, reject){
        that.getConfigData(function(data){
          Object.assign(that.config, data[0]);
          resolve();
        }, function(error){
          that.toggleLoading({isloading: true, message: error.message, canCancel:false, canClose: true});
        });
      })/*.then(function(result){
        return new Promise(function(resolve, reject){
          that.getData(function(data){
            resolve();
          }, function(error){
            that.toggleLoading({isloading: true, message: error.message, canCancel:false, canClose: true});
          });
        });
      })*/.then(function(result){
        that.toggleLoading({isloading: false, message: '', canCancel:false, canClose: false});
      });
    })(this);
  }
});
