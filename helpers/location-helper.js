const ELocations = {
  pasture: { id: 1, name: 'Pasture' },
  barn: { id: 2, name: 'Barn' },
  corral: { id: 3, name: 'Corral' }
};

const EReverseLocations = {
  1: 'pasture',
  2: 'barn',
  3: 'corral'
};

module.exports.LocationLookup = (location) => {
  location = location.toLowerCase();
  if (ELocations[location]) {
    return ELocations[location].id;
  } else {
    return null;
  }
}

module.exports.LocationMiddleware = (unicorns) => {
  if (Array.isArray(unicorns)) {
    unicorns.map((unicorn) => {
      unicorn.location = LocationName(unicorn.locationId);
    })
  } else {
    unicorns.location = LocationName(unicorns.locationId);
  }

  return unicorns;
}

const LocationName = (locationId) => {
  return EReverseLocations[locationId];
}