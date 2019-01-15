<template>
  <div>
    <v-btn color="green" dark large @click="addItem" v-if="!readonly" :disabled="disabled">
      <AddIcon class="icon"></AddIcon>Add
    </v-btn>
    <transition-group name="list" tag="p">
      <v-card
        v-for="item in sortedItems"
        v-bind:key="item.created"
        class="list-item"
        style="position: relative"
        :style="{'background-color': getRgbaString(item.backgroundColor.rgba), 'color': getRgbaString(item.color.rgba)}"
        @mouseover="item.isHoveringOver = true"
        @mouseleave="item.isHoveringOver = false"
      >
        <transition name="fade">
          <span
            v-if="!item.isVisible"
            class="font-weight-thin pa-2"
            :style="{position:'absolute', top: '0', left: '0', color: 'rgba(0,0,0,.65)'}"
          >
            <VisibilityOffIcon class="icon" :style="{fill: item.color.hex}"></VisibilityOffIcon>
          </span>
        </transition>
        <v-speed-dial
          v-model="item.fab"
          :top="top"
          :bottom="bottom"
          :right="right"
          :left="left"
          :direction="direction"
          :open-on-hover="hover"
          absolute
          :style="{top: '24px'}"
          class="speed-dial"
          v-if="!readonly"
          :disabled="disabled"
        >
          <v-btn slot="activator" v-model="item.fab" color="blue darken-2" dark fab class="xs-btn">
            <transition name="fade" mode="out-in">>
              <AppsIcon class="icon" v-if="!item.fab"></AppsIcon>
              <CloseIcon class="icon" v-else></CloseIcon>
            </transition>
          </v-btn>

          <v-btn
            fab
            dark
            color="green"
            class="small-btn"
            @click.native.stop="item.fab=false; Object.assign(editingItem, item); dialog=true;"
          >
            <EditIcon class="icon"></EditIcon>
          </v-btn>

          <v-btn
            fab
            dark
            color="purple"
            @click="item.isVisible = !item.isVisible"
            class="small-btn"
          >
            <VisibilityIcon class="icon" v-if="!item.isVisible"></VisibilityIcon>
            <VisibilityOffIcon class="icon" v-else></VisibilityOffIcon>
          </v-btn>
          <v-btn fab dark color="red" @click="deleteItem(item)" class="small-btn">
            <DeleteIcon class="icon"></DeleteIcon>
          </v-btn>
        </v-speed-dial>

        <v-container fill-height grid-list-md text-xs-center>
          <v-layout row wrap align-center>
            <v-flex
              class="item-title"
              :style="{'font-size': item.fontSize + 'px', 'font-weight': fontWeightValues[item.fontWeight]}"
            >{{ item.name }}</v-flex>
          </v-layout>
        </v-container>

        <v-card-actions :style="{position: 'absolute', bottom: '0'}" v-if="!readonly">
          <transition name="slide-right">
            <v-btn
              @click="moveLeft(item)"
              v-if="item.sortOrder > 0 && item.isHoveringOver"
              color="blue"
            >
              <LeftArrowIcon class="icon"></LeftArrowIcon>
            </v-btn>
          </transition>
          <v-spacer v-if="(item.sortOrder == items.length - 1)"></v-spacer>
          <span v-if="(item.sortOrder == 0)" :style="{width: '88px', height: '25px'}"></span>
          <transition name="slide-left">
            <v-btn
              @click="moveRight(item)"
              v-if="item.sortOrder < items.length - 1 && item.isHoveringOver"
              color="blue"
            >
              <RightArrowIcon class="icon"></RightArrowIcon>
            </v-btn>
          </transition>
        </v-card-actions>
      </v-card>
    </transition-group>
    <v-dialog v-model="dialog" persistent v-if="!readonly">
      <v-card>
        <v-card-title></v-card-title>
        <v-card-text>
          <v-container fluid grid-list-lg>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="editingItem.name"
                  label="Name"
                  required
                  box
                  color="blue"
                  hint="The name of the metric."
                  persistent-hint
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-radio-group
                  v-model="editingItem.isVisible"
                  row
                  color="#f00"
                  label="Is Visible"
                  hint="Sets the visibility of the metric."
                  persistent-hint
                >
                  <Radio
                    @toggle-checked="editingItem.isVisible = true"
                    :isChecked="editingItem.isVisible == true"
                  >Yes</Radio>
                  <Radio
                    @toggle-checked="editingItem.isVisible = false"
                    :isChecked="editingItem.isVisible == false"
                  >No</Radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs12>
                <v-subheader class="pl-0">Font Size</v-subheader>
                <v-slider
                  v-model="editingItem.fontSize"
                  thumb-label="always"
                  color="blue"
                  ticks="always"
                  step="1"
                  min="4"
                  max="64"
                  tick-size="2"
                ></v-slider>
              </v-flex>
              <v-flex xs12>
                <v-subheader class="pl-0 mb-5">Font Weight</v-subheader>
                <v-slider
                  ref="fontWeight"
                  v-model="editingItem.fontWeight"
                  thumb-label="always"
                  color="blue"
                  ticks="always"
                  step="1"
                  min="0"
                  max="2"
                  tick-size="6"
                  thumb-size="45"
                  :tick-labels="fontWeightText"
                ></v-slider>
              </v-flex>
              <v-flex xs4>
                <v-layout align-center justify-center column fill-height>
                  <h2 class="font-weight-thin">Background Color</h2>
                  <sketch-picker v-model="editingItem.backgroundColor"/>
                </v-layout>
              </v-flex>
              <v-flex xs4>
                <v-layout align-center justify-center column fill-height>
                  <h2 class="font-weight-thin">Font Color</h2>
                  <sketch-picker v-model="editingItem.color"/>
                </v-layout>
              </v-flex>
              <v-flex xs4>
                <h2 class="font-weight-thin">Preview</h2>
                <v-card
                  class="list-item"
                  style="position: relative"
                  :style="{'background-color': getRgbaString(editingItem.backgroundColor.rgba), 'color': getRgbaString(editingItem.color.rgba)}"
                >
                  <v-container fill-height grid-list-md text-xs-center>
                    <v-layout row wrap align-center>
                      <v-flex
                        class="item-title"
                        :style="{'font-size': editingItem.fontSize + 'px', 'font-weight': fontWeightValues[editingItem.fontWeight]}"
                      >{{ editingItem.name }}</v-flex>
                    </v-layout>
                  </v-container>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="red" @click="dialog = false">Cancel</v-btn>
          <v-btn flat color="blue" @click="saveItem">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import AddIcon from "@/assets/svg-sprite-content-symbol.svg?ic_add_24px";
import CloseIcon from "@/assets/svg-sprite-content-symbol.svg?ic_clear_24px";
import AppsIcon from "@/assets/svg-sprite-navigation-symbol.svg?ic_apps_24px";
import LeftArrowIcon from "@/assets/svg-sprite-navigation-symbol.svg?ic_arrow_back_24px";
import RightArrowIcon from "@/assets/svg-sprite-navigation-symbol.svg?ic_arrow_forward_24px";
import EditIcon from "@/assets/svg-sprite-content-symbol.svg?ic_create_24px";
import DeleteIcon from "@/assets/svg-sprite-action-symbol.svg?ic_delete_24px";
import VisibilityIcon from "@/assets/svg-sprite-action-symbol.svg?ic_visibility_24px";
import VisibilityOffIcon from "@/assets/svg-sprite-action-symbol.svg?ic_visibility_off_24px";
import { Sketch } from "vue-color";
import Radio from "./Radio";
export default {
  components: {
    AddIcon: AddIcon,
    CloseIcon: CloseIcon,
    LeftArrowIcon: LeftArrowIcon,
    RightArrowIcon: RightArrowIcon,
    EditIcon: EditIcon,
    DeleteIcon: DeleteIcon,
    VisibilityIcon: VisibilityIcon,
    VisibilityOffIcon: VisibilityOffIcon,
    AppsIcon: AppsIcon,
    "sketch-picker": Sketch,
    Radio: Radio
  },
  props: {
    disabled: Boolean,
    readonly: Boolean,
    initialItems: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  computed: {
    sortedItems: function() {
      var items = [];
      var i;
      if (this.readonly) {
        for (i = 0; i < this.items.length; i++) {
          if (this.items[i].isVisible) {
            items.push(this.items[i]);
          }
        }
      } else {
        items = this.items;
      }
      return items.slice().sort((a, b) => a.sortOrder - b.sortOrder);
    }
  },
  watch: {
    sortedItems: function(newVal) {
      var items = [];
      var i;
      for (i = 0; i < newVal.length; i++) {
        items.push({
          name: newVal[i].name,
          backgroundColor: newVal[i].backgroundColor,
          color: newVal[i].color,
          fontSize: newVal[i].fontSize,
          fontWeight: newVal[i].fontWeight,
          sortOrder: newVal[i].sortOrder,
          isVisible: newVal[i].isVisible,
          created: newVal[i].created
        });
      }
      //this.$emit("update", items);
    },
    editingItem: {
      handler: function(newVal) {
        this.$refs.fontWeight.$el.querySelector(
          ".v-slider__thumb-label"
        ).innerHTML =
          "<span>" + this.fontWeightText[newVal.fontWeight] + "</span>";
      },
      deep: true
    },
    initialItems: function(newVal) {
      this.items = Object.assign([], newVal);
    }
  },
  data() {
    return {
      items: this.initialItems,
      direction: "bottom",
      fab: false,
      fontWeightText: ["normal", "bold", "boldest"],
      fontWeightValues: ["normal", "bold", "900"],
      fling: false,
      hover: true,
      tabs: null,
      top: true,
      right: true,
      dialog: false,
      editingItem: {
        name: "",
        backgroundColor: {
          hex: "#ffffff",
          hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
          hsv: { h: 150, s: 0.66, v: 0.3, a: 1 },
          rgba: { r: 255, g: 255, b: 255, a: 1 },
          a: 1
        },
        color: {
          hex: "#000000",
          hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
          hsv: { h: 150, s: 0.66, v: 0.3, a: 1 },
          rgba: { r: 0, g: 0, b: 0, a: 1 },
          a: 1
        },
        fontSize: 20,
        fontWeight: 0,
        sortOrder: 0,
        isVisible: true
      },
      bottom: false,
      left: false
    };
  },
  methods: {
    getRgbaString: function(colorRgba) {
      return (
        "rgba(" +
        colorRgba.r +
        ", " +
        colorRgba.g +
        ", " +
        colorRgba.b +
        ", " +
        colorRgba.a +
        ")"
      );
    },
    addItem: function() {
      var item = {
        name: this.items.length,
        sortOrder: this.items.length,
        isVisible: true,
        created: new Date().toISOString(),
        fab: false,
        backgroundColor: {
          hex: "#ffffff",
          hsl: { h: 255, s: 255, l: 255, a: 1 },
          hsv: { h: 255, s: 255, v: 255, a: 1 },
          rgba: { r: 255, g: 255, b: 255, a: 1 },
          a: 1
        },
        color: {
          hex: "#000000",
          hsl: { h: 0, s: 0, l: 0, a: 1 },
          hsv: { h: 0, s: 0, v: 0, a: 1 },
          rgba: { r: 0, g: 0, b: 0, a: 1 },
          a: 1
        },
        fontSize: 20,
        fontWeight: 0,
        isHoveringOver: false
      };
      this.items.push(item);
    },
    saveItem: function() {
      var item = this.sortedItems[this.editingItem.sortOrder];
      Object.assign(item, this.editingItem);
      this.dialog = false;
      this.$emit("update", this.sortedItems);
    },
    deleteItem: function(item) {
      var index = this.items.indexOf(item);
      var sortedIndex = item.sortOrder;
      var i;
      //reorder all items after this.
      this.$delete(this.items, index);
      for (i = sortedIndex; i < this.sortedItems.length; i++) {
        this.sortedItems[i].sortOrder = this.sortedItems[i].sortOrder - 1;
      }
    },
    moveRight: function(item) {
      var index = item.sortOrder;
      this.sortedItems[item.sortOrder + 1].sortOrder = index;
      item.sortOrder++;
    },
    moveLeft: function(item) {
      var index = item.sortOrder;
      this.sortedItems[item.sortOrder - 1].sortOrder = index;
      item.sortOrder--;
    }
  },
  mounted: function() {
    console.log(this.initialItems);
  }
};
</script>
<style scoped>
.icon {
  width: 25px;
  height: 25px;
  fill: white;
}
.icon.icon-blue {
  fill: rgb(25, 118, 210);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
}

.fade-leave-to,
.fade-enter {
  transform: scale(0) rotate(90deg);
  transform-origin: center;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.1s;
}

.slide-left-leave-to,
.slide-left-enter {
  transform: translateX(200px);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.1s;
}

.slide-right-leave-to,
.slide-right-enter {
  transform: translateX(-200px);
}
.list-item {
  width: 200px;
  height: 212px;
  display: inline-block;
  margin: 10px;
  overflow: hidden;
}

.list-item:first-child {
}

.list-item .item-title {
  font-size: 20px;
  overflow-wrap: break-word;
}

.list-move {
  transition: transform 0.2s;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.2s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(100px);
}

.xs-btn {
  width: 35px;
  height: 35px;
}

.small-btn {
  width: 40px;
  height: 40px;
}
.item-title-container {
  display: block !important;
  font-size: 24px;
  text-align: center;
}
</style>
