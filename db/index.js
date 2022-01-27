

    const initOptions = {
        connect(client, dc, useCount) {
            const cp = client.connectionParameters;

            console.log('Connected to Database', cp.database);
        }

    };

    const pgp = require('pg-promise')(initOptions);

    const { cn } = require('../config');





const db = pgp(cn);
db.connect();
module.exports = db;

