import SimpleSchema from "simpl-schema";
import { easyTaskData, hardTaskData } from "./constants";

export const conditions = {
  playerCount: {
    description: "The Number of players participating in the given game",
    type: SimpleSchema.Integer,
    min: 1,
    max: 100
  },
  stageDuration: {
    description: "Specifies how many seconds for each decision stage",
    type: SimpleSchema.Integer,
    min: 5,
    max: 10000
  },
  taskSequence: {
    description: "SequenceOne of 5 tasks or SequenceTwo of 6 tasks",
    type: SimpleSchema.Integer,
    min: 1,
    max: 2
  },
  taskOrder: {
      description: "How to do the sequence to be ordered (easy-hard; hard-easy only with sequence 2)",
      type: String,
      regEx: /[a-zA-Z]+/,
      allowedValues: ["order","shuffle", "reverse"],
      optional: true
  },
  nRounds: {
    description:
      "The number of rounds in the game (can't be more than the number of tasks)",
    type: SimpleSchema.Integer,
    min: 1,
    max: 6
  },
  basePay: {
    description:
      "The amount for base pay (i.e., showing up and completing the experiment)",
    type: Number,
    min: 0,
    max: 10
  },
  conversionRate:{
    description:
      "This will be multiplied by their total score to compute the bonus",
    type: Number,
    min: 0,
    max: 10
  },
  optimalSolutionBonus:{
    description:
      "For each optimal solution, what is the additional bonus? (in dollars)",
    type: Number,
    min: 0,
    max: 10
  }
};
