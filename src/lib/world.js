import Component from './component';
import Entity from './entity';

const { Map, Set, WeakMap, WeakSet } = global;

export const worlds = new WeakMap();

export default class World {

    get entities () {
        return new WeakSet(worlds.get(this).get('entities'));
    }

    get components () {
        return new WeakMap(worlds.get(this).get('components'));
    }

    constructor () {
        worlds.set(this, new Map([
            [ 'serial', 0 ],
            [ 'entities', new Set() ],
            [ 'components', new Map() ]
        ]));
    }
}
