import { State, StateMachine } from '../../patterns/StateMachine'
import { Inventory } from './Inventory'
import { IdleState } from './states/IdleState'

class Character extends StateMachine {
    id: number
    name: string
    description: string
    health: number
    inventory: Inventory

    constructor(id: number, name: string, description: string, health: number, inventory: Inventory, initialState?: State) {
        super(initialState || new IdleState())
        this.id = id
        this.name = name
        this.description = description
        this.health = health
        this.inventory = inventory
    }
}

export { Character }
