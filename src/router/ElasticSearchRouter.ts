import { Router } from 'express';
import ElasticSearchController from '../controllers/ElasticSearchController';

export default class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes() :void {
        this.router.get('/suggest/:input', ElasticSearchController.getSuggestion);
        this.router.post('/', ElasticSearchController.addDocument);
    }
}
