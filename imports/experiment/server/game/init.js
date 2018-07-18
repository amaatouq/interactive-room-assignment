import { stepOneData, stepTwoData } from "./constants";

// //// Avatar stuff //////
const names = ["Blue", "Green", "Pink", "Yellow"]; // for the players names to match avatar color
const avatarNames = ["Colton", "Aaron", "Alex", "Tristan"]; // to do more go to https://jdenticon.com/#icon-D3
const nameColor = ["#3D50B7", "#70A945", "#DE8AAB", "A59144"]; // similar to the color of the avatar

export const init = (treatment, players) => {
  console.log("Game with a treatment: ", treatment, " will start");

  //we don't know the sequence yet
  let taskSequence = treatment.StepOne ? stepOneData : stepTwoData;

  if (treatment.taskOrder === "shuffle") {
    //TODO: I need to make sure that I keep the first task fixed (if it has training)
    //taskSequence = _.shuffle(taskSequence); //this is full shuffle
    taskSequence = customShuffle(taskSequence); //this is with keeping the first practice round fixed
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

  console.log(taskSequence);
  // in this game we have stages per round and the very first stage is practice
  _.times(taskSequence.length, i => {
    stages.push({
      name: i === 0 ? "practice" : i,
      displayName: taskSequence[i].difficulty,
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

// fix the first practice task and shuffle the rest
//to learn more:
//https://stackoverflow.com/questions/50536044/swapping-all-elements-of-an-array-except-for-first-and-last
function customShuffle(taskSequence) {
  // Find and remove first and last:
  const practiceTask = taskSequence[0];

  const firstIndex = taskSequence.indexOf(practiceTask);

  if (firstIndex !== -1) {
    taskSequence.splice(firstIndex, 1);
  }

  // Normal shuffle with the remaining elements using ES6:
  for (let i = taskSequence.length - 1; i > 0; --i) {
    const j = Math.floor(Math.random() * (i + 1));

    [taskSequence[i], taskSequence[j]] = [taskSequence[j], taskSequence[i]];
  }

  // Add them back in their new position:
  if (firstIndex !== -1) {
    taskSequence.unshift(practiceTask);
  }

  return taskSequence;
}
