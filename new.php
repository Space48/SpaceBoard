<?php

$date = new DateTime();
$week = $date->format("W");
$boardData = json_decode(file_get_contents('teams/red/week' . $week . '.json'));
$typeToAdd = $_REQUEST['commentType'];
$textToAdd = $_REQUEST['text'];

$boardData->{$typeToAdd}[] = $textToAdd;

$data = json_encode($boardData);
file_put_contents('teams/red/week' . $week . '.json', $data);
print_r($data);
