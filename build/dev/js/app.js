var app = new Vue({
    el: '#app',
    data: {
        editing: true,
        configFetched: true,
        isValidated: false,
        currentMetric: {},
        currentMetricIndex: -1,
        editingMetric: false,
        config: {
            hasFiltering: false,
            isDocumentLibrary: false,
            isLookupField: false,
            hasDynamicWidth: false,
            hasFilterDetection: false,
            fileObjectType: 0,
            columnWidth: 1,
            listName: '',
            siteUrl: '',
            fieldName: '',
            filterViewName: '',
            lookupFieldName: '',
            metrics: {}
        },
        metrics: [
            /*{
            	name: 'one',
            	styleObj: {
            		color: '#f00',
            		'background-color': '#0f0'
            	},
            	id: 1
            },{
            	name: 'two',
            	styleObj: {
            		color: '#f0f',
            		'background-color': '#ff0'
            	},
            	id: 2
            },{
            	name: 'three',
            	id: 3
            },
            {
            	name: 'four',
            	id: 4
            }*/
        ]
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
        onMetricUpdate: function(object, options, oldName) {
            var i;
            var updatedMetric;
            this.currentMetric.status.isSaving = true;
            if (this.config.metrics.hasOwnProperty(oldName)) {
                //check to see if name changed
                if (oldName != options.name && !this.config.metrics.hasOwnProperty(options.name)) {
                    Vue.delete(this.config.metrics, oldName);
                    Vue.set(this.config.metrics, options.name, options);
                    this.setCurrentMetric([this.config.metrics[options.name], { status: { errorCode: false, message: 'Added new name to metrics.', isSaving: false } }]);
                } else if (oldName != options.name && this.config.metrics.hasOwnProperty(options.name)) {
                    this.setCurrentMetric([{ status: { errorCode: 0, message: 'Name already exists.', isSaving: false }}]);
                } else {
                    Vue.set(this.config.metrics, options.name, options);
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
        getData: function(callback, errorCallback) {

        },
        generateMetrics: function(callback) {

        },
        saveConfig: function(callback, errorCallback) {
            console.log(this.$data.config);
        },
        getConfigData: function(callback, errorCallback) {
            console.log('fetching config');
            return axios({
                url: window.location.origin + "/_api/web/lists/GetByTitle('MetricsConfig')/Items?$filter=(startswith(Title,'" + window.location.pathname + "'))",
                method: "get",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose"
                }
            }).then(function(response) {
                var data = response.data.d.results;
                console.log('config done');
                console.log(data);
                if (callback) {
                    callback(data);
                }
            }).catch(function(error) {
                console.log(error);
            });
        },
        getData: function(callback) {
            console.log('fetching data');
            axios({
                url: window.location.origin + "/_api/web/lists/GetByTitle('MetricsConfig')/Items?$filter=(startswith(Title,'" + window.location.pathname + "'))",
                method: "get",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose"
                }
            }).then(function(response) {
                console.log('data done');
                var data = response.data.d.results;
                if (callback) {
                    callback(data);
                }
                console.log(data);
            }).catch(function(error) {
                console.log(error);
            });
        },
        addMetric: function() {
          var number = 1;
            if (!this.config.metrics.hasOwnProperty('_New')) {
                Vue.set(this.config.metrics, '_New', { name: '_New' });
            } else {
              while(this.config.metrics.hasOwnProperty('_New' + '('+number+')')){
                number++;
              }
              Vue.set(this.config.metrics, '_New' + '('+number+')', { name: '_New' + '('+number+')' });
            }
        },
    },
    created: function() {
      this.setCurrentMetric([]);
        /*(function(app){
        	new Promise(function(resolve, reject){
        		app.getConfigData(function(data){
        			resolve();
        		});
        	}).then(function(result){
        		return new Promise(function(resolve, reject){
        			app.getData(function(data){
        				resolve();
        			});
        		});
        	}).then(function(result){
        		console.log('done');
        	});
        })(this);*/
    }
});
