interface IPublisher<T extends ChannelsAPI> {
    broker: Broker<T>
    publish(channel: keyof T, payload: T[keyof T]): void
}

interface ISubscriber<T> {
    receive(channel: keyof T, payload: T[keyof T]): void
}

interface Payload {
    label: string
    content: object
}

type DerivePayloads<PayloadsMap> = {
    [K in keyof PayloadsMap]: { label: K, content: PayloadsMap[K] }
}[keyof PayloadsMap]

type ChannelsAPI = Record<string, Payload>

class Broker<T extends ChannelsAPI> {
    protected channels: Map<keyof T, Set<ISubscriber<T>>>

    constructor() {
        this.channels = new Map()
    }
    subscribe(channel: keyof T, subscriber: ISubscriber<T>) {
        if (!this.channels.has(channel))
            this.channels.set(channel, new Set())
        this.channels.get(channel).add(subscriber)
    }
    unsubscribe(channel: keyof T, subscriber: ISubscriber<T>) {
        if (!this.channels.has(channel))
            return
        this.channels.get(channel).delete(subscriber)
    }
    broadcast(channel: keyof T, payload: T[keyof T]) {
        if (!this.channels.has(channel))
            return
        for (const subscriber of this.channels.get(channel)) {
            subscriber.receive(channel, payload)
        }
    }
}

export { IPublisher, ISubscriber, Payload, DerivePayloads, Broker }
