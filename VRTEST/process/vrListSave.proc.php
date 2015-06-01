<?php
require_once '../lib/util/CacheUpload.php';
require_once '../lib/util/WebJavascriptUtil.php';

$file_id = (int)$_POST['file_id'];
$file_width = (int)$_POST['file_width'];
$file_height = (int)$_POST['file_height'];

if($file_id == null || $file_id == 0){
	WebJavascriptUtil::alertAfterLocation('���忡 ���� �Ͽ����ϴ�.\nVR ���̵� ���� ���� �ʽ��ϴ�.', '/VRTEST/admin/');
}
if($file_width == null || $file_width == 0){
	$file_width = 800;
}
if($file_height == null || $file_height == 0){
	$file_height = 800;
}

$uploadDir = '/home/ubuntu/www/ojtProject/VRTEST/img/';
if(is_dir($uploadDir) === false){
	mkdir($uploadDir);
}

$files = $_FILES['files'];
if(count($files['error']) > 0){
	$result_upload_file_list = array();
	$result_upload_file_list['fild_id'] = $file_id;
	$result_upload_file_list['file_width'] = $file_width;
	$result_upload_file_list['file_height'] = $file_height;
	$result_upload_file_list['image_format'] = './img/'.$file_id.'###.JPG?t'.time().'=';
	$frames = 0;
	$image_list = array();
	foreach($files['error'] as $file_seq => $file_error_code){
		if($file_error_code == 0){
			if(is_uploaded_file($files['tmp_name'][$file_seq])) {
				if(($file_seq + 1) < 10){
					$file_name = $file_id.'00'.($file_seq + 1).'.'.getFileExt($files['name'][$file_seq]);
				}else{
					$file_name = $file_id.'0'.($file_seq + 1).'.'.getFileExt($files['name'][$file_seq]);
				}
				$upload_file_Path = $uploadDir.'/'.$file_name;
				move_uploaded_file($files['tmp_name'][$file_seq], $upload_file_Path);
				$image_list[] = './img/'.$file_name.'?t'.time().'=';
				$frames++;
			}
		}
	}
	$result_upload_file_list['image_list'] = $image_list;
	$result_upload_file_list['frames'] = $frames;
}

try{
	$oCacheUpload = new CacheUpload();
	$oCacheUpload->setUploadDirectory('/home/ubuntu/www/ojtProject/VRTEST/cache');
	$oCacheUpload->setFileName($file_id.'.json');
	$oCacheUpload->setUploadData(json_encode($result_upload_file_list));
	$oCacheUpload->executeUpload();

	WebJavascriptUtil::alertAfterLocation('���� �Ǿ����ϴ�. ������ ���� �����ڷ� �̵� �մϴ�.', '/VRTEST/admin/buttonSetting.php?file_id='.$file_id, 'parent');
}catch(Exception $e){
	WebJavascriptUtil::alertAfterLocation('���忡 ���� �Ͽ����ϴ�.\n'.$e->getMessage(), '/VRTEST/admin/', 'parent');
}

function getFileExt($fileName){
	$path = pathinfo($fileName);
	return strtoupper($path['extension']);
}
?>
