import { worlds } from './world';

export default class System {

    constructor (mask = [ ], action = (() => null)) {
        this.mask = mask;
        this.action = action;
    }

    run (world, entity) {
        const entityFitsMask = this.mask.reduce((fits, type) => {
            return fits && worlds.get(world).get('components').get(type).has(entity)
        }, true);

        if (entityFitsMask) {
            this.action(world, entity);
        }
    }
}
