/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DialogModule } from "@progress/kendo-angular-dialog";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { LayoutModule } from "@progress/kendo-angular-layout";
import { FormsModule } from "@angular/forms";
import { ItemEditor } from "./edit-item.component";
import { AngularFire } from "angularfire2";
import { EditControlType } from "./models/item";

describe('AppComponent', () => {
    let afMock = {
      auth: {
        subscribe: () => {},
        login: () => {},
      },
      database: {
        list: () => {}
      }
    };

  beforeEach(() => {
    TestBed.configureTestingModule({
       imports: [
        DialogModule,
        DropDownsModule,
        ButtonsModule,
        FormsModule,
        LayoutModule
      ],
      providers: [
        { provide: AngularFire, useValue: afMock}
      ],
      declarations: [
        AppComponent,
        ItemEditor
      ],
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {    
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it("should login through firebase", async (() => {
      spyOn(afMock.auth, "login").and.stub();
      let fixture = TestBed.createComponent(AppComponent);
      let app = fixture.debugElement.componentInstance;

      app.trySignIn();
      expect(afMock.auth.login).toHaveBeenCalled();
  }));

 it("should show new project dialog", async (() => {
      let fixture = TestBed.createComponent(AppComponent);
      let app = fixture.debugElement.componentInstance;

      app.showNewProjectDialog();      
      expect(app.isShowingNewProjectDialog).toBe(true);
  }));

   it("create a new project", async (() => {
      let fixture = TestBed.createComponent(AppComponent);
      let app = fixture.debugElement.componentInstance;

      let mockProjects = { push: () => {}};
      spyOn(mockProjects, "push").and.stub();
      app.projects = mockProjects;
      app.newProjectName = "theName";
      app.createNewProject();      
       expect(mockProjects.push).toHaveBeenCalledWith({
         name: "theName",
      });      
  }));

  it("should change projects", async (() => {
      spyOn(afMock.database, "list").and.stub();
      let fixture = TestBed.createComponent(AppComponent);
      let app = fixture.debugElement.componentInstance;
      app.user = {
        uid: "id"
      }

      app.changeProject({
        $key: "key"
      });

      expect(afMock.database.list)
        .toHaveBeenCalledWith("/bugs/id/key");      
  }));

  it("should start creating item", async (() => {
      let fixture = TestBed.createComponent(AppComponent);
      let app = fixture.debugElement.componentInstance;
      
      app.startCreatingItem();
      expect(app.isCreatingItem).toBe(true);
  }));

  it("should update item", async (() => {
      let fixture = TestBed.createComponent(AppComponent);
      let app = fixture.debugElement.componentInstance;
      let mockItems = {
        update: () => {}
      };
      spyOn(mockItems, "update").and.stub();

      app.items = mockItems;
      let fakeItem = {
        $key: "key"
      };

      app.updateItem(fakeItem)
      expect(mockItems.update).toHaveBeenCalledWith("key", {  });
  }));

    it("create item on keypress", async (() => {
        let fixture = TestBed.createComponent(AppComponent);
        let app = fixture.debugElement.componentInstance;
        let mockItems = {
          push: () => {}
        };
        spyOn(mockItems, "push").and.stub();

        app.items = mockItems;

        app.itemInputKeyDown({
          keyCode: 13,
          target: {
            value: "value"
          }
        });

        expect(mockItems.push).toHaveBeenCalledWith({
        titleField: {
            name: "title",
            value: "value",
            editControlType: EditControlType.TEXTBOX,
        },
        bugTypeField: {
            name: "bugType",
            value: "TODO",
            editControlType: EditControlType.DROPDOWN,
            values: ["BUG", "TODO"]
        },
        fields: [],
    });
  }));

  it("should set the user", async(() => {
        let capturedCallback;
        spyOn(afMock.auth, "subscribe").and.callFake((captureMe => {
          console.info("capturing!");
          capturedCallback = captureMe;
        }))

        spyOn(afMock.database, "list").and.stub();

        let fixture = TestBed.createComponent(AppComponent);
        let app = fixture.debugElement.componentInstance;

        capturedCallback({
          google: {
            uid: "id"  
          }
        });

        expect(app.user).toEqual({
          uid:"id"
        });

        expect(afMock.database.list)
          .toHaveBeenCalledWith("/projects/id");
  }));
});
