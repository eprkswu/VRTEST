<?php
require_once './lib/util/template.php';
$file_id = (int)$_GET['file_id'];
if(!$file_id){
	$file_id = 1940998;
}

$oTpl = new Template('./tpl/');
$oTpl->set('file_id',$file_id);

echo $oTpl->fetch('index.tpl.php');