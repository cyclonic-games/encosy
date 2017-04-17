import { worlds } from './world';

const { Number/*, Object*/ } = global;

export default class Entity {

    constructor (components) {
        this.components = components;
    }

    create (world, data) {
        const serial = worlds.get(world).get('serial');
        const entity = new Number(serial);

        for (const [ accessor, type ] of Object.entries(this.components)) {
            const component = type.create(world, data[ accessor ]);
            const componentMap = worlds.get(world).get('components').get(type);

            componentMap.set(entity, component);
        }

        worlds.get(world).set('serial', serial + 1);
        worlds.get(world).get('entities').add(entity);

        return entity;
    }
}
