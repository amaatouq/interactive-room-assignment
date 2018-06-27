import React from "react";

import Room from "./Room.jsx";
import Timer from "./Timer.jsx";

export default class Task extends React.Component {
  handleSatisfaction = (satisfied, event) => {
    const { player } = this.props;
    event.preventDefault();
    player.set("satisfied", satisfied);
  };

  render() {
    const { game, round, stage, player } = this.props;

    const task = round.get("task");
    const violatedConstraints = round.get("violatedConstraints") || [];

    return (
      <div className="task">
        <div className="left">
          <div className="info">
            <Timer stage={stage} />
            <div className="score">
              <h5>Score</h5>

              <h2>{round.get("score")}</h2>
            </div>
          </div>

          <div className="constraints">
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
            <table className="pt-table pt-interactive">
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
                      <td key={room}>{task.payoff[student][room]}</td>
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
              round={round}
              game={game}
              player={player}
              isDeck
            />

            <div className="rooms">
              {task.rooms.map(room => (
                <Room
                  key={room}
                  room={room}
                  round={round}
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
