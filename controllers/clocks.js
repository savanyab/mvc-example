const express = require('express');
const clocks = express();
const models = require('../models');


// index
clocks.get('/', (req, res) => {
  models.Clock.findAll().then(clocks => {
    res.json(clocks);
  });
});

// show
clocks.get('/:id', (req, res) => {
  models.Clock.findById(req.params.id).then(clock => {
    if (clock !== null) {
      res.json(clock);
    } else {
      res.status(400).send('Nincs ilyen id');
    };
  });
});

// create
  clocks.post('/', (req, res) => {
    models.Clock.findOne( { where: { model: req.body.model}}).then(result => {
      if (result !== null) {
        res.status(400).send('Már van ilyen model');
      } else {
        models.Clock.create(req.body).then(clock => {
          res.json(clock);
        });
      };
    });
  });

  // update
  clocks.put('/:id', (req, res) => {
    models.Clock.findById(req.params.id).then(result => {
      if (result === null) {
        return  res.status(400).send('Nincs ilyen id');
      } else {
        models.Clock.findOne( { where: { model: req.body.model}}).then(result => {
          if (result === null) {
            models.Clock.update(req.body, { where: { id: req.params.id } }).then(clock => {
              return  res.json(clock);
            });
          } else {
            return res.status(400).send('Már van ilyen model');
          };
        });
      };
    });
  });

  // destroy
  clocks.delete('/:id', (req, res) => {
    models.Clock.findOne( { where: { id: req.params.id}}).then(result => {
      if (result !== null) {
        models.Clock.destroy({ where: { id: req.params.id } }).then(clocks => {
        return  res.json(clocks);
        });
      } else {
        return  res.status(400).send('Nincs ilyen id');
      };
    });    
  });

  module.exports = clocks;
