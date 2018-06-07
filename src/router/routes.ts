import * as express from 'express';
import UserRouter from './UserRouter';
import IServer from '../interfaces/ServerInterface';
import ElasticSearchRouter from './ElasticSearchRouter';

export default class Routes {
    static init(server: IServer) :void {
        const router: express.Router = express.Router();

        server.app.use('/', router);

        // users
        server.app.use('/v1/users', new UserRouter().router);

        server.app.use('/v1/elasticsearch', new ElasticSearchRouter().router);
    }
}
