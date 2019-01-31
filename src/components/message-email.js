import { LitElement, html } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-input/paper-textarea.js'
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-spinner/paper-spinner';
import './snack-bar.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// TODO: Prevent scripting input (validate for undesired input)
class MessageEmail extends connect(store)(LitElement) {

    static get properties() {
        return {
            message: { type: String},
            firstName: { type: String},
            lastName: { type: String},
            subject: { type: String},
            email: { type: String},
            toastOpened: {type: Boolean},
            sent: {type: Boolean},
            colourSnack: {type: String}
        };
    }

    constructor () {
        super();
        this.toastOpened = false;
    }

    render(){
        if(this.message == "undefined") // Have to check a string here not type, this is because, it passes a string to a child which is hten converted.
            this.setAttribute("message", "");

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
                <div id="inputArea">
                    <paper-input required error-message="Please provide a first name" id="firstName" label="First Name" type="text"></paper-input>
                    <paper-input id="lastName" label="Last Name" type="text"></paper-input>
                    <paper-input required error-message="Email not valid" id="email" label="Email" type="email"></paper-input>
                    <paper-input required error-message="Please provide a subject" id="subject" label="Subject" type="text"></paper-input>
                    <paper-textarea required error-message="Please provide a message" id="message" label="Your Message"></paper-textarea>
                    <br><br><br>
                    <paper-button  @click="${this._sendMail}" class="indigo">Submit</paper-button>
                </div>
                <div id="loader" style="display: none;text-align:center!important;margin-top:32px;">
                    <paper-spinner active class="multi" style="width: 90px;height: 90px;margin-top: 32px;"></paper-spinner>
                </div>
            </section>
            <snack-bar ?active="${this.toastOpened}" colour="${this.colourSnack}">
                Your message was ${this.sent ? 'sent' : 'not sent: please try again'}.
            </snack-bar>
        `;
    }

    _sendMail() {
        var email = this.shadowRoot.querySelector("#email");
        var subject = this.shadowRoot.querySelector("#subject");
        var firstName  = this.shadowRoot.querySelector("#firstName");
        var lastName  = this.shadowRoot.querySelector("#lastName");
        var message  = this.shadowRoot.querySelector("#message");
        function validateSignUp () {
            const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            email.validate();
            subject.validate();
            firstName.validate();
            message.validate();
            if(firstName.value == null || firstName.value == undefined || firstName.value == "") {
                firstName.focus();
                return false;
            } else if (subject.value == null || subject.value == undefined || subject.value == "") {
                subject.focus();
                return false;
            } else if (message.value == null || message.value == undefined || message.value == "") {
                message.focus();
                return false;
            } else if(!email.value.match(mailformat)) {
                email.focus();
                return false;
            } else {
                return true;
            }
        }
        if(validateSignUp()) {
            this.shadowRoot.querySelector("#inputArea").style.display = "none";
            this.shadowRoot.querySelector("#loader").style.display = "block";
            this.firstName = firstName.value.toString();
            this.lastName = lastName.value.toString();
            this.email = email.value.toString();
            this.subject = subject.value.toString();
            this.message = message.value.toString();
            // Now use firebase to write to firestore
            var db = firebase.firestore();
            db.collection("emailMessages").add({
                firstName: firstName.value.toString(),
                lastName: lastName.value.toString(),
                email: email.value.toString(),
                subject: subject.value.toString(),
                message: message.value.toString()
            })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                this.shadowRoot.querySelector("#inputArea").style.display = "block";
                this.shadowRoot.querySelector("#loader").style.display = "none";
                firstName.value = "";
                lastName.value = "";
                message.value = "";
                subject.value = "";
                email.value = "";
                this.colourSnack = "#4caf50";
                this.sent = true;
                this.toastOpened = true;
                setTimeout(() => {this.toastOpened = false;}, 2000);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
                this.shadowRoot.querySelector("#inputArea").style.display = "block";
                this.shadowRoot.querySelector("#loader").style.display = "none";
                this.colourSnack = "#f44336";
                this.sent = false;
                this.toastOpened = true;
                setTimeout(() => {this.toastOpened = false;}, 2000);
            });
        }
    }

    stateChanged(state) {
        this.toastOpened = state.app.snackbarOpened;
    }
}
customElements.define('message-email', MessageEmail);