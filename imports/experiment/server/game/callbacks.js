export default {
  onGameStart(game, players) {
    console.debug("game ", game._id, " started");
    //initiate the cumulative score for this game (because everyone will have the same score, we can save it at the game object
    game.set("cumulativeScore", 0); // the total score at the end of the game
    game.set("nOptimalSolutions", 0); // will count how many times they've got the optimal answer
    game.set("justStarted", true); // I use this to play the sound on the UI when the game starts
    game.set("justEnded",false) //this is a temporary fix for the problem of infinite last round
  },

  onRoundStart(game, round, players) {
    console.debug("Round ", round.index + 1, "game", game._id, " started");
    //initiate the score for this round (because everyone will have the same score, we can save it at the round object
    round.set("score", 0);
    round.set("chat", []);
    round.set("log", [
      {
        verb: "roundStarted",
        roundId: round.index + 1,
        at: new Date()
      }
    ]);

    const task = round.get("task");
    task.students.forEach(student => {
      round.set(`student-${student}-room`, "deck");
      round.set(`student-${student}-dragger`, null);
    });

    players.forEach(player => {
      player.set("satisfied", false);
    });
  },

  onStageStart(game, round, stage, players) {},

  onStageEnd(game, round, stage, players) {},

  onRoundEnd(game, round, players) {
    console.debug("Round ", round.index + 1, "game", game._id, " ended");
  
    //temporary fix
    const gameEnded = game.get("justEnded");
    if (gameEnded){
      return;
    }
    
    const currentScore = round.get("score");
    const optimalScore = round.get("task").optimal;

    if (currentScore === optimalScore) {
      game.set("nOptimalSolutions", game.get("nOptimalSolutions") + 1);
      console.log("You found the optimal");
    }

    //add the round score to the game total cumulative score
    const scoreIncrement = currentScore > 0 ? Math.round(currentScore) : 0;
    game.set("cumulativeScore", scoreIncrement + game.get("cumulativeScore"));
  },

  onGameEnd(game, players) {
    console.debug("The game", game._id, "has ended");
    
    //temporary fix
    const gameEnded = game.get("justEnded");
    if (gameEnded){
      return;
    }
    
    game.set("justEnded", true);
    //computing the bonus for everyone (in this game, everyone will get the same value)
    const conversionRate = game.treatment.conversionRate
      ? game.treatment.conversionRate
      : 1;

    const optimalSolutionBonus = game.treatment.optimalSolutionBonus
      ? game.treatment.optimalSolutionBonus
      : 0;

    const bonus =
      game.get("cumulativeScore") > 0
        ? (
            game.get("cumulativeScore") * conversionRate +
            game.get("nOptimalSolutions") * optimalSolutionBonus
          ).toFixed(2)
        : 0;

    players.forEach(player => {
      if (player.get("bonus")===0){
        player.set("bonus", bonus);
      }
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
    //someone changed their satisfication status
    if (key === "satisfied") {
      //check if everyone is satisfied and if so, submit their answer
      let allSatisfied = true;
      players.forEach(player => {
        allSatisfied = player.get("satisfied") && allSatisfied;
      });
      if (allSatisfied) {
        players.forEach(player => {
          player.stage.submit();
        });
      }
      return;
    }

    //someone placed a student to a room
    if (key.substring(0, 8) === "student-" && key.slice(-4) === "room") {
      const task = round.get("task");
      let assignments = { deck: [] };
      task.rooms.forEach(room => {
        assignments[room] = [];
      });

      //find the rooms for each player
      task.students.forEach(student => {
        const room = round.get(`student-${student}-room`);
        assignments[room].push(student);
      });

      //check for constraint violations
      const violationIds = getViolations(task, assignments);
      round.set("violatedConstraints", violationIds);
      //console.debug("violations", violationIds);

      //get score if there are no violations, otherwise, the score is 0
      const currentScore =
        assignments["deck"].length === 0
          ? getScore(task, assignments, violationIds.length)
          : 0;
      //console.debug("currentScore", currentScore);
      round.set("score", currentScore || 0);
    }
  }
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
  // console.debug("assignments ", assignments);
  const violatedConstraintsIds = [];

  task.constraints.forEach(constraint => {
    const firstStudentRoom = find_room(assignments, constraint.pair[0]);
    const secondStudentRoom = find_room(assignments, constraint.pair[1]);

    if (firstStudentRoom !== "deck" && secondStudentRoom !== "deck") {
      switch (constraint.type) {
        case 0:
          //they are not in the same room, when they should've
          if (firstStudentRoom !== secondStudentRoom) {
            // console.debug(
            //   constraint.pair.join(" and "),
            //   "they are not in the same room, when they should've"
            // );
            violatedConstraintsIds.push(constraint._id);
          }
          break;
        case 1:
          //they are in the same room, when they shouldn't
          if (firstStudentRoom === secondStudentRoom) {
            // console.debug(
            //   constraint.pair.join(" and "),
            //   "they are in the same room, when they shouldn't"
            // );
            violatedConstraintsIds.push(constraint._id);
          }

          break;
        case 2:
          //if they are not neighbors, when they should've been
          if (Math.abs(firstStudentRoom - secondStudentRoom) !== 1) {
            // console.debug(
            //   constraint.pair.join(" and "),
            //   "they are not neighbors, when they should've been"
            // );
            violatedConstraintsIds.push(constraint._id);
          }

          break;
        case 3:
          if (Math.abs(firstStudentRoom - secondStudentRoom) < 2) {
            // console.debug(
            //   constraint.pair.join(" and "),
            //   "can't live in the same room or be neighbors, so why are they?"
            // );
            violatedConstraintsIds.push(constraint._id);
          }
          break;
      }
    }
  });
  return violatedConstraintsIds;
}
