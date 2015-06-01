<?php
/**
 * Cache File 저장 Class
 * @author eprkswu@gmail.com
 */
class CacheUpload{

	/**
	 * 저장 디렉토리
	 * @var String $upload_dir
	 */
	private $upload_dir;

	/**
	 * 저장할 데이터
	 * @var String $upload_data
	 */
	private $upload_data;

	/**
	 * 저장할 파일명
	 * @var String $file_name
	 */
	private $file_name;

	/**
	 * 생성자
	 * 저장 디렉토리를 생성자에서 지정 가능
	 * @param String $upload_dir
	 */
	public function __construct($upload_dir = ''){
		if($upload_dir != ''){
			$this->setUploadDirectory($upload_dir);
		}
	}

	/**
	 * 저장 디렉토리 setter
	 * @param String $upload_dir
	 */
	public function setUploadDirectory($upload_dir){
		$this->upload_dir = $upload_dir;
	}

	/**
	 * 저장할 데이터 setter
	 * @param String $upload_data
	 */
	public function setUploadData($upload_data){
		$this->upload_data = $upload_data;
	}

	/**
	 * 저장할 파일명 setter
	 * @param String $file_name
	 */
	public function setFileName($file_name){
		$this->file_name = $file_name;
	}

	/**
	 * Cache 저장 실행
	 * @throws InvalidArgumentException
	 */
	public function executeUpload(){
		if($this->upload_dir == null || $this->upload_dir == ''){
			throw new InvalidArgumentException('저장할 폴더를 지정해야 합니다.');
		}
		if($this->file_name == null || $this->file_name == ''){
			throw new InvalidArgumentException('저장할 파일명을 지정해야 합니다.');
		}
		if($this->upload_data == null || $this->upload_data == ''){
			throw new InvalidArgumentException('저장할 데이터가 없습니다.');
		}

		$this->checkDirectory();

		$fp = fopen($this->upload_dir.'/'.$this->file_name, 'w+');
		fwrite($fp, $this->upload_data);
		fclose($fp);
	}

	/**
	 * 디렉토리 존재 여부 검사하여 없을시 디렉토리 생성
	 */
	private function checkDirectory(){
		if(is_dir($this->upload_dir) === false){
			mkdir($this->upload_dir);
		}
	}
}
?>