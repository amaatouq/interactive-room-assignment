import React from "react";

import { AlertToaster } from "../../../core/ui/components/AlertToaster.jsx";
import Centered from "../../../core/ui/components/Centered.jsx";

import { Radio, RadioGroup } from "@blueprintjs/core";

export default class GroupQuiz extends React.Component {
  state = { nParticipants: "", scoreOption: "", idle: "", largeError: "" };

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
      this.state.nParticipants !== "3" ||
      this.state.scoreOption !== "all" ||
      this.state.idle !== "100" ||
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
    const { nParticipants, scoreOption, idle, largeError } = this.state;
    return (
      <Centered>
        <div className="quiz">
          <h1> Quiz </h1>
          <form onSubmit={this.handleSubmit}>
            <div className="pt-form-group">
              <label className="pt-label" htmlFor="number-of-participants">
                How many participants will play at the same time, including
                yourself?
              </label>
              <div className="pt-form-content">
                <input
                  id="nParticipants"
                  className="pt-input"
                  type="number"
                  min="0"
                  max="150"
                  step="1"
                  dir="auto"
                  name="nParticipants"
                  value={nParticipants}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>

            <div className="pt-form-group">
              <div className="pt-form-content">
                <RadioGroup
                  label="Select the true statement about the score:"
                  onChange={this.handleRadioChange}
                  selectedValue={scoreOption}
                  required
                >
                  <Radio
                    label="I will score points only based on the assignments that I make"
                    value="single"
                  />
                  <Radio
                    label="We will submit only one answer as a team and therefore we will all get the same score."
                    value="all"
                  />
                </RadioGroup>
              </div>
            </div>

            <div className="pt-form-group">
              <label className="pt-label" htmlFor="number-of-participants">
                If your team ended up NOT assigning all students to room (i.e.,
                at least one student remained in the deck) then your score in
                that task will be:
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
                  id="nParticipants"
                  className="pt-input"
                  type="number"
                  min="0"
                  max="1000"
                  step="1"
                  dir="auto"
                  name="idle"
                  value={idle}
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
