import SimpleSchema from "simpl-schema";
import {taskData} from "./constants";

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
  nRounds: {
    description:
      "The number of rounds in the game (can't be more than the number of tasks)",
    type: SimpleSchema.Integer,
    min: 0,
    max: taskData.length
  },
  basePay: {
    description:
      "The amount for base pay (i.e., showing up and completing the experiment)",
    type: Number,
    min: 0,
    max: 10
  }
};
