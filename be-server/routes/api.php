<?php

use App\Http\Controllers\Api\ExcelController;
use Illuminate\Support\Facades\Route;

Route::prefix('excel')->group(function () {
    Route::post('/parse', [ExcelController::class, 'parse']);
    Route::post('/convert', [ExcelController::class, 'convert']);
});
