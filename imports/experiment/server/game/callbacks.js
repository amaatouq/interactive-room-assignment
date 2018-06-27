export default {
  onGameStart(game, players) {
    console.log("game ", game._id, " started");
    //initiate the cumulative score for this game (because everyone will have the same score, we can save it at the game object
    game.set("cumulativeScore", 0);
    game.set("justStarted", true); // I use this to play the sound on the UI when the game starts
  },

  onRoundStart(game, round, players) {
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
  },

  onStageStart(game, round, stage, players) {},

  onStageEnd(game, round, stage, players) {
    // //TODO: this is for testing only, this should be only in `onSet`
    const task = round.get("task");

    let assignments = { deck: [] };
    task.rooms.forEach(room => {
      assignments[room] = [];
    });

    //find the rooms for each player
    task.students.forEach(student => {
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
  },

  onRoundEnd(game, round, players) {
    //add the round score to the game total cumulative score
    const scoreIncrement =
      round.get("score") > 0 ? Math.round(round.get("score")) : 0;
    game.set("cumulativeScore", scoreIncrement + game.get("cumulativeScore"));
  },

  onGameEnd(game, players) {
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
  },

  // onSet is called when the experiment code call the .set() method
  // on games, rounds, stages, players, playerRounds or playerStages.
  onSet(
    game,
    round,
    stage,
    players,
    player, // Player who made the change
    target, // Object on which the change was made (eg. player.set() => player)
    targetType, // Type of object on which the change was made (eg. player.set() => "player")
    key, // Key of changed value (e.g. player.set("score", 1) => "score")
    value, // New value
    prevValue // Previous value
  ) {
    const task = round.get("task");

    let assignments = { deck: [] };
    task.rooms.forEach(room => {
      assignments[room] = [];
    });

    //find the rooms for each player
    task.students.forEach(student => {
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
  }

  // // onSet is called when the experiment code call the `.append()` method
  // // on games, rounds, stages, players, playerRounds or playerStages.
  // onAppend(
  //   game,
  //   round,
  //   stage,
  //   players,
  //   player, // Player who made the change
  //   target, // Object on which the change was made (eg. player.set() => player)
  //   targetType, // Type of object on which the change was made (eg. player.set() => "player")
  //   key, // Key of changed value (e.g. player.set("score", 1) => "score")
  //   value, // New value
  //   prevValue // Previous value
  // ) {
  //   // Note: `value` is the single last value (e.g 0.2), while `prevValue` will
  //   //       be an array of the previsous valued (e.g. [0.3, 0.4, 0.65]).
  // },

  // onChange is called when the experiment code call the `.set()` or the
  // `.append()` method on games, rounds, stages, players, playerRounds or
  // playerStages.
  // onChange(
  //   game,
  //   round,
  //   stage,
  //   players,
  //   player, // Player who made the change
  //   target, // Object on which the change was made (eg. player.set() => player)
  //   targetType, // Type of object on which the change was made (eg. player.set() => "player")
  //   key, // Key of changed value (e.g. player.set("score", 1) => "score")
  //   value, // New value
  //   prevValue, // Previous value
  //   isAppend // True if the change was an append, false if it was a set
  // ) {
  //   // `onChange` is useful to run server-side logic for any user interaction.
  //   // Note the extra isAppend boolean that will allow to differenciate sets and
  //   // appends.
  // }
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
