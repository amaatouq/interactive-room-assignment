import React from "react";

import { AlertToaster } from "../../../core/ui/components/Toasters.jsx";
import Centered from "../../../core/ui/components/Centered.jsx";

import { Radio, RadioGroup } from "@blueprintjs/core";

import { Checkbox } from "@blueprintjs/core";

export default class GroupQuiz extends React.Component {
  state = {
    nParticipants: "",
    scoreOption: "",
    idle: "",
    largeError: "",
    mc_1_101: false,
    mc_1_102: false,
    mc_1_103: false,
    mc_1_104: false,
    mc_1_105: false,
    mc_2_101: false,
    mc_2_102: false,
    mc_2_103: false,
    mc_2_104: false,
    mc_2_105: false,
    emptyOption: ""
  };

  handleChange = event => {
    const el = event.currentTarget;
    this.setState({ [el.name]: el.value.trim().toLowerCase() });
  };

  handleRadioChange = event => {
    const el = event.currentTarget;
    console.log("el",el);
    console.log("ev",event);
    this.setState({ [el.name]: el.value });
  };
  
  
  handleEnabledChange = event => {
    const el = event.currentTarget;
    this.setState({ [el.name]: !this.state[el.name] });
  };

  handleSubmit = event => {
    event.preventDefault();

    //it should be this.state.nParticipants !== "3" but we don't have "treatment" in QUIZ
    if (
      this.state.nParticipants !== "3" ||
      this.state.scoreOption !== "all" ||
      this.state.idle !== "100" ||
      this.state.largeError !== "0" ||
      this.state.mc_1_101 ||
      !this.state.mc_1_102 || //only this one is correct
      this.state.mc_1_103 ||
      this.state.mc_1_104 ||
      this.state.mc_1_105 ||
      this.state.mc_2_101 ||
      !this.state.mc_2_102 || //this one is correct
      this.state.mc_2_103 ||
      !this.state.mc_2_104 || //this one is correct
      this.state.mc_2_105 ||
      this.state.emptyOption !=="yes"
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
                  value={this.state.nParticipants}
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
                  selectedValue={this.state.scoreOption}
                  name="scoreOption"
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
              <div className="pt-form-content">
                <RadioGroup
                  name="emptyOption"
                  label="is it ok to have some rooms empty? (the answer is 'Yes')"
                  onChange={this.handleRadioChange}
                  selectedValue={this.state.emptyOption}
                  required
                >
                  <Radio label="Yes!" value="yes" />
                  <Radio label="No!" value="no" />
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
                  value={this.state.largeError}
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
                  value={this.state.idle}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>

            <div className="pt-form-group">
              <label className="pt-label" htmlFor="neighbor-of-room-101">
                Which of the following rooms is a neighbor of Room 101? Please
                select all that apply.
              </label>
              <div className="pt-form-content ">
                <div className="pt-control pt-checkbox pt-inline">
                  <Checkbox
                    name={"mc_1_101"}
                    label="Room 101"
                    onChange={this.handleEnabledChange}
                  />
                </div>
                <div className="pt-control pt-checkbox pt-inline">
                  <Checkbox
                    name={"mc_1_102"}
                    label="Room 102"
                    onChange={this.handleEnabledChange}
                  />
                </div>
                <div className="pt-control pt-checkbox">
                  <Checkbox
                    name={"mc_1_103"}
                    label="Room 103"
                    onChange={this.handleEnabledChange}
                  />
                </div>
                <div className="pt-control pt-checkbox pt-inline">
                  <Checkbox
                    name={"mc_1_104"}
                    label="Room 104"
                    onChange={this.handleEnabledChange}
                  />
                </div>
                <div className="pt-control pt-checkbox pt-inline">
                  <Checkbox
                    name={"mc_1_105"}
                    label="Room 105"
                    onChange={this.handleEnabledChange}
                  />
                </div>
              </div>
            </div>

            <div className="pt-form-group">
              <label className="pt-label" htmlFor="neighbor-of-room-101">
                Which of the following rooms is a neighbor of Room 103? Please
                select all that apply.{" "}
              </label>
              <div className="pt-form-content ">
                <div className="pt-control pt-checkbox">
                  <Checkbox
                    name={"mc_2_101"}
                    label="Room 101"
                    onChange={this.handleEnabledChange}
                  />
                </div>
                <div className="pt-control pt-checkbox pt-inline">
                  <Checkbox
                    name={"mc_2_102"}
                    label="Room 102"
                    onChange={this.handleEnabledChange}
                  />
                </div>
                <div className="pt-control pt-checkbox pt-inline">
                  <Checkbox
                    name={"mc_2_103"}
                    label="Room 103"
                    onChange={this.handleEnabledChange}
                  />
                </div>
                <div className="pt-control pt-checkbox">
                  <Checkbox
                    name={"mc_2_104"}
                    label="Room 104"
                    onChange={this.handleEnabledChange}
                  />
                </div>
                <div className="pt-control pt-checkbox">
                  <Checkbox
                    name={"mc_2_105"}
                    label="Room 105"
                    onChange={this.handleEnabledChange}
                  />
                </div>
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
