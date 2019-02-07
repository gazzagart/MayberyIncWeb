/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html, css } from 'lit-element';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import {
  navigate,
  updateOffline,
  updateDrawerState
} from '../actions/app.js';

// These are the elements needed by this element.
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-scroll-effects/effects/parallax-background.js';
import '@polymer/app-layout/app-scroll-effects/effects/blend-background.js';
import '@polymer/app-layout/app-scroll-effects/effects/resize-title.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import { menuIcon } from './my-icons.js';
import './snack-bar.js';

class MayberyInc extends connect(store)(LitElement) {
  static get properties() {
    return {
      appTitle: { type: String },
      _page: { type: String },
      _drawerOpened: { type: Boolean },
      _snackbarOpened: { type: Boolean },
      _offline: { type: Boolean }
    };
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;

          --app-drawer-width: 256px;

          --app-primary-color: #283593;
          --app-secondary-color: #000099;
          --app-dark-text-color: var(--app-secondary-color);
          --app-light-text-color: white;
          --app-section-even-color: #f7f7f7;
          --app-section-odd-color: white;

          --app-header-background-color: white;
          --app-header-text-color: var(--app-dark-text-color);
          --app-header-selected-color: var(--app-primary-color);

          --app-drawer-background-color: var(--app-secondary-color);
          --app-drawer-text-color: var(--app-light-text-color);
          --app-drawer-selected-color: #78909C;
        }

        app-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          text-align: center;
          color: var(--app-header-text-color);
          border-bottom: 1px solid #eee;
        }

        .toolbar-top {
          background-color: var(--app-header-background-color);
        }

        [main-title] {
          font-family: 'Muli' sans-serif;
          font-size: 30px;
          font-weight: 900;
          /* In the narrow layout, the toolbar is offset by the width of the
          drawer button, and the text looks not centered. Add a padding to
          match that button */
          padding-right: 44px;
        }

        .toolbar-list {
          display: none;
        }

        .toolbar-list > a {
          display: inline-block;
          color: var(--app-header-text-color);
          text-decoration: none;
          line-height: 30px;
          padding: 4px 24px;
        }

        .toolbar-list > a[selected] {
          color: var(--app-header-selected-color);
          border-bottom: 4px solid var(--app-header-selected-color);
        }

        .menu-btn {
          background: none;
          border: none;
          fill: var(--app-header-text-color);
          cursor: pointer;
          height: 44px;
          width: 44px;
        }

        .drawer-list {
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          padding: 24px;
          background: var(--app-drawer-background-color);
          position: relative;
        }

        .drawer-list > a {
          display: block;
          text-decoration: none;
          color: var(--app-drawer-text-color);
          line-height: 40px;
          padding: 0 24px;
        }

        .drawer-list > a[selected] {
          color: var(--app-drawer-selected-color);
        }

        /* Workaround for IE11 displaying <main> as inline */
        main {
          display: block;
        }

        .main-content {
          padding-top: 64px;
          min-height: 100vh;
        }

        .page {
          display: none;
        }

        .page[active] {
          display: block;
        }

        footer {
          padding: 24px;
          background: var(--app-drawer-background-color);
          color: var(--app-drawer-text-color);
          text-align: center;
        }

        /* Wide layout: when the viewport width is bigger than 460px, layout
        changes to a wide layout */
        @media (min-width: 460px) {
          .toolbar-list {
            display: block;
          }

          .menu-btn {
            display: none;
          }

          .main-content {
            padding-top: 107px;
          }

          /* The drawer button isn't shown in the wide layout, so we don't
          need to offset the title */
          [main-title] {
            padding-right: 0px;
          }
        }
        app-drawer-layout {
          z-index: 5 !important;
        }
        app-header {
          --app-header-background-front-layer: {
            background-image: url(https://app-layout-assets.appspot.com/assets/test-drive.jpg);
            background-position: 50% 10%;
          };
        }
      `
    ];
  }

  render() {
    // Anything that's related to rendering should be done in here.
    return html`
      <!-- Header -->
      <app-header-layout>
        <app-header condenses fixed effects="blend-background parallax-background resize-title waterfall">
          <app-toolbar class="toolbar-top">
            <button class="menu-btn" title="Menu" @click="${this._menuButtonClicked}">${menuIcon}</button>
            <div condensed-title style="text-align: left !important;">${this.appTitle}</div>
          </app-toolbar>

          <app-toolbar>
            <div  main-title>${this.appTitle}</div>
          </app-toolbar>

          <!-- This gets hidden on a small screen-->
          <nav class="toolbar-list">
            <a ?selected="${this._page === 'home-page'}" href="/home-page">Home Page</a>
            <a ?selected="${this._page === 'about-us'}" href="/about-us">About Us</a>
            <a ?selected="${this._page === 'articles-page'}" href="/articles-page">Articles Page</a>
            <a ?selected="${this._page === 'careers-page'}" href="/careers-page">Careers</a>
            <a ?selected="${this._page === 'contact-us'}" href="/contact-us">Contact Us</a>
          </nav>
        </app-header>
      </app-header-layout>

      <!-- Drawer content -->
      <app-drawer-layout>
        <app-drawer
            .opened="${this._drawerOpened}"
            @opened-changed="${this._drawerOpenedChanged}"
            swipe-open>
          <div style="height: 100%; overflow: auto;">
            <nav class="drawer-list">
              <a ?selected="${this._page === 'home-page'}" href="/home-page">Home Page</a>
              <a ?selected="${this._page === 'about-us'}" href="/about-us">About Us</a>
              <a ?selected="${this._page === 'articles-page'}" href="/articles-page">Articles Page</a>
              <a ?selected="${this._page === 'careers-page'}" href="/careers-page">Careers</a>
              <a ?selected="${this._page === 'contact-us'}" href="/contact-us">Contact Us</a>
            </nav>
          </div>
        </app-drawer>
      </app-drawer-layout>

      <!-- Main content -->
      <main role="main" class="main-content" style="margin-top:16px;">
        <home-page class="page" ?active="${this._page === 'home-page'}"></home-page>
        <about-us class="page" ?active="${this._page === 'about-us'}"></about-us>
        <articles-page class="page" ?active="${this._page === 'articles-page'}"></articles-page>
        <careers-page class="page" ?active="${this._page === 'careers-page'}"></careers-page>
        <contact-us class="page" ?active="${this._page === 'contact-us'}"></contact-us>
        <my-view404 class="page" ?active="${this._page === 'view404'}"></my-view404>
      </main>

      <footer>
        <p>Made by the Maybery team.</p>
      </footer>

      <snack-bar ?active="${this._snackbarOpened}">
        You are now ${this._offline ? 'offline' : 'online'}.
      </snack-bar>
    `;
  }

  constructor() {
    super();
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/3.0/docs/devguide/settings#setting-passive-touch-gestures
    setPassiveTouchGestures(true);
  }

  firstUpdated() {
    installRouter((location) => store.dispatch(navigate(decodeURIComponent(location.pathname))));
    installOfflineWatcher((offline) => store.dispatch(updateOffline(offline)));
    installMediaQueryWatcher(`(min-width: 460px)`,
        () => store.dispatch(updateDrawerState(false)));
  }

  updated(changedProps) {
    if (changedProps.has('_page')) {
      const pageTitle = this.appTitle + ' - ' + this._page;
      updateMetadata({
        title: pageTitle,
        description: pageTitle
        // This object also takes an image property, that points to an img src.
      });
    }
  }

  _menuButtonClicked() {
    store.dispatch(updateDrawerState(true));
  }

  _drawerOpenedChanged(e) {
    store.dispatch(updateDrawerState(e.target.opened));
  }

  stateChanged(state) {
    this._page = state.app.page;
    this._offline = state.app.offline;
    this._snackbarOpened = state.app.snackbarOpened;
    this._drawerOpened = state.app.drawerOpened;
  }
}

window.customElements.define('maybery-inc', MayberyInc);
