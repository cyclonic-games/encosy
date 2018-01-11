import store from './store';

const { Array, Map/*, Object*/, Proxy, Set, WeakMap, WeakSet } = global;

export default class Component {

    static get instances () {
        return store.get('components').keys();
    }

    static types = Object.freeze({
        any: () => true,
        array: a => Array.isArray(a),
        boolean: b => typeof b === 'boolean' || b instanceof Boolean,
        map: m => m instanceof Map,
        number: n => typeof n === 'number' || n instanceof Number,
        object: o => typeof o === 'object',
        proxy: p => p instanceof Proxy,
        set: s => s instanceof Set,
        string: s => typeof s === 'string' || s instanceof String,
        symbol: s => typeof s === 'symbol',
        weakmap: wm => wm instanceof WeakMap,
        weakset: ws => ws instanceof WeakSet,
        enum: e => v => v in e
    });

    constructor (model = { }) {
        this.model = model;

        store.get('components').set(this, new WeakMap());
    }

    of (entity) {
        return store.get('components').get(this).get(entity);
    }

    create (entity, data = { }) {

        if (typeof this.model === 'function') {

            if (this.model(data)) {
                store.get('components').get(this).set(entity, data);
                return data;
            }
            else {
                throw new TypeError('Wrong type for component');
            }
        }
        else {
            const validated = { };

            for (const [ key, value ] of Object.entries(data)) {

                if (key in this.model && this.model[ key ](value)) {
                    validated[ key ] = value;
                }
                else {
                    throw new TypeError(`Wrong type for property "${ key }"`);
                }
            }

            store.get('components').get(this).set(entity, validated);
            return validated;
        }
    }

    update (entity, model) {
        return Object.assign(store.get('components').get(this).get(entity), model);
    }

    extend (model) {
        Object.assign(this.model, model);
    }
}
