import { State } from "../../../../patterns/StateMachine";

class StaticState extends State {
    constructor() {
        super()
    }
    enter(context: any): void { }
    execute(context: any): void { }
    exit(context: any): void { }
}

export { StaticState };
