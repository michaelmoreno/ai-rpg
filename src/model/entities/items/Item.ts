import { State } from "../../../patterns/StateMachine"
import { Entity } from "../Entity"
import Enchantment from "./enchantments/Enchantment"
import { StaticState } from "./states/StaticState"

enum Rarity {
    Common = 1,
    Uncommon = 2,
    Rare = 3,
    Arcane = 4,
    Legendary = 5
}
type Category = 'Weapon'

class Item extends Entity {
    category: Category
    rarity: Rarity
    weight: number
    enchantments: Enchantment[]

    constructor(id: number, name: string, description: string, category: Category, rarity: Rarity, weight: number, initialState: State = new StaticState()) {
        super(id, name, description, initialState)
        this.category = category
        this.rarity = rarity
        this.weight = weight
    }
}

export { Item, Rarity, Category }
