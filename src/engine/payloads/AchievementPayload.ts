import { Achievement } from "../../model/achievements/Achievement"

type AchievementUnlockPayload = {
    label: 'UnlockAchievement',
    content: { achievement: Achievement }
}

type AchievementPayload = AchievementUnlockPayload

export { AchievementPayload }
