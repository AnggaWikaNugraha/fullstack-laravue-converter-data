# Converter Hub

A fullstack web application for converting data between popular formats with a step-by-step preview experience — upload a file, preview the source data, convert, preview the output, then download the result.

## Features

| Converter | Status |
|---|---|
| Excel → JSON | Planned |
| JSON → EXCEL | Planned |

**User flow:** Upload source → Preview source data → Convert → Preview output → Download

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Laravel 13 (PHP 8.3) |
| Frontend | Vue 3 + Vite 8 |
| Database | SQLite (default) |

## Project Structure

```
fullstack-laravue-converter-hub/
├── be-server/      # Laravel API backend
└── fe-web/         # Vue 3 frontend
```

## Getting Started

### Prerequisites

- PHP >= 8.3
- Composer
- Node.js >= 18

### Backend

```bash
cd be-server
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

Backend runs at `http://localhost:8000`

### Frontend

```bash
cd fe-web
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

### Run Both Together (from `be-server/`)

```bash
cd be-server
composer run dev
```

## API

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/convert` | Upload file and convert |

> Endpoints will be documented as features are built.

## License

MIT
