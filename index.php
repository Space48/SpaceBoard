<html>
<head>
    <title>Dan's Super Awesome Space Board</title>
    <link href="./stylesheet.css" rel="stylesheet" type="text/css">
</head>
<body>

<?php

if (isset($_REQUEST['week'])) {
    $week = $_REQUEST;
    $date = new DateTime();
    $currentWeek = $date->format("W");
    if ($week > $currentWeek) {
        die('You can\'t see into the future, only a timelord can do that!');
    }
} else {
    $date = new DateTime();
    $week = $date->format("W");
}

$file = dirname(__FILE__) . '/teams/red/week' . $week . '.json';

if (!file_exists($file)) {
    $dataStructure = ['good' => [], 'bad' => [], 'actions' => []];
    file_put_contents($file, json_encode($dataStructure));
}
$boardData = json_decode(file_get_contents($file));

echo '<div class="board-wrapper">';
echo '<div class="title">Dan\'s Super Awesome Space Board<br />Week ' . $week . '</div>';
if (isset($currentWeek)) {
    echo '<div class="titleTwo"><a href="/retro">Goto Current week ' . $currentWeek . '</a></div>';
}

foreach ($boardData as $type => $board) {
    echo '<div class="column '.$type.'">';
    switch ($type) {
        case 'good':
            echo '<div class="swatch"></div>Went Well';
            break;
        case 'bad':
            echo '<div class="swatch"></div>To Improve';
            break;
        case 'actions':
            echo '<div class="swatch"></div>Actions';
            break;
    }
    foreach ($board as $boardItem) {
        echo '<div class="item">' . $boardItem . '</div>';
    }
    if (!isset($_REQUEST['week'])) {
        echo '<div class="item button" id="' . $type . 'Column"><button class="add" onclick="add' . $type . '()">Add</button></div>';
    }
    echo '</div>';
}
echo '</div>';

echo '<div class="badge"><img src="patent_pending.jpg" /></div>';

?>

<script type="text/javascript">
    /*var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "./retro/new.php?type=actions&text=testing", true);
    xhttp.send();*/
    function addgood() {
        console.log('Add Good');
        var column = document.getElementById('goodColumn');
        var newDiv = document.createElement('div');
        newDiv.innerHTML = '<form id="myForm" onsubmit="event.preventDefault(); saveComment();"><input type="hidden" value="good"><textarea name="newComment"></textarea><input type="submit" value="Save"></form>';
        newDiv.className = 'item form';
        newDiv.id = 'form';

        column.parentNode.insertBefore(newDiv, column);
    }
    function addbad() {
        console.log('Add Bad');
        var column = document.getElementById('badColumn');
        var newDiv = document.createElement('div');
        newDiv.innerHTML = '<form id="myForm" onsubmit="event.preventDefault(); saveComment();"><input type="hidden" value="bad"><textarea name="newComment"></textarea><input type="submit" value="Save"></form>';
        newDiv.className = 'item form';
        newDiv.id = 'form';

        column.parentNode.insertBefore(newDiv, column);
    }
    function addactions() {
        console.log('Add Actions');
        var column = document.getElementById('actionsColumn');
        var newDiv = document.createElement('div');
        newDiv.innerHTML = '<form id="myForm" onsubmit="event.preventDefault(); saveComment();"><input type="hidden" value="actions"><textarea name="newComment"></textarea><input type="submit" value="Save"></form>';
        newDiv.className = 'item form';
        newDiv.id = 'form';

        column.parentNode.insertBefore(newDiv, column);
    }

    function saveComment()
    {
        var formData = document.getElementById("myForm").elements;
        var commentType = formData[0].value;
        var comment = formData[1].value;

        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "./new.php?type="+commentType+"&text="+comment, true);
        xhttp.send();

        var elementToRemove = document.getElementById('form');
        elementToRemove.parentNode.removeChild(elementToRemove);

        var column = document.getElementById(commentType + 'Column');
        var newDiv = document.createElement('div');
        newDiv.innerHTML = comment;
        newDiv.className = 'item';

        column.parentNode.insertBefore(newDiv, column);

        return false;
    }
</script>

</body>
</html>
