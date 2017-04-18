import store from './store';

const { Number/*, Object*/ } = global;

export default class Entity {

    constructor (components) {
        this.components = components;
        store.get('entities').set(this, new Set());
    }

    forEach (callback) {
        return store.get('entities').get(this).forEach(callback);
    }

    create (data) {
        const serial = store.get('serial');
        const entity = new Number(serial);

        for (const [ accessor, type ] of Object.entries(this.components)) {
            type.create(entity, data[ accessor ]);
        }

        store.set('serial', serial + 1);
        store.get('entities').get(this).add(entity);

        return entity;
    }
    
    destroy (entity) {
        return store.get('entities').get(this).delete(entity);
    }
}
