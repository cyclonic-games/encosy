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
entities and their components. It has two getters that allow you to access the
current components and entities.

- `components`
- `entities`

```JavaScript
import { World } from '@eclipse-games/encosy';

const world = new World();
```

--------------------------------------------------------------------------------

### `Component`
The `Component` class is used to define the data model for a component. The
available types are as follows:

- `any`
- `array`
- `boolean`
- `map`
- `number`
- `object`
- `set`
- `string`
- `symbol`

```JavaScript
import { Component } from '@eclipse-games/encosy';

const FooComponent = new Component({
    foo: Component.types.string,
    bar: Component.types.number
});

export default FooComponent;
```

Once you've defined a component type, you must register it with the world. This
is as simple as the following:

```JavaScript
FooComponent.register(world);
```

--------------------------------------------------------------------------------

### `Entity`
The `Entity` class is a factory that accepts a dictionary of an accessor string,
and a component class, It's what creates the unique ID that is the entity, and
creates a relationship between it and components.

```JavaScript
import { Entity } from '@eclipse-games/encosy';
import FooComponent from 'somewhere';

const FooEntity = new Entity({
    baz: FooComponent
});

export default FooEntity;
```

Once you've created an entity type and its require component types, you can
create, and wire up and actual entity:

```JavaScript
import FooEntity from 'somewhere';

FooEntity.create(world, {
    baz: {
        foo: 'hello',
        bar: 1
    }
});
```

--------------------------------------------------------------------------------

### `System`
The `System` class is used to define the actual logic that brings the components
of an entity together. The first argument is an iterable containing the required
components that an entity must have in order for the system to act upon it. The
second argument is a callback that is the actual system's code. It should accept
the world and a single entity.

```JavaScript
import { System } from '@eclipse-games/encosy';

const FooSystem = new System([ MyComponent ], (world, entity) => {
    // access components via world.components
});

export default FooSystem;
```

Once a system has been defined, you can run it via its `run` method:

```JavaScript
import FooSystem from 'somewhere';

// access entities via world.entities

FooSystem.run(world, entity);
```
