import { Clock } from "./Clock"
import ILoader from "./Loaders/ILoader"
import { GlobalTime } from "./GlobalTime"

interface IUpdateable {
    update(): void
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
        GlobalTime.tick(this)
        for (let entity of this.entities) {
            entity.update()
        }
    }
    initialize() {
        this.clock.start()
        GlobalTime.setApprovedCaller(this)
        GlobalTime.reset(this)
    }
    run() {
        while (true) {
            this.update()
        }
    }
}

export { Engine, IUpdateable }
