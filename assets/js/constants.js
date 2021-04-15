'use strict';

const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const LINES_PER_LEVEL = 10;

const COLORS = [
  'none',
  'cyan',
  'blue',
  'orange',
  'yellow',
  'green',
  'purple',
  'red'
];

//Creation of the pieces
const SHAPES = [
  // empty arr for the random color
  [],
  // letter I
  [[0, 0, 0, 0], 
   [1, 1, 1, 1], 
   [0, 0, 0, 0], 
   [0, 0, 0, 0]
  ],

  //letter L
  [[2, 0, 0], 
   [2, 2, 2], 
   [0, 0, 0]
  ],

  //letter J
  [[0, 0, 3], 
   [3, 3, 3], 
   [0, 0, 0]
  ],

  //letter O
  [[4, 4], 
   [4, 4]
  ],

  //letter S
  [[0, 5, 5], 
   [5, 5, 0], 
   [0, 0, 0]
  ],

  //letter T
  [[0, 6, 0], 
   [6, 6, 6], 
   [0, 0, 0]
  ],

  //letter Z
  [[7, 7, 0],
   [0, 7, 7],
   [0, 0, 0]
  ]
];

// creation of keyboard keys to use the keycode event
const KEY = {
  ESC: 27,
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  P: 80,
  Q: 81
};

//set values for the scoring
const POINTS = {
  SINGLE: 100,
  DOUBLE: 300,
  TRIPLE: 500,
  TETRIS: 800,
  SOFT_DROP: 1,
  HARD_DROP: 2,
};

//const for the lowering speed of the pieces according to the level
const LEVEL = {
  0: 800, // level 0 ; 800ms 
  1: 720, // level 1 ; 720ms
  2: 630, // level 2 ; 630ms
  3: 550, // level 3 ; 550ms
  4: 470, // level 4 ; 470ms
  5: 380, // level 5 ; 380ms
  6: 300, // level 6 ; 300ms
  7: 220, // level 7 ; 220ms
  8: 130, // level 8 ; 130ms
  9: 100, // level 9 ; 100ms
  10: 80, // level 10;  80ms
  11: 70, // level 11;  70ms
  12: 70, // level 12;  70ms
  13: 50, // level 13;  50ms
  14: 50, // level 14;  50ms
  15: 30, // level 15;  30ms
};

const ROTATION = {
  RIGHT: 'right'
};

[COLORS, SHAPES, KEY, POINTS, LEVEL, ROTATION].forEach(item => Object.freeze(item));
