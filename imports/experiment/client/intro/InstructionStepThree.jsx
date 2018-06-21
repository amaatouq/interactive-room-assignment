import React from "react";

import Centered from "../../../core/ui/components/Centered.jsx";

import ExampleBoard from "./ExampleBoard";

export default class InstructionStepThree extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev, treatment } = this.props;
    return (
      <Centered>
        <div className="instructions">
          <h1>You will be part of a team</h1>
          <p>
            In this experiment, you will{" "}
            <strong>
              play together with {treatment.playerCount - 1} other participants
            </strong>. They are other MTurk workers who are undertaking the same
            experiment simultaneously. In total, you will{" "}
            <strong>play {treatment.nRounds} rounds with them.</strong>
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
