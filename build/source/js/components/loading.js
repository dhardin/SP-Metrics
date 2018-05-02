Vue.component('loading', {
  template : '#loading-template',
  props: ['message', 'canCancel', 'canClose', 'showLoading', 'editing'],
  methods: {
    cancel: function(e){
      this.$emit('cancel');
    }
  },
  data: function(){
    return {

    };
  }
});
