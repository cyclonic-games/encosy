import { worlds } from './world';

const { Array, Map/*, Object*/, Set, WeakMap, WeakSet } = global;

const components = new WeakMap();

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

    register (world) {
        worlds.get(world).get('components').set(this, new WeakMap());
    }

    create (world, data) {
        const validated = { };

        for (const [ key, value ] of Object.entries(data)) {

            if (key in this.model && this.model[ key ](value)) {
                validated[ key ] = value;
            }
            else {
                throw new TypeError(`Wrong type for property "${ key }"`);
            }
        }

        components.get(this).add(validated);

        return validated;
    }
}
