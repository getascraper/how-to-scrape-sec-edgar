# How to Scrape SEC EDGAR Filings in Node.js

Extract SEC EDGAR filings (10-K, 10-Q, 8-K) into RAG-ready JSON using the [SEC EDGAR RAG Extractor](https://apify.com/devanshlive/sec-edgar-rag-extractor) actor on Apify -- no browser automation or proxies required.

## What this example does

- Calls the SEC EDGAR RAG Extractor actor via the Apify client
- Passes CIK list, form types, date range, and optional search query
- Waits for the run to complete
- Fetches results from the actor's dataset
- Prints each filing to the console

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- An [Apify account](https://console.apify.com/sign-up) (free tier available)
- An [Apify API token](https://console.apify.com/settings/integrations)

## Installation

```bash
npm install
```

## Environment setup

```bash
cp .env.example .env
```

Open `.env` and replace `your_apify_token_here` with your actual Apify API token.

## Usage

```bash
npm start
```

## Code example

```javascript
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
```

## Example output

See `sample-output.json` for a full example. Each filing includes:

| Field | Description |
|-------|-------------|
| `accession_no` | Unique SEC identifier for the filing |
| `cik` | 10-digit Central Index Key |
| `company_name` | Filer name |
| `ticker` | Stock ticker (if available) |
| `form_type` | 10-K, 10-Q, or 8-K |
| `filing_date` | Date submitted to the SEC |
| `period_of_report` | Reporting period end date |
| `filing_url` | Link to the SEC Archives primary document |
| `source` | `full_text` or `exhibits_stripped` |
| `chunks` | Fixed-token text chunks of the filing |
| `chunks[].idx` | 0-indexed position |
| `chunks[].text` | Chunk text |
| `chunks[].tokens` | Token count (≤ 512) |

## Use cases

- **Finance AI:** Train models on clean corporate disclosures
- **Compliance RAG:** Build chatbots that cite specific regulatory filings
- **M&A research:** Feed target company 10-Ks into intelligence pipelines
- **Sell-side research:** Monitor 8-K events and earnings drift

## Try the actor on Apify

[Open the SEC EDGAR RAG Extractor on Apify](https://apify.com/devanshlive/sec-edgar-rag-extractor)

## Related resources

- [SEC EDGAR documentation](https://www.sec.gov/edgar/searchedgar/companysearch)
- [Apify Client for JavaScript](https://docs.apify.com/api/client/js/)

## License

MIT
