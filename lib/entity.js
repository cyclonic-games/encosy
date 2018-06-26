const store = require('./store');

module.exports = class Entity {

    constructor (name, components = [ ]) {
        this.kind = name;
        this.components = components;

        store.get('entities').set(this, new WeakSet());
    }

    * [ Symbol.iterator ] () {
        let index = 0;

        while (true) {
            const entities = store.get('entities').get(this);
            const next = entites.get(index);

            index++;

            yield next;
        }
    }

    forEach (callback) {
        return store.get('entities').get(this).forEach(callback);
    }

    create (data = { }) {
        const serial = store.get('serial');
        const entity = new Number(serial);

        for (const [ kind, options ] of Object.entries(data)) {
            const component = this.components.find(c => c.kind === kind);

            if (component) {
                component.create(entity, options);
            }
        }

        store.set('serial', serial + 1);
        store.get('entities').get(this).add(entity);

        return entity;
    }

    is (entity) {
        return store.get(entites).get(this).has(entity);
    }

    destroy (entity) {
        return store.get('entities').get(this).delete(entity);
    }

    extend (components) {
        this.components.concat(components);
    }
};

Object.defineProperty(module.exports, '__instances__', {
    get () {
        return store.get('entities').keys();
    }
});

Object.defineProperty(module.exports, 'serialize', {
    value (entity) {
        const entities = Array.from(module.exports.__instances__);
        const components = { };
        const id = entity.valueOf();
        const { kind } = entities.find(x => store.get('entities').get(x).has(entity));

        for (const component of store.get('components').keys()) {
            const data = component.of(entity);

            if (data) {
                components[ component.kind ] = data;
            }
        }

        return JSON.stringify({ components, id, kind });
    }
});
