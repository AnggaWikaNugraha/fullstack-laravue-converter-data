# Converter Hub

A fullstack web application for converting data, colors, and more. Upload a file or paste your input, preview the result instantly, and download — all reactive, no extra buttons needed.

## Coming Soon

**Data Format**

| Converter |
|---|
| CSV → JSON |
| JSON → CSV |
| XML → JSON |
| YAML ↔ JSON |

**UI / Design**

| Converter |
|---|
| SVG Optimizer |

**AI Generator** *(requires Claude API)*

| Generator | Description |
|---|---|
| Text → HTML Wireframe | Describe a UI in text, get a preview-ready HTML + CSS mockup |
| Text → ASCII Mockup | Low-fi brainstorming layout from text description |
| Text → Component Tree | JSON blueprint of UI structure from description |
| Image + Text → UI Revamp | Upload a UI screenshot, describe the changes — get a revamped HTML output |
| Image + Text → Brainstorm | Upload a UI screenshot, get improvement ideas, new layout suggestions, or a redesigned wireframe |

**Developer Tools**

| Converter |
|---|
| Base64 ↔ Text |
| URL Encode / Decode |
| Unix Timestamp ↔ Date |
| Number Base — decimal ↔ hex ↔ binary |
| Case — camelCase ↔ snake_case ↔ kebab-case |
| Markdown → HTML |
| JWT Decoder |

## Features

| Converter | Status | Route |
|---|---|---|
| Excel → JSON | Available | `/convert` |
| JSON → Excel | Available | `/json-to-excel` |
| Color — HEX ↔ RGB ↔ HSL ↔ OKLCH | Available | `/color` |
| CSS Unit — px ↔ rem ↔ em ↔ vh/vw | Available | `/css-unit` |

## User Flow

```
Upload File / Paste Data  →  Preview Table  →  JSON Output  →  Download
        (auto)                   (auto)            (auto)
```

Every step is reactive — no Preview or Convert buttons. Any change to the source data instantly updates the preview and output.

## Deployment

### Backend → Render

1. Push `be-server/` to a GitHub repo (or monorepo)
2. Create a new **Web Service** on [Render](https://render.com)
3. Set build & start commands:
   ```
   Build:  composer install --no-dev --optimize-autoloader
   Start:  php artisan serve --host=0.0.0.0 --port=$PORT
   ```
4. Add environment variables on Render:
   ```
   APP_ENV=production
   APP_KEY=             # run: php artisan key:generate --show
   APP_DEBUG=false
   APP_URL=             # your Render URL e.g. https://converter-hub-api.onrender.com
   FRONTEND_URL=        # your Vercel URL e.g. https://converter-hub.vercel.app
   ```

### Frontend → Vercel

1. Push `fe-web/` to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Vercel auto-detects Vite — no config needed
4. Add environment variable on Vercel:
   ```
   VITE_API_BASE_URL=https://your-app-name.onrender.com
   ```
5. Deploy — done

> **Local dev**: `VITE_API_BASE_URL` should be empty (`.env`). Vite proxy handles `/api` → `localhost:8000` automatically.

## Tech Stack

**Backend**

| | Technology |
|---|---|
| Framework | Laravel 13 (PHP 8.4) |
| Excel Parser | PhpSpreadsheet |
| Database | — (stateless, no DB needed) |

**Frontend**

| | Technology |
|---|---|
| Framework | Vue 3 + Vite 8 |
| Styling | Tailwind CSS v4 |
| State / API | TanStack Query (vue-query) |
| Router | Vue Router 4 |
| Color | culori |

## Project Structure

```
fullstack-laravue-converter-hub/
├── be-server/                              # Laravel API
│   ├── app/Http/Controllers/Api/
│   │   └── ExcelController.php             # parse & convert endpoints
│   └── routes/api.php
└── fe-web/                                 # Vue 3 frontend
    └── src/
        ├── api/
        │   ├── excel.js                    # axios calls for Excel endpoints
        │   └── json.js                     # axios calls for JSON endpoints
        ├── composables/
        │   ├── useConverter.js             # shared state (rows, result)
        │   ├── useExcelParser.js           # file upload / paste logic
        │   ├── useExcelConverter.js        # rows → JSON conversion logic
        │   ├── useJsonOutput.js            # format, copy, download
        │   ├── useJsonToExcel.js           # JSON → Excel reactive logic
        │   ├── useColorConverter.js        # color conversion reactive logic
        │   └── useCssUnitConverter.js      # CSS unit conversion reactive logic
        ├── utils/
        │   ├── excel.js                    # pure functions (parse, col labels, etc.)
        │   ├── json.js                     # pure functions (parse, headers, rows)
        │   ├── color.js                    # pure functions (parse, convert, clamp gamut)
        │   └── cssUnit.js                  # pure functions (unit conversion formulas)
        ├── components/
        │   ├── AppButton.vue
        │   ├── AppInput.vue
        │   └── AppSelect.vue
        └── pages/
            ├── Home.vue
            ├── Convert.vue                 # Excel → JSON
            ├── JsonToExcel.vue             # JSON → Excel
            ├── ColorConverter.vue          # Color — HEX ↔ RGB ↔ HSL ↔ OKLCH
            ├── CssUnitConverter.vue        # CSS Unit — px ↔ rem ↔ em ↔ vh/vw
            └── convert/
                ├── StepSource.vue          # file upload / data input
                ├── StepPreview.vue         # spreadsheet table preview
                └── StepOutput.vue          # JSON output + download
```

## API Endpoints

### `POST /api/excel/parse`
Upload an Excel file and get the sheet list and all rows as a 2D array.

**Request:** `multipart/form-data`

| Field | Type | Description |
|---|---|---|
| `file` | file | `.xlsx`, `.xls`, `.xlsm` — max 10 MB |
| `sheet` | string | sheet name (optional, defaults to first sheet) |

**Response:**
```json
{
  "sheets": ["Products", "Employees"],
  "active_sheet": "Products",
  "rows": [
    ["ID", "Product Name", "Price"],
    ["1", "Wireless Mouse", "149000"]
  ]
}
```

---

### `POST /api/excel/convert`
Convert rows to JSON with configurable header row and output format.

**Request:** `application/json`

| Field | Type | Default | Description |
|---|---|---|---|
| `rows` | array | — | 2D array from parse |
| `header_row` | integer | `1` | which row to use as header |
| `data_format` | string | `array_of_objects` | `array_of_objects` or `array_of_arrays` |

**Response:**
```json
{
  "data": [
    { "ID": "1", "Product Name": "Wireless Mouse", "Price": "149000" }
  ],
  "total": 1
}
```

---

### `POST /api/json/to-excel`
Convert a JSON array to an `.xlsx` file download.

**Request:** `application/json`

| Field | Type | Default | Description |
|---|---|---|---|
| `json` | string | — | JSON-encoded array of objects or array of arrays |
| `filename` | string | `export` | Output filename (without extension) |

**Response:** Binary `.xlsx` file (`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`)

**Supports:**
- Array of objects → keys become column headers
- Array of arrays → first row used as header

## Input Format (Manual Paste)

The textarea supports two formats:

**`="value"` format** (recommended — works with spaces in values):
```
="ID"  ="Product Name"  ="Price"
="1"   ="Wireless Mouse" ="149000"
```

**Plain TSV** (paste directly from Excel):
```
ID	Product Name	Price
1	Wireless Mouse	149000
```
