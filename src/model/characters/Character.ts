import { State, StateMachine } from '../../patterns/StateMachine'
import { Attributes } from './Attributes'
import { Inventory } from './Inventory'
import { IdleState } from './states/IdleState'

class Character extends StateMachine {
    id: number
    name: string
    description: string
    health: number
    inventory: Inventory
    attributes: Attributes

    constructor(id: number, name: string, description: string, health: number, inventory: Inventory, attributes?: Attributes, initialState?: State) {
        super(initialState || new IdleState())
        this.id = id
        this.name = name
        this.description = description
        this.health = health
        this.inventory = inventory
        this.attributes = attributes || new Attributes()
    }
}

export { Character }
