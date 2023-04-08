import { State } from "../../../patterns/StateMachine"
import { Entity } from "../Entity"
import Enchantment from "./enchantments/Enchantment"
import { StaticState } from "./states/StaticState"

type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Arcane' | 'Legendary'
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
