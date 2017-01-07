import { Component, ElementRef, ViewChild } from "@angular/core";
import { AngularFire, FirebaseAuthState, FirebaseListObservable } from "angularfire2";
import * as firebase from "firebase";
import { Project } from "./models/project";
import { Item, makeItem } from "./models/item";
import { PanelBarItemModel } from "@progress/kendo-angular-layout";

@Component({
    selector: "buglet",
    templateUrl: "buglet.component.html",
    styles: [require("./buglet.component.scss").toString()]
})
export class BugletComponent {
    public readonly authProviders: string[] = ["Google"];
    public user: firebase.UserInfo = undefined;
    public isShowingNewProjectDialog: boolean = false;
    public projects: FirebaseListObservable<any[]>;
    public items: FirebaseListObservable<any[]>;
    public newProjectName: string;
    public isCreatingItem: boolean = false;
    public selectedItem: Item;
    public panelBarData: PanelBarItemModel[] = [
        <PanelBarItemModel>{ title: "Projects", children: [] },
        <PanelBarItemModel>{ title: "Bugs", content: [] }
    ];

    constructor(public af: AngularFire) {
        af.auth.subscribe((user: FirebaseAuthState) => {
            if (user) {
                console.info(user);
                this.user = user.google;
                this.projects = af.database.list("/projects/" + this.user.uid);
            }
        });
    }

    public trySignIn(): void {
        this.af.auth.login();
    }

    public showNewProjectDialog() {
        this.isShowingNewProjectDialog = true;
    }

    public createNewProject() {
        this.isShowingNewProjectDialog = false;
        let newProject = { name: this.newProjectName };
        this.projects.push(newProject);
    }

    public changeProject(project: any) {
        console.log(project);
        this.items = this.af.database.list("/bugs/" + this.user.uid + "/" + project.$key);
    }

    public startCreatingItem() {
        this.isCreatingItem = true;
    }

    public createItem($event: any) {
        this.isCreatingItem = false;
        console.log($event);
    }

    public updateItem(item: Item) {
        let updatable = <any>{ ...item };
        delete updatable.$key;
        delete updatable.$value;
        delete updatable.$exists;
        console.log(updatable);
        this.items.update((<any>item).$key, updatable);
        this.selectedItem = item;
    }

    public itemInputKeyDown($event: any) {
        if ($event.keyCode === 13) {
            let itemName = $event.target.value;
            let item = makeItem(itemName);
            this.items.push(item);
            this.isCreatingItem = false;
        }
    }
}

