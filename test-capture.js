// test-capture.js
const screenshot = require('screenshot-desktop');
const fs = require('fs');

screenshot().then((img) => {
  fs.writeFileSync('test.png', img);
  console.log('✅ Screenshot saved as test.png');
}).catch(console.error);
