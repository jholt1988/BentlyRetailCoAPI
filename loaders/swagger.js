const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const swaggerDocument = yaml.load(fs.readFileSync(path.resolve(__dirname, '../holtenterprises-br-co_api-1.9.9-swagger (1).yaml'), 'utf8'));

module.exports = (app) => {
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    
}