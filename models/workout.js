const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [{
    name: {
      type: String,
      trim: true,
      required: "You must name the exercise."
    },
    type: {
      type: String,
      enum: ["Cardio", "Resistance"],
      required: "Choose one."
    },
    duration: {
      type: Number,
      required: true
    },
    distance: {
      type: Number,
      required: () => {
        return this.type === "Cardio";
      }
    },
    weight: {
      type: Number,
      required: () => {
        return this.type === "Resistance";
      }
    },
    sets: {
      type: Number,
      requred: () => {
        return this.type === "Resistance";
      }
    },
    reps: {
      type: Number,
      required: () => {
        return this.type === "Resistance";
      }
    }
  }]
},
  {
    toJSON: {
      virtuals: true
    }
  }
);

WorkoutSchema.virtual("totalDuration").get( function () {
  return this.exercises.reduce(
    (total, exercise) => {(total =+ exercise.duration)}, 0);
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;