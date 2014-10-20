<?php

$EmailFrom = "luke@sizr.net";
$EmailTo = "kartikdgr8@gmail.com";
$Subject = "Jobspire Aspirant";

$Email = Trim(stripslashes($_POST['Email'])); 
$Type = Trim(stripslashes($_POST['Type'])); 

// prepare email body text
$Body .= "Email: ";
$Body .= $Email;
$Body .= "\nType: ";
$Body .= $Type;

// send email 
mail($EmailTo, $Subject, $Body, "From: <$EmailFrom>");

?>