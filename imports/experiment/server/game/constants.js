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

export const taskData = [
  {
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
  },
  {
    _id: 0,
    optimal: 220,
    difficulty: "easy",
    students: studentNames.slice(0, 9), // how many students
    rooms: roomNumbers.slice(0, 8), // how many rooms
    constraints: [
      {
        _id: 0,
        pair: ["A", "B"],
        type: 3,
        text: constraintTypes[3]
      },
      {
        _id: 1,
        pair: ["B", "I"],
        type: 2,
        text: constraintTypes[2]
      },
      {
        _id: 2,
        pair: ["A", "C"],
        type: 0,
        text: constraintTypes[0]
      },
      {
        _id: 3,
        pair: ["A", "C"],
        type: 1,
        text: constraintTypes[1]
      },
      {
        _id: 4,
        pair: ["B", "H"],
        type: 3,
        text: constraintTypes[3]
      },
      {
        _id: 5,
        pair: ["F", "G"],
        type: 1,
        text: constraintTypes[1]
      },
      {
        _id: 6,
        pair: ["B", "I"],
        type: 0,
        text: constraintTypes[0]
      }
    ],
    payoff: {
      A: {
        101: 20,
        102: 80,
        103: 65,
        104: 39,
        105: 34,
        106: 80,
        107: 304,
        108: 212
      },
      B: {
        101: 67,
        102: 90,
        103: 76,
        104: 39,
        105: 34,
        106: 80,
        107: 304,
        108: 31
      },
      C: {
        101: 85,
        102: 82,
        103: 79,
        104: 39,
        105: 32,
        106: 80,
        107: 304,
        108: 12
      },
      D: {
        101: 20,
        102: 75,
        103: 78,
        104: 39,
        105: 34,
        106: 412,
        107: 304,
        108: 212
      },
      E: {
        101: 20,
        102: 75,
        103: 78,
        104: 39,
        105: 31,
        106: 80,
        107: 304,
        108: 212
      },
      F: {
        101: 20,
        102: 75,
        103: 78,
        104: 39,
        105: 2,
        106: 80,
        107: 23,
        108: 11
      },
      G: {
        101: 20,
        102: 75,
        103: 78,
        104: 39,
        105: 34,
        106: 80,
        107: 304,
        108: 212
      },
      H: {
        101: 20,
        102: 75,
        103: 78,
        104: 39,
        105: 34,
        106: 80,
        107: 343,
        108: 31
      },
      I: {
        101: 20,
        102: 75,
        103: 78,
        104: 39,
        105: 34,
        106: 80,
        107: 304,
        108: 212
      }
    }
  }
];
