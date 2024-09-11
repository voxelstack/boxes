import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

import { styles } from "./{{name}}.styles";

@customElement("bx-{{name}}")
export class {{Name}} extends LitElement {
    static styles = styles;

    render() {
        return html``;
    }
}
