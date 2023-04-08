import { State } from '../../../patterns/StateMachine'
import { Entity } from '../../entities/Entity'
import { Attributes } from './Attributes'
import { Inventory } from './Inventory'
import { Spell } from './spells/Spell'
import { IdleState } from './states/IdleState'

class Character extends Entity {
    health: number
    mana: number
    inventory: Inventory
    attributes: Attributes
    spells: Spell[]

    constructor(id: number, name: string, description: string, health: number, mana: number, inventory: Inventory, attributes?: Attributes, initialState?: State) {
        super(id, name, description, initialState || new IdleState())
        this.health = health
        this.mana = mana
        this.inventory = inventory
        this.attributes = attributes || new Attributes()
        this.spells = []
    }
    addSpell(spell: Spell): void {
        this.spells.push(spell)
    }
    castSpell(name: string, target: Character): boolean {
        const spell = this.spells.find(spell => spell.name === name)
        if (!spell)
            return false
        if (this.mana < spell.manaCost)
            return false
        spell.cast(target)
        this.mana -= spell.manaCost
        return true
    }
}

export { Character }
