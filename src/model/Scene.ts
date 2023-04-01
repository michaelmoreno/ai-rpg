import { Item } from "./items/Item"
import { Character } from "./characters/Character"

class Scene {
    id: number
    name: string
    description: string
    exits: Scene[]
    items: Item[]
    characters: Character[]

    constructor(id: number, name: string, description: string) {
        this.id = id
        this.name = name
        this.description = description
        this.exits = []
        this.items = []
        this.characters = []
    }
    hasItemByName(name: string): boolean {
        return this.items.some(item => item.name === name)
    }
    hasCharacterByName(name: string): boolean {
        return this.characters.some(character => character.name === name)
    }
    findItemByName(name: string): Item | undefined {
        return this.items.find(item => item.name === name)
    }
    findCharacterByName(name: string): Character | undefined {
        return this.characters.find(character => character.name === name)
    }
}
