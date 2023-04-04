class Achievement {
    id: number;
    name: string;
    description: string;
    condition: string;
    predicate: (args: any) => boolean;

    constructor(id: number, name: string, description: string, condition: string, predicate: (args: any) => boolean) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.condition = condition;
        this.predicate = predicate;
    }
}

export { Achievement };
