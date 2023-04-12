type milliseconds = number

function Seconds(value: number): milliseconds {
    return value * 1000
}

function Minutes(value: number): milliseconds {
    return value * Seconds(60)
}

function Hours(value: number): milliseconds {
    return value * Minutes(60)
}

function Days(value: number): milliseconds {
    return value * Hours(24)
}

export { Seconds, Minutes, Hours, Days }
