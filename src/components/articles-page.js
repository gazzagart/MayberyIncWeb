/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

import '@polymer/neon-animation/neon-animatable.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/neon-animation/animations/scale-up-animation.js';
import '@polymer/neon-animation/animations/fade-out-animation.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-input/paper-textarea.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-spinner/paper-spinner';
import '@polymer/iron-icons/iron-icons.js';
import './snack-bar.js';

class ArticlesPage extends PageViewElement {

  static get styles() {
    return [
      SharedStyles
    ];
  }

  static get properties() {
    return {
        body: { type: String},
        title: { type: String},
        subTitle: { type: String},
        subject: { type: String},
        toastOpened: {type: Boolean},
        updated: {type: Boolean},
        colourSnack: {type: String}
    };
  }

  render() {
    return html`
    <style>
        paper-button.indigo {
            background-color: var(--paper-indigo-500);
            color: white;
            --paper-button-raised-keyboard-focus: {
                background-color: var(--paper-pink-a200) !important;
                color: white !important;
            };
        }
        paper-spinner {
            --paper-spinner-stroke-width: 6px;
        }
    </style>
      <section>
        <h2>Articles Page</h2>
      </section>

      <section id="addArticleBut" class="w3-center" style="display:none;">
        <paper-button raised class="w3-purple" @click="${this._openAddArticle}">add article</paper-button>
      </section>

      <!--START OF DIALOG QUESTIONS-->
      <paper-dialog id="articleInput" modal entry-animation="scale-up-animation" exit-animation="fade-out-animation" style="border-radius: 16px;">
        <h2 class="w3-border-bottom" style="padding-bottom: 12px;">
            Maybery INC Article input
        </h2>
        <div id="inputArea">
          <paper-input required error-message="Please provide a title" id="title" label="Title" type="text"></paper-input>
          <paper-input id="subTitle" label="Sub Title" type="text"></paper-input>
          <paper-input required error-message="Please provide a subject" id="subject" label="Subject" type="text"></paper-input>
          <paper-textarea required error-message="Please provide a body" id="message" label="Body of article"></paper-textarea>
          <br><br><br>
          <paper-button  @click="${this._addArticle}" class="indigo w3-margin-bottom">Submit</paper-button>
        </div>
        <div id="loader" style="display: none;text-align:center!important;margin-top:32px;">
          <paper-spinner active class="multi" style="width: 90px;height: 90px;margin-top: 32px;"></paper-spinner>
        </div>
      </paper-dialog>
      <!-- END OF DIALOG QUESTIONS -->

    `;
  }

  firstUpdated() {
    // This is where we must go and fetch articles and display them

    // display the 
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User logged in
        this.shadowRoot.querySelector("#addArticleBut").style.display = "block";
      } else {
        // User not logged in
        this.shadowRoot.querySelector("#addArticleBut").style.display = "none";
      }
    });
  }

  _addArticle () {
    console.log("Clicked");
    this.shadowRoot.querySelector("#articleInput").close();
  }

  _openAddArticle() {
    this.shadowRoot.querySelector("#articleInput").open();
  }

}

window.customElements.define('articles-page', ArticlesPage);
