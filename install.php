<?php
require_once (__DIR__.'/crest.php');

$result = CRest::installApp();

$res = CRest::call(
	'userfieldtype.add',
	[
		'USER_TYPE_ID' => 'adress_type',
		'HANDLER' => 'https://devenv.dev-bitrix.by/b24.widget.test/handler/address_user_type.php',
		'TITLE' => 'Адрес',
		'DESCRIPTION' => 'Добавляет виджет Адрес в виде аккордеона',
	]
);

if(isset($res['error'])){
	return new Exception($res['error_description']);
}

$res = CRest::call(
	'entity.add',
	[
		'ENTITY' => 'adress',
		'NAME' => 'Adress',
		'ACCESS' => ['U1' => 'W','AU' => 'R'],
	]
);

if(isset($res['error'])){
	return new Exception($res['error_description']);
}

if($result['rest_only'] === false):?>
<head>
	<script src="//api.bitrix24.com/api/v1/"></script>
	<?if($result['install'] == true):?>
	<script>
		BX24.init(function(){
			BX24.installFinish();
		});
	</script>
	<?endif;?>
</head>
<body>
	<?if($result['install'] == true):?>
		installation has been finished
	<?else:?>
		installation error
	<?endif;?>
</body>
<?endif;