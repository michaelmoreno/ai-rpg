import { Character } from "../../model/entities/characters/Character"
import { Spell } from "../../model/entities/characters/spells/Spell"
import { Scene } from "../../model/Scene"

type CharacterCastSpellPayload = {
    label: 'CastSpell',
    content: { caster: Character, target: Character, spell: Spell }
}

type CharacterEnterScenePayload = {
    label: 'EnterScene',
    content: { character: Character, scene: Scene }
}

type CharacterPayload = CharacterCastSpellPayload | CharacterEnterScenePayload

export { CharacterPayload }
