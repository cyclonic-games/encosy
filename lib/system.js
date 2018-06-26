const store = require('./store');

module.exports = class System {

    constructor (name, mask = [ ], action = (() => null)) {
        this.kind = name;
        this.mask = mask;
        this.actions = [ action ];

        store.get('systems').add(this);
    }

    run (entity, ...args) {
        const entityFitsMask = this.mask.reduce((fits, type) => {
            return fits && store.get('components').get(type).has(entity);
        }, true);

        if (entityFitsMask) {
            this.actions.forEach(action => action(entity, ...args));
        }
    }

    extend (action) {
        this.actions.push(action);
    }
};

Object.defineProperty(module.exports, '__instances__', {
    get () {
        return store.get('systems').values();
    }
});
