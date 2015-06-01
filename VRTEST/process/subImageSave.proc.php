<?php
require_once '../lib/util/WebJavascriptUtil.php';

$file_id = (int)$_POST['file_id'];
$upload_file = $_FILES['upload_file'];
$input_index = (int)$_POST['input_index'];

$uploadDir = '/home/ubuntu/www/ojtProject/VRTEST/img/'.$file_id.'/'; //이미지 업로드 디렉토리
if(is_dir($uploadDir) === false){
	mkdir($uploadDir);
}

/**
 * 단일 이미지 업로드 처리 수행
 */
if($upload_file['error'] == 0){
	if(is_uploaded_file($upload_file['tmp_name'])) {
		$file_name = $input_index.'.'.getFileExt($upload_file['name']);
		$upload_file_Path = $uploadDir.'/'.$file_name;
		move_uploaded_file($upload_file['tmp_name'], $upload_file_Path);

		$image_url = '/VRTEST/img/'.$file_id.'/'.$file_name;

		WebJavascriptUtil::excuteScript('parent.$.imageUploadSuccess('.$input_index.',"'.$image_url.'");');
	}else{
		WebJavascriptUtil::excuteScript('parent.$.imageUploadFailed();');
	}
}else{
	WebJavascriptUtil::excuteScript('parent.$.imageUploadFailed();');
}

/**
 * 이미지 확장자 추출 메소드
 * @param String $fileName
 * @return String
 */
function getFileExt($fileName){
	$path = pathinfo($fileName);
	return strtoupper($path['extension']);
}
?>