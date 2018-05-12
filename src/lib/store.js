import Map from 'std/Map';
import Set from 'std/Set';

export default new Map([
    [ 'serial', 0 ],
    [ 'entities', new Map() ],
    [ 'components', new Map() ],
    [ 'systems', new Set() ]
]);
