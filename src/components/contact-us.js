
import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import './message-email.js';

class ContactUs extends PageViewElement {

  static get properties() {
    return {
        message: { type: String },
    };
}

  static get styles() {
    return [
      SharedStyles
    ];
  }

  constructor () {
    super();
  }

  render() {
    return html`
      <section>
        <h2>Contact us</h2>
        <p>Here you can contact us.</p>
        <br><br>
        <message-email message=${this.message} ></message-email>
      </section>
    `;
  }
}

window.customElements.define('contact-us', ContactUs);
