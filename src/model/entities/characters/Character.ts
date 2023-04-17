import { State } from '../../../patterns/StateMachine'
import { Entity } from '../../entities/Entity'
import { Attributes } from './Attributes'
import { Inventory } from './Inventory'
import { Spell } from './spells/Spell'
import { IdleState } from './states/IdleState'
import { Broker, IPublisher } from '../../../patterns/PublishSubscribe'
import { EngineChannelsAPI } from '../../../engine/Engine'

class Character extends Entity implements IPublisher<EngineChannelsAPI> {
    health: number
    mana: number
    inventory: Inventory
    attributes: Attributes
    spells: Spell[]
    broker: Broker<EngineChannelsAPI>

    constructor(id: number, name: string, description: string, health: number, mana: number, broker: Broker<EngineChannelsAPI>, inventory: Inventory, attributes?: Attributes, initialState?: State) {
        super(id, name, description, initialState || new IdleState())
        this.health = health
        this.mana = mana
        this.broker = broker
        this.inventory = inventory
        this.attributes = attributes || new Attributes()
        this.spells = []
    }
    addSpell(spell: Spell): void {
        this.spells.push(spell)
    }
    publish(channel: keyof EngineChannelsAPI, payload: EngineChannelsAPI[keyof EngineChannelsAPI]): void {
        this.broker.broadcast(channel, payload)
    }
    castSpell(name: string, target: Character): boolean {
        const spell = this.spells.find(spell => spell.name === name)
        if (!spell)
            return false
        if (this.mana < spell.manaCost)
            return false
        spell.cast(target)
        this.mana -= spell.manaCost
        this.publish('CharacterChannel', { label: 'CastSpell', content: { caster: this, target, spell } })
        return true
    }
}

export { Character }
