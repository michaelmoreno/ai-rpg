import { Character } from "../characters/Character"
import { Effect, EffectOrigin, IEffectable } from "./Effect"

class BeautifulEffect extends Effect {
    declare affected: Character
    intensity: number

    constructor(affected: IEffectable, duration: number, intensity: number, origin: EffectOrigin) {
        super(affected, 'Beautiful', 'This person is perceived as beautiful.', origin, duration, `+${intensity} Persuasion`)
        this.intensity = intensity
    }
    protected onStart(): void {
        this.affected.attributes.persuasion.modifier += this.intensity
    }
    protected onEnd(): void {
        this.affected.attributes.persuasion.modifier -= this.intensity
    }
}

export { BeautifulEffect }
