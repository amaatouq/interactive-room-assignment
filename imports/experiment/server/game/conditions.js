import SimpleSchema from "simpl-schema";

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
  StepOne: {
    description: "SequenceOne of 5 tasks or SequenceTwo of 6 tasks",
    type: Boolean,
  },
  taskOrder: {
      description: "How to do the sequence to be ordered",
      type: String,
      regEx: /[a-zA-Z]+/,
      allowedValues: ["order","shuffle", "reverse"],
      optional: true
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
