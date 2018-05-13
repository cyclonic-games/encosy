import Number from 'std/Number';
import Object from 'std/Object';
import Set from 'std/Set';

import store from './store';

export default class Entity {

    static get instances () {
        return store.get('entities').keys();
    }

    constructor (name, components = [ ]) {
        this.kind = name;
        this.components = components;

        store.get('entities').set(this, new Set());
    }

    forEach (callback) {
        return store.get('entities').get(this).forEach(callback);
    }

    create (data = { }) {
        const serial = store.get('serial');
        const entity = new Number(serial);

        for (const [ kind, payload ] of Object.entries(data)) {
            const component = this.components.find(c => c.kind === kind);

            if (component) {
                component.create(entity, payload);
            }
        }

        store.set('serial', serial + 1);
        store.get('entities').get(this).add(entity);

        return entity;
    }

    destroy (entity) {
        return store.get('entities').get(this).delete(entity);
    }

    extend (components) {
        this.components.concat(components);
    }
}
