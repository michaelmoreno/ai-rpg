import { Character } from "../../model/entities/characters/Character"
import { Spell } from "../../model/entities/characters/spells/Spell"
import { Scene } from "../../model/Scene"
import { DerivePayloads } from "../../patterns/PublishSubscribe"

type CharacterPayloadsMap = {
    CastSpell: { caster: Character, target: Character, spell: Spell },
    EnterScene: { character: Character, scene: Scene }
}

type CharacterPayload = DerivePayloads<CharacterPayloadsMap>

export { CharacterPayload }
