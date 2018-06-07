import ElasticSearch from '../elasticsearch/elasticsearch';

export default class ElasticSearchInit {
    static init(): void {
        const elastic: ElasticSearch = new ElasticSearch();

        elastic.indexExists().then((exists: boolean) => {
            if (exists) {
                return elastic.deleteIndex();
            }
        }).then(() => {
            return elastic.initIndex().then(() => {
                return elastic.initMapping();
            }).then(() => {
                // Add a few titles for the autocomplete
                // elasticsearch offers a bulk functionality as well, but this is for a different time
                // tslint:disable-next-line:typedef
                const promises = [
                  'Thing Explainer',
                  'The Internet Is a Playground',
                  'The Pragmatic Programmer',
                  'The Hitchhikers Guide to the Galaxy',
                  'Trial of the Clone'
                ].map((bookTitle) => {
                    return elastic.addDocument({
                        title: bookTitle,
                        content: bookTitle + ' content',
                        metadata: {
                            titleLength: bookTitle.length
                        }
                    });
                });

                return Promise.all(promises);
            });
        });
    }
}
