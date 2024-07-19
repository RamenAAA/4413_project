// handle the errors when the front end invokes status 404
const notFound = (req, res) => res.status(404).send('Route does not exist')

// export notFound to be used by app.js
module.exports = notFound