import { IEffectable } from "../../effects/Effect";
import { SleepEffect } from "../../effects/SleepEffect";
import { Character } from "../Character";
import { Spell, SpellMastery } from "./Spell";

class SleepSpell extends Spell {
    constructor(caster: Character, mastery: SpellMastery = SpellMastery.Novice) {
        super(caster, 'Sleep', 'Puts the target to sleep', mastery, 10)
    }
    cast(target: IEffectable): void {
        if (!(target instanceof Character))
            return

        let roll = Math.floor(Math.random() * 20) + 1

        let threshold: number
        let duration: number
        switch (this.mastery) {
            case SpellMastery.Novice:
                threshold = target.attributes.wisdom
                duration = 180
            case SpellMastery.Adept:
                threshold = target.attributes.wisdom / 2
                duration = 600
            case SpellMastery.Master:
                threshold = target.attributes.wisdom / 3
                duration = 3600
        }
        roll += this.caster.attributes.magic
        if (roll > threshold) {
            const effect = new SleepEffect(target, duration, this)
            target.addEffect(effect)
        }
    }
}

export { SleepSpell };
