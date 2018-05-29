```
     ______/           ______/            ______/
    /                 /                  /
   _____/   ____  /  /         ____  /  ____  /   /      /
  /        /     /  /         /     /        /  /      /
_______/ _/    _/ ________/ _______/ _______/ ______  /
                                                     /
          (c) 2018 Cyclonic Games              _____/
```
Lightweight Entity/ Component/ System implementation in JavaScript

### `// Installation`

```
npm install cyclone-games/encosy --save
```

### `// Introduction`
Entity/ Component/ System architectures are an alternative to OOP for game
development. The main idea is to help prevent having massive hierarchal trees
of inheritance when dealing with game entities.

##### Entities
Entities are essentially just a unique identifier that components can reference
in order to, as a group, describe an 'object'.

##### Components
Components are strictly data. They contain properties that systems can act upon.

##### Systems
Systems are where your actual logic lives. They validate whether or not an
entity contains all of the required components, and then acts accordingly.

### `// Usage`
The API is very lightweight and simple to use

#### `Component`

```javascript
new Component(String, Object<String, Function>)
```

The `Component` class is used to define the data model for a component. The
available types are as follows:

**Example** *(~/components/position.js)*

```javascript
import { Component } from 'encosy';

export default new Component('position', {
    x: Number,
    y: Number
});
```

If you need to dynamically add to a component's model, you may `extend` it:

```javascript
import position from '~/components/position';

position.extend({
    z: Number
});
```

--------------------------------------------------------------------------------

#### `Entity`

```javascript
new Entity(String, Array<Component>)
```

The `Entity` class is a factory that accepts a dictionary of an accessor string,
and a component class, It's what creates the unique ID that is the entity, and
creates a relationship between it and components.

**Example** *(~/entities/character.js)*

```javascript
import { Entity } from 'encosy';
import position from '~/components/position';
import sprite from '~/components/sprite';

export default new Entity('character', [
    position,
    sprite
]);
```
Then, to create a character, you would do:

```javascript
import character from '~/entities/character';

const char = character.create({
    position: {
        x: 0,
        y: 0
    },
    sprite: { ... }
});
```

If you need to dynamically add components to an entity, you can `extend` it:

```javascript
import character from '~/entities/character';
import health from '~/components/health';

character.extend([
    health
]);
```

If you'd like to then delete a character, which would then also allow its
components to be garbage collected (if you have no other strong references),
you would do:

```javascript
character.destroy(char)
```

--------------------------------------------------------------------------------

#### `System`

```javascript
new System(String, Array<Component>, Function)
```

The `System` class is used to define the actual logic that brings the components
of an entity together. The first argument is an array containing the required
components that an entity must have in order for the system to act upon it. The
second argument is a callback that is the actual system's code. It should accept
the world and a single entity.

**Example** *(~/systems/render.js)*

```javascript
import { System } from 'encosy';
import position from '~/components/position';
import sprite from '~/components/sprite';

export default new System('render', [ position, sprite ], entity => {
    const { x, y } = position.of(entity);
    const { data } = sprite.of(entity);

    // render character using data from components...
});
```

As you can see, to get a position of an entity, you would use the `of` method.
This works similarly in concept to reflection, though it's not totally the same
thing.

Then, to run the render system, you would call its `run` method:

```javascript
import character from '~/entities/character';
import render from '~/systems/render';

character.forEach(char => render.run(char));
```

If you'd like to dynamically add more code to a system, you can `extend` it:

```javascript
import render from '~/systems/render';

render.extend(entity => {
    // do more to the entity
});
```
