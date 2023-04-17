import { Character } from "../../src/model/entities/characters/Character"
import { BeautifulEffect } from "../../src/model/entities/effects/BeautifulEffect"
import { Inventory } from "../../src/model/entities/characters/Inventory"
import { Spell } from '../../src/model/entities/characters/spells/Spell'
import { GlobalTime } from "../../src/engine/GlobalTime"
import { Hours } from "../../src/patterns/utils/time"
import { Broker } from "../../src/patterns/PublishSubscribe"
import { EngineChannelsAPI } from "../../src/engine/Engine"

class MockSpell extends Spell {
    constructor(caster: Character) {
        super(caster, 'MockSpell', 'A mock spell')
    }
    cast(target: Character): void { }
}

jest.useFakeTimers()

describe("BeautifulEffect", () => {
    let effect: BeautifulEffect
    let target: Character
    let timeCaller: object

    beforeEach(() => {
        target = new Character(1, "Target", "A target", 100, 100, new Broker<EngineChannelsAPI>(), new Inventory(100))
        effect = new BeautifulEffect(target, 10, 5, new MockSpell(target))
        timeCaller = {}
        GlobalTime.setApprovedCaller(timeCaller)
        GlobalTime.reset(timeCaller)
    })
    it("increases target's persuasion", () => {
        let originalPersuasion = target.attributes.persuasion.net
        target.addEffect(effect)
        expect(target.attributes.persuasion.net).toBe(originalPersuasion + effect.intensity)
    })
    it("decreases target's persuasion on expire", () => {
        let originalPersuasion = target.attributes.persuasion.net
        target.addEffect(effect)
        jest.advanceTimersByTime(Hours(1))
        GlobalTime.tick(timeCaller)
        effect.update()
        expect(target.attributes.persuasion.net).toBe(originalPersuasion)
    })
    it("only mutates target's persuasion modifer", () => {
        let originalPersuasionBase = target.attributes.persuasion.base
        let originalPersuasionModifier = target.attributes.persuasion.modifier
        target.addEffect(effect)
        expect(target.attributes.persuasion.base).toBe(originalPersuasionBase)
        expect(target.attributes.persuasion.modifier).toBe(originalPersuasionModifier + effect.intensity)
    })
})
