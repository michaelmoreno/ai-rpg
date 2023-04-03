class Clock {
    protected last: number
    speedMultiplier: number

    constructor(speedMultiplier: number = 1) {
        this.last = Date.now()
        this.speedMultiplier
    }
    start(): void {
        this.last = Date.now()
    }
    elapsed(): number {
        const elapsed = Date.now() - this.last
        this.last = Date.now()
        return elapsed
    }
}

export { Clock }
