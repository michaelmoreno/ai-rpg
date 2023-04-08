import { Spell, SpellMastery } from "../characters/spells/Spell";
import { Effect } from "../effects/Effect";
import { Immunity, ImmunityOrigin } from "./Immunity";

class NoviceSpellImmunity extends Immunity {
    constructor(origin: ImmunityOrigin) {
        super('Novice Spell Immunity', 'Immune to novice spells', origin)
    }
    match(effect: Effect) {
        if (effect.origin instanceof Spell)
            return effect.origin.mastery == SpellMastery.Novice
        return false
    }
}

export { NoviceSpellImmunity }
