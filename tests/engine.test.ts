import { Engine } from '../src/engine/Engine';

describe('Engine', () => {
    let engine: Engine

    beforeAll(() => {
        engine = new Engine()
    })

    it('can add an entity', () => {
        const entity = { update: jest.fn() }
        expect(engine.entities).not.toContain(entity)
        engine.addEntity(entity)
        expect(engine.entities).toContain(entity)
    })
    it('can update entities in correct order', () => {
        const entity1 = { update: jest.fn() }
        const entity2 = { update: jest.fn() }
        const spy1 = jest.spyOn(entity1, 'update')
        const spy2 = jest.spyOn(entity2, 'update')

        engine.initialize()
        engine.addEntity(entity1)
        engine.addEntity(entity2)
        engine.update()

        const spy1Order = spy1.mock.invocationCallOrder[0]
        const spy2Order = spy2.mock.invocationCallOrder[0]
        expect(spy1Order).toBeLessThan(spy2Order)
    })
})
