# Mini Dashboard

A simple, modern web-based dashboard to manage and track financial transactions with filtering, local storage, summary stats, and CSV/Excel export.

## Features

- Add, view, and filter transactions by type (credit/debit/all)
- See a running summary: total inflow, outflow, and net balance
- Data is persisted in your browser's local storage
- Export transactions as CSV or Excel
- Clean, responsive design with React/Next.js

## Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
bun dev
```

Then, open [http://localhost:3000](http://localhost:3000) in your browser.

## Technologies

- Next.js 16
- React 19
- Tailwind CSS 4
- TypeScript

## Project Structure

- `src/app/` – App entry, layout, and styles
- `src/components/` – UI components (TransactionList, TransactionForm, etc.)
- `src/utils/constants.ts` – Example data

## License

MIT
