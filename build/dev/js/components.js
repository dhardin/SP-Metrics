Vue.component('edit-metric', {
    template: '#edit-metric',
    props: {
        name: {
            type: String,
            default: 'New'
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
        status: {
            type: Object,
            default: function() {
                return {
                    errorCode: false,
                    message: '',
                    isSaving: false
                };
            }
        },
        visible: {
          type: Boolean,
          default: true
        }
    },
    watch: {
        name: function(newVal, oldVal) {
            this.editName = newVal;
        },
        visible: function(newVal, oldVal){
          this.editVisible = newVal;
        },
        styleObj: function(newVal, oldVal){
        	this.editStyleObj = JSON.parse(JSON.stringify(newVal));
        },
        status: {
            handler: function(val, oldVal) {
                this.hasError = this.status.errorCode === 0;
            },
            deep: true
        }
    },
    mounted: function() {
        (function(that) {
            $(that.$el).on('open.zf.reveal', function() {
                that.open();
                //watch doesn't fire when modal is re-opened on edited item
                //by default, we'd want these values to default to what they were previously.
                //only seems to be an issue with the visible property
                if(that.visible != that.editVisible){
                  that.editVisible = that.visible;
                }
            });
            $(that.$el).on('closed.zf.reveal', function() {
                that.close();
            });
        })(this);
    },
    methods: {
        save: function() {
            this.$emit('save', {
                name: this.editName,
                styleObj: this.editStyleObj,
                visible: this.editVisible,
            }, this.name);
        },
        onSaveComplete: function(results) {

        },
        open: function() {
            (function(that) {
                $(that.$refs.backgroundColor).spectrum('destroy');
                $(that.$refs.fontColor).spectrum('destroy');
                $(that.$refs.backgroundColor).spectrum({
                    color: that.styleObj.backgroundColor,
                    showPalette: true,
                    preferredFormat: "hex",
                    showInput: true,
                    selectionPalette: ['#337ab7','#3c763d','#31708f','#aa6708','#d9534f', '#6f5499', '#555'],
                    change: function(color) {
                        that.editStyleObj.backgroundColor = color.toHexString();
                    }
                });
                $(that.$refs.fontColor).spectrum({
                    color: that.styleObj.color,
                    showPalette: true,
                    preferredFormat: "hex",
                    showInput: true,
                    selectionPalette: ["#000", "#fff", '#337ab7','#3c763d','#31708f','#aa6708','#d9534f', '#6f5499', '#555'],
                    change: function(color) {
                        that.editStyleObj.color = color.toHexString();
                    }
                });
            })(this);
        },
        close: function() {

        },
        toggle: function() {

        }
    },
    data: function() {
        return {
            editName: this.name,
            hasError: false,
            editVisible: this.visible,
            editStyleObj: this.styleObj
        };
    }
});

Vue.component('metric-config', {
    template: '#metric-config',
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
        sortOrder: {
            type: Number,
            default: 0
        },
        editing: {
            type: Boolean,
            default: false
        },
        index: {
          type: Number,
          default: 0
        },
        islast: {
          type: Boolean,
          default: false
        },
        id: {
            type: Number,
            default: 0
        },
        visible: {
          type: Boolean,
          default: true
        }
    },
    methods: {
        edit: function(e) {
            this.$emit('edit', this.name);
        },
        deleteMetric: function(e){
          this.$emit('deletemetric', this.name);
        },
        toggleVisibility: function(e){
          this.$emit('togglevisibility', this.name);
        },
        decreaseSortOrder: function(e){
          this.$emit('decreaseorder',
              this.name,
              this.index
            );
        },
        increaseSortOrder: function(e){
          this.$emit('increaseorder',
            this.name,
            this.index
          );
        }
    },
    data: function() {
        return { };
    }
});

Vue.component('loading', {
  template : '#loading-template',
  props: ['message', 'canCancel', 'canClose', 'showLoading'],
  methods: {
    cancel: function(e){
      this.$emit('cancel');
    }
  },
  data: function(){
    return {};
  }
});

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
        hasdynamicwidth: {
          type: Boolean,
          default: true
        }
    },
    computed: {
      calcClassObj: function(){
        var className = this.hasdynamicwidth ? 'auto' : 'small-' + this.mincolumnwidth;
        var classObj = {};
        classObj[className] = true;
        return classObj;
      }
    },
    data: function() {
        return {
        };
    }
});
