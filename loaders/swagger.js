const swaggerUi = require('swagger-ui-express');
const YAML = require('js-yaml');
const swaggerDoc = YAML.load('../Swagger.yaml');

module.exports = (app) => {
    app.use('/swagger', swaggerUi.serveFiles, swaggerUi.setup(swaggerDoc))
}