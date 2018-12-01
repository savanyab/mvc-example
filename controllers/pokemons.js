const express = require('express');
const pokemons = express();
const models = require('../models');

// index
pokemons.get('/', (req, res) => {
  models.Pokemon.findAll().then(pokemons => {
    res.locals.pokemons = pokemons;
    res.render('pokemons/index.handlebars');
  });
});

// show
pokemons.get('/:id', (req, res) => {
  models.Pokemon.findById(req.params.id).then(pokemon => {
    if (pokemon !== null) {
      res.locals.pokemon = pokemon;
      res.render('pokemons/show.handlebars');
    } else {
      return res.status(400).send('Nincs ilyen id');
    };
  });
});

// edit
pokemons.get('/:id/edit', (req, res) => {
  models.Pokemon.findById(req.params.id).then(pokemon => {
    if (pokemon !== null) {
      res.locals.pokemon = pokemon;
      res.render('pokemons/edit.handlebars');
    } else {
      res.status(400).send('Nincs ilyen óra');
    };
  });
});


// create
pokemons.post('/', (req, res) => {
  models.Pokemon.findOne({ where: { name: req.body.name } }).then(result => {
    if (result !== null) {
      res.status(400).send('Már van ilyen pokemon');
    } else {
      models.Pokemon.create(req.body).then(pokemon => {
        res.json(pokemon);
      });
    };
  });
});

// update
pokemons.put('/:id', (req, res) => {
  models.Pokemon.findById(req.params.id).then(result => {
    if (result === null) {
      return  res.status(400).send('Nincs ilyen id');
    } else {
      models.Pokemon.findOne( { where: { name: req.body.name}}).then(pokemon => {
        if (pokemon !== null) {
          return res.status(400).send('Már van ilyen name');
        } else {
          models.Pokemon.update(req.body, { where: { id: req.params.id } }).then(pokemon => {
            return res.json(pokemon);
          });
        };
      }); 
    };
  });
});

// destroy
pokemons.delete('/:id', (req, res) => {
  models.Pokemon.findById(req.params.id).then(result => {
    if (result === null) {
      return res.status(400).send('Nincs ilyen id');
    } else {
      models.Pokemon.destroy({ where: { id: req.params.id } }).then(pokemon => {
      return  res.json(pokemon);
      });
    };
  });
});

module.exports = pokemons;