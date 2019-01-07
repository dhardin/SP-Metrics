<template>
  <v-btn class="radio-button" flat @click="toggleChecked" :disabled="disabled">
         <radioButtonChecked class="checkbox-icon" :class="{hidden: checked == false}"/>
         <radioButtonUnchecked class="checkbox-icon" :class="{hidden: checked == true}"/>
    <span class="font-weight-thin subheading">
      <slot default>{{label}}</slot>
    </span>
  </v-btn>
</template>

<script>
import radioButtonUnchecked from '@/assets/svg-sprite-toggle-symbol.svg?ic_radio_button_unchecked_24px';
import radioButtonChecked from '@/assets/svg-sprite-toggle-symbol.svg?ic_radio_button_checked_24px';

export default {
  components: {
    radioButtonUnchecked: radioButtonUnchecked,
    radioButtonChecked:radioButtonChecked
  },
  props: {
    disabled: {
      type: Boolean,
      default: function(){
        return false
      }
    },
    label: {
      type: String,
      default: function(){
        return ''
      }
    },
    isChecked: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isChecked: function(newVal){
      this.checked = newVal;
    }
  },
  data () {
    return {
      checked: false
    }
  },
  methods: {
    toggleChecked: function(){
      this.checked = true;
      this.$emit('toggle-checked', this.checked);
    }
  },
  mounted: function(){
    this.checked = this.isChecked;
  }
}
</script>
<style scoped>
.v-btn .subheading{
 text-transform: none !important;
   display: flex;
}

.v-btn:disabled .subheading{
  color: rgba(0,0,0,0.38);
 
}

.v-btn:disabled svg {
  opacity: 0.37;
}
.checkbox-icon{
  padding: 0;
  background-color: white;
  width: 25px;
  height: 25px;
  fill: rgb(25, 118, 210);
}

.radio-button::before {
  background-color: transparent  !important;
   opacity: 1;
}

.hidden {
  display: none;
}
</style>
