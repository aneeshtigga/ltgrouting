<?php

$curl = curl_init();
$address = $_GET['address'];
$key = 'pk.eyJ1Ijoicm91dGV4bCIsImEiOiJjam15b2VxenIzdDZvM3ZvZWdyczdqN2k2In0.cbZMiVcun64WSlohAfPXbw';

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://api.mapbox.com/geocoding/v5/mapbox.places/". $address . '.json?access_token='. $key,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_POSTFIELDS => "",
  CURLOPT_HTTPHEADER => "",
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;
?>