<?php
require_once '../lib/util/template.php';
require_once '../lib/util/RemoveXSS.php';

$oTpl = new Template('../tpl/admin/');

echo $oTpl->fetch('index.tpl.php');
?>