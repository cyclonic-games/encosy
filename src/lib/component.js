import { worlds } from './world';

const { Array, Map/*, Object*/, Set, WeakMap, WeakSet } = global;

export default class Component {

    static types = Object.freeze({
        any: () => true,
        array: a => Array.isArray(a),
        boolean: b => typeof b === 'boolean',
        map: m => m instanceof Map,
        number: n => typeof n === 'number',
        object: o => typeof o === 'object',
        set: s => s instanceof Set,
        string: s => typeof s === 'string',
        symbol: s => typeof s === 'symbol'
    });

    constructor (model) {
        this.model = model;

        components.set(this, new WeakSet());
    }

    create (world, entity, data) {
        const validated = { };
        
        if (!(worlds.get(world).get('components').has(this))) {
            worlds.get(world).get('components').set(this, new WeakMap());
        }

        for (const [ key, value ] of Object.entries(data)) {

            if (key in this.model && this.model[ key ](value)) {
                validated[ key ] = value;
            }
            else {
                throw new TypeError(`Wrong type for property "${ key }"`);
            }
        }

        worlds.get(world).get('components').get(this).set(entity, validated);

        return validated;
    }
}
