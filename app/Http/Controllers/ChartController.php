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

    public function trend_video(){
        return Http::withHeaders([
            'x-rapidapi-host' => 'social-media-data-tt.p.rapidapi.com',
	        'x-rapidapi-key' => '21f0213dd4msh41a889b503940d6p1b8441jsn897fab25878f'
        ])->get('https://social-media-data-tt.p.rapidapi.com/live/trending/feed')->throw()->json();
    }

    public function tennis_ranking(){
        return Http::withHeaders([
            'x-rapidapi-host' => 'tennis-live-data.p.rapidapi.com',
	        'x-rapidapi-key' => '21f0213dd4msh41a889b503940d6p1b8441jsn897fab25878f'
        ])->get('https://tennis-live-data.p.rapidapi.com/rankings/ATP')->throw()->json();
    }

    public function fixtures(){
        return Http::withHeaders([
            'x-rapidapi-host' => 'api-football-v1.p.rapidapi.com',
	        'x-rapidapi-key' => '21f0213dd4msh41a889b503940d6p1b8441jsn897fab25878f'
        ])->get('https://api-football-v1.p.rapidapi.com/v3/fixtures', ['last' => 50])->throw()->json();
    }

    public function statistics($id){
        return Http::withHeaders([
            'x-rapidapi-host' => 'api-football-v1.p.rapidapi.com',
	        'x-rapidapi-key' => '21f0213dd4msh41a889b503940d6p1b8441jsn897fab25878f'
        ])->get('https://api-football-v1.p.rapidapi.com/v3/fixtures/statistics', ['fixture' => $id])->throw()->json();
    }
}