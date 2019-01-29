<template>
  <div class="sp-metrics">
    <v-app>
      <v-layout>
        <v-flex>
          <Config
            v-if="isEditing"
            :init-config="config"
            :field-map="initFieldMap"
            :is-loading="state_map.loading.isLoading"
            :site-url="siteUrl"
            :config-list-name="configListName"
            :web-part-id="webPartId"
            :is-in-web-part="isInWebPart"
            @config-saved="getMetrics"
          ></Config>

          <v-card class="pa-5" v-if="state_map.loading.isLoading && !isEditing">
            <v-layout row wrap align-center justify-center>
              <LoadingIcon class="large-icon loading-icon"></LoadingIcon>

              <h1 id="loading-title" class="font-weight-thin">Loading</h1>
            </v-layout>
          </v-card>
          <EditableBlockList
            :config="config"
            :field-map="initFieldMap"
            readonly
            :column-width="config.minColumnWidth"
            :initialItems="config.metrics"
            :web-part-id="webPartId"
            :is-in-web-part="isInWebPart"
            v-if="!isEditing && !state_map.loading.isLoading && config.metrics.length > 0"
          ></EditableBlockList>
          <v-card
            class="pa-5"
            v-if="!state_map.loading.isLoading && !isEditing && config.metrics.length == 0"
          >
            <v-layout row wrap>
              <v-flex>
                <h1 id="loading-title" class="font-weight-thin">No Data</h1>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-app>
  </div>
</template>
<script>
//import "vuetify/dist/vuetify.min.css"; // Ensure you are using css-loader
//import "vuetify/dist/vuetify.js"; // Ensure you are using css-loader
//import "vue-color/dist/vue-color.js";
//import Observable from "@/mixins/Observable";
import Config from "@/components/Config";
import EditableBlockList from "@/components/EditableBlockList";
import LoadingIcon from "@/assets/svg-sprite-action-symbol.svg?ic_cached_24px";
import Data from "@/mixins/Data";
import { _ } from "vue-underscore";
export default {
  components: {
    Config: Config,
    EditableBlockList: EditableBlockList,
    LoadingIcon: LoadingIcon
  },
  mixins: [Data],
  data: function() {
    return {
      isInWebPart: false,
      webPartId: "",
      configListName: "MetricsConfig",
      siteUrl: "",
      isEditing: false,
      testing: false,
      initFieldMap: {},
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
          isLoading: true
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
      metricsMap: {},
      config: {
        ID: 0,
        hasFiltering: false,
        isDocumentLibrary: false,
        hasDynamicWidth: false,
        hasFilterDetection: false,
        fileObjectType: 0,
        minColumnWidth: 3,
        openInNewWindow: true,
        listName: "",
        siteUrl: "",
        fieldName: "",
        filterViewName: "",
        metrics: []
      }
    };
  },
  watch: {
    isEditing: function() {
      this.getData();
    },
    state_map: {
      handler: function(newVal) {
        this.initFieldMap = Object.assign(
          {},
          this.initFieldMap,
          newVal.fields.displayMap
        );
      },
      deep: true
    }
  },
  methods: {
    checkEditMode: function() {
      var SP = SP || {};
      var MSOWebPartPageFormName = window.MSOWebPartPageFormName || "";
      this.isEditing = false;
      try {
        SP.Ribbon.PageState.Handlers.isPublishEnabled();
        this.isEditing = SP.Ribbon.PageState.Handlers.isInEditMode();
      } catch (err) {
        var inDesignMode =
          window.document.forms.hasOwnProperty(MSOWebPartPageFormName) &&
          window.document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode
            .value == "1";
        this.isEditing =
          inDesignMode || window.location.hash.indexOf("edit") > -1;
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
    },
    populateMetrics: function(data) {
      var i;
      var staticName = this.state_map.fields.displayMap[this.config.fieldName]
        .StaticName;
      var displayMap = this.state_map.fields.displayMap[this.config.fieldName];
      var isLookupField = displayMap.hasOwnProperty("LookupField");
      var lookupFieldName = isLookupField ? displayMap.LookupField : "";
      var name;
      var metrics = [];
      this.metricsMap = {};
      this.config.metrics = [];
      for (i = 0; i < data.length; i++) {
        name = !isLookupField
          ? data[i][staticName]
          : data[i][staticName][lookupFieldName];
        this.metricsMap[name] = this.metricsMap[name] || {
          name: name,
          count: 0
        };
        this.metricsMap[name].count++;
      }
      var key;
      for (i = 0; i < this.config.metrics.length; i++) {
        if (!this.metricsMap.hasOwnProperty(this.config.metrics[i].name)) {
          continue;
        }
        this.config.metrics[i].count =
          this.config.metrics[i].hasOwnProperty("count") || 0;
        this.config.metrics[i].count = this.metricsMap[
          this.config.metrics[i].name
        ].count;
        this.metricsMap[this.config.metrics[i].name].isProcessed = true;
      }
      for (key in this.metricsMap) {
        if (this.metricsMap[key].isProcessed) {
          continue;
        }
        metrics.push({
          name: key,
          count: this.metricsMap[key].count
        });
      }
      this.config.metrics = Object.assign([], this.config.metrics, metrics);
    },
    initConfig: function(data) {
      if (data.length > 0) {
        data = data[0];
      }

      data.metrics = JSON.parse(data.metrics);
      var data_config = _.pick(data, _.keys(this.config));
      this.config = Object.assign({}, this.config, data_config);
      this.config.metrics = Object.assign([], data_config.metrics);
    },
    getData: function() {
      this.toggleLoading({
        isLoading: true,
        message: ""
      });
      (function(that) {
        new Promise(function(resolve) {
          that.getConfigData(
            function(data) {
              that.initConfig(data);
              resolve();
            },
            function(error) {
              that.toggleLoading({
                isLoading: false,
                message: error.message,
                canCancel: false,
                canClose: true
              });
            }
          );
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
                      that.state_map.fields.staticMap = Object.assign(
                        {},
                        that.state_map.fields.staticMap,
                        staticFieldMap
                      );
                      that.state_map.fields.displayMap = Object.assign(
                        {},
                        that.state_map.fields.displayMap,
                        displayFieldMap
                      );
                    }
                    resolve();
                  },
                  function(error) {
                    that.toggleLoading({
                      isLoading: false,
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
                that.getMetrics(
                  function() {
                    resolve();
                  },
                  function() {}
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

            if (Object.keys(that.metrics).length > 0 || that.isEditing) {
              that.toggleLoading({
                isLoading: false,
                message: "",
                canCancel: false,
                canClose: false
              });
              //trigger hashchange to populate filter population
            } else {
              that.toggleLoading({
                isLoading: false,
                message: "No Data Available",
                canCancel: false,
                canClose: false
              });
            }
          })
          .catch(function(error) {
            that.toggleLoading({
              isLoading: false,
              message: error.message,
              canCancel: false,
              canClose: false
            });
          });
      })(this);
    },
    getMetrics: function(successFunc, errorFunc) {
      (function(that) {
        that.getMetricData(
          function(data) {
            that.populateMetrics(data);
            if (successFunc) {
              successFunc();
            }
          },
          function(error) {
            that.toggleLoading({
              isLoading: false,
              message: error.message,
              canCancel: false,
              canClose: true
            });
            if (errorFunc) {
              errorFunc(error);
            }
          }
        );
      })(this);
    },
    checkForWebPart: function() {
      //if this app is placed into a web part, there is two parent elements until the parent with the webpart ID.
      //If we find the correct class, this app is in a web part.
      var parentEl = this.$root.$el;
      var i;
      const maxNumParents = 3; //in Script Editor Web Part, it's this many parents until you can get the web part id
      for (i = 0; i < maxNumParents; i++) {
        parentEl = parentEl.parentElement;
        this.isInWebPart =
          parentEl != null && parentEl.hasAttribute("webpartid");
        if (this.isInWebPart || parentEl == null) {
          break;
        }
      }
      if (this.isInWebPart) {
        this.webPartId = parentEl.getAttribute("webpartid");
      }
    }
  },
  mounted: function() {
    window.addEventListener("hashchange", this.onHashChange);
    this.onHashChange();
  },
  created: function() {
    this.checkEditMode();
    this.checkForWebPart();
    this.getData();
  }
};
</script>
<!--<style src='vuetify/dist/vuetify.min.css'></style>-->
<style scoped>
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
.icon {
  width: 25px;
  height: 25px;
  fill: white;
}

.large-icon {
  width: 70px;
  height: 70px;
}

.loading-icon {
  fill: rgba(0, 0, 0, 0.61);
  margin-right: 8px;
  -webkit-animation: spin 1s ease-in-out infinite;
  -moz-animation: spin 1s ease-in-out infinite;
  animation: spin 1s ease-in-out infinite;
}

#loading-title {
  text-transform: uppercase;
  font-family: Roboto, sans-serif;
  display: inline-block;
  margin: 0 !important;
}

@-moz-keyframes spin {
  100% {
    -moz-transform: rotate(-360deg);
  }
}
@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(-360deg);
  }
}
@keyframes spin {
  100% {
    -webkit-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}

*,
:after,
:before {
  -webkit-box-sizing: inherit;
  box-sizing: border-box !important;
}
</style>
<style>
.application--wrap {
  min-height: auto !important;
}

.application {
  background: transparent !important;
}
html {
  box-sizing: inherit !important;
  overflow-y: inherit !important;
}

*,
:after,
:before {
  -webkit-box-sizing: inherit;
  box-sizing: content-box;
}

#app *,
#app *:after,
#app *:before {
  -webkit-box-sizing: inherit;
  box-sizing: border-box !important;
}
</style>