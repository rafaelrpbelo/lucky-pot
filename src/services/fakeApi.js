import { createServer, Model } from 'miragejs';

const createNewTransaction = (schema, payload) => {
  const data = {
    ...payload,
    createdAt: new Date(),
  }

  return schema.create('transaction', data)
}

export const startFakeApi = () => {
  createServer({
    models: {
      transaction: Model,
    },
    routes() {
      this.namespace = 'api';

      this.get('/transactions', () => this.schema.all('transaction'))

      this.post('/transactions', (schema, request) => {
        const data = JSON.parse(request.requestBody);

        return createNewTransaction(schema, data);
      })
    }
  })
};
