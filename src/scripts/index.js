import * as css from '../styles/styles.css';

import { HomeView } from './views/home-view.js';
import { MapView } from './views/map-view.js';
import { CreditView } from './views/credit-view.js';

import { HomePresenter } from './presenters/home-presenter.js';
import { MapPresenter } from './presenters/map-presenter.js';
import { CreditPresenter } from './presenters/credit-presenter.js';

const main = document.querySelector('main');
const navbar = document.getElementById('main-nav');
const menuToggle = document.getElementById('menu-toggle');

function renderView() {
    let hash = window.location.hash || '#/home';
    const footer = document.getElementById("site-footer");
  
    if (hash === "#/map") {
      if (footer) footer.style.display = "none";
    } else {
      if (footer) footer.style.display = "block";
    }

    document.startViewTransition(() => {
        let view = null;
        let presenter = null;
        switch (hash) {
            case '#/home':
                view = new HomeView(main);
                presenter = new HomePresenter();
                break;
            case '#/map':
                view = new MapView(main);
                presenter = new MapPresenter();
                break;
            case '#/credit':
                view = new CreditView(main);
                presenter = new CreditPresenter();
                break;
            default:
                view = new NotFoundView(main);
                presenter = new NotFoundPresenter();
        }
        presenter.setView(view);
        view.setPresenter(presenter);
        presenter.onPageLoad();

        setTimeout(() => {
            gsap.fromTo(main, { opacity: 0 }, { opacity: 1, duration: 0.5 });
        });
    });
}

window.addEventListener('hashchange', renderView);
window.addEventListener('load', renderView);
window.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (e) => {
        const isClickInsideNav = navbar.contains(e.target);
        const isClickOnToggle = menuToggle.contains(e.target);
        if (!isClickInsideNav && !isClickOnToggle) {
            navbar.classList.remove('show');
        }
    });
    
    // if ("serviceWorker" in navigator) {
    //     window.addEventListener("load", () => {
    //       navigator.serviceWorker.register("/sw.bundle.js").then(() => {
    //         console.log("Service Worker registered.");
    //       });
    //     });
    //   } else {
    //     console.log("Service Worker is not supported by this browser.");
    //   }
});