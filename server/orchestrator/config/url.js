const appUrl = process.env.APP_SERVICE_URL || "http://localhost:3000";
const usersUrl = process.env.USERS_SERVICE_URL || "http://localhost:3001";

module.exports = { appUrl, usersUrl };
