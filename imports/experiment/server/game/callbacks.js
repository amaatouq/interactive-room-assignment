export const onGameStart = (game, players) => {
  console.log("game ", game._id, " started");
  //initiate the cumulative score for this game (because everyone will have the same score, we can save it at the game object
  game.set("cumulativeScore", 0);
  game.set("justStarted",true) // I use this to play the sound on the UI when the game starts
};

export const onRoundStart = (game, round, players) => {
  console.log("Round ", round.index + 1, "game", game._id, " started");
  //initiate the score for this round (because everyone will have the same score, we can save it at the round object
  round.set("score", 0);
  round.set("chat", []);
  round.set("log", [
    {
      verb: "roundStarted",
      at: new Date()
    }
  ]);

  const task = round.get("task");
  task.students.forEach(student => {
    round.set(`student-${student}-room`, "deck");
    round.set(`student-${student}-dragger`, null);
  });
};

export const onStageStart = (game, round, stage, players) => {};

export const onStageEnd = (game, round, stage, players) => {};

export const onRoundEnd = (game, round, players) => {
  //add the round score to the game total cumulative score
  game.set(
    "cumulativeScore",
    Math.round(round.get("score") + game.get("cumulativeScore"))
  );
};

export const onGameEnd = (game, players) => {
  console.log("The game", game._id, "has ended");

  //computing the bonus for everyone (in this game, everyone will get the same value)
  const conversionRate = 1 / 10; //TODO: we need to discuss this
  const bonus =
    game.get("cumulativeScore") > 0
      ? Math.round(game.get("cumulativeScore") * conversionRate)
      : 0;
  players.forEach(player => {
    player.set("bonus", bonus);
  });
};

//TODO: things that are missing
