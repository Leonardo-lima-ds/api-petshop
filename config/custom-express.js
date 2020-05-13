const app = require('express')();
const consign = require('consign');
const bodyParser = require('body-parser');

module.exports = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    
    consign()
        .include('controllers')
        .into(app);

    return app;
}