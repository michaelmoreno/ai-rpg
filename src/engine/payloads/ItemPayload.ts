import { Character } from "../../model/entities/characters/Character"
import { Item } from "../../model/entities/items/Item"
import { Scene } from "../../model/Scene"

type ItemUsePayload = {
    label: 'UseItem',
    content: { user: Character, target: Character, item: Item }
}

type ItemDropPayload = {
    label: 'DropItem',
    content: { user: Character, item: Item, scene: Scene }
}

type ItemPayload = ItemUsePayload | ItemDropPayload

export { ItemPayload }
