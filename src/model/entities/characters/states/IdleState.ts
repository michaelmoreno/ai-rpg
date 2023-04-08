import { State } from "../../../../patterns/StateMachine"
import { Character } from "../Character"

class IdleState extends State {
    duration: number

    constructor(duration: number = 30) {
        super()
        this.duration = duration
    }

    execute(context: Character): void { }
}


export { IdleState }
