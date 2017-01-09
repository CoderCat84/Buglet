import { Component, Input, EventEmitter, Output } from "@angular/core";
import { Item, EditControlType, EditControlTypeValues, addFieldToItem } from "./models/item";

@Component({
    selector: "item-editor",
    templateUrl: "./edit-item.component.html"
})
export class ItemEditor {
    @Input() public item: Item;
    @Output() public updateItem: EventEmitter<Item> = new EventEmitter<Item>();
    public editControlTypes = EditControlTypeValues;

    public addField(fieldTitle: string, fieldType: EditControlType): void {
        let newItem = addFieldToItem(this.item, {
            name: fieldTitle,
            value: "",
            editControlType: fieldType
        });
        this.updateItem.emit(newItem);
    }
}
