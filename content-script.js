
chrome.runtime.sendMessage(
  // This message is sent to background.js when one of the URL matches in manifest.json is invoked.
  { message: "urlMatch"},
  function(response) {
    // This callback is invoked when the background.js responds with a URL.
    console.log(response.search);
  }
);