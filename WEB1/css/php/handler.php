<?php
    echo("sasdasdasdsada");
    $req_count  = 0
    function checkHit($value_x, $value_y, $value_r) {
        //check triangle
        $inner_first = function($value_x, $value_y, $value_r) {
            if ($value_x >= 0 && $value_x <= $value_r / 2){
                return $value_y <= 0 && $value_y >= -$value_r / 2;
            }
            return false;
        };
        //check rectangle
        $inner_second = function($value_x, $value_y, $value_r) {
            if ($value_x <= 0 && $value_x >= -$value_r){
                return $value_y <= 0 && $value_y >= -$value_r;
            }
            return false;
        };
        //check circle
        $inner_third = function($value_x, $value_y, $value_r) {
            if ($value_x >= 0 && $value_x <= $value_r / 2){
                return $value_y >= 0 && (pow($value_x, 2) + pow($value_y, 2) <= pow($value_r / 2, 2));
            }
            return false;
        };
        return ($inner_first($value_x, $value_y, $value_r) || $inner_second($value_x, $value_y, $value_r) || $inner_third($value_x, $value_y, $value_r));
    };
    
    function getDatetimeWithOffset($offset) {
        $timezone_name = timezone_name_from_abbr("", -$offset*60, false);
        $dt = new DateTime("now", new DateTimeZone($timezone_name));
        return $dt->format("Y-m-d H:i:s");
    };

    if (isset($_POST["value_X"] && $_POST["value_Y"] &&$_POST["value_R"])){

        $start = microtime(true);
        $req_count = $req_count + 1;
        $x = $_POST["value_X"];
        $y = $_POST["value_Y"];
        $r = $_POST["value_R"];
        $hit = checkHit($x, $y, $r);
        $current_time = getDatetimeWithOffset($_POST["timezone_offset_minutes"]);
        $script_time = (microtime(true) - $start);
        echo("
        {
            \"req_count\":\"$req_count\",
            \"value_X\": \"$x\",
            \"value_Y\": \"$y\",
            \"value_R\": \"$r\",
            \"value_hit\": \"$hit\",
            \"current_time\": \"$current_time\",
            \"script_time\": \"$script_time\"
        }
        ");
    }