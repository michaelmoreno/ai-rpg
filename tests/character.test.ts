import { Character } from '../src/model/entities/characters/Character';
import { Inventory } from '../src/model/entities/characters/Inventory';
import { IdleState } from '../src/model/entities/characters/states/IdleState';
import { SleepState } from '../src/model/entities/characters/states/SleepState';
import { State, StateMachine } from '../src/patterns/StateMachine';
import { GlobalTime } from '../src/engine/GlobalTime';

class MockState extends State {
    constructor() {
        super()
    }
    execute(context: StateMachine): void { }
}

describe('Character', () => {
    let character: Character;
    let timeCaller: object

    beforeEach(() => {
        character = new Character(1, 'Test Character', 'A test character', 100, 100, new Inventory(100));
        timeCaller = {}
        GlobalTime.setApprovedCaller(timeCaller)
        GlobalTime.reset(timeCaller)
    })

    it('can transition', () => {
        // @ts-expect-error
        expect(character.state).toBeInstanceOf(IdleState)
        character.enter(new MockState())
        // @ts-expect-error
        expect(character.state).toBeInstanceOf(MockState)
    })
    it('can sleep and wake up', () => {
        // @ts-expect-error
        expect(character.state).not.toBeInstanceOf(SleepState)
        character.enter(new SleepState(10))
        // @ts-expect-error
        expect(character.state).toBeInstanceOf(SleepState)
        jest.useFakeTimers()
        jest.advanceTimersByTime(10000)
        GlobalTime.tick(timeCaller)
        character.update()
        // @ts-expect-error
        expect(character.state).toBeInstanceOf(IdleState)
    })
})
