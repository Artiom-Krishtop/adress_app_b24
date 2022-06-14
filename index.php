<?
require_once (__DIR__.'/crest.php');?>

<!DOCTYPE html>
<html lang="en">
<head>
	<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
	<script src="//api.bitrix24.com/api/v1/"></script>
	<link rel="stylesheet" href="style/style.css">
	<script src="script/script.js"></script>
</head>
<body>
	<div class="container">
		<div class="input-area-wrapper">
			<label for="country">Добавить страну</label>
			<input type="text" id="country" name="country" class="input-adress">
		</div>
		<div class="input-area-wrapper">
			<label for="city">Добавить город</label>
			<input type="text" id="city" name="city" class="input-adress">
		</div>
		<div class="input-area-wrapper">
			<label for="street">Добавить улицу</label>
			<input type="text" id="street" name="street" class="input-adress">
		</div>
		<div class="input-area-wrapper">
			<button id="add">Добавить</button>
		</div>
	</div>
</body>
</html>

