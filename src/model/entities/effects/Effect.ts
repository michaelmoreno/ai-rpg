import { IUpdateable } from "../../../engine/Engine"
import { GlobalTime } from "../../../engine/GlobalTime"
import { Spell } from "../characters/spells/Spell"
import Enchantment from "../items/enchantments/Enchantment"

interface IEffectable {
    effects: Effect[]
    addEffect(effect: Effect): boolean
    removeEffect(effect: Effect): boolean
    hasEffect(effect: Effect): boolean
}

type EffectOrigin = Spell | Enchantment

abstract class Effect implements IUpdateable {
    affected: IEffectable
    name: string
    description: string
    origin: EffectOrigin
    duration: number
    elapsed: number

    constructor(affected: IEffectable, name: string, description: string, origin: EffectOrigin, duration: number) {
        this.affected = affected
        this.name = name
        this.description = description
        this.origin = origin
        this.duration = duration
        this.elapsed = 0
    }

    protected onStart(): void { }
    protected onUpdate(): void { }
    protected onEnd(): void { }

    start(): void {
        this.onStart()
    }
    end(): void {
        this.onEnd()
        this.affected.removeEffect(this)
    }
    update(): void {
        this.onUpdate()
        this.elapsed += GlobalTime.delta
        if (this.elapsed >= this.duration) {
            this.end()
        }
    }
}

export { Effect, IEffectable, EffectOrigin }
