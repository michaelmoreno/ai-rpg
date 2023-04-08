import { Character } from "../../src/model/entities/characters/Character"
import { Inventory } from "../../src/model/entities/characters/Inventory"
import { SleepSpell } from '../../src/model/entities/characters/spells/SleepSpell'
import { IdleState } from "../../src/model/entities/characters/states/IdleState"
import { SleepState } from "../../src/model/entities/characters/states/SleepState"
import { GlobalTime } from "../../src/engine/GlobalTime"

describe('Sleep Spell', () => {
    let caster: Character
    let target: Character
    let timeCaller: object

    beforeEach(() => {
        caster = new Character(1, 'Caster', 'A caster', 100, 100, new Inventory(100))
        caster.addSpell(new SleepSpell(caster))
        target = new Character(2, 'Target', 'A target', 100, 100, new Inventory(100))
        timeCaller = {}
        GlobalTime.setApprovedCaller(timeCaller)
        GlobalTime.reset(timeCaller)
    })

    it('fails on insufficient mana', () => {
        // @ts-expect-error
        expect(target.state).toBeInstanceOf(IdleState)
        caster.mana = 0
        expect(caster.castSpell('Sleep', target)).toBeFalsy()
        // @ts-expect-error
        expect(target.state).toBeInstanceOf(IdleState)
    })
    it('puts target to sleep', () => {
        caster.castSpell('Sleep', target)
        // @ts-expect-error
        expect(target.state).toBeInstanceOf(SleepState)
    })
    it('resets target state to IdleState on expire', () => {
        caster.castSpell('Sleep', target)
        // @ts-expect-error
        expect(target.state).toBeInstanceOf(SleepState)
        jest.useFakeTimers()
        jest.advanceTimersByTime(3600 * 1000)
        GlobalTime.tick(timeCaller)
        target.update()
        // @ts-expect-error
        expect(target.state).toBeInstanceOf(IdleState)
    })
})
