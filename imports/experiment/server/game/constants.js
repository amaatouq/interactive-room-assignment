// The task data can go here

// student names
const studentNames = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// room numbers
const roomNumbers = _.range(101, 111);

// constraint types
const constraintTypes = {
  0: "must live in the same room",
  1: "can't live in the same room",
  2: "must be neighbors",
  3: "can't live in the same room or be neighbors"
};

// // // we will use this one in the instruction example
export const exampleTaskData = {
  _id: 0,
  optimal: 220,
  difficulty: "easy",
  students: studentNames.slice(0, 4), // how many students
  rooms: roomNumbers.slice(0, 3), // how many rooms
  constraints: [
    {
      _id: 0, // i.e., A and B can't live in the same room or be neighbors.
      pair: ["A", "B"],
      type: 3,
      text: constraintTypes[3]
    },
    {
      _id: 1, // i.e., B and C must live in the same room.
      pair: ["B", "C"],
      type: 0,
      text: constraintTypes[0]
    }
  ],
  payoff: {
    // the payoff of placing Student i in Room j (e.g., `payoff[i][j]`)
    A: { 101: 20, 102: 80, 103: 65 },
    B: { 101: 67, 102: 90, 103: 76 },
    C: { 101: 85, 102: 82, 103: 79 },
    D: { 101: 20, 102: 75, 103: 78 }
  }
};

export const easyTaskData = [
  {
    _id: 1,
    optimal: 517,
    difficulty: "easy",
    computeTime: 0.67,
    students: studentNames.slice(0, 6), // how many students
    rooms: roomNumbers.slice(0, 4), // how many rooms
    constraints: [
      {
        _id: 0, //  A and D can’t live together
        pair: ["A", "D"],
        type: 1,
        text: constraintTypes[1]
      },
      {
        _id: 1, // D and F can’t live together or be neighbors
        pair: ["D", "F"],
        type: 3,
        text: constraintTypes[3]
      }
    ],
    payoff: {
      A: { "101": 36, "102": 92, "103": 86, "104": 24 },
      B: { "101": 60, "102": 91, "103": 33, "104": 65 },
      C: { "101": 42, "102": 74, "103": 50, "104": 87 },
      D: { "101": 43, "102": 74, "103": 44, "104": 55 },
      E: { "101": 60, "102": 48, "103": 72, "104": 89 },
      F: { "101": 79, "102": 100, "103": 34, "104": 90 }
    }
  },
  {
    _id: 2,
    optimal: 444,
    difficulty: "easy",
    computeTime: 0.19,
    students: studentNames.slice(0, 6), // how many students
    rooms: roomNumbers.slice(0, 4), // how many rooms
    constraints: [
      {
        _id: 0, // A and B must live together
        pair: ["A", "B"],
        type: 0,
        text: constraintTypes[0]
      },
      {
        _id: 1, // A and C can’t live together
        pair: ["A", "C"],
        type: 1,
        text: constraintTypes[1]
      }
    ],
    payoff: {
      A: { "101": 26, "102": 55, "103": 39, "104": 27 },
      B: { "101": 52, "102": 21, "103": 69, "104": 36 },
      C: { "101": 33, "102": 47, "103": 76, "104": 69 },
      D: { "101": 87, "102": 38, "103": 28, "104": 61 },
      E: { "101": 43, "102": 90, "103": 52, "104": 96 },
      F: { "101": 43, "102": 84, "103": 83, "104": 42 }
    }
  },
  {
    _id: 3,
    optimal: 549,
    difficulty: "easy",
    computeTime: 0.55,
    students: studentNames.slice(0, 6), // how many students
    rooms: roomNumbers.slice(0, 4), // how many rooms
    constraints: [
      {
        _id: 0, // C and D can’t live together
        pair: ["C", "D"],
        type: 1,
        text: constraintTypes[1]
      },
      {
        _id: 1, // E and F must be neighbors
        pair: ["E", "F"],
        type: 2,
        text: constraintTypes[2]
      }
    ],
    payoff: {
      A: { "101": 33, "102": 87, "103": 66, "104": 75 },
      B: { "101": 70, "102": 28, "103": 74, "104": 93 },
      C: { "101": 52, "102": 33, "103": 77, "104": 82 },
      D: { "101": 42, "102": 94, "103": 20, "104": 97 },
      E: { "101": 100, "102": 72, "103": 98, "104": 34 },
      F: { "101": 90, "102": 72, "103": 91, "104": 95 }
    }
  }
];

export const hardTaskData = [
  {
    _id: 4,
    optimal: 672,
    difficulty: "hard",
    computeTime: 20,
    students: studentNames.slice(0, 9), // how many students
    rooms: roomNumbers.slice(0, 6), // how many rooms
    constraints: [
      {
        _id: 0, //  A and B must be neighbors
        pair: ["A", "B"],
        type: 2,
        text: constraintTypes[2]
      },
      {
        _id: 1, // A and D can’t live together or be neighbors
        pair: ["A", "D"],
        type: 3,
        text: constraintTypes[3]
      },
      {
        _id: 2, // A and G can’t live together or be neighbors
        pair: ["A", "G"],
        type: 3,
        text: constraintTypes[3]
      },
      {
        _id: 3, // C and D must live together
        pair: ["C", "D"],
        type: 0,
        text: constraintTypes[0]
      },
      {
        _id: 4, //	C and F must be neighbors
        pair: ["C", "F"],
        type: 2,
        text: constraintTypes[2]
      },
      {
        _id: 5, // C and G can’t live together or be neighbors
        pair: ["C", "G"],
        type: 3,
        text: constraintTypes[3]
      },
      {
        _id: 6, // D and G can’t live together
        pair: ["D", "G"],
        type: 1,
        text: constraintTypes[1]
      },
      {
        _id: 7, // H and I can’t live together or be neighbors
        pair: ["H", "I"],
        type: 3,
        text: constraintTypes[3]
      }
    ],
    payoff: {
      A: { "101": 27, "102": 61, "103": 67, "104": 40, "105": 74, "106": 52 },
      B: { "101": 97, "102": 46, "103": 41, "104": 56, "105": 43, "106": 71 },
      C: { "101": 23, "102": 35, "103": 80, "104": 39, "105": 92, "106": 58 },
      D: { "101": 87, "102": 32, "103": 79, "104": 93, "105": 68, "106": 49 },
      E: { "101": 34, "102": 69, "103": 77, "104": 96, "105": 38, "106": 53 },
      F: { "101": 98, "102": 72, "103": 76, "104": 92, "105": 31, "106": 66 },
      G: { "101": 57, "102": 26, "103": 39, "104": 75, "105": 21, "106": 43 },
      H: { "101": 61, "102": 59, "103": 36, "104": 65, "105": 20, "106": 41 },
      I: { "101": 58, "102": 23, "103": 60, "104": 38, "105": 45, "106": 33 }
    }
  },
  {
    _id: 5,
    optimal: 623,
    difficulty: "hard",
    computeTime: 36.5,
    students: studentNames.slice(0, 9), // how many students
    rooms: roomNumbers.slice(0, 6), // how many rooms
    constraints: [
      {
        _id: 0, //  A and B must be neighbors
        pair: ["A", "B"],
        type: 3,
        text: constraintTypes[3]
      },
      {
        _id: 1, // A and C must be neighbors
        pair: ["A", "C"],
        type: 2,
        text: constraintTypes[2]
      },
      {
        _id: 2, //	A and D must be neighbors
        pair: ["A", "D"],
        type: 2,
        text: constraintTypes[2]
      },
      {
        _id: 3, // B and C can’t live together or be neighbors
        pair: ["B", "C"],
        type: 3,
        text: constraintTypes[3]
      },
      {
        _id: 4, //	B and E must live together
        pair: ["B", "E"],
        type: 0,
        text: constraintTypes[0]
      },
      {
        _id: 5, // B and G must be neighbors
        pair: ["B", "G"],
        type: 2,
        text: constraintTypes[2]
      },
      {
        _id: 6, // C and D can’t live together or be neighbors
        pair: ["C", "D"],
        type: 3,
        text: constraintTypes[3]
      },
      {
        _id: 7, // D and F can’t live together
        pair: ["D", "F"],
        type: 1,
        text: constraintTypes[1]
      }
    ],
    payoff: {
      A: { "101": 62, "102": 61, "103": 64, "104": 58, "105": 30, "106": 48 },
      B: { "101": 59, "102": 77, "103": 51, "104": 97, "105": 57, "106": 69 },
      C: { "101": 34, "102": 64, "103": 80, "104": 35, "105": 38, "106": 51 },
      D: { "101": 54, "102": 68, "103": 65, "104": 26, "105": 61, "106": 75 },
      E: { "101": 58, "102": 44, "103": 75, "104": 52, "105": 80, "106": 38 },
      F: { "101": 34, "102": 39, "103": 48, "104": 21, "105": 33, "106": 45 },
      G: { "101": 79, "102": 84, "103": 36, "104": 86, "105": 34, "106": 52 },
      H: { "101": 76, "102": 42, "103": 33, "104": 88, "105": 39, "106": 47 },
      I: { "101": 69, "102": 54, "103": 49, "104": 46, "105": 38, "106": 32 }
    }
  },
  {
    _id: 6,
    optimal: 631,
    difficulty: "hard",
    computeTime: 29.58,
    students: studentNames.slice(0, 9), // how many students
    rooms: roomNumbers.slice(0, 6), // how many rooms
    constraints: [
      {
        _id: 0, // A and D can’t live together or be neighbors
        pair: ["A", "D"],
        type: 3,
        text: constraintTypes[3]
      },
      {
        _id: 1, // A and F must be neighbors
        pair: ["A", "F"],
        type: 2,
        text: constraintTypes[2]
      },
      {
        _id: 2, //	A and G must live together
        pair: ["A", "G"],
        type: 0,
        text: constraintTypes[0]
      },
      {
        _id: 3, // B and C can’t live together or be neighbors
        pair: ["B", "C"],
        type: 3,
        text: constraintTypes[3]
      },
      {
        _id: 4, // B and D must be neighbors
        pair: ["B", "D"],
        type: 2,
        text: constraintTypes[2]
      },
      {
        _id: 5, // C and I can’t live together or be neighbors
        pair: ["C", "I"],
        type: 3,
        text: constraintTypes[3]
      },
      {
        _id: 6, // D and H can’t live together or be neighbors
        pair: ["D", "H"],
        type: 3,
        text: constraintTypes[3]
      },
      {
        _id: 7, // E and F must live together
        pair: ["E", "F"],
        type: 0,
        text: constraintTypes[0]
      }
    ],
    payoff: {
      A: { "101": 33, "102": 28, "103": 50, "104": 65, "105": 25, "106": 67 },
      B: { "101": 71, "102": 23, "103": 75, "104": 88, "105": 36, "106": 64 },
      C: { "101": 44, "102": 52, "103": 66, "104": 80, "105": 55, "106": 35 },
      D: { "101": 36, "102": 93, "103": 88, "104": 61, "105": 94, "106": 71 },
      E: { "101": 22, "102": 69, "103": 94, "104": 22, "105": 43, "106": 87 },
      F: { "101": 89, "102": 70, "103": 28, "104": 48, "105": 85, "106": 53 },
      G: { "101": 67, "102": 36, "103": 20, "104": 24, "105": 59, "106": 42 },
      H: { "101": 57, "102": 74, "103": 62, "104": 40, "105": 82, "106": 85 },
      I: { "101": 49, "102": 65, "103": 33, "104": 62, "105": 71, "106": 46 }
    }
  }
];
