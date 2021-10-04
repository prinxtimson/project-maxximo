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

    public function food($food){
        return Http::get('https://api.edamam.com/api/nutrition-data?app_id=72c7af91&app_key=7da89b6fdd99a139e1fa3009ff0254e0&nutrition-type=logging&ingr='.$food)->throw()->json();
    }
}