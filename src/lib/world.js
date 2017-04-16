import Component from './component';
import Entity from './entity';

const { Map, Set, WeakMap } = global;

export default class World {

    entities = new Set();
    components = new Map();

    addEntity (entity) {

        if (!(entity instanceof Entity)) {
            throw new TypeError('All entities must be an instance of Entity')
        }

        this.entities.add(entity);

        return entity;
    }

    removeEntity (entity) {

        if (!(entity instanceof Entity)) {
            throw new TypeError('All entities must be an instance of Entity')
        }

        this.entities.delete(entity);

        return entity;
    }

    registerComponent (type) {

        if (type.__proto__ !== Component) {
            throw new TypeError('Components must inherit from the Component class')
        }

        this.components.set(type, new WeakMap());

        return type;
    }
}
