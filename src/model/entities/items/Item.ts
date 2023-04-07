import Enchantment from "./enchantments/Enchantment"

type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Arcane' | 'Legendary'
type Category = 'Weapon'

class Item {
    id: number
    name: string
    category: Category
    description: string
    rarity: Rarity
    weight: number
    enchantments: Enchantment[]

    constructor(id: number, name: string, category: Category, description: string, rarity: Rarity, weight: number) {
        this.id = id
        this.name = name
        this.category = category
        this.description = description
        this.rarity = rarity
        this.weight = weight
    }
}

export { Item, Rarity, Category }
