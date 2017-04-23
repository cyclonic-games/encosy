import store from './store';

export default class System {

    static get instances () {
        return store.get('systems');
    }

    constructor (mask = [ ], action = (() => null)) {
        this.mask = mask;
        this.actions = [ action ];

        store.get('systems').add(this);
    }

    run (entity) {
        const entityFitsMask = this.mask.reduce((fits, type) => {
            return fits && store.get('components').get(type).has(entity);
        }, true);

        if (entityFitsMask) {
            this.actions.forEach(action => action(entity));
        }
    }

    extend (action) {
        this.actions.push(action);
    }
}
