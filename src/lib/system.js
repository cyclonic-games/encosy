export default class System {

    constructor (mask = [ ], action = (() => null)) {
        this.mask = mask;
        this.action = action;
    }

    run (world, entity) {
        const { components } = world;

        if (this.mask.reduce((prev, next) => prev && components.get(next).has(entity), true)) {
            this.action(world, entity);
        }
    }
}
