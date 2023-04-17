import { EngineChannelsAPI } from "../../src/engine/Engine"
import { Achievement } from "../../src/model/achievements/Achievement"
import { AchievementManager } from "../../src/model/achievements/AchievementsManager"
import { Character } from "../../src/model/entities/characters/Character"
import { Inventory } from "../../src/model/entities/characters/Inventory"
import { Broker } from "../../src/patterns/PublishSubscribe"
import { SleepSpell } from '../../src/model/entities/characters/spells/SleepSpell'

describe("FakeAchievement", () => {
    let achievement: Achievement
    let achievementManager: AchievementManager
    let character: Character

    beforeEach(() => {
        achievement = new Achievement(
            1,
            'Fake Achievement',
            'Trivial Test Achievement',
            'Any character must cast a sleep spell',
            'CastSpell',
            (payload: any) => payload.content.spell instanceof SleepSpell
        )
        const broker = new Broker<EngineChannelsAPI>()

        achievementManager = new AchievementManager(broker)
        achievementManager.add(achievement)
        broker.subscribe('CharacterChannel', achievementManager)

        character = new Character(1, 'Fake Character', 'Trivial Test Character', 100, 100, broker, new Inventory(100))
        character.addSpell(new SleepSpell(character))
    })

    it("will have achievement locked by default", () => {
        expect(achievementManager.locked.has(achievement)).toBe(true)
        expect(achievementManager.unlocked.has(achievement)).toBe(false)
    })
    it("will unlock achievement when character casts any spell", () => {
        character.castSpell('Sleep', character)
        expect(achievementManager.locked.has(achievement)).toBe(false)
        expect(achievementManager.unlocked.has(achievement)).toBe(true)
    })
    it("cannot unlock achievement twice", () => {
        character.castSpell('Sleep', character)
        expect(achievementManager.locked.has(achievement)).toBe(false)
        expect(achievementManager.unlocked.has(achievement)).toBe(true)

        achievementManager.unlocked.clear()

        character.castSpell('Sleep', character)
        expect(achievementManager.locked.has(achievement)).toBe(false)
        expect(achievementManager.unlocked.has(achievement)).toBe(false)
    })
    it("broadcasts achievement unlock payload", () => {
        const mockSubscriber = { receive: jest.fn() }
        achievementManager.broker.subscribe('AchievementChannel', mockSubscriber)

        character.castSpell('Sleep', character)

        expect(mockSubscriber.receive).toBeCalledWith(
            'AchievementChannel',
            { label: 'UnlockAchievement', content: { achievement } }
        )
    })
})
