<?php

use App\Http\Controllers\Api\ExcelController;
use App\Http\Controllers\Api\JsonController;
use Illuminate\Support\Facades\Route;

Route::prefix('excel')->group(function () {
    Route::post('/parse', [ExcelController::class, 'parse']);
    Route::post('/convert', [ExcelController::class, 'convert']);
});

Route::prefix('json')->group(function () {
    Route::post('/to-excel', [JsonController::class, 'toExcel']);
});
