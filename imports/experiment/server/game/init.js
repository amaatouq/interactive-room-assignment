import { easyTaskData, hardTaskData } from "./constants";

// //// Avatar stuff //////
// const names = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split(""); //for the players names (we will call them A, B, C etc)
const names = ["Blue", "Green", "Pink", "Yellow"]; // for the players names to match avatar color
const avatarNames = ["Colton", "Aaron", "Alex", "Tristan"]; // to do more go to https://jdenticon.com/#icon-D3
const nameColor = ["#3D50B7", "#70A945", "#DE8AAB", "A59144"]; // similar to the color of the avatar

export const init = (treatment, players) => {
  console.log("Game with a treatment: ", treatment, " will start");

  // shuffle the stimuli
  const taskSequence = _.shuffle(easyTaskData.concat(hardTaskData));

  players.forEach((player, i) => {
    player.set("name", names[i]);
    player.set("avatar", `/avatars/jdenticon/${avatarNames[i]}`);
    player.set("nameColor", nameColor[i]);
    player.set("cumulativeScore", 0);
    player.set("bonus", 0);
  });

  const rounds = [];
  _.times(treatment.nRounds, i => {
    const stages = [];

    // in this game we have only one stage per round
    stages.push({
      name: "response",
      displayName: "Response",
      durationInSeconds: treatment.stageDuration
    });

    rounds.push({
      stages,
      task: taskSequence[i]
    });
  });

  return {
    rounds,
    players
  };
};
