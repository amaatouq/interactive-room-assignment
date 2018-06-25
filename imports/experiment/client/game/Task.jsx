import React from "react";

import Room from "./Room.jsx";

export default class Task extends React.Component {
  render() {
    const { game, round, stage, player } = this.props;

    const task = round.get("task");

    return (
      <div className="task">
        <div className="left">
          {/*<div className="payoff">*/}
            {/*<h5>Payoff</h5>*/}
            {/*<table className="pt-table pt-interactive">*/}
              {/*<thead>*/}
                {/*<tr>*/}
                  {/*<th>Rooms</th>*/}
                  {/*{task.rooms.map(room => <th key={room}>{room}</th>)}*/}
                {/*</tr>*/}
              {/*</thead>*/}
              {/*<tbody>*/}
                {/*{task.students.map(student => (*/}
                  {/*<tr key={student}>*/}
                    {/*<th>Student {student}</th>*/}
                    {/*{task.rooms.map(room => (*/}
                      {/*<td key={room}>{task.payoff[student][room]}</td>*/}
                    {/*))}*/}
                  {/*</tr>*/}
                {/*))}*/}
              {/*</tbody>*/}
            {/*</table>*/}
          {/*</div>*/}

          <div className="constraints">
            <h5>Constraints</h5>
            <ul>
              {task.constraints.map(constraint => (
                <li key={constraint._id}>
                  {constraint.pair.join(" and ")} {constraint.text}.
                </li>
              ))}
            </ul>
          </div>

          <div className="score">
            <h5>Score</h5>

            <h2>{round.get("score")}</h2>
          </div>
        </div>

        <div className="board">
          <Room room="deck" round={round} game={game} player={player} isDeck />

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

        {/*<TaskStimulus round={round} stage={stage} player={player} />*/}
        {/*<TaskResponse round={round} stage={stage} player={player} game={game} />*/}
      </div>
    );
  }
}
