var app_helper = {
  methods: {
      decodeSharePointFieldUri: function(fieldName){
        var decodedFieldName = decodeURIComponent(fieldName); //first initial decode from URI
         return fieldName.replace(/%5f/g, '_');
      }
    }
  };
