var app_data = {
  methods: {
    getData: function(options, callback, errorCallback){
      var filterMap = {};
      var filters = '';
      var key;
      var i;
      var url;
      var subfilter = '';
      if(configOptions.hasFilterDetection){
        filterMap = getFilterMap();
        stateMap.isFiltered = Object.keys(filterMap).length > 0;
        if(stateMap.isFiltered){
          for(key in filterMap){
            subfilter = '';
            for(i = 0; i < filterMap[key].length; i++){
              subfilter += (subfilter.length > 0 ? ' or ' : '' ) + "startswith("+key+",'"+filterMap[key][i]+"')";
            }
            filters += (filters.length > 0 ? ' and ' : '') + '(' + subfilter + ')';
          }
        }
      }
      url = configOptions.siteUrl + "/_api/web/lists/GetByTitle('" + configOptions.listName  + "')/Items?$select=Title,EncodedAbsUrl,"+ configOptions.fieldName
      + (configOptions.isLookupField ? "/"+ configOptions.lookupFieldName+"&$expand="+ configOptions.fieldName : "")
      + (stateMap.isFiltered
        ? '&$filter=' + filters + (configOptions.isDocumentLibrary ? ' and FSObjType ' + configOptions.fileObjectType : '')
        : (configOptions.isDocumentLibrary ? '&$filter=(FSObjType eq ' + configOptions.fileObjectType + ')' : '')) + '&$top=5000';

        $.ajax({
          url: url,
          type: "GET",
          headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose"
          },
          success: function(data, textStatus, jqXHR) {
            var data = data.d.results;
            if (callback) {
              callback(data);
            }
          },
          error: function( jqXHR, textStatus, errorThrown ){
            if(errorCallback){
              errorCallback(jqXHR, textStatus, errorThrown);
            }
          }
        });
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
          if (errorCallback) {
            errorCallback(error);
          }
        });
      },
      saveConfigData: function(configData, digest, callback, errorCallback){
        var listName = this.listName;
        var site = this.site;
        var url = site + "/_api/web/lists/GetByTitle('"+listName +"')" + (configData.id > 0 ? '/items('+configData.id+')' :  '/Items');
        var type = this.getItemTypeForListName(listName);
        var data = {};
        var headers = {
          "accept": "application/json;odata=verbose",
          "X-RequestDigest": digest,
          "content-Type": "application/json;odata=verbose"
        };

        if(configData.id > 0){
          _.extend(headers, {
            "IF-MATCH": "*",
            "X-HTTP-Method": "MERGE"
          });
        }
        _.extend(data, configOptions, { '__metadata': { 'type': type } });
        data.metrics = JSON.stringify(configData.metrics);
        //we don't need to pass in the id of the config data
        delete data.id;
        return axios({
          url: url,
          method: "post",
          headers: headers
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
