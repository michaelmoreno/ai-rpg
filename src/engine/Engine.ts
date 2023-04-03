import { Clock } from "./Clock"
import ILoader from "./Loaders/ILoader"

interface IUpdateable {
    update(deltaTime: number): void
}

class Engine {
    clock: Clock
    loader: ILoader
    protected _entities: IUpdateable[]

    constructor(clock?: Clock) {
        this.clock = clock || new Clock()
        this._entities = []
    }
    get entities() { return this._entities }

    addEntity(entity: IUpdateable) {
        this.entities.push(entity)
    }
    update() {
        let deltaTime = this.clock.elapsed()
        for (let entity of this.entities) {
            entity.update(deltaTime) // would require changing .update() signature on StateMachine
        }
    }
    initialize() {
        this.clock.start()
    }
    run() {
        while (true) {
            this.update()
        }
    }
}

export { Engine }
