import { EngineChannelsAPI } from "../../engine/Engine";
import { Broker, IPublisher, ISubscriber } from "../../patterns/PublishSubscribe";
import { Achievement } from "./Achievement";

class AchievementManager implements ISubscriber<EngineChannelsAPI>, IPublisher<EngineChannelsAPI> {
    private _locked: Set<Achievement>
    private _unlocked: Set<Achievement>
    broker: Broker<EngineChannelsAPI>;

    get locked(): Set<Achievement> { return this._locked }
    get unlocked(): Set<Achievement> { return this._unlocked }

    constructor(broker: Broker<EngineChannelsAPI>) {
        this.broker = broker
        this._locked = new Set()
        this._unlocked = new Set()
    }
    add(achievement: Achievement) {
        this._locked.add(achievement)
    }
    protected unlock(achievement: Achievement) {
        this._locked.delete(achievement)
        this._unlocked.add(achievement)
    }
    publish(channel: keyof EngineChannelsAPI, payload: EngineChannelsAPI[keyof EngineChannelsAPI]) {
        this.broker.broadcast(channel, payload)
    }
    receive(channel: keyof EngineChannelsAPI, payload: EngineChannelsAPI[keyof EngineChannelsAPI]) {
        for (const achievement of this._locked) {
            if (achievement.checkUnlocked(payload)) {
                this.unlock(achievement)
                this.publish(
                    'AchievementChannel',
                    { label: 'UnlockAchievement', content: { achievement } }
                )
            }
        }
    }
}

export { AchievementManager }
