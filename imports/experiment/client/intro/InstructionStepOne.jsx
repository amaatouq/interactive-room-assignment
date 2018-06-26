import React from "react";

import Centered from "../../../core/ui/components/Centered.jsx";

export default class InstructionStepOne extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev, treatment } = this.props;
    return (
      <Centered>
        <div className="instructions">
          <h1> Game overview </h1>
          <p>
            In this HIT, you will be asked to{" "}
            <strong>
              solve a sequence of {treatment.nRounds} resource allocation tasks
            </strong>. Specifically, in each task, you are going to assign a
            group of students into dorm rooms, and you are asked to find the
            room assignment plan that maximizes overall satisfaction for the
            group while respecting certain constraints (e.g., some students can
            not live together in one room).
          </p>
          <p>
            You get at most{" "}
            <strong>
              {(treatment.stageDuration / 60.0).toFixed(2)} minutes
            </strong>{" "}
            to work on each task.{" "}
            <strong>
              Completing this HIT may take as long as{" "}
              <em>
                {(treatment.stageDuration / 60.0 * treatment.nRounds).toFixed(
                  2
                )}{" "}
                minutes
              </em>
            </strong>. If you do not have enough time for completing the HIT,
            please return it.
          </p>

          <p>
            You will play simultaneously{" "}
            <strong>with {treatment.playerCount - 1} other participants</strong>{" "}
            in real-time. Therefore, if you idle for too long during the game
            you will forfeit any pay you have earned during this HIT.
          </p>

          <p>
            The game <strong>must be played on a desktop or laptop</strong> (No
            mobile support).
          </p>

          <p>
            <strong>
              For the best experience, please maximize the window containing
              this task or make it as large as possible.
            </strong>
          </p>

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
