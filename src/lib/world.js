import Component from './component';
import Entity from './entity';

const { Map, Set, WeakMap } = global;

const components = new Map();
const entities = new Set();

export default class World {

    addEntity (entity) {

        if (!(entity instanceof Entity)) {
            throw new TypeError('All entities must be an instance of Entity')
        }

        entities.add(entity);

        return entity;
    }

    removeEntity (entity) {

        if (!(entity instanceof Entity)) {
            throw new TypeError('All entities must be an instance of Entity')
        }

        entities.delete(entity);

        return entity;
    }

    registerComponent (type) {

        if (type.__proto__ !== Component) {
            throw new TypeError('Components must inherit from the Component class')
        }

        components.set(type, new WeakMap());

        return type;
    }

    getComponentsOf (type) {

        if (type.__proto__ !== Component) {
            throw new TypeError('Components must inherit from the Component class')
        }

        return components.get(type);
    }
}
