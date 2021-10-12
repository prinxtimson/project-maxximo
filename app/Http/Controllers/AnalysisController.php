<?php

namespace App\Http\Controllers;

use Analytics;
use Spatie\Analytics\Period;
use Illuminate\Http\Request;

class AnalysisController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($days)
    {
        $analyticsData = Analytics::fetchVisitorsAndPageViews(Period::days($days));

        return $analyticsData;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function bounce($days)
    {
        //
        $analyticsData = Analytics::performQuery(Period::days($days), 'ga:sessions',[
                'metrics' => 'ga:sessions,ga:bounces',
                'dimensions' => 'ga:date'
            ]);

        return response()->json($analyticsData);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function session_time($days)
    {
        $analyticsData = Analytics::performQuery(Period::days($days), 'ga:sessions', [
            'dimensions'=>'ga:date',
            'metrics' => 'ga:sessions,ga:sessionDuration'
        ]);

        return response()->json($analyticsData);
    }

    public function session_country($days)
    {
        $analyticsData = Analytics::performQuery(Period::days($days), 'ga:sessions', [
            'dimensions'=>'ga:country',
            'metrics'=>'ga:sessions',
            'sort'=>'-ga:sessions'
        ]);

        return response()->json($analyticsData);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($days)
    {
        $analyticsData = Analytics::fetchMostVisitedPages(Period::days($days), 20);

        return $analyticsData;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function user_type($days)
    {
        return Analytics::fetchUserTypes(Period::days($days));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function browser($days)
    {
        return Analytics::fetchTopBrowsers(Period::days($days), 20);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}