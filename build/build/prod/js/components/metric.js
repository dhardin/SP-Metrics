
Vue.component('metric', {
    template: '#metric',
    props: {
        name: {
            type: String,
            default: 'blank'
        },
        styleObj: {
            type: Object,
            default: function() {
                return {
                    color: '#fff',
                    backgroundColor: '#aaa'
                };
            }
        },
        mincolumnwidth: {
          type: Number,
          default: 2
        },
        visible: {
          type: Boolean,
          default: true
        },
        sortOrder: {
            type: Number,
            default: 0
        },
        count: {
          type: Number,
          default: 0
        },
        numitems: {
          type: Number,
          default: 0
        },
        hasdynamicwidth: {
          type: Boolean,
          default: true
        },
        hasfiltering: {
          type: Boolean,
          default: false
        },
        listurl: {
          type: String,
          default: ''
        },
        filterviewname: {
          type: String,
          default: ''
        },
        fieldname: {
          type: String,
          default: ''
        },
        isdocumentlibrary: {
          type: Boolean,
          default: false
        }
    },
    methods: {
      onClick: function(e){
        var url = '';
        if(this.hasfiltering){
          url = this.listurl + (this.isdocumentlibrary ? '/Forms/' : '' ) + (this.filterviewname != '' ? '/' + this.filterviewname + '.aspx' : '') + '?FilterField1=' + this.fieldname + '&FilterValue1='+this.name + '#FilterField1%3D' + this.fieldname + '-FilterValue1%3D'+this.name;
          window.open(url);
        }
      }
    },
    computed: {
      calcClassObj: function(){
        var classDynamicWidth = this.hasdynamicwidth ? 'medium-' + this.mincolumnwidth + ' large-auto' : (this.numitems > 6 ? 'medium-3 ' : '') + 'large-' + this.mincolumnwidth;
        var classObj = {};
        classObj[classDynamicWidth] = true;
        return classObj;
      }
    },
    data: function() {
        return {
        };
    }
});
