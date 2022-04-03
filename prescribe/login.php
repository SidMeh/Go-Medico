<?php 

$email = $_POST["email"];
$password = $_POST["password"];
$num = $_POST["mobnum"];

if($password === "" or $num === "" or $email === ""){
	echo " Enter details correctly/completely/ Password not matching.";
}
else{

	$db = new mysqli('localhost', 'root', '$iddh@13M', 'gomedico','3306');
	$sql = "select * from userdata where email = '$email' and phonenumber = '$num' and userpassword = '$password' ;";
//	$sql = "select * from userdata";
	$result = mysqli_query($db,$sql);
 	$row = mysqli_fetch_array($result);
 	

 	if($row[1] === $email){
		header("Location: main.html");
	}
	else{
		echo "Record doesnt exist";
	}

}