// --- CONTROLLER: NAVBAR ---

window.NavbarController = (function() {

  function render(targetId) {
    const container = document.getElementById(targetId);
    if (container) {
      container.innerHTML = NavbarView.get();
    }
  }

  return {
    render
  };

})();
