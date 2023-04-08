import { Character } from "../../src/model/entities/characters/Character"
import { Inventory } from "../../src/model/entities/characters/Inventory"
import { SleepSpell } from "../../src/model/entities/characters/spells/SleepSpell"
import { SpellMastery } from "../../src/model/entities/characters/spells/Spell"
import { NoviceSpellImmunity } from "../../src/model/entities/immunities/NoviceSpellImmunity"
import Enchantment from "../../src/model/entities/items/enchantments/Enchantment"

class MockEnchantment extends Enchantment {
    constructor() { super() }
}

describe("Novice Spell Immunity", () => {
    let caster: Character
    let target: Character

    beforeEach(() => {
        caster = new Character(1, "Caster", "A caster", 100, 100, new Inventory(100))
        target = new Character(2, "Target", "A target", 100, 100, new Inventory(100))
        target.addImmunity(new NoviceSpellImmunity(new MockEnchantment()))
    })
    it("prevents effects produced by novice spells", () => {
        caster.addSpell(new SleepSpell(caster, SpellMastery.Novice))
        caster.castSpell("Sleep", target)
        expect(target.effects.length).toBe(0)
    })
    it("does not prevent effects produced by adept spells", () => {
        caster.addSpell(new SleepSpell(caster, SpellMastery.Adept))
        caster.castSpell("Sleep", target)
        expect(target.effects.length).toBe(1)
    })
    it("does not prevent effects produced by master spells", () => {
        caster.addSpell(new SleepSpell(caster, SpellMastery.Master))
        caster.castSpell("Sleep", target)
        expect(target.effects.length).toBe(1)
    })
})
