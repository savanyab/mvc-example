const express = require('express');
const videogames = express();
const models = require('../models');

// index
videogames.get('/', (req, res) => {
  models.Videogame.findAll().then(videogames => {
    res.json(videogames);
  });
});

// show
videogames.get('/:id', (req, res) => {
  models.Videogame.findById(req.params.id).then(videogame => {
    if (videogame !== null) {
      res.json(videogame);
    } else {
      res.status(400).send('Nincs ilyen id');
    };
  });
});

// create
videogames.post('/', (req, res) => {
  models.Videogame.findOne( { where: { name: req.body.name } }).then(result => {
    if(result !== null) {
      return res.status(400).send('Már van ilyen nevű videojáték');
    } else {
      models.Videogame.create(req.body).then(videogame => {
        res.json(videogame);
      });
    };
  });
});

// update
videogames.put('/:id', (req, res) => {
  models.Videogame.findById(req.params.id).then(result => {
    if(result === null) {
      return res.status(400).send('Nincs ilyen id');
    } else {
      models.Videogame.findOne( { where: { name: req.body.name}}).then(videogame => {
        if(videogame !== null) {
          return res.status(400).send('Már van ilyen nevű videojáték');
        } else {
          models.Videogame.update(req.body, { where: { id: req.params.id } }).then(videogame => {
            res.json(videogame);
          });
        };
      });
    };
  });
});

// destroy
videogames.delete('/:id', (req, res) => {
  models.Videogame.findById(req.params.id).then(result => {
    console.log(result);
    if(!result) {
      return res.status(400).send('Nincs ilyen id');
    } else {
      models.Videogame.destroy( { where: { id: req.params.id}}).then(videogame => {
         res.json(videogame);
      });
    };
    res.json(result);
  });
});

module.exports = videogames;

