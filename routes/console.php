<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('demo', function () {
    $lessons = \App\Models\Lesson::select("*")->with(["files" => function ($relation) {
        $relation->addSelect("*");
    }])->get()->groupBy('module_id');
    dd($lessons->toArray());
});
