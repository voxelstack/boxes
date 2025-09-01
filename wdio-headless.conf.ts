import { config as base } from "./wdio.conf";

export const config: WebdriverIO.Config = {
    ...base,
    maxInstances: 5,
    capabilities: [
        {
            browserName: "chrome",
            "goog:chromeOptions": {
                args: [
                    "--headless",
                    "--disable-gpu",
                    "--disable-dev-shm-usage",
                ],
            },
        },
    ],
};
