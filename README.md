# Room Assignment Problem

This is an experiment powered by
[Empirica](https://github.com/empiricaly/empirica) (here is a basic
[tutorial](https://github.com/empiricaly/tutorials/tree/master/guess-correlation-tutorial)).
Through this experiment we attempt to answer the question: **How does team
composition affect team performance?**

## Experiment Details:

### The task

In this experiment, participants are asked to assign N students into M rooms to
maximize utility while respecting certain constraints. The task difficulty can
vary in complexity levels:

* High complexity: Assign 9 students to 6 rooms given 8 constraints
* Low complexity: Assign 6 students to 4 rooms given 2 constraints

When the task is performed in groups then:

* All participants can do the assignment simultaneously, however, ony one
  student can be moved by one player at any given time (i.e., locking the
  student being moved, but the others are free to be moved).
* Participants can chat freely using the in-experiment chatting system.
* All events (i.e., which student being assigned to which room etc) will be
  logged and announced in the experiment as they happen.

### Procedure

In the planned experiment, **in step 1** each participants will be asked to
complete a number of room assignment tasks and other test questions (e.g., read
emotions from eyes tests) individually. This will allow us to determine 3
attributes about the individual:

* Ability: measured by the performance in the game.
* Social Perceptiveness (SP): Measured through
  [Reading Emotions from Eye (RME)](https://github.com/amaatouq/RME_test) test.
* Cognitive Style (CS): an in-task measure of problem-solving style (e.g.,
  intuitive versus analytical).

Then, **in step 2**, we randomly construct teams of 3 participants.

## Experiment Demo:

You and a group of friends can play with this experiment as we ran it by
following these instructions (assuming you have
[Meteor installed](https://www.meteor.com/install)):

1. [Download](https://github.com/amaatouq/interactive-room-assignment/archive/master.zip)
   the repository (and unzip). Alternatively,from terminal just run:
   
    ```git clone https://github.com/amaatouq/influence-in-small-group-discussions.git```

2. Go into the folder with

    ```cd influence-in-small-group-discussions```

3. Install the required dependencies `meteor npm install`

4. Run the local instance with `meteor`

5. Go to http://localhost:3000/admin (or whatever port you are running Meteor
   on).

6. login with the credentials username: `admin` and password: `victoria newish
   cymbal easter`

7. Start a new batch with whatever configuration you want (see documentation
   about experiment configuration).

### Example Config:

TODO
