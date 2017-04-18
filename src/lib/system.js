import store from './store';

export default class System {

    constructor (mask = [ ], action = (() => null)) {
        this.mask = mask;
        this.action = action;
    }

    run (entity) {
        const entityFitsMask = this.mask.reduce((fits, type) => {
            return fits && store.get('components').get(type).has(entity);
        }, true);

        if (entityFitsMask) {
            this.action(entity);
        }
    }
}
