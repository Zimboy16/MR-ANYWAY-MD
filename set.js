const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID |eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUtKeXBaOGpGdjJGcnE3MGN5enBBRFloR0kybFgvVCsvbXhnMERwWEFuZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS3VxejlvMmNvUlBjZndNK1RSWGVDR0Rya0VXV1dORzZSTkRDemhTRjBqMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvR1FTWVBHUGl6MWlOYURLTGdpR1BqR25adUpWMmhiWDlNRXZPbnBLbkhVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPVlpOU2MvTloza2lYZm5xMFF5ZDRtVU5mYjVsdjlQYlVjN09GVDg4Q3lJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktHRjlyekk0dHd6NVAvNE9ScGN2K1Y2TnRzbDIxTVBTUzNGN21pNytYa1U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjVGbW03RURMSUFvb0FJeDROUTRCSjkwbjczMVVSYlZGcmcvSlg1R2lVSHM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEVLYytrUGIwVlVXZlZaajVxMklaSDJHV2JKWWllekUzRWdVMHVld1JHZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZSt3RDZ3aDFCWVg5SFA5aEFrRkZ3NnRubHBMVHJvR0dLWFJFTjh5aElEcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkE4dCtVRkVCOFFQTFJobFpKVWgxTEFYcHgvQ0Z5c1NuOVdQRjh3MSttYjlic1o3WjA4UTIwL0orbjBZNjRrTThxZ2tUVE1UQzZUbXJDZkdIZjloMkNRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTIsImFkdlNlY3JldEtleSI6InNTZklSSEwya01TcndRcm1FV3pRYUJmR0ZNd1lNcjFMUFoweDRGUEdVanM9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjJHYThnVDdvUnlHY21lNG45M2d4dnciLCJwaG9uZUlkIjoiOWZiZGFiMDYtNzMzYi00OGZiLThkZWUtZWZjMTA2ZTM3N2Q3IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im5LNXQxczkrVXBoSG94Sks5RnVSejN6UjVpUT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYejQycE5yZWZRREswZFdBQWE4ZGdXaVVBWFk9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiMjQ5UEFCODciLCJtZSI6eyJpZCI6IjQ0Nzk5MDEyMjUzMDo2M0BzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTHo1OHFjRkVQV05pN2tHR0JZZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiZW00V1Y5amh5M0hZMkpZeXhEcElpZEl2SW9LNktBR1ZVdWlXaFJkZ2NSTT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiS2MyNUtibzNOcU9LMVh4RWtkUFY2RGlIaHppdFRqbEQ1UG1uMWNhYzRTSTh2OENJOUgrcDQvRVZndC9hNzM1MFU1VG1ZZlFzaFJLQW5KNCsxQkRFQmc9PSIsImRldmljZVNpZ25hdHVyZSI6InU1emJtRk1LN0VyNkZIeTNEajd0WmxVV1RzakdvR2dpRy8vTk9xMDhzbjRkejMvYzk5SDBFbEZRd05NRjFyMTgrK2FzRjZWVTJYUFpBMGt2RGY5QURBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNDQ3OTkwMTIyNTMwOjYzQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlhwdUZsZlk0Y3R4Mk5pV01zUTZTSW5TTHlLQ3VpZ0JsVkxvbG9VWFlIRVQifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzAzMzI0MTksIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQlF5In0=| '',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
