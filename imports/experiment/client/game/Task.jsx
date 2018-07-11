import React from "react";

import Room from "./Room.jsx";
import Timer from "./Timer.jsx";

export default class Task extends React.Component {
  handleSatisfaction = (satisfied, event) => {
    const { player, stage } = this.props;
    event.preventDefault();
    player.set("satisfied", satisfied);
    stage.append("log", {
      verb: "playerSatisfaction",
      subjectId: player._id,
      state: satisfied ? "satisfied" : "unsatisfied",
      at: new Date()
    });
  };

  render() {
    const { game, stage, player } = this.props;

    const task = stage.get("task");
    const violatedConstraints = stage.get("violatedConstraints") || [];

    return (
      <div className="task">
        <div className="left">
          <div className="info">
            <Timer stage={stage} />
            <div className="score">
              <h5>Score</h5>

              <h2>{stage.get("score")}</h2>
            </div>
          </div>

          <div className="constraints">
            {stage.name === "practice" ? (
              <p><strong style={{ color: "blue" }}>This is practice round and the Score will not count</strong></p>
            ) : (
              ""
            )}
            <h5>Constraints</h5>
            <ul>
              {task.constraints.map(constraint => {
                const failed = violatedConstraints.includes(constraint._id);
                return (
                  <li key={constraint._id} className={failed ? "failed" : ""}>
                    {failed ? (
                      <span className="pt-icon-standard pt-icon-cross" />
                    ) : (
                      <span className="pt-icon-standard pt-icon-dot" />
                    )}
                    {constraint.pair.join(" and ")} {constraint.text}.
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="payoff">
            <h5>Payoff</h5>
            <table className="pt-table">
              <thead>
                <tr>
                  <th>Rooms</th>
                  {task.rooms.map(room => <th key={room}>{room}</th>)}
                </tr>
              </thead>
              <tbody>
                {task.students.map(student => (
                  <tr key={student}>
                    <th>Student {student}</th>
                    {task.rooms.map(room => (
                      <td
                        className={
                          stage.get(`student-${student}-room`) === room
                            ? "active"
                            : null
                        }
                        key={room}
                      >
                        {task.payoff[student][room]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="board">
          <div className="all-rooms">
            <Room
              room="deck"
              stage={stage}
              game={game}
              player={player}
              isDeck
            />

            <div className="rooms">
              {task.rooms.map(room => (
                <Room
                  key={room}
                  room={room}
                  stage={stage}
                  game={game}
                  player={player}
                />
              ))}
            </div>
          </div>

          <div className="response">
            <button
              type="button"
              className={`pt-button pt-icon-cross pt-intent-danger pt-large ${
                player.get("satisfied") ? "pt-minimal" : ""
              }`}
              onClick={this.handleSatisfaction.bind(this, false)}
            >
              Unsatisfied
            </button>
            <button
              type="button"
              className={`pt-button pt-icon-tick pt-intent-success pt-large ${
                player.get("satisfied") ? "" : "pt-minimal"
              }`}
              onClick={this.handleSatisfaction.bind(this, true)}
            >
              Satisfied
            </button>
          </div>
        </div>
      </div>
    );
  }
}
