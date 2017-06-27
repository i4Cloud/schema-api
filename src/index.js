/*!
schemas-api 0.0.0, built on: 2017-03-30
Copyright (C) 2017 i4Cloud
http://i4Cloud.io/
https://github.com/i4Cloud/schemas-api

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.*/


'use strict';

var express = require('express'),
    helmet = require('helmet'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    swaggerTools = require('swagger-tools'),

    fs = require('fs'),
    jsyaml = require('js-yaml'),

    logger = require('./logger/logger'),
    Promise = require('bluebird'),
    config = require('./configurations/config');

var app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

//STATICS FILES
app.use('/', express.static(__dirname + '/../public'));

//API ENDPOINTS
var basePath = '/api/v1/';

//application endpoint
var appControllers = require('./controllers/applications-controller');

app.post(basePath + 'applications', appControllers.addApplication);
app.get(basePath + 'applications', appControllers.getApplications);

app.get(basePath + 'applications/:appName', appControllers.getApplicationByAppName);
app.put(basePath + 'applications/:appName', appControllers.putApplicationByAppName);
app.delete(basePath + 'applications/:appName', appControllers.deleteApplicationByName);

//schema endpoint
var schemaControllers = require('./controllers/schemas-controller');

app.get(basePath + 'applications/:appName/schemas', schemaControllers.getApplicationSchemas);
app.post(basePath + 'applications/:appName/schemas', schemaControllers.createApplicationSchema);

app.get(basePath + 'applications/:appName/schemas/:schemaName', schemaControllers.getApplicationSchemaByName);
app.put(basePath + 'applications/:appName/schemas/:schemaName', schemaControllers.updateApplicationSchemaByName);
app.delete(basePath + 'applications/:appName/schemas/:schemaName', schemaControllers.deleteApplicationSchemaByName);

app.get(basePath + 'applications/:appName/schemas/:schemaName/versions', schemaControllers.getApplicationSchemaVersionsByName);
app.post(basePath + 'applications/:appName/schemas/:schemaName/validate', schemaControllers.validateApplicationSchemaByName);

module.exports = {
    deploy: _deploy
};

/*
 * Implement the functions
 */
function _deploy() {
    return new Promise((resolve, reject) => {
        var port = process.env.PORT || config.server.port;

        var apiDefinition = fs.readFileSync('./src/open-api/api-definitions.yaml', 'utf8');
        var definitionsObject = jsyaml.safeLoad(apiDefinition);

        swaggerTools.initializeMiddleware(definitionsObject, (middlewares) => {

            app.use(middlewares.swaggerUi({
                apiDocs: definitionsObject.basePath + '/api-docs',
                swaggerUi: definitionsObject.basePath + '/docs'
            }));

            app.listen(port, (err) => {
                if (err) {
                    logger.error('Errors with deployment');
                    reject(err);
                } else {
                    logger.info('Schema API is running on http://localhost:%s', port);
                    resolve();
                }
            });
        });


    });
}