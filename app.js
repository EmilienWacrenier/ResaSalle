const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const CONFIG = require('./src/config/config');
const db = require('./src/config/db.config');

const PORT = CONFIG.port;

// winston logger
const {
  logger,
  expressLogger,
} = require('./src/config/winston.config');

app.use(expressLogger);
app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());
app.use(cors());

require('./src/modules/router.module')(app);

// Log Env
logger.info(`Environment: ${CONFIG.app}`);

// DATABASE
// db.sequelize
//   .authenticate()
//   .then(() => {
//     logger.info('Connection has been established successfully.');
//   })
//   .catch(err => {
//     logger.error('Unable to connect to the database:', err.message);
//   });

// Sync Database
db.sequelize.sync().then(function() {
  console.log('Sync has been established successfully.');
}).catch(function(err) {
  console.log('Unable to connect to the database:', err.message);
});

app.listen(PORT, ()=> {
  if (CONFIG.app === 'local') {
    logger.info(`PVC SERVER STARTED ON ${PORT}`);
  }
});

module.exports = app;
