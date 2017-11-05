const api = require('./api.js');

// TODO make this text more informative: when, what time, what title?
// TODO add quips to this text
// TODO internationalize this text
// TODO add a boolean option for first person text
function converseString({
                          isLastNightOn,
                          episode,
                          isThereData
                        }) {
  if (isLastNightOn) {
    // Yay! There's an episode
    if (episode.title) {
      return {
        key: '',
        flavorKey: '',
        quipKey: '',
        fullText: `Yay! There is an episode. It is called ${episode.title}`
      };
    } else {
      return {
        key: '',
        flavorKey: '',
        quipKey: '',
        fullText: 'Yay! There is an episode'
      }
    }
  } else if (isThereData) {
    // No, there is no episode tonight
    return {
      key: '',
      flavorKey: '',
      quipKey: '',
      fullText: 'No, there is no episode tonight'
    }
  } else {
    // We don't have the data... either it's the season break
    // or someone hasn't maintained adding the data here
    return {
      key: '',
      flavorKey: '',
      quipKey: '',
      fullText: 'There is no data'
    }
  }
}

function errorString() {
  return {
    key: '',
    flavorKey: '',
    quipKey: '',
    fullText: 'Oh no, something went wrong'
  }
}

function isLastNightOn(queryDate) {
  return api.isLastNightOn(queryDate).then(
    // success
    (apiResponse) => {
      return Promise.resolve(converseString(apiResponse));
    },
    // error
    (error) => {
      return Promise.reject(errorString());
    }
  );
}

module.exports = {
  isLastNightOn
};
