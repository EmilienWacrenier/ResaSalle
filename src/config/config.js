const dotenv = require('dotenv');
const util = require('../tools/util.service');

// ENVIRONMENT = local || dev || prod || recette
const envFile = process.env.ENVIRONMENT ?
  `.env.${process.env.ENVIRONMENT}` :
  '.env.local';
dotenv.config({
  path: envFile
});

const CONFIG = {}; // Make this global to use all over the application

CONFIG.app = process.env.APP;
CONFIG.port = process.env.PORT;

CONFIG.log_path = 'log';
CONFIG.log_level = 'info';
CONFIG.log_level_exceptions = 'debug';

CONFIG.db_dialect = process.env.DB_DIALECT;
CONFIG.db_host = process.env.DB_HOST;
CONFIG.db_port = process.env.DB_PORT;
CONFIG.db_name = process.env.DB_NAME;
CONFIG.db_user = process.env.DB_USER;
CONFIG.db_password = process.env.DB_PASSWORD;
//CONFIG.db_timezone = process.env.DB_TIMEZONE;

// Envoi du mail de récap: config du transporter
CONFIG.transporter = {
        host: 'smtp.office365.com',//'smtp-mail.Outlook.com'
        secureConnection: false,
        port: 587,
        proxy: 'http://proxy-host:193.56.47.20:8080',
        auth: {
            user: 'resa-salle.atos@outlook.com',
            pass: 'resaSalle123!'
        },
        tls: {
            ciphers: 'SSLv3'
        }
};
// Envoi du mail de récap: config du message
CONFIG.mail = {
    html: '<p>HTML Text Message</p>',
    dsn: {
        id: 'not_sent',
        return: 'headers',
        notify:['failure', 'delay']
    }
};

// Timezone
CONFIG.timezone = util.getTimezone();


module.exports = CONFIG;
