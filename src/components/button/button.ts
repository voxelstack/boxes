import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

import { styles } from "./button.styles";

@customElement("bx-button")
export class Button extends LitElement {
    static styles = styles;

    render() {
        return html`<button class="button">
            <slot></slot>
        </button>`;
    }
}
