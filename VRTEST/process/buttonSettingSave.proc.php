<?php
require_once '../lib/util/CacheUpload.php';
require_once '../lib/util/WebJavascriptUtil.php';

$file_id = (int)$_POST['file_id'];
if($file_id == null || $file_id == 0){
	WebJavascriptUtil::alertAfterLocation('저장에 실패 하였습니다.\nVR 아이디가 존재 하지 않습니다.', '/VRTEST/admin/');
}

$data = json_decode(file_get_contents('../cache/'.$file_id.'.json'),true);

$frame_list = $_POST['frame_list'];
if(count($frame_list) > 0){
	$annotaion_list = array();
	foreach($frame_list as $frame_seq){
		if($_POST['point_unique_identify_'.$frame_seq] != null){
			foreach($_POST['point_unique_identify_'.$frame_seq] as $point_seq => $point_unique_identify){
				$annotation = array();
				$annotation['unique_identify'] = $point_unique_identify;
				$annotation['start'] = $frame_seq + 1;
				$annotation['end'] = $frame_seq + 1;
				$annotation['x'] = (int)$_POST['x_point_'.$frame_seq][$point_seq];
				$annotation['y'] = (int)$_POST['y_point_'.$frame_seq][$point_seq];
				$annotation['sub_image'] = $_POST['point_file_'.$frame_seq][$point_seq].'?t'.time().'=';

				$annotaion_list[] = $annotation;
			}
		}
	}
}

$data['annotation_list'] = $annotaion_list;

try{
	$oCacheUpload = new CacheUpload();
	$oCacheUpload->setUploadDirectory('/home/ubuntu/www/ojtProject/VRTEST/cache');
	$oCacheUpload->setFileName($file_id.'.json');
	$oCacheUpload->setUploadData(json_encode($data));
	$oCacheUpload->executeUpload();

	WebJavascriptUtil::alertAfterLocation('저장 되었습니다.', '/VRTEST/admin/buttonSetting.php?file_id='.$file_id);
}catch(Exception $e){
	WebJavascriptUtil::alertAfterLocation('저장에 실패 하였습니다.\n'.$e->getMessage(), '/VRTEST/admin/');
}
?>