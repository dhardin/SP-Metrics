<script>
export default {
  created: function() {
    var observer = new MutationObserver(function(mutations) {
      // fired when a mutation occurs
      var i;
      var html = "";
      var el = document.getElementsByTagName("sp-metrics");
      var injectedStyleEl;
      if (el.length == 0) {
        return;
      }
      injectedStyleEl = el[0].shadowRoot.getElementById("injected-style");
      for (i = 0; i < mutations.length; i++) {
        if (
          mutations[i].addedNodes.length > 0 &&
          mutations[i].addedNodes[0].nodeName.toLowerCase() == "style"
        ) {
          html += mutations[i].addedNodes[0].innerHTML;
        }
      }
      if (injectedStyleEl == null) {
        var style = document.createElement("style");
        style.innerHTML = html;
        style.id = "injected-style";
        style.type = "text/css";
        el[0].shadowRoot.prepend(style);
      } else {
        injectedStyleEl.innerHTML = html;
      }
    });

    observer.observe(document.getElementsByTagName("head")[0], {
      childList: true
    });
  }
};
</script>