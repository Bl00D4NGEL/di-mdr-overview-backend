import express = require('express');
import cors = require('cors');
import bodyParser = require('body-parser');
import Positions from "../routeModules/positions";
import Ranks from "../routeModules/ranks";
import Divisions from "../routeModules/divisions";
import GenerateTagList from "../routeModules/generateTagList";
import ForceReload from "../routeModules/forceReload";

export default function getDefaultExpress(): any {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cors());

    addRoutes(app);
    return app;
}

function addRoutes(app) {
    app.get('/forceReload', ForceReload);
    app.get('/divisions', Divisions);
    app.get('/positions', Positions);
    app.get('/ranks', Ranks);
    app.post('/generateTagList', GenerateTagList);
}
