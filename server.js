const hue = require("node-hue-api");
const HueApi = hue.HueApi;
const lightState = hue.lightState;
const Twit = require('twit');

const T = new Twit({
    consumer_key:         '',
    consumer_secret:      '',
    access_token:         '',
    access_token_secret:  '',
})

const stream = T.stream('statuses/filter', { track: '#TurnOffJakesLights' })

const host = "192.168.200.18";
const username = "newdeveloper";
const api = new HueApi(host, username);

// Lets start the lights off with a light yellow
let state = lightState.create().on().rgb(245,237, 225);
let state2 = lightState.create().on().off();

// Turn dem on
api.setLightState(1, state)
api.setLightState(2, state)
api.setLightState(3, state)

let i = 0;

stream.on('tweet', function (tweet) {
  if (i===0) {
    api.setLightState(1, state2).then().done();
    api.setLightState(2, state2).then().done();
    api.setLightState(3, state2).then().done();
    i=1;
  } else {
    api.setLightState(2, state).then().done();
    api.setLightState(1, state).then().done();
    api.setLightState(3, state).then().done();
    i=0;
  }
});
