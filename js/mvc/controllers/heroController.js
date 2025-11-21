window.HeroController = {
  render: function (targetId) {
    const html = HeroView.render();
    document.getElementById(targetId).innerHTML = html;
  }
};
