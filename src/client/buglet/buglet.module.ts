import { BrowserModule } from "@angular/platform-browser";
import { BugletComponent } from "./buglet.component";
import { AngularFireModule, AuthProviders, AuthMethods } from "angularfire2";
import { DialogModule } from "@progress/kendo-angular-dialog";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { LayoutModule } from "@progress/kendo-angular-layout";
import { FormsModule } from "@angular/forms";
import { ItemEditor } from "./edit-item.component";

import {
    NgModule
} from "@angular/core";

let config = undefined;

try {
    config = require("../api-keys").keys;
} catch (error) {
    console.warn("no api keys");
}

export const firebaseConfig = {
    apiKey: config.firebase.apiKey,
    authDomain: config.firebase.authDomain,
    databaseURL: config.firebase.databaseURL,
    storageBucket: config.firebase.storageBucket,
    messagingSenderId: config.firebase.messagingSenderId
};

export const firebaseAuthConfig = {
    provider: AuthProviders.Google,
    method: AuthMethods.Popup
};

@NgModule({
    imports: [
        BrowserModule,
        DialogModule,
        DropDownsModule,
        ButtonsModule,
        FormsModule,
        LayoutModule,
        AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
    ],
    bootstrap: [BugletComponent],
    declarations: [BugletComponent,
        ItemEditor]
})
export class BugletModule { }
