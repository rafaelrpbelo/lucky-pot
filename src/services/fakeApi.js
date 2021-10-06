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

    seeds(server) {
      server.db.loadData({
        transactions: [
          {
            id: 1,
            title: "1 week of development (youhoo.com)",
            type: "deposit",
            category: "Dev",
            amount: 950000,
            createdAt: new Date("2021-01-05 08:43:52"),
          },
          {
            id: 2,
            title: "Income tax (youhoo.com)",
            type: "withdraw",
            category: "Tax",
            amount: 145300,
            createdAt: new Date("2021-01-08 14:22:37"),
          },
          {
            id: 3,
            title: "Party snacks",
            type: "withdraw",
            category: "Food",
            amount: 10300,
            createdAt: new Date("2021-01-17 16:11:56"),
          },
        ]
      })
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
