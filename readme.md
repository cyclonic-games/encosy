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

```JavaScript
new World()
```

The `World` class is the interface that you use to describe all current
entities and their components. It has two getters that allow you to access the
current components and entities. 

*(these getters return new objects that contain entities/components. If you add or remove items from these new objects, they will not be reflected in the world)*

- `components` returns a `Map`
- `entities` returns a `Set`

*Example*

```JavaScript
import { World } from '@eclipse-games/encosy';

const world = new World();
const { components, entities } = world;

// do stuff with entities and components...
```

--------------------------------------------------------------------------------

### `Component`

```JavaScript
new Component(Object<String, Function>)
```

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

**Example** *(~/components/position.js)*

```JavaScript
import { Component } from '@eclipse-games/encosy';

export default new Component({
    x: Component.types.number,
    y: Component.types.number
});
```

--------------------------------------------------------------------------------

### `Entity`

```JavaScript
new Entity(Object<String, Component>)
```

The `Entity` class is a factory that accepts a dictionary of an accessor string,
and a component class, It's what creates the unique ID that is the entity, and
creates a relationship between it and components.

**Example** *(~/entities/character.js)*

```JavaScript
import { Entity } from '@eclipse-games/encosy';
import position from '~/components/position';
import sprite from '~/components/sprite';

export default new Entity({
    position,
    sprite
});
```
Then, to create a character, you would do:

```JavaScript
import character from '~/entities/character';

character.create({
    position: {
        x: 0,
        y: 0
    },
    sprite: { ... }
});
```

--------------------------------------------------------------------------------

### `System`

```JavaScript
new System(Array<Component>, Function)
```

The `System` class is used to define the actual logic that brings the components
of an entity together. The first argument is an iterable containing the required
components that an entity must have in order for the system to act upon it. The
second argument is a callback that is the actual system's code. It should accept
the world and a single entity.

**Example** *(~/systems/render.js)*

```JavaScript
import { System } from '@eclipse-games/encosy';
import position from '~/components/position';
import sprite from '~/components/sprite';

export default new System([ position, sprite ], (world, entity) => {
    const { components } = world;
    const { x, y } = components.get(position).get(entity);
    const { data } = components.get(sprite).get(entity);
    
    // render character using data from components...
});
```

Then, to run the render system, you would call its `run` method:

```JavaScript
import render from '~/systems/render';

render.run(world, entity);
```
