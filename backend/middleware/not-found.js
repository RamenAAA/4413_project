// handle the errors when the front end invokes status 404
export const notFoundMiddleware = (req, res) => res.status(404).send('Route does not exist');