import { BrowserModule } from "@angular/platform-browser";
import { BugletComponent } from "./buglet.component";

import {
    NgModule
} from "@angular/core";


@NgModule({
    imports: [ BrowserModule ],
    bootstrap: [ BugletComponent ],
    declarations: [ BugletComponent ]
})
export class BugletModule {}
