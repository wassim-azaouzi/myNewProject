const Users = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');
module.exports = app => {
    app.post("/api/user/register", Users.register);
    app.post("/api/user/login", Users.login);
    app.post("/api/user/logout", Users.logout);
    ;
}