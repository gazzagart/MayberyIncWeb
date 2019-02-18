/** 
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html, css } from 'lit-element';
import { PageViewElement } from './page-view-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import {
  updateFirstLoad,
} from '../actions/app.js';
import '@polymer/neon-animation/neon-animatable.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/neon-animation/animations/scale-up-animation.js';
import '@polymer/neon-animation/animations/fade-out-animation.js';
import './snack-bar.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

import '@polymer/paper-card/paper-card.js';

class HomePage extends connect(store)(PageViewElement) {

  static get properties() {
    return {
        questions: { type: Array},
        toastOpened: {type: Boolean},
        colourSnack: {type: String},
        snackMessage: {type: String}
    };
}

  static get styles() {
    return [
      SharedStyles,
      css`
      /* Full height image header */
      .bgimg {
        background-image: url("https://www.w3schools.com/w3images/mac.jpg");
        background-position: center;
        background-size: cover;
        min-height: 100%;
      }
      span {
        font-family: 'Muli' sans-serif;
        font-weight: 400;
        font-style: normal;
    }
    paper-card{
      --paper-card-header-color: white;
    }
    @keyframes fade-in {
      from {opacity: 0; transform: scale(.7,.7)}
      to {opacity: 1;}
  }
    .fade-in-element {
      animation: fade-in 1.4s;
    }
    .hidden {
      opacity: 0;
    }
      `
    ];
  }
  constructor() {
    super();
    this.questions = [];
    this.toastOpened = false;
    this.colourSnack = "#b3b3b3";
    this.snackMessage = "Hello There."
  }

  render() {
    return html`
    <!-- Header with full-height image -->
    <br><br><br><br class="w3-hide-small w3-hide-large"><br class="w3-hide-small w3-hide-large">
      <div class="w3-display-container bgimg w3-animate-left" style="height:400px;z-index:1 !important;">
        <div class="w3-display-left w3-text-white" style="padding:48px">
              <span class="w3-jumbo w3-hide-small">Customise your law</span><br>
              <span class="w3-xxlarge w3-hide-large w3-hide-medium">Customise your law</span><br>
              <span class="w3-large w3-hide-small">Stop wasting valuable time with battling with law.</span>
              <span class="w3-medium w3-hide-large w3-hide-medium">Stop wasting valuable time with battling with law.</span>
              <p>
                <paper-button class="w3-purple" raised @click="${() => {this.shadowRoot.querySelector("#questions").open();}}">
                  Press To Start
                </paper-button>
              </p>
        </div>
        <div class="w3-display-bottomleft w3-text-grey w3-large" style="padding:24px 48px">
              <i class="fa fa-facebook-official w3-hover-opacity"></i>
              <i class="fa fa-instagram w3-hover-opacity"></i>
              <i class="fa fa-snapchat w3-hover-opacity"></i>
              <i class="fa fa-pinterest-p w3-hover-opacity"></i>
              <i class="fa fa-twitter w3-hover-opacity"></i>
              <i class="fa fa-linkedin w3-hover-opacity"></i>
              <i class="fa fa-pencil" title="Edit"></i>
        </div>
      </div>
      <section class="hidden">
        <h2>Home Page</h2>
        <p>This is a text-only page.</p>
        <p>It doesn't do anything other than display some static text.</p>
      </section>
      <section class="hidden">
        <h2>Welcome</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac nisi orci. Maecenas sollicitudin diam in diam efficitur cursus. Morbi sollicitudin in justo tincidunt placerat. Integer tincidunt elementum nisi, eu ornare dolor lacinia eget. Fusce pulvinar massa eget odio placerat, commodo molestie ipsum tempus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse porttitor id purus eu cursus. Suspendisse arcu nulla, mattis vel hendrerit et, malesuada a elit. Nam at diam ornare, aliquet est sed, malesuada metus. Cras nec enim vel nibh tincidunt euismod ut et enim. Etiam pharetra eros in sodales iaculis. Duis sagittis urna et cursus mollis. Cras tempor rutrum est. Praesent sollicitudin ligula at laoreet placerat. Praesent tortor dui, semper in sapien non, pharetra luctus turpis.</p>
      </section>
      <section class="hidden">
        <p>Vestibulum at est ex. Aenean id ligula id nibh dictum laoreet. Etiam non semper erat. Pellentesque eu justo rhoncus diam vulputate facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat metus ex, vel fringilla massa tincidunt sit amet. Nunc facilisis bibendum tristique. Mauris commodo, dolor vitae dapibus fermentum, odio nibh viverra lorem, eu cursus diam turpis et sapien. Nunc suscipit tortor a ligula tincidunt, id hendrerit tellus sollicitudin.</p>
      </section>
      <section class="w3-center">
        <a href="/about-us" class="w3-margin-top" style="text-decoration:none;" @click="${this.scrollTop}">
          <paper-button class="w3-purple" raised>About Us</paper-button>
        </a>
      </section>

      <!--START OF DIALOG QUESTIONS-->
      <paper-dialog id="questions" modal entry-animation="scale-up-animation" exit-animation="fade-out-animation" style="border-radius: 16px;">
        <h2>
          <div class="w3-border-bottom" style="padding-bottom: 12px;">
            Maybery INC Helper
          </div>
        </h2>

        <div id="introQuestions">
          <p>In the prompts that follow, you must just answer the questions that follow.</p>
          <p>This will allow us to customise the help you need in a quick, easy manner.</p>
          <div class="w3-border-top" style="padding-top:8px;padding-bottom:8px;">
            <paper-button id="introQuestionsBut" style="background-color:#000099;color:#ffffff;" autofocus @click="${() => {this.questionsLoader("introQuestions");}}">
              Continue
            </paper-button>
          </div>
        </div>

        <div id="firstQuestion" style="display:none;" class="w3-animate-right">
          <p>What type of law are you looking for?</p>
          <label id="label1">Type of law:</label>
          <paper-radio-group id="firstQuestionRadio" aria-labelledby="label1">
            <paper-radio-button name="questionContract">Contract</paper-radio-button>
            <paper-radio-button name="questionFamily">Family</paper-radio-button>
            <paper-radio-button name="questionBusiness" >Business</paper-radio-button>
          </paper-radio-group>
          <div class="w3-border-top" style="padding-top:16px;">
            <paper-button id="firstQuestionsBut" style="background-color:#000099;color:#ffffff;" @click="${() => {this.questionsLoader("firstQuestion");}}" autofocus>Continue</paper-button>
          </div>
        </div>

        <div id="questionContract" style="display:none;" class="w3-animate-right">
          <p>What type of contact?</p>
          <label id="label1">Type of law:</label>
          <paper-radio-group id="questionContractRadio" aria-labelledby="label1">
            <paper-radio-button name="TO_BE_CHANGED">Q 1</paper-radio-button>
            <paper-radio-button name="TO_BE_CHANGED">Q 2</paper-radio-button>
            <paper-radio-button name="TO_BE_CHANGED" >Q 3</paper-radio-button>
          </paper-radio-group>
          <div class="w3-border-top" style="padding-top:16px;">
            <paper-button id="questionContractBut" style="background-color:#000099;color:#ffffff;" @click="${() => {this.questionsLoader("cancel");}}" dialog-dismiss autofocus>Continue</paper-button>
            <paper-button id="questionContractBack" class="w3-orange w3-right w3-animate-opacity" @click="${() => {this.questionsLoader("back");}}">Back</paper-button>
          </div>
        </div>

        <div id="questionFamily" style="display:none;" class="w3-animate-right">
          <p>What type of family law are you looking for?</p>
          <label id="label1">Type of law:</label>
          <paper-radio-group id="questionFamilyRadio" aria-labelledby="label1">
            <paper-radio-button name="TO_BE_CHANGED">Q 1</paper-radio-button>
            <paper-radio-button name="TO_BE_CHANGED">Q 2</paper-radio-button>
            <paper-radio-button name="TO_BE_CHANGED" >Q 3</paper-radio-button>
          </paper-radio-group>
          <div class="w3-border-top" style="padding-top:16px;">
            <paper-button id="questionFamilyBut" style="background-color:#000099;color:#ffffff;" @click="${() => {this.questionsLoader("cancel");}}" dialog-dismiss autofocus>Continue</paper-button>
            <paper-button id="questionFamilyBack" class="w3-orange w3-right w3-animate-opacity" @click="${() => {this.questionsLoader("back");}}">Back</paper-button>
          </div>
        </div>

        <div id="questionBusiness" style="display:none;" class="w3-animate-right">
          <p>What type of business law are you looking for?</p>
          <label id="label1">Type of law:</label>
          <paper-radio-group id="questionBusinessRadio" aria-labelledby="label1">
            <paper-radio-button name="TO_BE_CHANGED">Q 1</paper-radio-button>
            <paper-radio-button name="TO_BE_CHANGED">Q 2</paper-radio-button>
            <paper-radio-button name="TO_BE_CHANGED" >Q 3</paper-radio-button>
          </paper-radio-group>
          <div class="w3-border-top" style="padding-top:16px;">
            <paper-button id="questionBusinessBut" style="background-color:#000099;color:#ffffff;" @click="${() => {this.questionsLoader("cancel");}}" dialog-dismiss autofocus>Continue</paper-button>
            <paper-button id="questionBusinessBack" class="w3-orange w3-right w3-animate-opacity" @click="${() => {this.questionsLoader("back");}}">Back</paper-button>
          </div>
        </div>

        <div class="w3-center">
        <paper-button class="w3-red w3-padding" @click="${() => {this.questionsLoader("cancel");}}" dialog-dismiss>
          Cancel
        </paper-button>
        </div>
      </paper-dialog>
      <!-- END OF DIALOG QUESTIONS -->

      <snack-bar ?active="${this.toastOpened}" colour="${this.colourSnack}">
          ${this.snackMessage}
      </snack-bar>
    `;
  }

  firstUpdated() {
    store.dispatch(updateFirstLoad());
    var animateHTML = () => {
      var elems;
      var windowHeight;
      var init = () => {
        elems = this.shadowRoot.querySelectorAll('.hidden');
        windowHeight = window.innerHeight;
        addEventHandlers();
        checkPosition();
      }
      function addEventHandlers() {
        window.addEventListener('scroll', checkPosition);
        window.addEventListener('resize', init);
      }
      function checkPosition() {
        for (var i = 0; i < elems.length; i++) {
          var positionFromTop = elems[i].getBoundingClientRect().top;
          if (positionFromTop - windowHeight <= -220) {
            elems[i].className = elems[i].className.replace(
              'hidden',
              'fade-in-element'
            );
          }
        }
      }
      return {
        init: init
      };
    };
    animateHTML().init();
  }

  questionsLoader(question) {
    if (question == "cancel") {
      setTimeout(() => {
        this.shadowRoot.querySelector("#firstQuestion").style.display = "none";
        this.shadowRoot.querySelector("#firstQuestion").className = "w3-animate-right";
        let length = this.questions.length;
        for(let a = 0; a < length; a++) {
          this.shadowRoot.querySelector("#"+this.questions[a]).className = "w3-animate-right";
          this.shadowRoot.querySelector("#"+this.questions[a]).style.display = "none";
        }
        this.shadowRoot.querySelector("#introQuestions").style.display = "block";
        this.questions = [];
      }, 1500);
      return;
    }
    if (question == "back") {
      this.shadowRoot.querySelector("#"+this.questions[this.questions.length - 1]).style.display = "none";
      this.shadowRoot.querySelector("#"+this.questions[this.questions.length - 1]).className = "w3-animate-right";
      this.questions.pop();
      if(this.questions.length > 0) {
        this.shadowRoot.querySelector("#"+this.questions[this.questions.length - 1]).className = "w3-animate-left";
        this.shadowRoot.querySelector("#"+this.questions[this.questions.length - 1]).style.display = "block";
      } else {
        this.shadowRoot.querySelector("#firstQuestion").className = "w3-animate-left";
        this.shadowRoot.querySelector("#firstQuestion").style.display = "block";
      }
    }
    if (question == "introQuestions") {
      this.shadowRoot.querySelector("#introQuestions").style.display = "none";
      this.shadowRoot.querySelector("#firstQuestion").style.display = "block";
    } else if (question == "firstQuestion") {
      if(this.shadowRoot.querySelector("#firstQuestionRadio").selected == undefined) {
        this.colourSnack = "#f44336";
        this.snackMessage = "Please make a selection.";
        this.toastOpened = true;
        setTimeout(() => {this.toastOpened = false;}, 2000);
      } else {
        var selection = this.shadowRoot.querySelector("#"+question+"Radio").selected;
        this.shadowRoot.querySelector("#firstQuestion").style.display = "none";
        this.shadowRoot.querySelector("#firstQuestion").className = "w3-animate-right";
        this.shadowRoot.querySelector("#"+selection).style.display = "block";
        this.questions.push(selection);
      }
    } else {
      if(this.shadowRoot.querySelector("#"+question+"Radio").selected == undefined) {
        this.colourSnack = "#f44336";
        this.snackMessage = "Please make a selection.";
        this.toastOpened = true;
        setTimeout(() => {this.toastOpened = false;}, 2000);
      } else {
        var selection = this.shadowRoot.querySelector("#"+question+"Radio").selected;
        this.shadowRoot.querySelector("#"+question).style.display = "none";
        this.shadowRoot.querySelector("#"+selection).style.display = "block";
        this.questions.push(selection);
      }
    }
  }


  scrollTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

}

window.customElements.define('home-page', HomePage);
