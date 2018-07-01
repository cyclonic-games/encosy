const store = require('./store');

module.exports = class Entity {

    constructor (name, components = [ ]) {
        this.kind = name;
        this.components = components;

        store.get('entities').set(this, new WeakSet());
    }

    create (data = { }) {
        const serial = store.get('serial');
        const entity = new Number(serial);

        for (const component of this.components) if (component.kind in data) {
            component.create(entity, data[ component.kind ]);
        }
        else if (typeof component.model === 'function') try {
            component.create(entity, new component.model());
        }
        catch (exception) {
            component.create(entity, component.model());
        }
        else {
            component.create(entity, { });
        }

        store.set('serial', serial + 1);
        store.get('entities').get(this).add(entity);

        return entity;
    }

    assemble (entity) {
        const components = { };
        const id = entity.valueOf();
        const { kind } = this;

        for (const component of this.components) {
            const data = component.of(entity);

            if (data) {
                components[ component.kind ] = data;
            }
        }

        return { components, id, kind };
    }

    is (entity) {
        return store.get('entites').get(this).has(entity);
    }

    destroy (entity) {
        return store.get('entities').get(this).delete(entity);
    }

    extend (components) {
        this.components.concat(components);
    }
};

Object.defineProperty(module.exports, 'kinds', {
    get () {
        return store.get('entities').keys();
    }
});
