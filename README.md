Mixo Ads – Campaign Dashboard

A simple campaign monitoring dashboard built for the Mixo Ads Frontend Engineer Challenge.
It helps teams track campaign performance and view insights clearly.

🔗 Live Demo
👉 https://mixo-dashboard-chi.vercel.app/

🚀 Features

Global overview of campaign performance

View and filter campaigns by status

Campaign detail pages with key metrics

Real-time updates using Server-Sent Events (SSE)

Loading skeletons and graceful error handling

🛠 Tech Stack

Next.js (App Router)

TypeScript

Tailwind CSS + shadcn/ui

TanStack React Query

Server-Sent Events (SSE)

Vercel for deployment

📁 Project Structure
src/
├── app/          # Routes
├── components/   # UI components
├── lib/          # API & hooks
├── types/        # TypeScript types

🔐 Environment Variables

Create a .env.local file in the root:

NEXT_PUBLIC_API_BASE_URL=https: mixo_base_url


Restart the dev server after adding the env file.

▶️ Run Locally
npm install
npm run dev


Open:

http://localhost:3000

📌 Notes

Uses REST APIs for initial data

Uses SSE for live updates

Defensive UI to handle missing or partial data

This project focuses on clarity, correctness, and maintainable frontend architecture.
