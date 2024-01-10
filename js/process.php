<?php
$date = "{$_POST['date']}";
$colour = "{$_POST['colour']}";
$h1 = "{$_POST['h1']}";
$h2 = "{$_POST['h2']}"; 
$status = "Draft";
$image = "{$_POST['imagefile']}";
$h3 = "{$_POST['h3']}";
$contact = "{$_POST['contact']}";
$phone = "{$_POST['phone']}";
$email = "{$_POST['email']}";
$category = "{$_POST['category']}";
$icon = "{$_POST['icon']}";
$link = "{$_POST['link']}";
$content = "{$_POST['content']}";
$block = "{$_POST['block']}";
$file = "../json/data.json";
$json = json_decode(file_get_contents($file), true);
$items = "items";
$item = "item";
$cid = "{$_POST['counter']}";
$counter = "0000";
$name = ucwords($name);


$id = $json[$items];

$iCount = count($id);
$counttotal = $iCount+1;

$name = nl2br($name);
$dateexpires = date('Y-m-d', strtotime("+365 days"));

$sitemarray = array ("status" =>  $status, "date_listed" => $date,  "date_expired" => $dateexpires, "image" => $image, "description" => $description);
$contactarray = array ("name" => $contact, "email" => $email, "phone" => $phone);
$mainarray = array("id" => $counttotal, "category" => $category, "condition" => $condition, "price" => $price, "name" => $name, "item" => $itemarray, "contact" => $contactarray);

$json[$items] []  = $mainarray;

file_put_contents($file, json_encode($json));

header('Location: ../dashboard.html');

?>


