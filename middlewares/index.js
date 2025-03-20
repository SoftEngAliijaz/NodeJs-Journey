const fs = require("fs");

function logReqRes(fileName) {
  return (req, res, next) => {
    const logEntry = `
              IP: ${req.ip},
              METHOD: ${req.method},
              PATH: ${req.path},
              BODY: ${JSON.stringify(req.body)},
          `;
    fs.appendFile(fileName, logEntry, (error, data) => {
      next();
    });
  };
}

module.exports = { logReqRes };
