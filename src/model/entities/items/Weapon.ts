import { Item, Rarity } from './Item'

type WeaponType = 'One-Handed' | 'Two-Handed' | 'Ranged'

class Weapon extends Item {
    damage: number
    range: number
    type: WeaponType

    constructor(id: number, name: string, description: string, rarity: Rarity, weight: number, damage: number, range: number, type: WeaponType) {
        super(id, name, 'Weapon', description, rarity, weight)
        this.damage = damage
        this.range = range
        this.type = type
    }
}

export { Weapon, WeaponType }
