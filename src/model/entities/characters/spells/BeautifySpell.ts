import { Hours, Minutes } from "../../../../patterns/utils/time"
import { BeautifulEffect } from "../../effects/BeautifulEffect"
import { Character } from "../Character"
import { Spell, SpellMastery } from "./Spell"

class BeautifySpell extends Spell {
    constructor(caster: Character, mastery: SpellMastery = SpellMastery.Novice) {
        super(caster, 'Beautify', 'Makes the target beautiful', mastery, 10)
    }
    cast(target: Character): void {
        let duration: number
        let intensity: number
        switch (this.mastery) {
            case SpellMastery.Novice:
                duration = Minutes(3)
                intensity = 3
            case SpellMastery.Adept:
                duration = Minutes(10)
                intensity = 6
            case SpellMastery.Master:
                duration = Hours(1)
                intensity = 9
        }
        const effect = new BeautifulEffect(target, duration, intensity, this)
        target.addEffect(effect)
    }
}

export { BeautifySpell }
