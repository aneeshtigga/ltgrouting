<?php

$curl = curl_init();
$newdate = $_GET['newdate'];
$payload = array( "calendarID"=>4507360,"minDate"=>$newdate,"maxDate"=>$newdate);

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://acuityscheduling.com/api/v1/appointments". '?' . http_build_query($payload),
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_POSTFIELDS => "",
  CURLOPT_HTTPHEADER => array(
    "Authorization: Basic MjA3NjgxNjU6NTc5Y2I3MTk1OTMzOTM3MDk2ZjQ5OTlkMzU2N2NhNWI=",
    "Content-Type: application/json",
    "Cookie: AWSALB=wyJRYzxkpMqSXKDWa/JEc7aON2vWra6ypZ2C48HcOvz+xz7E5DUBHhRJDWLR1cAbTRxS1bS0fWWhHuOjyUWMU0SWzxl+/NMKl4mYjkck+G8DuNpNwrjVyUVmlY8X; AWSALBCORS=wyJRYzxkpMqSXKDWa/JEc7aON2vWra6ypZ2C48HcOvz+xz7E5DUBHhRJDWLR1cAbTRxS1bS0fWWhHuOjyUWMU0SWzxl+/NMKl4mYjkck+G8DuNpNwrjVyUVmlY8X"
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;
?>