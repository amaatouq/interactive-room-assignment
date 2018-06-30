import React from "react";

import { AlertToaster } from "../../../core/ui/components/AlertToaster.jsx";
import Centered from "../../../core/ui/components/Centered.jsx";

import { Radio, RadioGroup } from "@blueprintjs/core";

export default class IndividualQuiz extends React.Component {
  state = { violatedConstraints: "", largeError: "" };

  handleChange = event => {
    const el = event.currentTarget;
    this.setState({ [el.name]: el.value.trim().toLowerCase() });
  };

  handleRadioChange = event => {
    const el = event.currentTarget;
    this.setState({ scoreOption: el.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    //it should be this.state.nParticipants !== "3" but we don't have "treatment" in QUIZ
    if (
      this.state.violatedConstraints !== "100" ||
      this.state.largeError !== "0"
    ) {
      AlertToaster.show({
        message:
          "Sorry, you have one or more mistakes. Please ensure that you answer the questions correctly, or go back to the insturctions"
      });
    } else {
      this.props.onNext();
    }
  };

  render() {
    const { hasPrev, onPrev } = this.props;
    const { violatedConstraints, largeError } = this.state;
    return (
      <Centered>
        <div className="quiz">
          <h1> Quiz </h1>
          <form onSubmit={this.handleSubmit}>
            <div className="pt-form-group">
              <label className="pt-label" htmlFor="number-of-participants">
                If we end up NOT assigning all students to room (i.e., at least
                one student remained in the deck) then the score for that task
                will be:
              </label>
              <div className="pt-form-content">
                <input
                  id="nParticipants"
                  className="pt-input"
                  type="number"
                  min="-10"
                  max="10"
                  step="1"
                  dir="auto"
                  name="largeError"
                  value={largeError}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>

            <div className="pt-form-group">
              <label className="pt-label" htmlFor="number-of-participants">
                For each unsatisfied (i.e., violated) constraint, how many
                points will be deducted from you?
              </label>
              <div className="pt-form-content">
                <input
                  id="violatedConstraints"
                  className="pt-input"
                  type="number"
                  min="0"
                  max="1000"
                  step="1"
                  dir="auto"
                  name="violatedConstraints"
                  value={violatedConstraints}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>

            <button
              type="button"
              className="pt-button pt-intent-nope pt-icon-double-chevron-left"
              onClick={onPrev}
              disabled={!hasPrev}
            >
              Back to instructions
            </button>
            <button type="submit" className="pt-button pt-intent-primary">
              Submit
              <span className="pt-icon-standard pt-icon-key-enter pt-align-right" />
            </button>
          </form>
        </div>
      </Centered>
    );
  }
}
