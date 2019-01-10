<template>
  <v-card raised>
    <v-card-title>
      <span class="headline">Metrics Configuration</span>
      <v-spacer :style="{'text-align': 'right'}">
        <v-chip
          label
          color="green"
          text-color="white"
          v-if="isConfigDataLoaded && !isLoading"
        >Config Data Loaded</v-chip>
        <v-chip
          label
          color="red"
          text-color="white"
          v-if="!isConfigDataLoaded && !isLoading"
        >No Config Data</v-chip>
        <v-chip label color="primary" text-color="white" v-if="isLoading">
          <LoadingIcon class="small-icon loading-icon" v-if="isLoading"></LoadingIcon>
          <v-spacer></v-spacer>Loading
        </v-chip>
      </v-spacer>
    </v-card-title>
    <v-container grid-list-md fluid>
      <v-layout row wrap>
        <v-flex xs6>
          <v-text-field
            v-model="config.listName"
            label="List Name"
            required
            box
            color="blue"
            hint="The list where data will be pulled in order to generate metrics. This should be the display name of the list, not the internal name."
            persistent-hint
            :disabled="isSaving || isLoading"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            v-model="config.siteRelativeUrl"
            label="Site Relative URL"
            box
            color="blue"
            hint="URL of the site where the list is stored"
            persistent-hint
            required
            :disabled="isSaving || isLoading"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            v-model="config.fieldName"
            label="Field Name"
            box
            color="blue"
            hint="The field name which will be used to generate metrics on. This should be the internal name of the field, not display name."
            persistent-hint
            required
            :disabled="isSaving || isLoading"
          ></v-text-field>
        </v-flex>
        <v-flex xs6 :style="{position: 'relative'}">
          <v-select
            v-model="config.columnWidth"
            :items="columnWidthItems"
            ref="columnWidth"
            box
            color="blue"
            label="Column Width"
            class="select"
            append-icon
            @focus="isColumnWidthSelected = true"
            @blur="isColumnWidthSelected = false"
            :hint="columnWidthHint"
            persistent-hint
            :disabled="isSaving || isLoading"
          ></v-select>
          <dropdownIcon
            class="dropdown"
            :class="{active: isColumnWidthSelected, inactive: !isColumnWidthSelected}"
          />
        </v-flex>
        <v-flex xs6>
          <v-radio-group
            v-model="config.dynamicWidth"
            row
            :disabled="isSaving || isLoading"
            color="#f00"
            label="Dynamic Width"
            hint="Dynamic Width will procedurally select an appropriate width for column widths if remaining columns in the row do not evenly fill up leftover space."
            persistent-hint
          >
            <Radio
              :disabled="isSaving || isLoading"
              @toggle-checked="config.dynamicWidth = true"
              :isChecked="config.dynamicWidth == true"
            >Yes</Radio>
            <Radio
              :disabled="isSaving || isLoading"
              @toggle-checked="config.dynamicWidth = false"
              :isChecked="config.dynamicWidth == false"
            >No</Radio>
          </v-radio-group>
        </v-flex>
        <v-flex xs6>
          <v-radio-group
            v-model="config.enableFilterNavigation"
            row
            :disabled="isSaving || isLoading"
            color="#f00"
            label="Enable Filter Navigation"
            hint="Clicking on metric's totals will navigate to the list filtered by the value clicked on."
            persistent-hint
          >
            <Radio
              :disabled="isSaving || isLoading"
              @toggle-checked="config.enableFilterNavigation = true"
              :isChecked="config.enableFilterNavigation == true"
            >Yes</Radio>
            <Radio
              :disabled="isSaving || isLoading"
              @toggle-checked="config.enableFilterNavigation = false"
              :isChecked="config.enableFilterNavigation == false"
            >No</Radio>
          </v-radio-group>
          <transition name="slide-down">
            <v-card v-if="config.enableFilterNavigation" color="#f9f9f9" flat class="mr-3">
              <v-card-text>
                <v-text-field
                  v-model="config.filterViewName"
                  label="Filter View Name"
                  box
                  color="blue"
                  hint="The list view for the filter to be applied to"
                  persistent-hint
                  required
                  :disabled="isSaving || isLoading"
                ></v-text-field>
                <v-radio-group
                  v-model="config.openInNewWindow"
                  row
                  :disabled="isSaving || isLoading"
                  color="#f00"
                  label="Open In New Window"
                  hint="Metrics clicked on will open in a new window.  Else the current page will refresh with applied metric filters."
                  persistent-hint
                >
                  <Radio
                    :disabled="isSaving || isLoading"
                    @toggle-checked="config.openInNewWindow = true"
                    :isChecked="config.openInNewWindow == true"
                  >Yes</Radio>
                  <Radio
                    :disabled="isSaving || isLoading"
                    @toggle-checked="config.openInNewWindow = false"
                    :isChecked="config.openInNewWindow == false"
                  >No</Radio>
                </v-radio-group>
              </v-card-text>
            </v-card>
          </transition>
        </v-flex>
        <v-flex xs6>
          <v-radio-group
            v-model="config.enableFilterDetection"
            row
            :disabled="isSaving || isLoading"
            color="#f00"
            label="Enable Filter Detection"
            hint="Metrics will be filtered based on query string filters being applied to the page."
            persistent-hint
          >
            <Radio
              :disabled="isSaving || isLoading"
              @toggle-checked="config.enableFilterDetection = true"
              :isChecked="config.enableFilterDetection == true"
            >Yes</Radio>
            <Radio
              :disabled="isSaving || isLoading"
              @toggle-checked="config.enableFilterDetection = false"
              :isChecked="config.enableFilterDetection == false"
            >No</Radio>
          </v-radio-group>
        </v-flex>
        <v-flex xs6>
          <v-radio-group
            v-model="config.isDocumentLibrary"
            row
            :disabled="isSaving || isLoading"
            color="#f00"
            label="Document Library"
            hint="Determines if list is a document library or not. This will help determine the types of queries and filters to apply on web service calls."
            persistent-hint
          >
            <Radio
              :disabled="isSaving || isLoading"
              @toggle-checked="config.isDocumentLibrary = true"
              :isChecked="config.isDocumentLibrary == true"
            >Yes</Radio>
            <Radio
              :disabled="isSaving || isLoading"
              @toggle-checked="config.isDocumentLibrary = false"
              :isChecked="config.isDocumentLibrary == false"
            >No</Radio>
          </v-radio-group>
          <transition name="slide-down">
            <v-card v-if="config.isDocumentLibrary" color="#f9f9f9" flat class="mr-3">
              <v-card-text>
                <v-radio-group
                  v-model="config.documentType"
                  row
                  :disabled="isSaving || isLoading"
                  color="#f00"
                  label="Document Type"
                  hint="Determines if list is a document library or not.  This will help determine the types of queries and filters to apply on web service calls."
                  persistent-hint
                >
                  <Radio
                    :disabled="isSaving || isLoading"
                    @toggle-checked="config.documentType = 'File'"
                    :isChecked="config.documentType == 'File'"
                  >File</Radio>
                  <Radio
                    :disabled="isSaving || isLoading"
                    @toggle-checked="config.documentType = 'Folder'"
                    :isChecked="config.documentType == 'Folder'"
                  >Folder</Radio>
                </v-radio-group>
              </v-card-text>
            </v-card>
          </transition>
        </v-flex>
        <v-flex xs12>
          <div
            class="v-input v-input--selection-controls v-input--radio-group v-input--radio-group--row theme--light"
          >
            <div class="v-input__control">
              <div class="v-input__slot" style="height: auto;">
                <label
                  aria-hidden="true"
                  class="v-label theme--light"
                  style="left: 0px; position: relative;"
                >Order/Color</label>
              </div>
              <div class="v-messages theme--light">
                <div class="v-messages__wrapper">
                  <div class="v-messages__message">
                    Order and color of the metrics displayed. Click on
                    <AppsIcon class="small-icon"></AppsIcon>then
                    <EditIcon class="small-icon"></EditIcon>to edit the background color, font color, and visibility. You can also change the visibility by clicking on
                    <AppsIcon class="small-icon"></AppsIcon>then clicking on
                    <VisibilityIcon class="small-icon"></VisibilityIcon>or
                    <VisibilityOffIcon class="small-icon"></VisibilityOffIcon>.
                    To delete a metric from being displayed, click on the
                    <AppsIcon class="small-icon"></AppsIcon>then
                    <DeleteIcon class="small-icon"></DeleteIcon>. To chnage the order, click on the
                    <LeftArrowIcon class="small-icon"></LeftArrowIcon>or
                    <RightArrowIcon class="small-icon"></RightArrowIcon>inside each metric. Click
                    <kbd>Add</kbd> to add a new metric.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <EditableBlockList @update="updateMetrics" :disabled="isLoading || isSaving"></EditableBlockList>
        </v-flex>
      </v-layout>
    </v-container>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        flat
        color="blue"
        :loading="isLoading"
        :disabled="isLoading || config.listName.length == 0"
        light
      >
        <span slot="loader">
          <v-layout row wrap>
            <v-flex>
              <LoadingIcon class="small-icon loading-icon" v-if="isLoading"></LoadingIcon>
            </v-flex>
            <v-flex>Generate Metrics</v-flex>
          </v-layout>
        </span>Generate Metrics
      </v-btn>
      <v-btn
        flat
        color="blue"
        :loading="isLoading"
        :disabled="isLoading || config.listName.length == 0"
        @click="save"
        light
      >
        <span slot="loader">
          <v-layout row wrap>
            <v-flex>
              <LoadingIcon class="small-icon loading-icon" v-if="isLoading"></LoadingIcon>
            </v-flex>
            <v-flex>Save</v-flex>
          </v-layout>
        </span>Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import dropdownIcon from "@/assets/svg-sprite-navigation-symbol.svg?ic_arrow_drop_down_24px";
import Radio from "./Radio";
import EditableBlockList from "./EditableBlockList";
import AppsIcon from "@/assets/svg-sprite-navigation-symbol.svg?ic_apps_24px";
import LeftArrowIcon from "@/assets/svg-sprite-navigation-symbol.svg?ic_arrow_back_24px";
import RightArrowIcon from "@/assets/svg-sprite-navigation-symbol.svg?ic_arrow_forward_24px";
import EditIcon from "@/assets/svg-sprite-content-symbol.svg?ic_create_24px";
import DeleteIcon from "@/assets/svg-sprite-action-symbol.svg?ic_delete_24px";
import VisibilityIcon from "@/assets/svg-sprite-action-symbol.svg?ic_visibility_24px";
import VisibilityOffIcon from "@/assets/svg-sprite-action-symbol.svg?ic_visibility_off_24px";
import LoadingIcon from "@/assets/svg-sprite-action-symbol.svg?ic_cached_24px";
import Data from "../mixins/Data";
export default {
  components: {
    dropdownIcon: dropdownIcon,
    LoadingIcon: LoadingIcon,
    Radio: Radio,
    EditableBlockList: EditableBlockList,
    LeftArrowIcon: LeftArrowIcon,
    RightArrowIcon: RightArrowIcon,
    EditIcon: EditIcon,
    DeleteIcon: DeleteIcon,
    VisibilityIcon: VisibilityIcon,
    VisibilityOffIcon: VisibilityOffIcon,
    AppsIcon: AppsIcon
  },
  mixins: [Data],
  props: {
    siteUrl: {
      type: String,
      default: function() {
        return "";
      }
    },
    loading: Boolean,
    initConfig: {
      type: Object,
      default: function() {
        return {
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
        };
      }
    }
  },
  watch: {
    columnWidth: function() {
      this.$refs.columnWidth.blur();
    },
    initConfig: function(newVal) {
      if (newVal.ID > 0) {
        this.isConfigDataLoaded = true;
      }
      this.config = Object.assign(this.config, newVal);
    },
    loading: function(newVal) {
      this.isLoading = newVal;
    }
  },
  data: function() {
    return {
      valid: true,
      columnWidthItems: ["1", "2", "3", "4", "6", "12"],
      isSaving: false,
      isLoading: false,
      isColumnWidthSelected: false,
      config: {
        ID: 0,
        columnWidth: "1",
        listName: "",
        fieldName: "",
        siteRelativeUrl: "",
        documentType: "File",
        dynamicWidth: false,
        enableFilterNavigation: false,
        enableFilterDetection: false,
        isDocumentLibrary: false,
        openInNewWindow: false
      },
      isConfigDataLoaded: false,
      columnWidthHint: `<blockquote>
                      Grid columns are created by specifying a number that is a factor of
                      <kbd>12</kbd> available columns you wish to span. For example, column width of
                      <kbd>3</kbd> will create
                      <kbd>4</kbd> items in that row. I.e.,
                      <kbd>12 / 3 = 4</kbd>, so all availble column widths are factors of
                      <kbd>12</kbd>.
                    </blockquote>`
    };
  },
  methods: {
    updateMetrics: function(items) {
      this.$emit("items-updated", items);
    },
    save: function() {
      this.isLoading = true;
      (function(that) {
        new Promise(function(resolve, reject) {
          that.getDigest(
            function(digest) {
              resolve(digest);
            },
            function(error) {
              reject(error);
            }
          );
        })
          .then(function(digest) {
            return new Promise(function(resolve, reject) {
              that.saveConfigData(
                digest,
                function(result) {
                  resolve(result);
                },
                function(error) {
                  reject(error);
                }
              );
            });
          })
          .then(function() {
            that.isSaving = false;
          })
          .catch(function(error) {
            that.isSaving = false;
            console.log(error);
          });
      })(this);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.small-icon {
  width: 18px;
  height: 18px;
}

.select .v-menu {
  top: 56px;
  position: absolute;
  left: 0;
}

.select .v-menu__content {
  position: relative;
  z-index: 10;
  left: 0 !important;
  top: 0 !important;
}

svg.dropdown {
  position: absolute;
  right: 3px;
  top: 5px;
  width: 32px;
  height: 56px;
}

svg.dropdown.inactive {
  transition: all 0.2s;
}

svg.dropdown.active {
  /* Firefox */
  -moz-transform: rotate(180deg);
  /* WebKit */
  -webkit-transform: rotate(180deg);
  /* Opera */
  -o-transform: rotate(180deg);
  /* Standard */
  transform: rotate(180deg);
  transition: all 0.2s;
  fill: #2196f3 !important;
}

.v-messages__message {
  border-left: 4px solid rgba(25, 118, 210, 0.5);
  background-color: rgba(25, 118, 210, 0.1);
  padding: 15px;
}

.v-messages__message:hover {
  color: black;
}

.v-text-field.v-text-field--enclosed .v-text-field__details {
  padding-left: 0 !important;
}

.v-input--selection-controls .v-input__control {
  width: 100% !important;
  padding-right: 15px;
}

.slide-down-enter-active,
.slide-down-leave-active {
  max-height: 500px;
  transition: all 0.3s ease-out;
}

.slide-down-leave-to,
.slide-down-enter {
  max-height: 0px;
  opacity: 0;
}

.loading-icon {
  fill: rgba(0, 0, 0, 0.61);
  margin-right: 8px;
  -webkit-animation: spin 1s ease-in-out infinite;
  -moz-animation: spin 1s ease-in-out infinite;
  animation: spin 1s ease-in-out infinite;
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
</style>
