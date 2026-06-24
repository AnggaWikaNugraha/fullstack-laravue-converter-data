# Converter Hub

A fullstack web application for converting data between popular formats. Upload a file, preview the source data, and download the result — all updated automatically without any buttons.

## Features

| Converter | Status |
|---|---|
| Excel → JSON | Done |
| JSON → Excel | Planned |

## User Flow

```
Upload File / Paste Data  →  Preview Table  →  JSON Output  →  Download
        (auto)                   (auto)            (auto)
```

Every step is reactive — no Preview or Convert buttons. Any change to the source data instantly updates the preview and output.

## Tech Stack

**Backend**

| | Technology |
|---|---|
| Framework | Laravel 13 (PHP 8.3) |
| Excel Parser | PhpSpreadsheet |
| Database | — (stateless, no DB needed) |

**Frontend**

| | Technology |
|---|---|
| Framework | Vue 3 + Vite 8 |
| Styling | Tailwind CSS v4 |
| State / API | TanStack Query (vue-query) |
| Router | Vue Router 4 |

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
        │   └── excel.js                    # axios API calls
        ├── composables/
        │   ├── useConverter.js             # shared state (rows, result)
        │   ├── useExcelParser.js           # file upload / paste logic
        │   ├── useExcelConverter.js        # rows → JSON conversion logic
        │   └── useJsonOutput.js            # format, copy, download
        ├── utils/
        │   └── excel.js                    # pure functions (parse, highlight, etc.)
        ├── components/
        │   ├── AppButton.vue
        │   ├── AppInput.vue
        │   └── AppSelect.vue
        └── pages/
            ├── Home.vue
            └── Convert.vue
                └── convert/
                    ├── StepSource.vue      # file upload / data input
                    ├── StepPreview.vue     # spreadsheet table preview
                    └── StepOutput.vue      # JSON output + download
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
