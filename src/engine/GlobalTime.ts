class GlobalTime {
    private constructor() { }
    private static current: number = Date.now()
    private static genesis: number = Date.now()
    private static last: number = Date.now()
    private static _delta: number = 0
    private static _elapsed: number = 0
    static get elapsed(): number { return GlobalTime._elapsed }
    static get delta(): number { return GlobalTime._delta }

    private static approvedCaller: object = null
    static setApprovedCaller(caller: object) {
        GlobalTime.approvedCaller = caller
    }
    private static requireApprovedCaller(caller: object) {
        if (caller !== GlobalTime.approvedCaller) {
            throw new Error(`Unauthorized caller: ${caller} - Call GlobalTime.setApprovedCaller() first.`)
        }
    }
    static tick(caller: object) {
        GlobalTime.requireApprovedCaller(caller)
        GlobalTime.current = Date.now()
        GlobalTime._delta = (GlobalTime.current - GlobalTime.last)
        GlobalTime._elapsed = (GlobalTime.current - GlobalTime.genesis)
        GlobalTime.last = Date.now()
    }
    static reset(caller: object) {
        GlobalTime.requireApprovedCaller(caller)
        const now = Date.now()
        GlobalTime.current = now
        GlobalTime.genesis = now
        GlobalTime.last = now
        GlobalTime._delta = 0
        GlobalTime._elapsed = 0
    }
}

export { GlobalTime }
