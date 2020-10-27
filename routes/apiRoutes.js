const Workout = require("../models/workout");
const router = require("express").Router();

router.get("/api/workouts", (req, res) => {
  Workout.find({})
  .then(data => {
    res.json(data);
  }).catch(err => {
    console.log(err);
    res.status(404).res.json(err);
  });
});

router.get("/api/workouts/range", (req, res) => {
  Workout.find({})
  .limit(7)
  .then(data => {
    res.json(data);
  }).catch(err => {
    console.log(err);
    res.status(404).res.json(err);
  });
});

router.post("/api/workouts", (req, res) => {
  Workout.create({})
  .then(data => {
    res.json(data);
  }).catch(err => {
    console.log(err);
    res.status(404).res.json(err);
  });
});

router.put("/api/workouts/:id", (req, res) => {
  Workout.findByIdAndUpdate(req.params.id, 
    { $push: { exercises: req.body }},
    { new: true})
    .then(data => {
      res.json(data);
    }).catch(err => {
      console.log(err);
      res.status(404).res.json(err);
    });
});

module.exports = router;