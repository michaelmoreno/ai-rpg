import { Achievement } from "./Achievement";

class AchievementManager implements IObserver {
    private achievements: Achievement[]
    constructor() {
        this.achievements = []
    }
    notify(data?: any): void {

    }
}

export { AchievementManager }
