import "polyfills";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode } from "@angular/core";

import { BugletModule } from "./buglet/buglet.module";

import "common.scss";

if (process.env.ENV === "production") {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(BugletModule);

if ((<any>module).hot) {
    (<any>module).hot.accept();
}
