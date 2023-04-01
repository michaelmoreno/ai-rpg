interface ILoader {
    load(filepath: string, callback?: (data: any) => void): void
}

export default ILoader
