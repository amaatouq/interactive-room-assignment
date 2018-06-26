import React from "react";

import Centered from "../../../core/ui/components/Centered.jsx";

export default class InstructionStepFive extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev, treatment } = this.props;
    return (
      <Centered>
        <div className="instructions">
          <h1> Communication and Event Logs</h1>
          <p>
            You may communicate with other participants through the chat log.
            This chat room is public so whatever you write will appear to the
            other {treatment.playerCount - 1} participants. You can use this in
            anyway you want.
          </p>
          <p>
            Also, for every action taken by you or any of the other
            participants, it will be shown in the events log. This will allow
            you to keep track of the room assignment that happened so far by
            anyone in the team
          </p>

          <p>
            As a team, you {(treatment.stageDuration / 60.0).toFixed(2)} minutes in each task to
            find a room assignment plan. You will be automatically redirected to
            the next task when the {(treatment.stageDuration / 60.0).toFixed(2)} minutes
            timer for a task.
          </p>

          <p>
            However, you can always indicate whether you are satisfied with the
            answer before the timer is up. if all team members are satisfied
            before the timer this up, the answer will be submitted and you will
            move to the next task.
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
