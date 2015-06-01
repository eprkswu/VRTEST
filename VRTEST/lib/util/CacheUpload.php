<?php
class CacheUpload{

	private $upload_dir;

	private $upload_data;

	private $file_name;

	public function __construct($upload_dir = ''){
		if($upload_dir != ''){
			$this->setUploadDirectory($upload_dir);
		}
	}

	public function setUploadDirectory($upload_dir){
		$this->upload_dir = $upload_dir;
	}

	public function setUploadData($upload_data){
		$this->upload_data = $upload_data;
	}

	public function setFileName($file_name){
		$this->file_name = $file_name;
	}

	public function executeUpload(){
		if($this->upload_dir == null || $this->upload_dir == ''){
			throw new InvalidArgumentException('������ ������ �����ؾ� �մϴ�.');
		}
		if($this->file_name == null || $this->file_name == ''){
			throw new InvalidArgumentException('������ ���ϸ��� �����ؾ� �մϴ�.');
		}
		if($this->upload_data == null || $this->upload_data == ''){
			throw new InvalidArgumentException('������ �����Ͱ� �����ϴ�.');
		}

		$this->checkDirectory();

		$fp = fopen($this->upload_dir.'/'.$this->file_name, 'w+');
		fwrite($fp, $this->upload_data);
		fclose($fp);
	}

	private function checkDirectory(){
		if(is_dir($this->upload_dir) === false){
			mkdir($this->upload_dir);
		}
	}
}
?>