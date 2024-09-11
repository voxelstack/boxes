import { html, render } from "lit";

import { $, expect } from "@wdio/globals";

import "./{{name}}";

describe("{{name}}", () => {
    it("should render", async () => {
        render(html`<bx-{{name}}></bx-{{name}}>`, document.body);

        const {{name}} = await $("bx-{{name}}");
        await expect({{name}}).toExist();
    });
});
