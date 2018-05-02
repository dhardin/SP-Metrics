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
