<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

$stock = array('BBL', 'KBANK', 'BAY', 'SCB');

$counterA = rand(1, 10);
$counterB = rand(1, 10);
while (1) {
  
  $curDate = date(DATE_ISO8601);
  
  // Sent 'news_alert' event at random intervals.
  $counterA--;
  if (!$counterA) {
	  echo "event: news_alert\n";
	  echo 'data: {"time": "' . $curDate . '", "headline":"News update for ' . $stock[rand(0, 3)] . '"}';
	  echo "\n\n";
	  $counterA = rand(1, 10);
  }
  
  // Send a simple message at random intervals.
  $counterB--;
  if (!$counterB) {
    echo 'data: This is a custom message at time ' . $curDate . "\n\n";
    $counterB = rand(1, 10);
  }
  
  ob_flush();
  flush();
  sleep(1);
}
?>
