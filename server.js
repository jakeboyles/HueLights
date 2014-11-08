var hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState;

var displayResult = function(result) {
    console.log(JSON.stringify(result, null, 2));
};

var host = "-",
    username = "-",
    api = new HueApi(host, username),
    state;

// Set light state to 'on' with warm white value of 500 and brightness set to 100%
state = lightState.create().on().rgb(245,237, 225);
state2 = lightState.create().on().off();
state = lightState.create().on().rgb(245,237, 225);


// --------------------------
// Using a promise
api.setLightState(2, state)
    .then(displayResult)
    .done();


api.setLightState(1, state)
.then(displayResult)
.done();


api.setLightState(3, state)
    .then(displayResult)
    .done();




// --------------------------
// Using a callback
api.setLightState(2, state, function(err, lights) {
    if (err) throw err;
    displayResult(lights);
});




var Twit = require('twit')

var T = new Twit({
    consumer_key:         'qwcSxkl8GqhYZOn4MMFW5oY11'
  , consumer_secret:      'HjDdwD9HLHY5Mg82VYtiCWkFdlLoOtmWbpLw1iuhEuzFWy6IKP'
  , access_token:         '18745434-MVBSt2HCYb48130cnmVUVaW87E0jcx5fCabOEWlc2'
  , access_token_secret:  'frgHDZsqHVNHHlePxwYNalfe79aOgwOHnZqJuLgpdKFJd'
})

var i = 0;

var stream = T.stream('statuses/filter', { track: '#TurnOffJakesLights' })

stream.on('tweet', function (tweet) {

  if (i===0) {
    api.setLightState(1, state2).then(displayResult).done();

    api.setLightState(2, state2).then(displayResult).done();

    api.setLightState(3, state2).then(displayResult).done();

    i=1;
  }
  else {

    i=0;

    api.setLightState(2, state).then(displayResult).done();

    api.setLightState(1, state).then(displayResult).done();

    api.setLightState(3, state).then(displayResult).done();

    }

});



