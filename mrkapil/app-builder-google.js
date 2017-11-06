const express = require('express');

const DialogflowApp = require('actions-on-google').DialogflowApp;
const ActionsSdkApp = require('actions-on-google').ActionsSdkApp;

const GoogleDelegate = require('./delegate-google.js');

class GoogleAppBuilder {

  constructor() {
    this.shouldUseDialogFlow = true;
  }

  useDialogFlow(shouldUseDialogFlow) {
    this.shouldUseDialogFlow = shouldUseDialogFlow;
    return this;
  }

  getGoogleApp(request, response) {
    return this.shouldUseDialogFlow
             ? new DialogflowApp({ request, response })
             : new ActionsSdkApp({ request, response });
  }

  build(assistant) {
    const app = express();

    app.post('/', (request, response) => {
      const googleApp = this.getGoogleApp();

      const actionMap = new Map();
      assistant.getIntents().forEach(intent => {
        actionMap.set(intent.getName(), function(googleApp) {
          const delegate = new GoogleDelegate(googleApp);
          assistant.handle(intent, delegate);
        });
      });

      googleApp.handleRequest(actionMap);
    });

    return app;
  }
}

module.exports = GoogleAppBuilder;
