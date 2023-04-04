import { GlobalTime } from "../src/engine/GlobalTime"

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
            let delta = (Date.now() - last) / 1000

            expect(GlobalTime.delta).toBeCloseTo(delta, 1)
            last = Date.now()
        }
    })
    it('calculates elapsed time', () => {
        GlobalTime.reset(caller)
        expect(GlobalTime.elapsed).toBe(0)
        jest.useFakeTimers();
        jest.advanceTimersByTime(2000)
        GlobalTime.tick(caller)
        expect(GlobalTime.elapsed).toBeCloseTo(2000 / 1000);
    })
})
