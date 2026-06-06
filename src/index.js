import { ApifyClient } from 'apify-client';
import 'dotenv/config';

const client = new ApifyClient({
  token: process.env.APIFY_TOKEN,
});

const input = {
  cikList: ['0000320193'],
  formTypes: ['10-K'],
  dateFrom: '2024-01-01',
  dateTo: '2024-12-31',
  maxFilings: 5,
  userAgent: 'Jane Smith jane@acme.com',
};

const run = await client.actor('devanshlive/sec-edgar-rag-extractor').call(input);

console.log('Results from dataset');
console.log(`Check your data here: https://console.apify.com/storage/datasets/${run.defaultDatasetId}`);
const { items } = await client.dataset(run.defaultDatasetId).listItems();
items.forEach((item) => {
  console.dir(item);
});
