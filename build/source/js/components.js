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
			var regex = /(FilterField[s]{0,1}[0-9]+)%3D([^-]+)-(FilterValue[s]{0,1}[0-9]+)%3D([^-]+)/gi;
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
        },
        hasfiltering: {
          type: Boolean,
          default: false
        },
        listurl: {
          type: String,
          default: ''
        },
        filterviewname: {
          type: String,
          default: ''
        },
        fieldname: {
          type: String,
          default: ''
        }
    },
    methods: {
      onClick: function(e){
        var url = '';
        if(this.hasfiltering){
          url = this.listurl + (this.filterviewname != '' ? '/' + this.filterviewname + '.aspx' : '') + '#FilterField1%3D' + this.fieldname + '-FilterValue1%3D'+this.name
          window.open(url);
        }
      }
    },
    computed: {
      calcClassObj: function(){
        var classDynamicWidth = this.hasdynamicwidth ? 'medium-auto' : 'small-' + this.mincolumnwidth;
        var classObj = {};
        classObj[classDynamicWidth] = true;
        return classObj;
      }
    },
    data: function() {
        return {
        };
    }
});
