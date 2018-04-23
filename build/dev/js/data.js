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
      saveConfigData: function(callback, errorCallback){
        var listName = 'MetricsConfig';
        var url = window.location.origin + "/_api/web/lists/GetByTitle('"+listName +"')" + (stateMap.id > 0 ? '/items('+stateMap.id+')' :  '/Items');
        var type = getItemTypeForListName(listName);
        var data = {};
        var headers = {
          "accept": "application/json;odata=verbose",
          "X-RequestDigest": stateMap.digest,
          "content-Type": "application/json;odata=verbose"
        };

        if(stateMap.id > 0){
          $.extend(headers, {
            "IF-MATCH": "*",
            "X-HTTP-Method": "MERGE"
          });
        }
        $.extend(data, configOptions, { '__metadata': { 'type': type } });
        data.sortOrder = JSON.stringify(data.sortOrder);
        data.colorMap = JSON.stringify(data.colorMap);
        data.fontColorMap = JSON.stringify(data.fontColorMap );
        data.styleMap = JSON.stringify(data.styleMap);
        $.ajax({
          url: url,
          type: 'POST',
          headers: headers,
          data: JSON.stringify(data),
          success: function(data, textStatus, jqXHR) {
            if(callback)
            {
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
      getDigest: function(callback, errorCallback){
        $.ajax({
          url: window.location.origin + "/_api/contextinfo",
          method: "POST",
          headers: {
            "Accept": "application/json; odata=verbose"
          },
          success: function(data, textStatus, jqXHR) {
            var digest = data.d.GetContextWebInformation.FormDigestValue;
            if(callback){
              callback(digest);
            }
          },
          error: function(jqXHR, textStatus, errorThrown) {
            if(errorCallback){
              errorCallback(jqXHR, textStatus, errorThrown);
              console.log('error');
            }
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
