import { AppComponent } from "./app.component";
import { AngularFireModule, AuthProviders, AuthMethods } from "angularfire2";
import { DialogModule } from "@progress/kendo-angular-dialog";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { LayoutModule } from "@progress/kendo-angular-layout";
import { FormsModule } from "@angular/forms";
import { ItemEditor } from "./edit-item.component";

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

export const firebaseConfig = {
    apiKey: "AIzaSyBXMzY-Jdwcz7butUCwhHlqQL0Ye2SW1zM",
    authDomain: "buglet-154218.firebaseapp.com",
    databaseURL: "https://buglet-154218.firebaseio.com",
    storageBucket: "https://buglet-154218.firebaseio.com",
    messagingSenderId: "771717310706"
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
    bootstrap: [AppComponent],
    declarations: [AppComponent,
        ItemEditor]
})
export class AppModule { }
