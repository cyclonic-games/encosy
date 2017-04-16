# Encosy
Lightweight Entity/ Component/ System implementation in JavaScript

## Installation

```
npm install @eclipse-games/encosy --save
```

## Introduction
Entity/ Component/ System architectures are an alternative to OOP for game
development. The main idea is to help prevent having massive hierarchal trees
of inheritance when dealing with game entities.

#### Entities
Entities are essentially just a unique identifier that components can reference
in order to, as a group, describe an object.

#### Components
Components are strictly data. They contain properties that systems can act upon.

#### Systems
Systems are where your actual logic lives. They validate whether or not an
entity contains all of the required components, and then acts accordingly.

## Usage
The API is very lightweight and simple to use

### `World`
The `World` class is the interface that you use to describe all current
entities and their components. It has the following methods:

- `addEntity(Entity)`
 - Adds an instance of Entity to the entities `Set`
- `removeEntity(Entity)`
 - Removes an instance of Entity from the entities `Set`
- `registerComponent(ComponentType)`
 - Adds a component class to the components `Map` with a `WeakMap` for a value
- `getComponentsOf(ComponentType)`
 - Retrieves the component type's `WeakMap`

```JavaScript
import { World } from '@eclipse-games/encosy';

const world = new World();
```

### `Component`
The `Component` class is empty; it is used to ensure a consistent API.
```JavaScript
import { Component } from '@eclipse-games/encosy';

export default class MyComponent extends Component {
    // ...
}

world.registerComponent(MyComponent);
```

### `Entity`
The `Entity` class is empty; it is used to ensure a consistent API. It is also
used as the keys of a component's type's `WeakMap`. This means that whenever an
entity is deleted, the `WeakMap` will allow it to be garbage collected,
preventing a possible memory leak.
```JavaScript
import { Entity } from '@eclipse-games/encosy';

export default {

    create (world, { myComponent }) {
        const entity = world.addEntity(new Entity());

        world.getComponentsOf(MyComponent).set(entity, new MyComponent(myComponent));

        return entity;
    }
}
```

### `System`
The `System` class is used to define the actual logic that brings the components
of an entity together. The first argument is an iterable containing the required
components that an entity must have in order for the system to act upon it. The
second argument is a callback that is the actual system's code. It should accept
the world and a single entity.
```JavaScript
import { System } from '@eclipse-games/encosy';

export default new System([ MyComponent ], (world, entity) => {
    const myComponent = world.getComponentsOf(MyComponent).get(entity);

    // ...
})
```
