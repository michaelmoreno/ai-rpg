import { Character } from "../characters/Character";
import { IdleState } from "../characters/states/IdleState";
import { SleepState } from "../characters/states/SleepState";
import { Effect, EffectOrigin, IEffectable } from "./Effect";

class SleepEffect extends Effect {
    declare affected: Character

    constructor(affected: IEffectable, duration: number, origin: EffectOrigin) {
        super(affected, 'Sleep', 'This entity is asleep', origin, duration);
    }
    onStart(): void {
        this.affected.enter(new SleepState(this.duration))
    }
    onEnd(): void {
        this.affected.enter(new IdleState())
    }
}

export { SleepEffect }
