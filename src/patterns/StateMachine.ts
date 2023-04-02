abstract class State {
    enter(context: StateMachine): void { }
    abstract execute(context: StateMachine): void
    exit(context: StateMachine): void { }
}

class StateMachine {
    protected state: State

    constructor(initialState: State) {
        this.state = initialState
    }
    enter(state: State): void {
        this.state.exit(this)
        this.state = state
        this.state.enter(this)
    }
    update(): void {
        this.state.execute(this)
    }
}

export { State, StateMachine }
