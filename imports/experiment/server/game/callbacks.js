export const onGameStart = (game, players) => {
  console.log("game ", game._id, " started");
  //initiate the cumulative score for this game (because everyone will have the same score, we can save it at the game object
  game.set("cumulativeScore", 0);
  game.set("justStarted", true); // I use this to play the sound on the UI when the game starts
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

export const onStageEnd = (game, round, stage, players) => {
  // //TODO: this is for testing only, this should be only in `onSet`
  const task = round.get("task");

  let assignments = { deck: [] };
  task.rooms.forEach(room => {
    assignments[room] = [];
  });

  //find the rooms for each player
  task.students.forEach(student => {
    console.log("student", student);
    assignments[round.get(`student-${student}-room`)].push(student);
  });

  //check for constraint violations
  const violationIds = getViolations(task, assignments);
  round.set("violatedConstraints", violationIds);
  console.log("violations", violationIds);

  //get score if there are no violations, otherwise, the score is 0
  const currentScore =
    assignments["deck"].length === 0
      ? getScore(task, assignments, violationIds.length)
      : 0;
  console.log("currentScore", currentScore);
  round.set("score", currentScore || 0);
};

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
  const conversionRate = 1 / 500; //TODO: we need to discuss this
  const bonus =
    game.get("cumulativeScore") > 0
      ? Math.round(game.get("cumulativeScore") * conversionRate)
      : 0;
  players.forEach(player => {
    player.set("bonus", bonus);
  });
};

//TODO: things that are missing (NOT TESTED)

export const onSet = (game, round, stage, players) => {
  const task = round.get("task");

  let assignments = { deck: [] };
  task.rooms.forEach(room => {
    assignments[room] = [];
  });

  //find the rooms for each player
  task.students.forEach(student => {
    console.log("student", student);
    assignments[round.get(`student-${student}-room`)].push(student);
  });

  //check for constraint violations
  const violationIds = getViolations(task, assignments);
  round.set("violatedConstraints", violationIds);
  console.log("violations", violationIds);

  //get score if there are no violations, otherwise, the score is 0
  const currentScore =
    assignments["deck"].length === 0
      ? getScore(task, assignments, violationIds.length)
      : 0;
  console.log("currentScore", currentScore);
  round.set("score", currentScore || 0);
};

//helpers
function getScore(task, assignments, nViolations) {
  let score = 0;
  Object.keys(assignments).forEach(room => {
    assignments[room].forEach(student => {
      score += task.payoff[student][room];
    });
  });
  return score - nViolations * 100;
}

function find_room(assignments, student) {
  return Object.keys(assignments).find(room =>
    assignments[room].includes(student)
  );
}

function getViolations(task, assignments) {
  console.log("assignments ", assignments);
  const violatedConstraintsIds = [];
  task.constraints.forEach(constraint => {
    switch (constraint.type) {
      case 0:
        //they are not in the same room, when they should've
        if (
          find_room(assignments, constraint.pair[0]) !==
          find_room(assignments, constraint.pair[1])
        ) {
          console.log(
            constraint.pair.join(" and "),
            "they are not in the same room, when they should've"
          );
          violatedConstraintsIds.push(constraint._id);
        }
        break;
      case 1:
        //they are in the same room, when they shouldn't
        if (
          find_room(assignments, constraint.pair[0]) ===
          find_room(assignments, constraint.pair[1])
        ) {
          console.log(
            constraint.pair.join(" and "),
            "they are in the same room, when they shouldn't"
          );
          violatedConstraintsIds.push(constraint._id);
        }

        break;
      case 2:
        //if they are not neighbors, when they should've been
        if (
          Math.abs(
            find_room(assignments, constraint.pair[0]) -
              find_room(assignments, constraint.pair[1])
          ) !== 1
        ) {
          console.log(
            constraint.pair.join(" and "),
            "they are not neighbors, when they should've been"
          );
          violatedConstraintsIds.push(constraint._id);
        }

        break;
      case 3:
        if (
          Math.abs(
            find_room(assignments, constraint.pair[0]) -
              find_room(assignments, constraint.pair[1])
          ) < 2
        ) {
          console.log(
            constraint.pair.join("and"),
            "can't live in the same room or be neighbors, so why are they?"
          );
          violatedConstraintsIds.push(constraint._id);
        }
        break;
    }
  });
  return violatedConstraintsIds;
}
