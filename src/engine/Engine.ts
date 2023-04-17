import { Clock } from "./Clock"
import ILoader from "./Loaders/ILoader"
import { GlobalTime } from "./GlobalTime"
import { Broker } from "../patterns/PublishSubscribe"
import { CharacterPayload } from "./payloads/CharacterPayload"
import { ItemPayload } from "./payloads/ItemPayload"
import { AchievementPayload } from "./payloads/AchievementPayload"

interface IUpdateable {
    update(): void
}

type EngineChannelsAPI = {
    CharacterChannel: CharacterPayload
    ItemChannel: ItemPayload
    AchievementChannel: AchievementPayload
}

class Engine {
    clock: Clock
    loader: ILoader
    protected _entities: IUpdateable[]
    protected broker: Broker<EngineChannelsAPI>

    constructor(broker: Broker<EngineChannelsAPI>, clock?: Clock) {
        this.broker = broker
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

export { Engine, IUpdateable, EngineChannelsAPI }
