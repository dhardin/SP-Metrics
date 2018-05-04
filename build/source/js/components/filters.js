Vue.component('filters', {
  template: '#filter-template',
    mixins: [app_helper],
  props: [
    fields: {
        type: Object,
        default: function() {
            return {
               staticFieldMap: {},
               displayFieldMap: {}
            };
        }
      }
  ],
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
      var staticFieldName = '';
      var displayFieldName = '';
			while((matches = regex.exec(hash)) != null){
				var i;
				for(i = 2; i < matches.length && i + 2 < matches.length; i+=2){
            staticFieldName = this.decodeSharePointFieldUri(matches[i]);
            displayFieldName = this.fields.staticFieldMap.hasOwnProperty(staticFieldName) ? this.fields.staticFieldMap[staticFieldName] : false;
            if(!displayFieldName){
              continue;
            }
						filterMap[displayFieldName] = decodeURI(matches[i + 2]).split('%3B%23');
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
