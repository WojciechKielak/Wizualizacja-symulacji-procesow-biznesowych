import { Edge, Node, ClusterNode } from '@swimlane/ngx-graph';

export const nodes: Node[] = [
  {
    id: 'a',
    label: 'Kork 1'
    ,data: {shape: 'circle', d1:5 , d2:4 , d3:2}
  }, {
    id: 'b',
    label: 'B krok 1 fsd fsdf dsf d'
    ,data: {shape: 'diamond', gate:"xor"}
  }, {
    id: 'c',
    label: 'C krok 2'
    ,data: {d1:5 , d2:400 , d3:2, task:"user"}
  }, {
    id: 'd',
    label: 'D krok 3'
    ,data: {d1:5 , d2:4 , d3:2, task:"manual"}
  }
  , {
    id: 'e',
    label: 'O'
    ,data: {shape: 'diamond', gate:"or"}
  }
  , {
    id: 'f',
    label: 'D krok 5'
    ,data: {d1:5 , d2:4 , d3:2}
  }
  , {
    id: 'g',
    label: 'D krok 6'
    ,data: {d1:5 , d2:4 , d3:2, task:"service"}
  }
  , {
    id: 'h',
    label: 'D krok 7'
    ,data: {shape: 'diamond', gate:'and', d1:5 , d2:4 , d3:2}
  }
  , {
    id: 'i',
    label: 'D krok 8'
    ,data: {d1:5 , d2:4 , d3:2}
  }
  , {
    id: 'j',
    label: 'D krok 9'
    ,data: {d1:5 , d2:4 , d3:2}
  }
  , {
    id: 'k',
    label: 'D krok 10'
    ,data: {d1:5 , d2:4 , d3:2}
  }
  , {
    id: 'l',
    label: 'D krok 11'
    ,data: {d1:5 , d2:4 , d3:2}
  }
  , {
    id: 'k1',
    label: 'koniec'
    ,data: {d1:5 , d2:4 , d3:2}
  }
];

export const clusters: ClusterNode[] = [
  {
    id: 'third',
    label: 'third',
    childNodeIds: ['a', 'b','f','l','k1']
  },{
    id: 'third2',
    label: 'third2',
    childNodeIds: ['c','e','g','h','k']
  }
  ,{
    id: 'third3',
    label: 'third3',
    childNodeIds: ['d', 'b','i','j']
  }
]

export const links: Edge[] = [
  {
    source: 'a',
    target: 'b',
  }, {
    source: 'b',
    target: 'c',
  }, {
    source: 'c',
    target: 'd',
  }, {
    source: 'd',
    target: 'e',
  }
  , {
    source: 'e',
    target: 'f',
  }
  , {
    source: 'e',
    target: 'g',
  }
  , {
    source: 'g',
    target: 'h',
  }
  , {
    source: 'h',
    target: 'i',
  }
  , {
    source: 'h',
    target: 'e',
  }
  , {
    source: 'i',
    target: 'j',
  }
  , {
    source: 'j',
    target: 'k',
  }
  , {
    source: 'k',
    target: 'l',
  }
  , {
    source: 'f',
    target: 'b',
  }
  , {
    source: 'l',
    target: 'k1',
  }
];


export const nodess: Node[] = [
  {
    id: 'first',
    label: 'A',
    data: {shape: 'circle', color2:'green',d1:0 , d2:10 , d3:20, task:'user'},
    position: {x:100,y:100},
  }, {
    id: 'second',
    label: 'B',
    data: {shape: 'diamond', color:'green'},
  }, {
    id: 'c1',
    label: 'C1',
    data: { color:'green',d1:0 , d2:10 , d3:20,
    imageUrl:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg=='
        }
  }, {
    id: 'c2',
    label: 'C2',
    data: {d1:7 , d2:40 , d3:37}
  }, {
    id: 'd',
    label: 'Dssssssssssss',
    data: {d1:5 , d2:4 , d3:2}
  }
  , {
    id: 'e',
    label: 'E',
    data: {d1:6 , d2:7 , d3:8}
  }
  , {
    id: 'f',
    label: 'f gsdx',
    data: {d1:6 , d2:7 , d3:8}
  }, {
    id: 'g',
    label: 'G'
  }
];

export const clusterss: ClusterNode[] = [
  {
    id: 'third',
    label: 'Cluster node1',
    childNodeIds: ['e','g'],
  
  },
  {
    id: 'third2',
    label: 'Cluster node2',
    childNodeIds: [ 'f','first'],
  }
  ,
  {
    id: 'third3',
    label: 'Cluster node3',
    childNodeIds: [ 'd','second','c1', 'c2'],
   
  }
]

export const linkss: Edge[] = [
  {
    id: 'a',
    source: 'first',
    target: 'second',
    label: 'is parent of'
  }, {
    id: 'b',
    source: 'first',
    target: 'c1',
    label: 'custom label'
  }, {
    id: 'd',
    source: 'first',
    target: 'c2',
    label: 'custom label'
  }, {
    id: 'e',
    source: 'c1',
    target: 'd',
    label: 'first link'
  }
  , {
    source: 'd',
    target: 'e',
  }
  // , {
  //   source: 'first',
  //   target: 'f',
  // }
  , {
    source: 'd',
    target: 'f',
  }
  , {
    source: 'f',
    target: 'second',
  }
  , {
    source: 'second',
    target: 'c1',
  }
  , {
    source: 'e',
    target: 'g',
  }
];