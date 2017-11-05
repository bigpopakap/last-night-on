const mrkapil = require('./mrkapil');

const handlers = require('./assistant-handlers.js');

const DEFAULT_INTENT = new mrkapil.Intent('default');
const IS_IT_ON_INTENT = new mrkapil.Intent('isiton');

function build() {
  const assistant = new mrkapil.AssistantBuilder()
    .start(function(delegate) {
      return handlers.welcome(delegate);
    })
    .end(function(delegate, isCancel) {
      return handlers.goodbye(delegate, isCancel);
    })
    .intent(DEFAULT_INTENT, function(delegate) {
      return handlers.welcome(delegate);
    })
    .intent(IS_IT_ON_INTENT, function(delegate) {
      return handlers.isItOn(delegate);
    })
    .fallback(function(delegate) {
      return handlers.fallback(delegate);
    })
  .build();

  const app = new mrkapil.AppBuilder()
    .mixpanel({

    })
    .dashbot({

    })
    .google('/google', {
      shouldUseDialogFlow: true
    })
    .alexa({

    })
    .facebook({

    })
    .debugAt('/debug')
  .build(assistant);

  return app;
}

module.exports = {
  build
};