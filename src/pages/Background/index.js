import { Socket } from './Socket';

console.log('This is the background page.');
console.log('Put the background scripts here.');

const useWindow = true;

var apps = {
  onLaunched: function (launchData) {
    console.log('Discovery App onLaunched:' + JSON.stringify(launchData));
    if (useWindow) {
      // Center window on screen.
      var screenWidth = 800;
      var screenHeight = 600;
      var width = 800;
      var height = 600;

      chrome.app.window.create('apps.html', {
        id: 'UDPBroadcastApp',
        width: width,
        height: height,
        left: Math.round((screenWidth - width) / 2),
        top: Math.round((screenHeight - height) / 2),
        minWidth: 800,
        minHeight: 600,
      });
    }
    if (chrome.app.runtime.lastError)
      console.error(chrome.app.runtime.lastError);
    Socket.cleanup_create();

    if (chrome.app.runtime.lastError)
      console.error(chrome.app.runtime.lastError);
  },
  onRestarted: function () {
    // Do some simple clean-up tasks.
    console.log('Discovery App onRestarted');
  },
};

chrome.app.runtime.onLaunched.addListener(apps.onLaunched());
chrome.app.runtime.onRestarted.addListener(apps.onRestarted());

chrome.runtime.onMessageExternal.addListener(function (
  message,
  sender,
  sendResponse
) {
  console.log('sender' + JSON.stringify(sender));
  console.log('message' + JSON.stringify(message));
  console.log('*************');
  if (sender.id === Socket.extensionId && message.discovery) {
    Socket.cleanup_create();
  }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log('sender' + JSON.stringify(sender));
  console.log('message' + JSON.stringify(message));
  console.log('################');
});

// eventPage.js

chrome.runtime.onStartup.addListener(function () {
  console.log('I started up!');
  Socket.cleanup_create();
});

chrome.runtime.onSuspend.addListener(function () {
  console.log('I am being suspended!');
});

// // reference from:
// // https://stackoverflow.com/questions/24498821/how-to-handle-err-insecure-response-in-google-chrome-extension
// chrome.webRequest.onErrorOccurred.addListener(function(details) {
//   // if (details.error == 'net::ERR_INSECURE_RESPONSE') {
//       console.log('request error detected', details);
//   // }
// });
