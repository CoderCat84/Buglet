import { TestBed } from "@angular/core/testing";
import { ItemEditor } from "./edit-item.component";
import { EditControlType, makeItem } from "./models/item";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";

describe("Edit Item Component Tests", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [DropDownsModule],
            declarations: [ItemEditor]
        });
    });

    it("Should add a field", () => {
        let fixture = TestBed.createComponent(ItemEditor);
        let component = fixture.componentInstance;

        spyOn(component.updateItem, "emit").and.stub();

        component.item = makeItem("some item");
        component.addField("someField", EditControlType.TEXTBOX);

        expect(component.updateItem.emit).toHaveBeenCalledWith({
            titleField: {
                name: "title",
                value: "some item",
                editControlType: EditControlType.TEXTBOX
            },
            bugTypeField: {
                name: "bugType",
                value: "TODO",
                editControlType: EditControlType.DROPDOWN,
                values: [ "BUG", "TODO"]
            },
            fields: [
                {
                    name: "someField",
                    value: "",
                    editControlType: EditControlType.TEXTBOX
                }
            ]
        });
    });
});
