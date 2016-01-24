var hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState;

var Twit = require('twit');


var T = new Twit({
    consumer_key:         ''
  , consumer_secret:      ''
  , access_token:         ''
  , access_token_secret:  ''
})


var stream = T.stream('statuses/filter', { track: '#TurnOffJakesLights' })


var host = "192.168.200.18",
    username = "newdeveloper",
    api = new HueApi(host, username),
    state;


// Lets start the lights off with a light yellow
state = lightState.create().on().rgb(245,237, 225);
state2 = lightState.create().on().off();
state = lightState.create().on().rgb(245,237, 225);


// --------------------------
// Using a promise
api.setLightState(2, state)
    .then()
    .done();


api.setLightState(1, state)
  .then()
  .done();


api.setLightState(3, state)
    .then()
    .done();


// Are the lights on or off?
var i = 0;


stream.on('tweet', function (tweet) {

  if (i===0) {
    api.setLightState(1, state2).then(displayResult).done();

    api.setLightState(2, state2).then(displayResult).done();

    api.setLightState(3, state2).then(displayResult).done();

    i=1;
  }
  else 
  {

    i=0;

    api.setLightState(2, state).then(displayResult).done();

    api.setLightState(1, state).then(displayResult).done();

    api.setLightState(3, state).then(displayResult).done();

  }

});
