import { Character } from '../src/model/characters/Character';
import { Inventory } from '../src/model/characters/Inventory';
import { IdleState } from '../src/model/characters/states/IdleState';
import { State, StateMachine } from '../src/patterns/StateMachine';

class MockState extends State {
    constructor() {
        super()
    }
    execute(context: StateMachine): void { }
}

describe('Character', () => {
    let character: Character;

    beforeEach(() => {
        character = new Character(1, 'Test Character', 'A test character', 100, new Inventory(100));
    })

    it('can transition', () => {
        // @ts-expect-error
        expect(character.state).toBeInstanceOf(IdleState)
        character.enter(new MockState())
        // @ts-expect-error
        expect(character.state).toBeInstanceOf(MockState)
    })
})
