import { stepOneData, stepTwoData } from "./constants";

// //// Avatar stuff //////
// const names = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split(""); //for the players names (we will call them A, B, C etc)
const names = ["Blue", "Green", "Pink", "Yellow"]; // for the players names to match avatar color
const avatarNames = ["Colton", "Aaron", "Alex", "Tristan"]; // to do more go to https://jdenticon.com/#icon-D3
const nameColor = ["#3D50B7", "#70A945", "#DE8AAB", "A59144"]; // similar to the color of the avatar

export const init = (treatment, players) => {
  console.log("Game with a treatment: ", treatment, " will start");

  //we don't know the sequence yet
  let taskSequence = treatment.taskSequence === 1 ? stepOneData : stepTwoData;

  if (treatment.taskOrder === "shuffle") {
    taskSequence = _.shuffle(taskSequence);
  }
  if (treatment.taskOrder === "reverse") {
    console.log("reversing the order of the tasks");
    //the .slice() so it does not mutate the actually array (i.e., next time it seems to effect the server code)
    taskSequence = taskSequence.slice().reverse();
  }

  players.forEach((player, i) => {
    player.set("name", names[i]);
    player.set("avatar", `/avatars/jdenticon/${avatarNames[i]}`);
    player.set("nameColor", nameColor[i]);
    player.set("cumulativeScore", 0);
    player.set("bonus", 0);
  });

  const rounds = [];
  const stages = [];

  // in this game we have stages per round
  _.times(taskSequence.length, i => {
    stages.push({
      name: i + 1,
      displayName: "Round " + (i + 1) + "(" + taskSequence[i].difficulty + ")", //name of stage is: Round 1 (hard)
      durationInSeconds: treatment.stageDuration,
      task: taskSequence[i]
    });
  });

  rounds.push({
    stages
  });

  return {
    rounds,
    players
  };
};
