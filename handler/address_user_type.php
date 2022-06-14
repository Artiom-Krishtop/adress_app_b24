<?php

require_once 'includes/header.php';
require_once '../crest.php';

function dd($test){
    echo '<pre>' . print_r($test, 1) . '</pre>';
}

$options = json_decode($_REQUEST['PLACEMENT_OPTIONS'], true);
$sectionsCountry = CRest::call('entity.section.get', ['ENTITY' => 'adress', 'SORT' => ['NAME' => 'ASC'], 'FILTER' => ['DEPTH_LEVEL' => 1]]);

if($options['MODE'] == 'edit'){?>

	<div class="dropdown-wrapper" data-field="country">
		<div class="dropdown">
			<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButtonCountry" data-bs-toggle="dropdown" aria-expanded="false">
				Выберите страну
			</button>
			<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
				<?foreach($sectionsCountry['result'] as $section):?>
					<li><span class="dropdown-item" data-id="<?=$section['ID']?>" onclick="selectCountry(this);"><?=$section['NAME']?></span></li>
				<?endforeach;?>
			</ul>
		</div>
	</div>
	<div class="dropdown-wrapper" data-field="city">
		<div class="dropdown">
			<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButtonCity" data-bs-toggle="dropdown" aria-expanded="false">
				Выберите город
			</button>
			<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton2"></ul>
		</div>
	</div>	
	<div class="dropdown-wrapper" data-field="street">
		<div class="dropdown">
			<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButtonStreet" data-bs-toggle="dropdown" aria-expanded="false">
				Выберите улицу
			</button>
			<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton3"></ul>
		</div>
	</div>		
<?}else{

	$value = !empty($options['VALUE']) ? $options['VALUE'] : 'Не выбрано';?>
	
	<script>BX24.resizeWindow(407, 30)</script>

	<div class="widget-val">
		<span><?= $value?></span>
	</div>
<?}?>


<?require_once 'includes/footer.php';?>

