export enum EditControlType {
    TEXTBOX,
    DROPDOWN
}

let allValues = Object.keys(EditControlType);
export const EditControlTypeValues =
    allValues.slice(allValues.length / 2);

export type BugType = "BUG" | "TODO";
export const BUG: string = "BUG";
export const TODO: string = "TODO";

export interface ItemField {
    readonly name: string;
    readonly value: any;
    readonly editControlType: EditControlType;
    readonly values?: string[];
}

export const PresetFields: ItemField[] = [
    { name: "milestone", value: "", editControlType: EditControlType.TEXTBOX }];

export interface Item {
    readonly titleField: ItemField;
    readonly bugTypeField: ItemField;
    readonly fields: ItemField[];
};

export const makeItem = (title: string): Item => {
    return {
        titleField: {
            name: "title",
            value: title,
            editControlType: EditControlType.TEXTBOX,
        },
        bugTypeField: {
            name: "bugType",
            value: TODO,
            editControlType: EditControlType.DROPDOWN,
            values: [BUG, TODO]
        },
        fields: [],
    };
};

export const addFieldToItem = (item: Item, field: ItemField): Item => {
    let newItem = JSON.parse(JSON.stringify(item));
    newItem.fields.push(field);
    return newItem;
    //return { ...item, fields: [field, ...item.fields] };
};


