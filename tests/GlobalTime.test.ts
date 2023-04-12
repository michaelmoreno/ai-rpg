import { GlobalTime } from "../src/engine/GlobalTime"
import { Seconds } from "../src/patterns/utils/time"

describe('GlobalTime', () => {
    let caller: object

    beforeEach(() => {
        caller = {}
        GlobalTime.setApprovedCaller(caller)
        GlobalTime.reset(caller)
    })
    it('fails if unapproved caller', () => {
        expect(() => GlobalTime.tick({})).toThrow()
    })
    it('succeeds if approved caller', () => {
        expect(() => GlobalTime.tick(caller)).not.toThrow()
    })
    it('calculates delta time', () => {
        GlobalTime.reset(caller)
        expect(GlobalTime.delta).toBe(0)
        let last = Date.now()
        for (let i = 0; i < 100; i++) {
            GlobalTime.tick(caller)
            for (let j = 0; j < 60000; j++) { }
            let delta = Date.now() - last
            expect(GlobalTime.delta / 1000).toBeCloseTo(delta / 1000, 1)
            last = Date.now()
        }
    })
    it('calculates elapsed time', () => {
        GlobalTime.reset(caller)
        expect(GlobalTime.elapsed).toBe(0)
        jest.useFakeTimers();
        jest.advanceTimersByTime(Seconds(2))
        GlobalTime.tick(caller)
        expect(GlobalTime.elapsed / 1000).toBeCloseTo(Seconds(2) / 1000);
    })
})
