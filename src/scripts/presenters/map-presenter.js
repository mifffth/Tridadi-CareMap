export class MapPresenter {
  constructor() {
    this.view = null;
  }

  setView(view) {
    this.view = view;
  }

  onPageLoad() {
    this.view.render();
  }
}