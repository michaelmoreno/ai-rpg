interface IObserver {
    notify(data?: any): void
}

abstract class Subject {
    protected observers: IObserver[] = []

    attach(observer: IObserver): void {
        this.observers.push(observer)
    }
    detach(observer: IObserver): void {
        this.observers = this.observers.filter((o) => o !== observer)
    }
    notifyObservers(): void {
        for (let observer of this.observers) {
            observer.notify()
        }
    }
}
