<?php

$date = new DateTime();
$week = $date->format("W");
$boardData = json_decode(file_get_contents('teams/red/week' . $week . '.json'));

$typeToAdd = $_REQUEST['type'];
$textToAdd = $_REQUEST['text'];

$boardData->{$typeToAdd}[] = $textToAdd;

file_put_contents('teams/red/week' . $week . '.json', json_encode($boardData));
