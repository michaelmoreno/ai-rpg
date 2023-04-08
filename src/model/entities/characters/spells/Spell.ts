import { Entity } from "../../Entity"
import { Character } from "../Character"

enum SpellMastery {
    Novice = 1,
    Adept = 2,
    Master = 3
}

abstract class Spell {
    caster: Character
    name: string
    description: string
    mastery: SpellMastery
    manaCost: number

    constructor(caster: Character, name: string, description: string, mastery: SpellMastery = SpellMastery.Novice, manaCost: number = 0) {
        this.caster = caster;
        this.name = name;
        this.description = description;
        this.mastery = mastery;
        this.manaCost = manaCost;
    }

    abstract cast(target: Entity): void
}

export { Spell, SpellMastery };
