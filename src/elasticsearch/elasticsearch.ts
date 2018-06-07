import * as elasticsearch from 'elasticsearch';

export default class ElasticSearch {
    elasticClient: elasticsearch.Client;
    indexName: string;

    constructor() {
        this.elasticClient = new elasticsearch.Client({
            host: 'localhost:9200',
            log: 'info'
        });
        this.indexName = 'randomindex';
    }

    deleteIndex(): Promise<any> {
        return this.elasticClient.indices.delete({
            index: this.indexName
        });
    }

    initIndex(): Promise<any> {
        return this.elasticClient.indices.create({
            index: this.indexName
        });
    }

    public indexExists(): Promise<any> {
        return this.elasticClient.indices.exists({
            index: this.indexName
        });
    }

    initMapping(): Promise<any>  {
        console.log('Init mapping now.....');

        return this.elasticClient.indices.putMapping({
            index: this.indexName,
            type: 'document',
            body: {
                properties: {
                    title: { type: 'text' },
                    content: { type: 'text' },
                    suggest: {
                        type: 'completion',
                        analyzer: 'simple',
                        search_analyzer: 'simple',
                        // payloads: true
                    }
                }
            }
        });
    }
    addDocument(document: any): Promise<any> {
        console.log('Adding documents.....');

        return this.elasticClient.index({
            index: this.indexName,
            type: 'document',
            body: {
                title: document.title,
                content: document.content,
                suggest: {
                    input: document.title.split(' '),
                    // output: document.title,
                    // payload: document.metadata || {}
                }
            }
        });
    }

    getSuggestions(input: any): Promise<any>  {
        console.log('Getting suggestion....');

        return this.elasticClient.suggest({
            index: this.indexName,
            // type: 'document',
            body: {
                docsuggest: {
                    text: input,
                    completion: {
                        field: 'suggest',
                        fuzzy: true
                    }
                }
            }
        });
    }
}
