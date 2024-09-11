import { html, render } from "lit";

import { $, expect } from "@wdio/globals";

import "./grid";

describe("grid", () => {
    it("should render", async () => {
        render(html`<bx-grid></bx-grid>`, document.body);

        const grid = await $("bx-grid");
        await expect(grid).toExist();
    });
});
