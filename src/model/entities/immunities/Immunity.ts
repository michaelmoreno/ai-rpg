import { Spell } from "../characters/spells/Spell";
import { Effect } from "../effects/Effect";
import Enchantment from "../items/enchantments/Enchantment";

type ImmunityOrigin = Spell | Enchantment

abstract class Immunity {
    name: string
    description: string
    origin: ImmunityOrigin

    constructor(name: string, description: string, origin: ImmunityOrigin) {
        this.name = name
        this.description = description
        this.origin = origin
    }
    abstract match(effect: Effect): boolean
}

export { Immunity, ImmunityOrigin }
