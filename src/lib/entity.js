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
            type.create(world, entity, data[ accessor ]);
        }

        worlds.get(world).set('serial', serial + 1);
        worlds.get(world).get('entities').add(entity);

        return entity;
    }
}
