import { Item } from "../items/Item"

class Inventory {
    protected _items: Item[]
    protected _capacity: number

    constructor(capacity: number) {
        this._items = []
        this._capacity = capacity
    }

    get items(): Item[] { return this._items }
    get capacity(): number { return this._capacity }
    get weight(): number {
        return this._items.reduce((total, item) => total + item.weight, 0)
    }

    add(item: Item): boolean {
        if (this.weight + item.weight > this._capacity)
            return false
        this._items.push(item)
        return true
    }
}

export { Inventory } 
