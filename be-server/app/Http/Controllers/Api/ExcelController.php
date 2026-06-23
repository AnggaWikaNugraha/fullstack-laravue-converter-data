<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use PhpOffice\PhpSpreadsheet\IOFactory;

class ExcelController extends Controller
{
    public function parse(Request $request): JsonResponse
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls,xlsm|max:10240',
        ]);

        $spreadsheet = IOFactory::load($request->file('file')->getRealPath());

        $sheets = [];
        foreach ($spreadsheet->getSheetNames() as $name) {
            $sheets[] = $name;
        }

        $sheetName = $request->input('sheet', $sheets[0]);
        $worksheet = $spreadsheet->getSheetByName($sheetName) ?? $spreadsheet->getActiveSheet();

        $rows = [];
        foreach ($worksheet->getRowIterator() as $row) {
            $cells = [];
            foreach ($row->getCellIterator() as $cell) {
                $cells[] = $cell->getFormattedValue();
            }
            $rows[] = $cells;
        }

        // trim trailing empty rows
        while (!empty($rows) && array_filter(end($rows), fn($v) => $v !== '') === []) {
            array_pop($rows);
        }

        return response()->json([
            'sheets' => $sheets,
            'active_sheet' => $sheetName,
            'rows' => $rows,
        ]);
    }

    public function convert(Request $request): JsonResponse
    {
        $request->validate([
            'rows'        => 'required|array|min:2',
            'rows.*'      => 'array',
            'header_row'  => 'integer|min:1',
            'data_format' => 'in:array_of_objects,array_of_arrays',
        ]);

        $rows       = $request->input('rows');
        $headerIdx  = $request->input('header_row', 1) - 1;
        $format     = $request->input('data_format', 'array_of_objects');

        $headers = array_map('strval', $rows[$headerIdx]);
        $dataRows = array_values(array_filter(
            array_slice($rows, $headerIdx + 1),
            fn($row) => array_filter($row, fn($v) => $v !== '') !== []
        ));

        if ($format === 'array_of_arrays') {
            $result = array_merge([$headers], $dataRows);
        } else {
            $result = array_map(function ($row) use ($headers) {
                $obj = [];
                foreach ($headers as $i => $key) {
                    $obj[$key] = $row[$i] ?? null;
                }
                return $obj;
            }, $dataRows);
        }

        return response()->json([
            'data'   => $result,
            'total'  => count($result),
        ]);
    }
}
