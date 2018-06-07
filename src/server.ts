import * as express from 'express';
import Routes from './router/routes';
import Middleware from './config/middleware';
import Connection from './config/connection';
import ElasticSearchInit from './config/elasticsearch';

export class Server {
    // set app to be of type express.Application
    public app: express.Application;

    constructor() {
        this.app = express();
        Middleware.init(this);
        Connection.init();
        Routes.init(this);
        ElasticSearchInit.init();
    }
}

// export
export default new Server().app;
