import type { Options } from "@wdio/types";

import { config as base } from "./wdio.conf";

export const config: Options.Testrunner = {
    ...base,
    capabilities: [
        {
            maxInstances: 5,
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
