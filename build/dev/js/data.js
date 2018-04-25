var app_data = {
  methods: {
    getData: function(configData, callback, errorCallback){
      var filterMap = {};
      var filters = '';
      var key;
      var i;
      var url;
      var subfilter = '';
      /*if(configData.hasFilterDetection){
        filterMap = this.getFilterMap();
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
      }*/
      url = configData.siteUrl + "/_api/web/lists/GetByTitle('" + configData.listName  + "')/Items?$select=Title,EncodedAbsUrl,"+ configData.fieldName
      + (configData.isLookupField ? "/"+ configData.lookupFieldName+"&$expand="+ configData.fieldName : "")
      + (this.state_map.isFiltered
        ? '&$filter=' + filters + (configData.isDocumentLibrary ? ' and FSObjType ' + configData.fileObjectType : '')
        : (configData.isDocumentLibrary ? '&$filter=(FSObjType eq ' + configData.fileObjectType + ')' : '')) + '&$top=5000';

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
        var url = site + "/_api/web/lists/GetByTitle('"+listName +"')" + (configData.ID > 0 ? '/items('+configData.ID+')' :  '/Items');
        var type = this.getItemTypeForListName(listName);
        var data = {
          		Title: window.location.pathname
        };
        var headers = {
          "accept": "application/json;odata=verbose",
          "X-RequestDigest": digest,
          "content-Type": "application/json;odata=verbose"
        };

        if(configData.ID > 0){
          _.extend(headers, {
            "IF-MATCH": "*",
            "X-HTTP-Method": "MERGE"
          });
        }

        _.extend(data, configData, { '__metadata': { 'type': type } });
        data.metrics = JSON.stringify(configData.metrics);
        //we don't need to pass in the id of the config data
        delete data.ID;
        return axios({
          url: url,
          method: "post",
          headers: headers,
          data: data
        }).then(function(response) {
          var data = response.data.d;
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
