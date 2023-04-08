import { State } from "../../../../patterns/StateMachine"
import { Character } from "../Character"
import { GlobalTime } from "../../../../engine/GlobalTime"
import { IdleState } from "./IdleState"

class SleepState extends State {
    duration: number
    elapsed: number = 0

    constructor(duration: number = 1200) {
        super()
        this.duration = duration
    }

    execute(context: Character): void {
        this.elapsed += GlobalTime.delta
        if (this.elapsed >= this.duration) {
            context.enter(new IdleState())
        }
    }
}

export { SleepState }
