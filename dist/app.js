(function(t){function e(e){for(var n,o,l=e[0],r=e[1],c=e[2],f=0,g=[];f<l.length;f++)o=l[f],s[o]&&g.push(s[o][0]),s[o]=0;for(n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n]);d&&d(e);while(g.length)g.shift()();return a.push.apply(a,c||[]),i()}function i(){for(var t,e=0;e<a.length;e++){for(var i=a[e],n=!0,l=1;l<i.length;l++){var r=i[l];0!==s[r]&&(n=!1)}n&&(a.splice(e--,1),t=o(o.s=i[0]))}return t}var n={},s={app:0},a=[];function o(e){if(n[e])return n[e].exports;var i=n[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,o),i.l=!0,i.exports}o.m=t,o.c=n,o.d=function(t,e,i){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)o.d(i,n,function(e){return t[e]}.bind(null,n));return i},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],r=l.push.bind(l);l.push=e,l=l.slice();for(var c=0;c<l.length;c++)e(l[c]);var d=r;a.push([0,"chunk-vendors"]),i()})({0:function(t,e,i){t.exports=i("56d7")},"034f":function(t,e,i){"use strict";var n=i("64a9"),s=i.n(n);s.a},1637:function(t,e,i){"use strict";var n=i("a964"),s=i.n(n);s.a},"1e79":function(t,e,i){"use strict";var n=i("3613"),s=i.n(n);s.a},3613:function(t,e,i){},"44bb":function(module,exports){module.exports={render:function anonymous(){with(this)return _c("svg",{attrs:{viewBox:"0 0 24 24"}},[_c("path",{attrs:{d:"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"}})])}}},"56d7":function(t,e,i){"use strict";i.r(e);i("551c"),i("8a81"),i("db4d");var n=i("2b0e"),s=i("ce5b"),a=i.n(s),o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"app"}},[i("v-app",[i("v-layout",[i("v-flex",{attrs:{xs10:"","py-3":"","offset-sm1":""}},[t.isEditing?i("Config",{attrs:{"init-config":t.config,loading:t.state_map.loading.isLoading,"site-url":t.siteUrl,"config-list-name":t.configListName},on:{"items-updated":t.updateItems}}):t._e(),t.state_map.loading.isLoading&&!t.isEditing?i("v-card",{staticClass:"pa-5"},[i("v-layout",{attrs:{row:"",wrap:""}},[i("v-flex",{attrs:{xs1:"","offset-sm4":""}},[i("LoadingIcon",{staticClass:"large-icon loading-icon"})],1),i("v-flex",{attrs:{xs2:""}},[i("h1",{staticClass:"font-weight-thin",attrs:{id:"loading-title"}},[t._v("Loading")])])],1)],1):t._e(),!t.isEditing&&!t.state_map.loading.isLoading&&t.config.metrics.length>0?i("EditableBlockList",{attrs:{readonly:"","initial-items":t.config.metrics}}):t._e(),t.state_map.loading.isLoading||t.isEditing||0!=t.config.metrics.length?t._e():i("v-card",{staticClass:"pa-5"},[i("v-layout",{attrs:{row:"",wrap:""}},[i("v-flex",[i("h1",{staticClass:"font-weight-thin",attrs:{id:"loading-title"}},[t._v("No data")])])],1)],1)],1)],1)],1)],1)},l=[],r=i("a4bb"),c=i.n(r),d=(i("ac6a"),i("cadf"),i("795b")),f=i.n(d),g=i("5176"),h=i.n(g),u=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-card",{attrs:{raised:""}},[i("v-card-title",[i("span",{staticClass:"headline"},[t._v("Metrics Configuration")]),i("v-spacer",{style:{"text-align":"right"}},[t.isConfigDataLoaded&&!t.isLoading?i("v-chip",{attrs:{label:"",color:"green","text-color":"white"}},[t._v("Config Data Loaded")]):t._e(),t.isConfigDataLoaded||t.isLoading?t._e():i("v-chip",{attrs:{label:"",color:"red","text-color":"white"}},[t._v("No Config Data")]),t.isLoading?i("v-chip",{attrs:{label:"",color:"primary","text-color":"white"}},[t.isLoading?i("LoadingIcon",{staticClass:"small-icon loading-icon"}):t._e(),i("v-spacer"),t._v("Loading\n      ")],1):t._e()],1)],1),i("v-container",{attrs:{"grid-list-md":"",fluid:""}},[i("v-layout",{attrs:{row:"",wrap:""}},[i("v-flex",{attrs:{xs6:""}},[i("v-text-field",{attrs:{label:"List Name",required:"",box:"",color:"blue",hint:"The list where data will be pulled in order to generate metrics. This should be the display name of the list, not the internal name.","persistent-hint":"",disabled:t.isSaving||t.isLoading},model:{value:t.config.listName,callback:function(e){t.$set(t.config,"listName",e)},expression:"config.listName"}})],1),i("v-flex",{attrs:{xs6:""}},[i("v-text-field",{attrs:{label:"Site Relative URL",box:"",color:"blue",hint:"URL of the site where the list is stored","persistent-hint":"",required:"",disabled:t.isSaving||t.isLoading},model:{value:t.config.siteUrl,callback:function(e){t.$set(t.config,"siteUrl",e)},expression:"config.siteUrl"}})],1),i("v-flex",{attrs:{xs6:""}},[i("v-text-field",{attrs:{label:"Field Name",box:"",color:"blue",hint:"The field name which will be used to generate metrics on. This should be the internal name of the field, not display name.","persistent-hint":"",required:"",disabled:t.isSaving||t.isLoading},model:{value:t.config.fieldName,callback:function(e){t.$set(t.config,"fieldName",e)},expression:"config.fieldName"}})],1),i("v-flex",{style:{position:"relative"},attrs:{xs6:""}},[i("v-select",{ref:"columnWidth",staticClass:"select",attrs:{items:t.columnWidthItems,box:"",color:"blue",label:"Column Width","append-icon":"",hint:t.columnWidthHint,"persistent-hint":"",disabled:t.isSaving||t.isLoading},on:{focus:function(e){t.isColumnWidthSelected=!0},blur:function(e){t.isColumnWidthSelected=!1}},model:{value:t.config.minColumnWidth,callback:function(e){t.$set(t.config,"minColumnWidth",e)},expression:"config.minColumnWidth"}}),i("dropdownIcon",{staticClass:"dropdown",class:{active:t.isColumnWidthSelected,inactive:!t.isColumnWidthSelected}})],1),i("v-flex",{attrs:{xs6:""}},[i("v-radio-group",{attrs:{row:"",disabled:t.isSaving||t.isLoading,color:"#f00",label:"Dynamic Width",hint:"Dynamic Width will procedurally select an appropriate width for column widths if remaining columns in the row do not evenly fill up leftover space.","persistent-hint":""},model:{value:t.config.hasDynamicWidth,callback:function(e){t.$set(t.config,"hasDynamicWidth",e)},expression:"config.hasDynamicWidth"}},[i("Radio",{attrs:{disabled:t.isSaving||t.isLoading,isChecked:1==t.config.hasDynamicWidth},on:{"toggle-checked":function(e){t.config.hasDynamicWidth=!0}}},[t._v("Yes")]),i("Radio",{attrs:{disabled:t.isSaving||t.isLoading,isChecked:0==t.config.hasDynamicWidth},on:{"toggle-checked":function(e){t.config.hasDynamicWidth=!1}}},[t._v("No")])],1)],1),i("v-flex",{attrs:{xs6:""}},[i("v-radio-group",{attrs:{row:"",disabled:t.isSaving||t.isLoading,color:"#f00",label:"Enable Filter Navigation",hint:"Clicking on metric's totals will navigate to the list filtered by the value clicked on.","persistent-hint":""},model:{value:t.config.hasFiltering,callback:function(e){t.$set(t.config,"hasFiltering",e)},expression:"config.hasFiltering"}},[i("Radio",{attrs:{disabled:t.isSaving||t.isLoading,isChecked:1==t.config.hasFiltering},on:{"toggle-checked":function(e){t.config.hasFiltering=!0}}},[t._v("Yes")]),i("Radio",{attrs:{disabled:t.isSaving||t.isLoading,isChecked:0==t.config.hasFiltering},on:{"toggle-checked":function(e){t.config.hasFiltering=!1}}},[t._v("No")])],1),i("transition",{attrs:{name:"slide-down"}},[t.config.hasFiltering?i("v-card",{staticClass:"mr-3",attrs:{color:"#f9f9f9",flat:""}},[i("v-card-text",[i("v-text-field",{attrs:{label:"Filter View Name",box:"",color:"blue",hint:"The list view for the filter to be applied to","persistent-hint":"",required:"",disabled:t.isSaving||t.isLoading},model:{value:t.config.filterViewName,callback:function(e){t.$set(t.config,"filterViewName",e)},expression:"config.filterViewName"}}),i("v-radio-group",{attrs:{row:"",disabled:t.isSaving||t.isLoading,color:"#f00",label:"Open In New Window",hint:"Metrics clicked on will open in a new window.  Else the current page will refresh with applied metric filters.","persistent-hint":""},model:{value:t.config.openInNewWindow,callback:function(e){t.$set(t.config,"openInNewWindow",e)},expression:"config.openInNewWindow"}},[i("Radio",{attrs:{disabled:t.isSaving||t.isLoading,isChecked:1==t.config.openInNewWindow},on:{"toggle-checked":function(e){t.config.openInNewWindow=!0}}},[t._v("Yes")]),i("Radio",{attrs:{disabled:t.isSaving||t.isLoading,isChecked:0==t.config.openInNewWindow},on:{"toggle-checked":function(e){t.config.openInNewWindow=!1}}},[t._v("No")])],1)],1)],1):t._e()],1)],1),i("v-flex",{attrs:{xs6:""}},[i("v-radio-group",{attrs:{row:"",disabled:t.isSaving||t.isLoading,color:"#f00",label:"Enable Filter Detection",hint:"Metrics will be filtered based on query string filters being applied to the page.","persistent-hint":""},model:{value:t.config.hasFilterDetection,callback:function(e){t.$set(t.config,"hasFilterDetection",e)},expression:"config.hasFilterDetection"}},[i("Radio",{attrs:{disabled:t.isSaving||t.isLoading,isChecked:1==t.config.hasFilterDetection},on:{"toggle-checked":function(e){t.config.hasFilterDetection=!0}}},[t._v("Yes")]),i("Radio",{attrs:{disabled:t.isSaving||t.isLoading,isChecked:0==t.config.hasFilterDetection},on:{"toggle-checked":function(e){t.config.hasFilterDetection=!1}}},[t._v("No")])],1)],1),i("v-flex",{attrs:{xs6:""}},[i("v-radio-group",{attrs:{row:"",disabled:t.isSaving||t.isLoading,color:"#f00",label:"Document Library",hint:"Determines if list is a document library or not. This will help determine the types of queries and filters to apply on web service calls.","persistent-hint":""},model:{value:t.config.isDocumentLibrary,callback:function(e){t.$set(t.config,"isDocumentLibrary",e)},expression:"config.isDocumentLibrary"}},[i("Radio",{attrs:{disabled:t.isSaving||t.isLoading,isChecked:1==t.config.isDocumentLibrary},on:{"toggle-checked":function(e){t.config.isDocumentLibrary=!0}}},[t._v("Yes")]),i("Radio",{attrs:{disabled:t.isSaving||t.isLoading,isChecked:0==t.config.isDocumentLibrary},on:{"toggle-checked":function(e){t.config.isDocumentLibrary=!1}}},[t._v("No")])],1),i("transition",{attrs:{name:"slide-down"}},[t.config.isDocumentLibrary?i("v-card",{staticClass:"mr-3",attrs:{color:"#f9f9f9",flat:""}},[i("v-card-text",[i("v-radio-group",{attrs:{row:"",disabled:t.isSaving||t.isLoading,color:"#f00",label:"Document Type",hint:"Determines if list is a document library or not.  This will help determine the types of queries and filters to apply on web service calls.","persistent-hint":""},model:{value:t.config.fileObjectType,callback:function(e){t.$set(t.config,"fileObjectType",e)},expression:"config.fileObjectType"}},[i("Radio",{attrs:{disabled:t.isSaving||t.isLoading,isChecked:"0"==t.config.fileObjectType},on:{"toggle-checked":function(e){t.config.fileObjectType="0"}}},[t._v("File")]),i("Radio",{attrs:{disabled:t.isSaving||t.isLoading,isChecked:"1"==t.config.fileObjectType},on:{"toggle-checked":function(e){t.config.fileObjectType="1"}}},[t._v("Folder")])],1)],1)],1):t._e()],1)],1),i("v-flex",{attrs:{xs12:""}},[i("div",{staticClass:"v-input v-input--selection-controls v-input--radio-group v-input--radio-group--row theme--light"},[i("div",{staticClass:"v-input__control"},[i("div",{staticClass:"v-input__slot",staticStyle:{height:"auto"}},[i("label",{staticClass:"v-label theme--light",staticStyle:{left:"0px",position:"relative"},attrs:{"aria-hidden":"true"}},[t._v("Order/Color")])]),i("div",{staticClass:"v-messages theme--light"},[i("div",{staticClass:"v-messages__wrapper"},[i("div",{staticClass:"v-messages__message"},[t._v("\n                  Order and color of the metrics displayed. Click on\n                  "),i("AppsIcon",{staticClass:"small-icon"}),t._v("then\n                  "),i("EditIcon",{staticClass:"small-icon"}),t._v("to edit the background color, font color, and visibility. You can also change the visibility by clicking on\n                  "),i("AppsIcon",{staticClass:"small-icon"}),t._v("then clicking on\n                  "),i("VisibilityIcon",{staticClass:"small-icon"}),t._v("or\n                  "),i("VisibilityOffIcon",{staticClass:"small-icon"}),t._v(".\n                  To delete a metric from being displayed, click on the\n                  "),i("AppsIcon",{staticClass:"small-icon"}),t._v("then\n                  "),i("DeleteIcon",{staticClass:"small-icon"}),t._v(". To chnage the order, click on the\n                  "),i("LeftArrowIcon",{staticClass:"small-icon"}),t._v("or\n                  "),i("RightArrowIcon",{staticClass:"small-icon"}),t._v("inside each metric. Click\n                  "),i("kbd",[t._v("Add")]),t._v(" to add a new metric.\n                ")],1)])])])]),i("EditableBlockList",{attrs:{disabled:t.isLoading||t.isSaving,"initial-items":t.initConfig.metrics},on:{update:t.updateMetrics}})],1)],1)],1),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{flat:"",color:"blue",loading:t.isSaving,disabled:t.isSaving||0==t.config.listName.length,light:""}},[i("span",{attrs:{slot:"loader"},slot:"loader"},[i("v-layout",{attrs:{row:"",wrap:""}},[i("v-flex",[t.isSaving?i("LoadingIcon",{staticClass:"small-icon loading-icon"}):t._e()],1),i("v-flex",[t._v("Generate Metrics")])],1)],1),t._v("Generate Metrics\n    ")]),i("v-btn",{attrs:{flat:"",color:"blue",loading:t.isSaving,disabled:t.isSaving||0==t.config.listName.length,light:""},on:{click:t.save}},[i("span",{attrs:{slot:"loader"},slot:"loader"},[i("v-layout",{attrs:{row:"",wrap:""}},[i("v-flex",[t.isSaving?i("LoadingIcon",{staticClass:"small-icon loading-icon"}):t._e()],1),i("v-flex",[t._v("Save")])],1)],1),t._v("Save\n    ")])],1)],1)},m=[],p=i("e9f7"),v=i.n(p),b=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-btn",{staticClass:"radio-button",attrs:{flat:"",disabled:t.disabled},on:{click:t.toggleChecked}},[i("radioButtonChecked",{staticClass:"checkbox-icon",class:{hidden:0==t.checked}}),i("radioButtonUnchecked",{staticClass:"checkbox-icon",class:{hidden:1==t.checked}}),i("span",{staticClass:"font-weight-thin subheading"},[t._t("default",[t._v(t._s(t.label))],{default:""})],2)],1)},w=[],y=i("f1e7"),x=i.n(y),C=i("6025"),_=i.n(C),k={components:{radioButtonUnchecked:x.a,radioButtonChecked:_.a},props:{disabled:{type:Boolean,default:function(){return!1}},label:{type:String,default:function(){return""}},isChecked:{type:Boolean,default:!1}},watch:{isChecked:function(t){this.checked=t}},data:function(){return{checked:!1}},methods:{toggleChecked:function(){this.checked=!0,this.$emit("toggle-checked",this.checked)}},mounted:function(){this.checked=this.isChecked}},I=k,L=(i("1637"),i("2877")),S=Object(L["a"])(I,b,w,!1,null,"e5c8d3d0",null);S.options.__file="Radio.vue";var O=S.exports,D=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[t.readonly?t._e():i("v-btn",{attrs:{color:"green",dark:"",large:"",disabled:t.disabled},on:{click:t.addItem}},[i("AddIcon",{staticClass:"icon"}),t._v("Add\n  ")],1),i("transition-group",{attrs:{name:"list",tag:"p"}},t._l(t.sortedItems,function(e){return i("v-card",{key:e.created,staticClass:"list-item",staticStyle:{position:"relative"},style:{"background-color":t.getRgbaString(e.backgroundColor.rgba),color:t.getRgbaString(e.color.rgba)},on:{mouseover:function(t){e.isHoveringOver=!0},mouseleave:function(t){e.isHoveringOver=!1}}},[i("transition",{attrs:{name:"fade"}},[e.isVisible?t._e():i("span",{staticClass:"font-weight-thin pa-2",style:{position:"absolute",top:"0",left:"0",color:"rgba(0,0,0,.65)"}},[i("VisibilityOffIcon",{staticClass:"icon",style:{fill:e.color.hex}})],1)]),t.readonly?t._e():i("v-speed-dial",{staticClass:"speed-dial",style:{top:"24px"},attrs:{top:t.top,bottom:t.bottom,right:t.right,left:t.left,direction:t.direction,"open-on-hover":t.hover,absolute:"",disabled:t.disabled},model:{value:e.fab,callback:function(i){t.$set(e,"fab",i)},expression:"item.fab"}},[i("v-btn",{staticClass:"xs-btn",attrs:{slot:"activator",color:"blue darken-2",dark:"",fab:""},slot:"activator",model:{value:e.fab,callback:function(i){t.$set(e,"fab",i)},expression:"item.fab"}},[i("transition",{attrs:{name:"fade",mode:"out-in"}},[t._v(">\n            "),e.fab?i("CloseIcon",{staticClass:"icon"}):i("AppsIcon",{staticClass:"icon"})],1)],1),i("v-btn",{staticClass:"small-btn",attrs:{fab:"",dark:"",color:"green"},nativeOn:{click:function(i){i.stopPropagation(),e.fab=!1,Object.assign(t.editingItem,e),t.dialog=!0}}},[i("EditIcon",{staticClass:"icon"})],1),i("v-btn",{staticClass:"small-btn",attrs:{fab:"",dark:"",color:"purple"},on:{click:function(t){e.isVisible=!e.isVisible}}},[e.isVisible?i("VisibilityOffIcon",{staticClass:"icon"}):i("VisibilityIcon",{staticClass:"icon"})],1),i("v-btn",{staticClass:"small-btn",attrs:{fab:"",dark:"",color:"red"},on:{click:function(i){t.deleteItem(e)}}},[i("DeleteIcon",{staticClass:"icon"})],1)],1),i("v-container",{attrs:{"fill-height":"","grid-list-md":"","text-xs-center":""}},[i("v-layout",{attrs:{row:"",wrap:"","align-center":""}},[i("v-flex",{staticClass:"item-title",style:{"font-size":t.editingItem.fontSize+"px","font-weight":t.fontWeightValues[t.editingItem.fontWeight]}},[t._v(t._s(e.name))])],1)],1),t.readonly?t._e():i("v-card-actions",{style:{position:"absolute",bottom:"0"}},[i("transition",{attrs:{name:"slide-right"}},[e.sortOrder>0&&e.isHoveringOver?i("v-btn",{attrs:{color:"blue"},on:{click:function(i){t.moveLeft(e)}}},[i("LeftArrowIcon",{staticClass:"icon"})],1):t._e()],1),e.sortOrder==t.items.length-1?i("v-spacer"):t._e(),0==e.sortOrder?i("span",{style:{width:"88px",height:"25px"}}):t._e(),i("transition",{attrs:{name:"slide-left"}},[e.sortOrder<t.items.length-1&&e.isHoveringOver?i("v-btn",{attrs:{color:"blue"},on:{click:function(i){t.moveRight(e)}}},[i("RightArrowIcon",{staticClass:"icon"})],1):t._e()],1)],1)],1)}),1),t.readonly?t._e():i("v-dialog",{attrs:{persistent:""},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[i("v-card",[i("v-card-title"),i("v-card-text",[i("v-container",{attrs:{fluid:"","grid-list-lg":""}},[i("v-layout",{attrs:{row:"",wrap:""}},[i("v-flex",{attrs:{xs12:""}},[i("v-text-field",{attrs:{label:"Name",required:"",box:"",color:"blue",hint:"The name of the metric.","persistent-hint":""},model:{value:t.editingItem.name,callback:function(e){t.$set(t.editingItem,"name",e)},expression:"editingItem.name"}})],1),i("v-flex",{attrs:{xs12:""}},[i("v-radio-group",{attrs:{row:"",color:"#f00",label:"Is Visible",hint:"Sets the visibility of the metric.","persistent-hint":""},model:{value:t.editingItem.isVisible,callback:function(e){t.$set(t.editingItem,"isVisible",e)},expression:"editingItem.isVisible"}},[i("Radio",{attrs:{isChecked:1==t.editingItem.isVisible},on:{"toggle-checked":function(e){t.editingItem.isVisible=!0}}},[t._v("Yes")]),i("Radio",{attrs:{isChecked:0==t.editingItem.isVisible},on:{"toggle-checked":function(e){t.editingItem.isVisible=!1}}},[t._v("No")])],1)],1),i("v-flex",{attrs:{xs12:""}},[i("v-subheader",{staticClass:"pl-0"},[t._v("Font Size")]),i("v-slider",{attrs:{"thumb-label":"always",color:"blue",ticks:"always",step:"1",min:"4",max:"64","tick-size":"2"},model:{value:t.editingItem.fontSize,callback:function(e){t.$set(t.editingItem,"fontSize",e)},expression:"editingItem.fontSize"}})],1),i("v-flex",{attrs:{xs12:""}},[i("v-subheader",{staticClass:"pl-0 mb-5"},[t._v("Font Weight")]),i("v-slider",{ref:"fontWeight",attrs:{"thumb-label":"always",color:"blue",ticks:"always",step:"1",min:"0",max:"2","tick-size":"6","thumb-size":"45","tick-labels":t.fontWeightText},model:{value:t.editingItem.fontWeight,callback:function(e){t.$set(t.editingItem,"fontWeight",e)},expression:"editingItem.fontWeight"}})],1),i("v-flex",{attrs:{xs4:""}},[i("v-layout",{attrs:{"align-center":"","justify-center":"",column:"","fill-height":""}},[i("h2",{staticClass:"font-weight-thin"},[t._v("Background Color")]),i("sketch-picker",{model:{value:t.editingItem.backgroundColor,callback:function(e){t.$set(t.editingItem,"backgroundColor",e)},expression:"editingItem.backgroundColor"}})],1)],1),i("v-flex",{attrs:{xs4:""}},[i("v-layout",{attrs:{"align-center":"","justify-center":"",column:"","fill-height":""}},[i("h2",{staticClass:"font-weight-thin"},[t._v("Font Color")]),i("sketch-picker",{model:{value:t.editingItem.color,callback:function(e){t.$set(t.editingItem,"color",e)},expression:"editingItem.color"}})],1)],1),i("v-flex",{attrs:{xs4:""}},[i("h2",{staticClass:"font-weight-thin"},[t._v("Preview")]),i("v-card",{staticClass:"list-item",staticStyle:{position:"relative"},style:{"background-color":t.getRgbaString(t.editingItem.backgroundColor.rgba),color:t.getRgbaString(t.editingItem.color.rgba)}},[i("v-container",{attrs:{"fill-height":"","grid-list-md":"","text-xs-center":""}},[i("v-layout",{attrs:{row:"",wrap:"","align-center":""}},[i("v-flex",{staticClass:"item-title",style:{"font-size":t.editingItem.fontSize+"px","font-weight":t.fontWeightValues[t.editingItem.fontWeight]}},[t._v(t._s(t.editingItem.name))])],1)],1)],1)],1)],1)],1)],1),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{flat:"",color:"red"},on:{click:function(e){t.dialog=!1}}},[t._v("Cancel")]),i("v-btn",{attrs:{flat:"",color:"blue"},on:{click:t.saveItem}},[t._v("Save")])],1)],1)],1)],1)},W=[],N=(i("7f7f"),i("55dd"),i("9434")),T=i.n(N),M=i("ea7a"),F=i.n(M),z=i("59a9"),V=i.n(z),j=i("ab18"),$=i.n(j),R=i("bfc0"),E=i.n(R),B=i("eabe"),A=i.n(B),H=i("d15c"),U=i.n(H),P=i("44bb"),q=i.n(P),G=i("c516"),Y=i.n(G),J=i("c345"),Z={components:{AddIcon:T.a,CloseIcon:F.a,LeftArrowIcon:$.a,RightArrowIcon:E.a,EditIcon:A.a,DeleteIcon:U.a,VisibilityIcon:q.a,VisibilityOffIcon:Y.a,AppsIcon:V.a,"sketch-picker":J["Sketch"],Radio:O},props:{disabled:Boolean,readonly:Boolean,initialItems:{type:Array,default:function(){return[]}}},computed:{sortedItems:function(){var t,e=[];if(this.readonly)for(t=0;t<this.items.length;t++)this.items[t].isVisible&&e.push(this.items[t]);else e=this.items;return e.slice().sort(function(t,e){return t.sortOrder-e.sortOrder})}},watch:{sortedItems:function(t){var e,i=[];for(e=0;e<t.length;e++)i.push({name:t[e].name,backgroundColor:t[e].backgroundColor,color:t[e].color,fontSize:t[e].fontSize,fontWeight:t[e].fontWeight,sortOrder:t[e].sortOrder,isVisible:t[e].isVisible,created:t[e].created})},editingItem:{handler:function(t){this.$refs.fontWeight.$el.querySelector(".v-slider__thumb-label").innerHTML="<span>"+this.fontWeightText[t.fontWeight]+"</span>"},deep:!0},initialItems:function(t){this.items=h()([],t)}},data:function(){return{items:this.initialItems,direction:"bottom",fab:!1,fontWeightText:["normal","bold","boldest"],fontWeightValues:["normal","bold","900"],fling:!1,hover:!0,tabs:null,top:!0,right:!0,dialog:!1,editingItem:{name:"",backgroundColor:{hex:"#ffffff",hsl:{h:150,s:.5,l:.2,a:1},hsv:{h:150,s:.66,v:.3,a:1},rgba:{r:255,g:255,b:255,a:1},a:1},color:{hex:"#000000",hsl:{h:150,s:.5,l:.2,a:1},hsv:{h:150,s:.66,v:.3,a:1},rgba:{r:0,g:0,b:0,a:1},a:1},fontSize:20,fontWeight:0,sortOrder:0,isVisible:!0},bottom:!1,left:!1}},methods:{getRgbaString:function(t){return"rgba("+t.r+", "+t.g+", "+t.b+", "+t.a+")"},addItem:function(){var t={name:this.items.length,sortOrder:this.items.length,isVisible:!0,created:(new Date).toISOString(),fab:!1,backgroundColor:{hex:"#ffffff",hsl:{h:255,s:255,l:255,a:1},hsv:{h:255,s:255,v:255,a:1},rgba:{r:255,g:255,b:255,a:1},a:1},color:{hex:"#000000",hsl:{h:0,s:0,l:0,a:1},hsv:{h:0,s:0,v:0,a:1},rgba:{r:0,g:0,b:0,a:1},a:1},fontSize:20,fontWeight:0,isHoveringOver:!1};this.items.push(t)},saveItem:function(){var t=this.sortedItems[this.editingItem.sortOrder];h()(t,this.editingItem),this.dialog=!1,this.$emit("update",this.sortedItems)},deleteItem:function(t){var e,i=this.items.indexOf(t),n=t.sortOrder;for(this.$delete(this.items,i),e=n;e<this.sortedItems.length;e++)this.sortedItems[e].sortOrder=this.sortedItems[e].sortOrder-1},moveRight:function(t){var e=t.sortOrder;this.sortedItems[t.sortOrder+1].sortOrder=e,t.sortOrder++},moveLeft:function(t){var e=t.sortOrder;this.sortedItems[t.sortOrder-1].sortOrder=e,t.sortOrder--}},mounted:function(){}},X=Z,Q=(i("ca9f"),Object(L["a"])(X,D,W,!1,null,"d15f066e",null));Q.options.__file="EditableBlockList.vue";var K,tt,et=Q.exports,it=i("7675"),nt=i.n(it),st=(i("28a5"),i("f499")),at=i.n(st),ot=(i("a481"),i("3b2b"),i("bc3a")),lt=i.n(ot),rt=i("f2ef"),ct={methods:{getData:function(t,e){var i,n,s,a,o,l={},r="",c="",d=null,f=null,g={},h={};if(this.config.hasFilterDetection&&this.state_map.filters.hasFilters)for(i in l=this.state_map.filters.filterMap,l)if(c="",this.state_map.fields.displayMap.hasOwnProperty(i))for(g=this.state_map.fields.displayMap[i],h=this.state_map.fields.schemaMap[i],n=0;n<l[i].length;n++)a=l[i][n],"DateTime"==g.TypeAsString&&(d=new Date(decodeURIComponent(a)),f=new Date(d),f.setDate(f.getDate()+1)),g.hasOwnProperty(i)&&(c.length>0&&(c+=" or "),"DateTime"!=g.TypeAsString?(c+="startswith("+g.StaticName,g.hasOwnProperty("LookupField")&&(c+="/"+g.LookupField),c+=",","Number"==h.Type&&h.hasOwnProperty("Decimals")?(o=new RegExp("^(\\d*).(\\d{"+h.Decimals+"})(\\d*)$"),c+=a.replace(o,"$1.$2")):c+=a,c+=")"):c+=g.StaticName+" ge datetime'"+d.toISOString()+"' and "+g.StaticName+" le datetime'"+f.toISOString()+"'"),r+=(r.length>0?" and ":"")+"("+c+")";return s=this.config.siteUrl+"/_api/web/lists/GetByTitle('"+this.config.listName+"')/Items?$select=Title,EncodedAbsUrl,"+this.config.fieldName+(this.state_map.fields.displayMap[this.config.fieldName].hasOwnProperty("LookupField")?"/"+this.state_map.fields.displayMap[this.config.fieldName].LookupField+"&$expand="+this.config.fieldName:"")+(this.state_map.filters.hasFilters?"&$filter="+r+(this.config.isDocumentLibrary?(r.length>0?" and ":"")+"FSObjType eq "+this.config.fileObjectType:""):this.config.isDocumentLibrary?"&$filter=(FSObjType eq "+this.config.fileObjectType+")":"")+"&$top=5000",lt()({url:s,method:"get",headers:{accept:"application/json;odata=verbose","content-type":"application/json;odata=verbose"}}).then(function(e){var i=e.data.d.results;t&&t(i)}).catch(function(t){e&&e(t)})},getConfigData:function(t,e){return lt()({url:this.siteUrl+"/_api/web/lists/GetByTitle('MetricsConfig')/Items?$filter=(startswith(Title,'"+window.location.pathname+"'))",method:"get",headers:{accept:"application/json;odata=verbose","content-type":"application/json;odata=verbose"}}).then(function(e){var i=e.data.d.results;t&&t(i)}).catch(function(t){e&&e(t)})},saveConfigData:function(t,e){var i=this.configListName,n=this.siteUrl,s=n+"/_api/web/lists/GetByTitle('"+i+"')"+(this.config.ID>0?"/items("+this.config.ID+")":"/Items"),a=this.getItemTypeForListName(i),o={Title:window.location.pathname},l={accept:"application/json;odata=verbose","X-RequestDigest":t,"content-Type":"application/json;odata=verbose"};return this.config.ID>0&&rt["a"].extend(l,{"IF-MATCH":"*","X-HTTP-Method":"MERGE"}),rt["a"].extend(o,this.config,{__metadata:{type:a}}),o.metrics=at()(this.config.metrics),delete o.ID,lt()({url:s,method:"post",headers:l,data:o}).then(function(t){var i=t.data.hasOwnProperty("d")?t.data.d:JSON.parse(t.config.data);e&&e(i)})},getListFields:function(t,e){return lt()({url:this.config.siteUrl+"/_api/web/lists/GetByTitle('"+this.config.listName+"')/Fields?$filter=Hidden eq false and ReadOnlyField eq false",method:"get",headers:{accept:"application/json;odata=verbose","content-type":"application/json;odata=verbose"}}).then(function(e){var i=e.data.d.results;t&&t(i)}).catch(function(t){e&&e(t)})},getDigest:function(t,e){return lt()({url:this.siteUrl+"/_api/contextinfo",method:"post",headers:{Accept:"application/json; odata=verbose"}}).then(function(e){var i=e.data.d.GetContextWebInformation.FormDigestValue;t&&t(i)}).catch(function(t){e&&e(t)})},getItemTypeForListName:function(t){return"SP.Data."+t.charAt(0).toUpperCase()+t.split(" ").join("").slice(1)+"ListItem"},parseQuery:function(t){for(var e={},i=("#"===t[0]?t.substr(1):t).split("&"),n=0;n<i.length;n++){var s=i[n].split("=");e[decodeURIComponent(s[0])]=decodeURIComponent(s[1]||"")}return e},updateHash:function(t){var e,i="";for(e in t)i+=(i.length>0?"&":"")+e+"="+t[e];window.location.hash=i}}},dt=ct,ft=Object(L["a"])(dt,K,tt,!1,null,null,null);ft.options.__file="Data.vue";var gt=ft.exports,ht={components:{dropdownIcon:v.a,LoadingIcon:nt.a,Radio:O,EditableBlockList:et,LeftArrowIcon:$.a,RightArrowIcon:E.a,EditIcon:A.a,DeleteIcon:U.a,VisibilityIcon:q.a,VisibilityOffIcon:Y.a,AppsIcon:V.a},mixins:[gt],props:{siteUrl:{type:String,default:function(){return""}},configListName:{type:String,default:function(){return""}},loading:Boolean,initConfig:{type:Object,default:function(){return{ID:0,hasFiltering:!1,isDocumentLibrary:!1,hasDynamicWidth:!1,hasFilterDetection:!1,fileObjectType:0,minColumnWidth:1,openInNewWindow:!0,listName:"",siteUrl:"",fieldName:"",filterViewName:"",metrics:[]}}}},watch:{minColumnWidth:function(){this.$refs.minColumnWidth.blur()},initConfig:function(t){t.ID>0&&(this.isConfigDataLoaded=!0),this.config=h()(this.config,t)},loading:function(t){this.isLoading=t}},data:function(){return{valid:!0,columnWidthItems:["1","2","3","4","6","12"],isSaving:!1,isLoading:!1,isColumnWidthSelected:!1,config:{ID:0,minColumnWidth:"1",listName:"",fieldName:"",siteUrl:"",fileObjectType:0,hasDynamicWidth:!1,hasFiltering:!1,hasFilterDetection:!1,isDocumentLibrary:!1,openInNewWindow:!1,metrics:{}},isConfigDataLoaded:!1,columnWidthHint:"<blockquote>\n                      Grid columns are created by specifying a number that is a factor of\n                      <kbd>12</kbd> available columns you wish to span. For example, column width of\n                      <kbd>3</kbd> will create\n                      <kbd>4</kbd> items in that row. I.e.,\n                      <kbd>12 / 3 = 4</kbd>, so all availble column widths are factors of\n                      <kbd>12</kbd>.\n                    </blockquote>"}},methods:{updateMetrics:function(t){this.$emit("items-updated",t),this.config.metrics=h()({},t)},save:function(){this.isSaving=!0,function(t){new f.a(function(e,i){t.getDigest(function(t){e(t)},function(t){i(t)})}).then(function(e){return new f.a(function(i,n){t.saveConfigData(e,function(t){i(t)},function(t){n(t)})})}).then(function(){t.isSaving=!1}).catch(function(e){setTimeout(function(){t.isSaving=!1,console.log(e)},2e3)})}(this)}}},ut=ht,mt=(i("1e79"),Object(L["a"])(ut,u,m,!1,null,null,null));mt.options.__file="Config.vue";var pt=mt.exports,vt={components:{Config:pt,EditableBlockList:et,LoadingIcon:nt.a},mixins:[gt],data:function(){return{configListName:"MetricsConfig",siteUrl:"",isEditing:!1,testing:!0,items:[],state_map:{isFiltered:!1,listUrl:"",saving:{issaving:!1,message:"",messageTitle:"",isError:!1,isSuccess:!1,showMessage:!1},generating:{isgenerating:!1,message:"",messageTitle:"",isError:!1,isSuccess:!1,showMessage:!1},loading:{canCancel:!1,canClose:!1,showLoading:!0,message:"",isLoading:!0},fields:{staticMap:{},displayMap:{},schemaMap:{}},filters:{filterMap:{},hasFilters:!1}},config:{ID:0,hasFiltering:!1,isDocumentLibrary:!1,hasDynamicWidth:!1,hasFilterDetection:!1,fileObjectType:0,minColumnWidth:1,openInNewWindow:!0,listName:"",siteUrl:"",fieldName:"",filterViewName:"",metrics:[]}}},methods:{updateItems:function(t){this.config.metrics=h()([],t)},checkEditMode:function(){var t=t||{},e=e||"";this.isEditing=!1;try{t.Ribbon.PageState.Handlers.isPublishEnabled(),this.isEditing=t.Ribbon.PageState.Handlers.isInEditMode()}catch(i){window.hasOwnProperty("MSOWebPartPageFormName")&&(this.isEditing="1"==document.forms[e].MSOLayout_InDesignMode.value),this.isEditing=this.isEditing||window.location.hash.indexOf("edit")>-1}},onHashChange:function(){this.checkEditMode()},toggleLoading:function(t){t=rt["a"].defaults(t,{isLoading:!1,showLoading:!1,message:"",canCancel:!1,canClose:!1}),h()(this.state_map.loading,t)}},mounted:function(){window.addEventListener("hashchange",this.onHashChange),this.onHashChange()},created:function(){this.toggleLoading({isLoading:!0,message:""}),function(t){new f.a(function(e){t.testing?setTimeout(function(){t.config=h()({},{listName:"foo",metrics:[{name:0,backgroundColor:{hex:"#ffffff",hsl:{h:255,s:255,l:255,a:1},hsv:{h:255,s:255,v:255,a:1},rgba:{r:255,g:255,b:255,a:1},a:1},color:{hex:"#000000",hsl:{h:0,s:0,l:0,a:1},hsv:{h:0,s:0,v:0,a:1},rgba:{r:0,g:0,b:0,a:1},a:1},fontSize:20,fontWeight:0,sortOrder:0,isVisible:!0,created:"2019-01-14T18:40:22.403Z",isHoveringOver:!1},{name:1,backgroundColor:{hex:"#ffffff",hsl:{h:255,s:255,l:255,a:1},hsv:{h:255,s:255,v:255,a:1},rgba:{r:255,g:255,b:255,a:1},a:1},color:{hex:"#000000",hsl:{h:0,s:0,l:0,a:1},hsv:{h:0,s:0,v:0,a:1},rgba:{r:0,g:0,b:0,a:1},a:1},fontSize:20,fontWeight:0,sortOrder:1,isVisible:!0,created:"2019-01-14T18:40:22.563Z"},{name:2,backgroundColor:{hex:"#ffffff",hsl:{h:255,s:255,l:255,a:1},hsv:{h:255,s:255,v:255,a:1},rgba:{r:255,g:255,b:255,a:1},a:1},color:{hex:"#000000",hsl:{h:0,s:0,l:0,a:1},hsv:{h:0,s:0,v:0,a:1},rgba:{r:0,g:0,b:0,a:1},a:1},fontSize:20,fontWeight:0,sortOrder:2,isVisible:!0,created:"2019-01-14T18:40:22.724Z"}]}),e()},1e3):t.getConfigData(function(i){i.length>0&&(console.log(i),i[0].metrics=JSON.parse(i[0].metrics),console.log(i),t.config=h()({},rt["a"].pick(i[0],rt["a"].keys(t.config))),console.log(t.config)),e()},function(e){t.toggleLoading({isLoading:!1,message:e.message,canCancel:!1,canClose:!0})})}).then(function(){return new f.a(function(e){t.testing?e():t.config.ID>0?t.getListFields(function(i){var n,s;i.length>0&&(n=i.reduce(function(t,e){return t[e.StaticName]=e,t},{}),s=i.reduce(function(t,e){return t[e.Title]=e,t},{}),rt["a"].assign(t.state_map.fields.staticMap,n),rt["a"].assign(t.state_map.fields.displayMap,s)),e()},function(e){t.toggleLoading({isLoading:!1,message:e.message,canCancel:!1,canClose:!0})}):e()})}).then(function(){return new f.a(function(e){t.config.ID>0&&!t.config.hasFilterDetection?t.getData(function(t){console.log(t),e()},function(e){t.toggleLoading({isLoading:!1,message:e.message,canCancel:!1,canClose:!0})}):t.testing?(t.populateMetrics([]),e()):e()})}).then(function(){t.configFetched=t.config.ID>0,c()(t.metrics).length>0||t.editing?t.toggleLoading({isLoading:!1,message:"",canCancel:!1,canClose:!1}):t.toggleLoading({isLoading:!1,message:"No Data Available",canCancel:!1,canClose:!1})}).catch(function(e){t.toggleLoading({isLoading:!1,message:e.message,canCancel:!1,canClose:!1})})}(this)}},bt=vt,wt=(i("034f"),Object(L["a"])(bt,o,l,!1,null,null,null));wt.options.__file="App.vue";var yt=wt.exports,xt=i("2f62");n["default"].use(xt["a"]);var Ct=new xt["a"].Store({state:{},mutations:{},actions:{}});i("bf40");n["default"].config.productionTip=!1,n["default"].use(a.a),new n["default"]({store:Ct,render:function(t){return t(yt)}}).$mount("#app")},"59a9":function(module,exports){module.exports={render:function anonymous(){with(this)return _c("svg",{attrs:{viewBox:"0 0 24 24"}},[_c("path",{attrs:{d:"M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"}})])}}},6025:function(module,exports){module.exports={render:function anonymous(){with(this)return _c("svg",{attrs:{viewBox:"0 0 24 24"}},[_c("path",{attrs:{d:"M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}})])}}},"64a9":function(t,e,i){},7675:function(module,exports){module.exports={render:function anonymous(){with(this)return _c("svg",{attrs:{viewBox:"0 0 24 24"}},[_c("path",{attrs:{d:"M19 8l-4 4h3c0 3.31-2.69 6-6 6a5.87 5.87 0 0 1-2.8-.7l-1.46 1.46A7.93 7.93 0 0 0 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46A7.93 7.93 0 0 0 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"}})])}}},9434:function(module,exports){module.exports={render:function anonymous(){with(this)return _c("svg",{attrs:{viewBox:"0 0 24 24"}},[_c("path",{attrs:{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}})])}}},a964:function(t,e,i){},ab18:function(module,exports){module.exports={render:function anonymous(){with(this)return _c("svg",{attrs:{viewBox:"0 0 24 24"}},[_c("path",{attrs:{d:"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"}})])}}},bfc0:function(module,exports){module.exports={render:function anonymous(){with(this)return _c("svg",{attrs:{viewBox:"0 0 24 24"}},[_c("path",{attrs:{d:"M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"}})])}}},c516:function(module,exports){module.exports={render:function anonymous(){with(this)return _c("svg",{attrs:{viewBox:"0 0 24 24"}},[_c("path",{attrs:{d:"M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 0 0 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"}})])}}},ca9f:function(t,e,i){"use strict";var n=i("da08"),s=i.n(n);s.a},d15c:function(module,exports){module.exports={render:function anonymous(){with(this)return _c("svg",{attrs:{viewBox:"0 0 24 24"}},[_c("path",{attrs:{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}})])}}},da08:function(t,e,i){},e9f7:function(module,exports){module.exports={render:function anonymous(){with(this)return _c("svg",{attrs:{viewBox:"0 0 24 24"}},[_c("path",{attrs:{d:"M7 10l5 5 5-5z"}})])}}},ea7a:function(module,exports){module.exports={render:function anonymous(){with(this)return _c("svg",{attrs:{viewBox:"0 0 24 24"}},[_c("path",{attrs:{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}})])}}},eabe:function(module,exports){module.exports={render:function anonymous(){with(this)return _c("svg",{attrs:{viewBox:"0 0 24 24"}},[_c("path",{attrs:{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}})])}}},f1e7:function(module,exports){module.exports={render:function anonymous(){with(this)return _c("svg",{attrs:{viewBox:"0 0 24 24"}},[_c("path",{attrs:{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}})])}}}});
//# sourceMappingURL=app.js.map