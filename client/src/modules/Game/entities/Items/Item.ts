export interface IItem {
    name: string;
    type: number;
}

class Item implements IItem {
    name: string;
    type: number;

    constructor(name: string, type: number) {
        this.name = name;
        this.type = type;
    }
}

export default Item;