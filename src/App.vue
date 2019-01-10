<template>
  <div id="app">
    <v-app>
      <v-layout>
        <v-flex xs10 py-3 offset-sm1>
          <Config
            @items-updated="updateItems"
            v-if="isEditing"
            :init-config="config"
            :loading="state_map.loading.isLoading"
          ></Config>
          <EditableBlockList readonly :initialItems="items" v-else></EditableBlockList>
        </v-flex>
      </v-layout>
    </v-app>
  </div>
</template>
<script>
import Config from "@/components/Config";
import EditableBlockList from "@/components/EditableBlockList";
import Data from "@/mixins/Data";
import { _ } from "vue-underscore";
export default {
  components: {
    Config: Config,
    EditableBlockList: EditableBlockList
  },
  mixins: [Data],
  data: function() {
    return {
      configListName: "MetricsConfig",
      siteUrl: "",
      isEditing: false,
      items: [],
      state_map: {
        isFiltered: false,
        listUrl: "",
        saving: {
          issaving: false,
          message: "",
          messageTitle: "",
          isError: false,
          isSuccess: false,
          showMessage: false
        },
        generating: {
          isgenerating: false,
          message: "",
          messageTitle: "",
          isError: false,
          isSuccess: false,
          showMessage: false
        },
        loading: {
          canCancel: false,
          canClose: false,
          showLoading: true,
          message: "",
          isloading: true
        },
        fields: {
          staticMap: {},
          displayMap: {},
          schemaMap: {}
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
        hasDynamicWidth: false,
        hasFilterDetection: false,
        fileObjectType: 0,
        minColumnWidth: 1,
        openInNewWindow: true,
        listName: "",
        siteUrl: "",
        fieldName: "",
        filterViewName: "",
        metrics: {}
      },
      metrics: {}
    };
  },
  methods: {
    updateItems: function(items) {
      this.items = Object.assign([], items);
    },
    checkEditMode: function() {
      var SP = SP || {};
      var MSOWebPartPageFormName = MSOWebPartPageFormName || "";
      this.isEditing = false;
      try {
        SP.Ribbon.PageState.Handlers.isPublishEnabled();
        this.isEditing = SP.Ribbon.PageState.Handlers.isInEditMode();
      } catch (err) {
        if (window.hasOwnProperty("MSOWebPartPageFormName")) {
          this.isEditing =
            document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode
              .value == "1";
        }
        this.isEditing =
          this.isEditing || window.location.hash.indexOf("edit") > -1;
      }
    },
    onHashChange: function() {
      this.checkEditMode();
    },
    toggleLoading: function(options) {
      options = _.defaults(options, {
        isLoading: false,
        showLoading: false,
        message: "",
        canCancel: false,
        canClose: false
      });
      Object.assign(this.state_map.loading, options);
    }
  },
  mounted: function() {
    window.addEventListener("hashchange", this.onHashChange);
    this.onHashChange();
  },
  created: function() {
    this.toggleLoading({
      isloading: true,
      message: ""
    });
    (function(that) {
      new Promise(function(resolve) {
        if (that.testing) {
          resolve();
        } else {
          that.getConfigData(
            function(data) {
              if (data.length > 0) {
                data[0].metrics = JSON.parse(data[0].metrics);
                _.assign(that.config, _.pick(data[0], _.keys(that.config)));
              }
              resolve();
            },
            function(error) {
              that.toggleLoading({
                isloading: true,
                message: error.message,
                canCancel: false,
                canClose: true
              });
            }
          );
        }
      })
        .then(function() {
          return new Promise(function(resolve) {
            if (that.testing) {
              resolve();
            } else if (that.config.ID > 0) {
              that.getListFields(
                function(data) {
                  var staticFieldMap;
                  var displayFieldMap;
                  if (data.length > 0) {
                    staticFieldMap = data.reduce(function(map, obj) {
                      map[obj.StaticName] = obj;
                      return map;
                    }, {});
                    displayFieldMap = data.reduce(function(map, obj) {
                      map[obj.Title] = obj;
                      return map;
                    }, {});
                    _.assign(that.state_map.fields.staticMap, staticFieldMap);
                    _.assign(that.state_map.fields.displayMap, displayFieldMap);
                  }
                  resolve();
                },
                function(error) {
                  that.toggleLoading({
                    isloading: true,
                    message: error.message,
                    canCancel: false,
                    canClose: true
                  });
                }
              );
            } else {
              resolve();
            }
          });
        })
        .then(function() {
          return new Promise(function(resolve) {
            if (that.config.ID > 0 && !that.config.hasFilterDetection) {
              //we'll want to wait on filters to be generated from out filter component first if they're needed
              //this way we avoid more web service calls.
              that.getData(
                function(data) {
                  that.populateMetrics(data);
                  resolve();
                },
                function(error) {
                  that.toggleLoading({
                    isloading: true,
                    message: error.message,
                    canCancel: false,
                    canClose: true
                  });
                }
              );
            } else if (that.testing) {
              that.populateMetrics([]);
              resolve();
            } else {
              resolve();
            }
          });
        })
        .then(function() {
          that.configFetched = that.config.ID > 0;
          if (Object.keys(that.metrics).length > 0 || that.editing) {
            that.toggleLoading({
              isloading: false,
              message: "",
              canCancel: false,
              canClose: false
            });
            //trigger hashchange to populate filter population
          } else {
            that.toggleLoading({
              isloading: true,
              message: "No Data Available",
              canCancel: false,
              canClose: false
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    })(this);
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
