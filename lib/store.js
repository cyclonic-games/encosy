import Map from 'std/Map';
import WeakSet from 'std/WeakSet';

export default new Map([
    [ 'serial', 0 ],
    [ 'entities', new Map() ],
    [ 'components', new Map() ],
    [ 'systems', new WeakSet() ]
]);
