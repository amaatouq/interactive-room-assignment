// config contains the client side configuration for this game. It is used by
// Empirica core to initialize and run the game.
import Consent from "./intro/Consent.jsx";
import GroupExitSurvey from "./outro/GroupExitSurvey.jsx";
import IndividualExitSurvey from "./outro/IndividualExitSurvey.jsx";
import Overview from "./intro/Overview.jsx";
import TaskDetails from "./intro/TaskDetails.jsx";
import ConstraintsDetails from "./intro/ConstraintsDetails.jsx";
import RoomArrangements from "./intro/RoomArrangements";
import TeamDetails from "./intro/TeamDetails.jsx";
import SocialInteractionDetails from "./intro/SocialInteractionDetails.jsx";
import MoreAboutBonus from "./intro/MoreAboutBonus.jsx";
import UIOverview from "./intro/UIOverview.jsx";
import GroupQuiz from "./intro/GroupQuiz.jsx";
import IndividualQuiz from "./intro/IndividualQuiz.jsx";

import Round from "./game/Round.jsx";
import Thanks from "./outro/Thanks.jsx";
import Sorry from "./outro/Sorry";

export const config = {
  RoundComponent: Round,
  ConsentComponent: Consent,

  // Introduction pages to show before they play the game.
  // At this point they have been assigned a treatment. You can return
  // different instruction steps depending on the assigned treatment.
  InstructionSteps(treatment) {
    const steps = [Overview, TaskDetails, ConstraintsDetails, RoomArrangements];
    if (treatment.playerCount > 1) {
      steps.push(TeamDetails, SocialInteractionDetails);
    }
    steps.push(MoreAboutBonus, UIOverview);

    if (treatment.playerCount > 1) {
      steps.push(GroupQuiz);
    } else {
      steps.push(IndividualQuiz);
    }

    return steps;
  },

  // End of Game pages. These may vary depending on player or game information.
  // For example we can show the score of the user, or we can show them a
  // different message if they actually could not participate the game (timed
  // out), etc.
  // The last step will be the last page shown to user and will be shown to the
  // user if they come back to the website.
  // If you don't return anything, or do not define this function, a default
  // exit screen will be shown.
  ExitSteps(game, player) {

    if (player.exitStatus !== "finished") {
      return [Sorry];
    }
    if (game.players.length > 1) {
      return [GroupExitSurvey, Thanks];
    } else {
      return [IndividualExitSurvey, Thanks];
    }
  }
};
