import { State, StateMachine } from "../../patterns/StateMachine";
import { Effect, IEffectable } from "./effects/Effect";
import { Immunity } from "./immunities/Immunity";

abstract class Entity extends StateMachine implements IEffectable {
    id: number
    name: string
    description: string
    protected _effects: Effect[]
    protected _immunities: Immunity[]

    constructor(id: number, name: string, description: string, initialState: State) {
        super(initialState)
        this.id = id
        this.name = name
        this.description = description
        this._effects = []
        this._immunities = []
    }
    get effects(): Effect[] { return this._effects }
    get immunities(): Immunity[] { return this._immunities }

    hasImmunity(immunity: Immunity): boolean {
        return this.immunities.includes(immunity)
    }
    addImmunity(immunity: Immunity): boolean {
        if (this.immunities.includes(immunity))
            return false
        this.immunities.push(immunity)
        return true
    }
    removeImmunity(immunity: Immunity): boolean {
        if (this.immunities.includes(immunity)) {
            this.immunities.splice(this.immunities.indexOf(immunity), 1)
            return true
        }
        return false
    }
    isImmuneToEffect(effect: Effect): boolean {
        for (let immunity of this.immunities) {
            if (immunity.match(effect))
                return true
        }
        return false
    }
    hasEffect(effect: Effect): boolean {
        return this.effects.includes(effect)
    }
    addEffect(effect: Effect): boolean {
        if (this.isImmuneToEffect(effect))
            return false
        this.effects.push(effect)
        effect.start()
        return true
    }
    removeEffect(effect: Effect): boolean {
        if (this.hasEffect(effect)) {
            this.effects.splice(this.effects.indexOf(effect), 1)
            return true
        }
        return false
    }
    applyEffects(): void {
        for (let effect of this.effects) {
            effect.update()
        }
    }
    update(): void {
        this.applyEffects()
        this.state.execute(this)
    }
}

export { Entity }
