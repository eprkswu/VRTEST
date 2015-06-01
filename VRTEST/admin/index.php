<?php
require_once '../lib/util/template.php';

$oTpl = new Template('../tpl/admin/');

echo $oTpl->fetch('index.tpl.php');
?>