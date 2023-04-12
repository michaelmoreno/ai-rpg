class Attribute {
    constructor(
        public base: number = 0,
        public modifier: number = 0,
    ) { }
    get net(): number {
        return this.base + this.modifier
    }
}

class Attributes {
    wisdom: Attribute
    intelligence: Attribute
    charisma: Attribute
    dexterity: Attribute
    agility: Attribute
    stealth: Attribute
    strength: Attribute
    combat: Attribute
    magic: Attribute
    luck: Attribute

    constructor(wisdom: number = 0, intelligence: number = 0, charisma: number = 0, dexterity: number = 0, agility: number = 0, stealth: number = 0, strength: number = 0, combat: number = 0, magic: number = 0, luck: number = 0) {
        this.wisdom = new Attribute(wisdom)
        this.intelligence = new Attribute(intelligence)
        this.charisma = new Attribute(charisma)
        this.dexterity = new Attribute(dexterity)
        this.agility = new Attribute(agility)
        this.stealth = new Attribute(stealth)
        this.strength = new Attribute(strength)
        this.combat = new Attribute(combat)
        this.magic = new Attribute(magic)
        this.luck = new Attribute(luck)
    }
    get total(): number {
        return [this.wisdom, this.intelligence, this.charisma, this.dexterity, this.agility, this.stealth, this.strength, this.combat, this.magic, this.luck].reduce((total, attribute) => total + attribute.net, 0)
    }
    get average(): number {
        return this.total / 10
    }
}

export { Attributes }
