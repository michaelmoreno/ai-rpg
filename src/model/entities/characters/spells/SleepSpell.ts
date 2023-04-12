import { Hours, Minutes } from "../../../../patterns/utils/time";
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
                threshold = target.attributes.wisdom.net
                duration = Minutes(3)
            case SpellMastery.Adept:
                threshold = target.attributes.wisdom.net / 2
                duration = Minutes(10)
            case SpellMastery.Master:
                threshold = target.attributes.wisdom.net / 3
                duration = Hours(1)
        }
        roll += this.caster.attributes.magic.net
        if (roll > threshold) {
            const effect = new SleepEffect(target, duration, this)
            target.addEffect(effect)
        }
    }
}

export { SleepSpell };
