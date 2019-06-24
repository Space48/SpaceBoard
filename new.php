<?php
date_default_timezone_set("UTC");
$date = new DateTime();
$week = $date->format("W");
$file = dirname(__FILE__) . '/teams/red/week' . $week . '.json';
if (!file_exists($file)) {
    $dataStructure = ['good' => [], 'bad' => [], 'actions' => []];
    file_put_contents($file, json_encode($dataStructure, JSON_FORCE_OBJECT));
}
$boardData = json_decode(file_get_contents($file));
$typeToAdd = $_REQUEST['commentType'];
$textToAdd = $_REQUEST['text'];

$unix = time();
$boardData->{$typeToAdd}->{$unix} = ['message' => $textToAdd, 'upvotes' => 0, 'author' => ''];

$data = json_encode($boardData);
file_put_contents('teams/red/week' . $week . '.json', $data);
print_r($data);
