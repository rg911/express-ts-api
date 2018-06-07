import ElasticSearch from '../elasticsearch/elasticsearch';
import * as express from 'express';

class ElasticSearchController {

    public getSuggestion(req: express.Request, res: express.Response, next: express.NextFunction): void {
        const elastic: ElasticSearch = new ElasticSearch();

        elastic.getSuggestions(req.params.input).then((result) => { res.json(result); });
    }
    public addDocument(req: express.Request, res: express.Response, next: express.NextFunction): void {
        const elastic: ElasticSearch = new ElasticSearch();

        elastic.addDocument(req.body).then((result) => { res.json(result); });
    }
}

export default new ElasticSearchController();
