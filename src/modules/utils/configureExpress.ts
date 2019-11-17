import Config from "../../config";
import getDivision from "../routeModules/getDivision";
import getHouse from "../routeModules/getHouse";
import getMdr from "../routeModules/getMdr";
import getDivisionNames from "../routeModules/getDivisionNames";
import getTagList from "../routeModules/getTagList";
import express = require('express');
import cors = require('cors');
import bodyParser = require('body-parser');

export default function getDefaultExpress(): any {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cors());
    app.listen(Config.port, function () {
        console.log(`${Config.name} listening on port ${Config.port} // http://localhost:${Config.port}`);
    });

    addRoutes(app);
    return app;
}

function addRoutes(app) {
    app.get('/division/:divisionName', getDivision);
    app.get('/house/:houseName', getHouse);
    app.get('/mdr', getMdr);
    app.get('/get/divisionNames', getDivisionNames);
    app.post('/get/tagList', getTagList);
}
