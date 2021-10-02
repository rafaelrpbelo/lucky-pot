import { createServer } from 'miragejs';

export const transactions = [
  {
    id: 1,
    title: 'Transaction 1',
    amount: 400,
    type: 'deposit',
    category: 'Food',
    createdAt: new Date(),
  }
]

export const startFakeApi = () => {
  createServer({
    routes() {
      this.namespace = 'api';

      this.get('/transactions', () => transactions)
    }
  })
};
