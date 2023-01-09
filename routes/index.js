const authRoute = require('./auth');
const postRoute = require('./post');

function route(app) {
    app.use('/api/posts', postRoute);
    app.use('/api/auth', authRoute);
}

module.exports = route;
