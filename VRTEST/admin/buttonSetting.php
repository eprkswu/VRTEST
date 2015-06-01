<?php
require_once '../lib/util/template.php';
require_once '../lib/util/WebJavascriptUtil.php';

$file_id = (int)$_GET['file_id'];
if($file_id == null || $file_id == 0){
	WebJavascriptUtil::alertAfterLocation('VR ���̵� ���� ���� �ʽ��ϴ�.', '/VRTEST/admin/');
}

$data = json_decode(file_get_contents('../cache/'.$file_id.'.json'),true);

$oTpl = new Template('../tpl/admin/');
$oTpl->set('data',$data);
$oTpl->set('file_id',$file_id);

echo $oTpl->fetch('buttonSetting.tpl.php');
?>
