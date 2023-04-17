import { EngineChannelsAPI } from "../../engine/Engine";

type PayloadLabel = EngineChannelsAPI[keyof EngineChannelsAPI]['label'];

class Achievement {
    id: number;
    name: string;
    description: string;
    condition: string;
    private label: PayloadLabel;
    predicate: (payload: EngineChannelsAPI[keyof EngineChannelsAPI]) => boolean;

    constructor(id: number, name: string, description: string, condition: string, label: PayloadLabel, predicate: (payload: EngineChannelsAPI[keyof EngineChannelsAPI]) => boolean) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.condition = condition;
        this.label = label;
        this.predicate = predicate;
    }
    checkUnlocked(payload: EngineChannelsAPI[keyof EngineChannelsAPI]): boolean {
        if (payload.label !== this.label)
            return false;
        return this.predicate(payload);
    }
}

export { Achievement };
