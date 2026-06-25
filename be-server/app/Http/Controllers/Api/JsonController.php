<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Symfony\Component\HttpFoundation\StreamedResponse;

class JsonController extends Controller
{
    public function toExcel(Request $request): StreamedResponse
    {
        $request->validate([
            'json'     => 'required|string',
            'filename' => 'nullable|string|max:100',
        ]);

        $data = json_decode($request->input('json'), true);

        abort_if(json_last_error() !== JSON_ERROR_NONE, 422, 'Invalid JSON.');
        abort_if(empty($data) || !is_array($data), 422, 'JSON must be a non-empty array.');

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        $first = $data[0];

        if (is_array($first) && array_keys($first) !== range(0, count($first) - 1)) {
            // array of objects → use keys as header row
            $headers = array_keys($first);
            $sheet->fromArray([$headers], null, 'A1');
            $rows = array_map('array_values', $data);
            $sheet->fromArray($rows, null, 'A2');
        } else {
            // array of arrays
            $sheet->fromArray($data, null, 'A1');
        }

        $filename = preg_replace('/[^a-zA-Z0-9_\-]/', '_', $request->input('filename', 'export')) . '.xlsx';

        return response()->stream(function () use ($spreadsheet) {
            $writer = new Xlsx($spreadsheet);
            $writer->save('php://output');
        }, 200, [
            'Content-Type'        => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
            'Cache-Control'       => 'no-cache',
        ]);
    }
}
