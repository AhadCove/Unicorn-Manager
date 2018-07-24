const express = require('express');
const router = express.Router();
const { LocationMiddleware, LocationLookup } = require('../helpers/location-helper');
const Joi = require('joi');
const { PostUnicornSchema, PutUnicornSchema } = require('../schemas/unicorn-schema');
const axios = require('axios');

router.get('/', (req, res, next) => {
  axios.get('http://localhost:4501/unicorns')
    .then(({ data }) => { res.send(LocationMiddleware(data)); })
    .catch((err) => { res.status(455).send(err); });
});

router.get('/:locationName', (req, res, next) => {
  let location;
  if (parseFloat(req.params.locationName)) {
    location = req.params.locationName;
  } else {
    location = LocationLookup(req.params.locationName);
  }

  if (location) {
    axios.get('http://localhost:4501/unicorns')
      .then(({ data }) => {
        let unicorns = data.filter((unicorn) => unicorn.locationId == location);
        res.send(LocationMiddleware(unicorns));
      })
      .catch((err) => { res.status(455).send('Could not get Unicorns'); });
  } else {
    res.status(400).send('Could not find location');
  }
});

router.post('/', (req, res, next) => {
  Joi.validate(req.body, PostUnicornSchema, (err, value) => {
    if (err) {
      res.status(400).send(err.details[0].message);
    }

    axios.get('http://localhost:4501/unicorns')
      .then(({ data }) => { 
        req.body.id = data.length;
        axios.post('http://localhost:4501/unicorns', req.body)
          .then(({ data }) => res.send(LocationMiddleware(data)))
          .catch((err) => res.status(450).send(err))
      })
      .catch((err) => { res.status(455).send('Could not set id of unicorn'); });
  })
});

router.put('/:unicornId', (req, res, next) => {
  Joi.validate(req.body, PutUnicornSchema, (err, value) => {
    if (err) {
      res.status(400).send(err.details[0].message);
    }


    axios.get(`http://localhost:4501/unicorns/${req.params.unicornId}`)
      .then(({ data: unicorn }) => {
        if (typeof req.body.location === 'number') {
          unicorn = { ...unicorn, locationId: req.body.location };
        } else {
          unicorn = { ...unicorn, locationId: LocationLookup(req.body.location) };
        }
        
        axios.put(`http://localhost:4501/unicorns/${unicorn.id}`, unicorn)
          .then(({ data }) => res.send(LocationMiddleware(data)))
          .catch((err) => res.status(455).send('Could not patch to database'))
      })
      .catch((err) => { res.status(455).send('Could not find the specified Unicorn'); });

  });
});

module.exports = router;
