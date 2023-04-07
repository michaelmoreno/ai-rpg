class Attributes {
    private _wisdom: number
    private _intelligence: number
    private _charisma: number
    private _dexterity: number
    private _agility: number
    private _stealth: number
    private _strength: number
    private _combat: number
    private _magic: number
    private _luck: number

    constructor(wisdom: number = 0, intelligence: number = 0, charisma: number = 0, dexterity: number = 0, agility: number = 0, stealth: number = 0, strength: number = 0, combat: number = 0, magic: number = 0, luck: number = 0) {
        this._wisdom = wisdom
        this._intelligence = intelligence
        this._charisma = charisma
        this._dexterity = dexterity
        this._agility = agility
        this._stealth = stealth
        this._strength = strength
        this._combat = combat
        this._magic = magic
        this._luck = luck
    }
    get wisdom(): number { return this._wisdom }
    get intelligence(): number { return this._intelligence }
    get charisma(): number { return this._charisma }
    get dexterity(): number { return this._dexterity }
    get agility(): number { return this._agility }
    get stealth(): number { return this._stealth }
    get strength(): number { return this._strength }
    get combat(): number { return this._combat }
    get magic(): number { return this._magic }
    get luck(): number { return this._luck }
    get total(): number {
        return this._wisdom + this._intelligence + this._charisma + this._dexterity + this._agility + this._stealth + this._strength + this._combat + this._magic + this._luck
    }
    get average(): number {
        return this.total / 10
    }
}

export { Attributes }
