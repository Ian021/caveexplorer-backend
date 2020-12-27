/* ------------------------------------- LIBS -------------------------------------*/
const express = require("express");
const Ranking = require("./models");

/* ------------------------------------- EXPRESS -------------------------------------*/
router = express.Router();

/* ------------------------------------- ROUTES -------------------------------------*/
let ranking;
let emptyRanking = {
  list: [],
  players: []
};

Ranking.find({}, (err, body) => {
  if (err) {
    console.log(err);
    ranking = emptyRanking;
  } else {
    if (body.length > 0) {
      ranking = body[0];
    } else {
      Ranking.create(emptyRanking, (err, body) => {
        if (err) {
          console.log(err);
          ranking = emptyRanking;
        } else {
          ranking = body;
        }
      });
    }
  }
});

let updateDB = ranking => {
  Ranking.findByIdAndUpdate(
    ranking.id,
    ranking,
    { useFindAndModify: false },
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
};

let recicle = ranking => {
  if (ranking.list.length > 100) {
    ranking.list = ranking.list.slice(0, 40);
    ranking.players = ranking.list.map(element => element.player);
  }
};

addItem = (newElement, ranking) => {
  if (ranking.players.indexOf(newElement.player) > -1) {
    for (i = 0; i < ranking.list.length; i++) {
      if (ranking.list[i].player === newElement.player) {
        if (newElement.score > ranking.list[i].score) {
          ranking.list[i].score = newElement.score;
        }
        break;
      }
    }
  } else {
    ranking.list.push(newElement);
    ranking.players.push(newElement.player);
    recicle(ranking);
  }
  ranking.list.sort((a, b) => b.score - a.score);
  updateDB(ranking);
};

router.get("/", function(req, res) {
  return res.send(ranking.list.slice(0, 20));
});

module.exports = router;
