const fs = require('fs');
const path = require('path')

fs.rename(path.resolve(__dirname, '../dist2'), path.resolve(__dirname, '../dist'))