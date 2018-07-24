# Unicorn Manager

The unicorn manager is the last solution you'll need to handle your unicorns.

A database is not needed as the manager comes with a mock json-server with the app.

## Setup

``` bash
# install dependencies
npm install

# Start the local database
npm run startDb

# Start the server
npm run start

The server will now start at port 4500
```

## Usage

### Get all Unicorns
GET http://localhost:4500/unicorns

### Get all unicorns in a specific location

The parameter `locationName` can take in the locations id or the name of the location

GET http://localhost:4500/unicorns/:locationName


### Create a new Unicorn

The body of the create request will need to be in JSON format.

Fields
```
id: Will be filled in automatically

name: String, Minimum length of 3 characters, Required

gender: String, Accepts('male', 'female')

color: String, minimum length of 3 characters

locationId: Int, Required, Accepts(1,2,3)
```

POST http://localhost:4500/unicorns

### Move unicorn to new location

The body of the request will need to be in JSON format

The parameter `unicornId` is required

Fields
```
location: Required, Valid(1,2,3, 'pasture','barn','corral')
```

PUT http://localhost:4500/unicorns/:unicornId