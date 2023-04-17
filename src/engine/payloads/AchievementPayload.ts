import { Achievement } from "../../model/achievements/Achievement"
import { DerivePayloads } from "../../patterns/PublishSubscribe"

type AchievementPayloadsMap = {
    UnlockAchievement: { achievement: Achievement }
}

type AchievementPayload = DerivePayloads<AchievementPayloadsMap>

export { AchievementPayload }
