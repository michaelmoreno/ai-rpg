import { Character } from "../../model/entities/characters/Character"
import { Item } from "../../model/entities/items/Item"
import { Scene } from "../../model/Scene"
import { DerivePayloads } from "../../patterns/PublishSubscribe"

type ItemPayloadsMap = {
    UseItem: { user: Character, target: Character, item: Item },
    DropItem: { user: Character, item: Item, scene: Scene }
}

type ItemPayload = DerivePayloads<ItemPayloadsMap>

export { ItemPayload }
