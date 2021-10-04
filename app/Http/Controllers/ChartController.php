<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\RequestException;

class ChartController extends Controller
{
    
    public function health_history() {
        return Http::get('https://disease.sh/v3/covid-19/historical/all?lastdays=all')->throw()->json();
    }

    public function health_world() {
        return Http::get('https://disease.sh/v3/covid-19/all')->throw()->json();
    }

    public function health_country($country) {
        return Http::get('https://disease.sh/v3/covid-19/countries/'.$country)->throw()->json();
    }
}