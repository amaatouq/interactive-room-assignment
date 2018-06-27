import React from "react";

import Centered from "../../../core/ui/components/Centered.jsx";

export default class Overview extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev, treatment } = this.props;
    return (
      <Centered>
        <div className="instructions">
          <h1> Game Overview </h1>
          <p>
            You will be asked to{" "}
            <strong>
              solve a sequence of {treatment.nRounds} resource allocation tasks
            </strong>. In each task, you are going to assign a group of students
            into dorm rooms. You are asked to{" "}
            <strong>
              find the room assignment plan that maximizes overall satisfaction
            </strong>{" "}
            for the group while respecting certain constraints (e.g., some
            students can not live together in one room).
          </p>

          <p>
            You have at most{" "}
            <strong>{Math.ceil(treatment.stageDuration / 60.0)} minutes</strong>{" "}
            to work on each task.{" "}
            <strong>
              Completing the entire game may take you as long as{" "}
              {Math.ceil(treatment.stageDuration / 60.0 * treatment.nRounds)}{" "}
              minutes
            </strong>. If you do not have enough time for completing the game,
            please return it.
          </p>

          <p>
            You will play simultaneously{" "}
            <strong>
              with {treatment.playerCount - 1} other participants in real-time
            </strong>. Therefore, if you idle for too long during the game you
            will forfeit any pay you have earned during this game.
          </p>

          <p>
            The game <strong>must be played on a desktop or laptop</strong>.
            There NO mobile support
          </p>

          <div style={{ textAlign: "center" }}>
            <p>
              <strong>
                For the best experience, please maximize the window containing
                this task or make it as large as possible.
              </strong>
            </p>
          </div>

          <button
            type="button"
            className="pt-button pt-intent-nope pt-icon-double-chevron-left"
            onClick={onPrev}
            disabled={!hasPrev}
          >
            Previous
          </button>
          <button
            type="button"
            className="pt-button pt-intent-primary"
            onClick={onNext}
            disabled={!hasNext}
          >
            Next
            <span className="pt-icon-standard pt-icon-double-chevron-right pt-align-right" />
          </button>
        </div>
      </Centered>
    );
  }
}
