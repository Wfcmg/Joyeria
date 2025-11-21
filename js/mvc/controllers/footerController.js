window.FooterController = {
  render: function (targetId) {
    document.getElementById(targetId).innerHTML = FooterView.render();
  }
};
