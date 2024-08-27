import { html, render } from "lit";

import { $, expect } from "@wdio/globals";

import "./button";

describe("button", () => {
    it("should render text", async () => {
        render(html`<bx-button>001-J</bx-button>`, document.body);

        const button = await $("bx-button").$("button");
        await expect(button).toHaveText("001-J");
    });
});
