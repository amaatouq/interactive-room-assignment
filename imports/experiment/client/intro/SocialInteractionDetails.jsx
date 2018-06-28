import React from "react";

import Centered from "../../../core/ui/components/Centered.jsx";
import moment from "moment/moment";

export default class SocialInteractionDetails extends React.Component {
  state = {
    satisfied: false
  };

  handleSatisfaction = (satisfied, event) => {
    event.preventDefault();
    this.setState({ satisfied: satisfied });
  };

  render() {
    const { hasPrev, hasNext, onNext, onPrev, treatment } = this.props;
    return (
      <Centered>
        <div className="instructions">
          <h1> Communication and Event Logs</h1>
          <p>
            We will log every action taken by you or any of your teammates. This{" "}
            <strong>
              log will be shown to you to keep track of the actions that took
              place so far
            </strong>.
          </p>

          <p>
            Also, <strong>you may communicate with your teammates</strong>{" "}
            through the in-game chat. This <strong>chat room is public</strong>{" "}
            so whatever you write will appear to the other{" "}
            {treatment.playerCount - 1} teammates. You can use this in anyway
            you want.
          </p>

          <p>
            Remember, you and your teammates have{" "}
            {Math.ceil(treatment.stageDuration / 60.0)} minutes in each task to
            find a room assignment plan. You will automatically{" "}
            <strong>progress to the next task when the time is up</strong>.
          </p>
          <p>
            However, you can always indicate whether you are satisfied with the
            answer even when the timer is up.{" "}
          </p>

          <div className="task">
            <div className="board">
              <div className="response">
                <button
                  type="button"
                  className={`pt-button pt-icon-cross pt-intent-danger pt-large ${
                    this.state.satisfied ? "pt-minimal" : ""
                  }`}
                  onClick={this.handleSatisfaction.bind(this, false)}
                >
                  Unsatisfied
                </button>
                <button
                  type="button"
                  className={`pt-button pt-icon-tick pt-intent-success pt-large ${
                    this.state.satisfied ? "" : "pt-minimal"
                  }`}
                  onClick={this.handleSatisfaction.bind(this, true)}
                >
                  Satisfied
                </button>
              </div>
            </div>
          </div>
  
          <p>
            <strong>
              If all team members are satisfied before the timer this up, the
              answer will be submitted and you will move to the next task
            </strong>.
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
