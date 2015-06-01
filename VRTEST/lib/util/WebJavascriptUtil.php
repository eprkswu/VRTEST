<?php
/**
 * JavaScript 실행 공용 Class
 * @author eprkswu@gmail.com
 */
class WebJavascriptUtil{

	/**
	 * JavaScript Tag 저장 변수
	 * @var String $javascript_tag
	 */
	private static $javascript_tag;

	/**
	 * JavaScript Tag 시작
	 */
	private static function startJavascript(){
		self::$javascript_tag = '<script>';
	}

	/**
	 * JavaScript Tag 종료
	 */
	private static function endJavascript(){
		self::$javascript_tag .= '</script>';
	}

	/**
	 * Message 내에 쿼테이션 중복시 오류발생을 방지 하기 위한 쿼테이션 통일 메소드
	 * @param String $message
	 * @return String
	 */
	private static function removeQuotation($message){
		$message = preg_replace('/\"/','\'',$message);
		return $message;
	}

	/**
	 * 링크 이동시 타겟 지정 메소드
	 * @param String $target
	 * @return String
	 */
	private static function getTarget($target){
		if($target == 'self'){
			return 'location.href';
		}else if($target == 'parent'){
			return 'parent.location.href';
		}
	}

	/**
	 * 알림창 실행 메소드
	 * @param String $message
	 */
	public static function alert($message){
		self::startJavascript();
		self::$javascript_tag .= 'alert("'.self::removeQuotation($message).'");';
		self::endJavascript();

		echo self::$javascript_tag;
		exit;
	}

	/**
	 * 알림창 이후 페이지 이동 실행 메소드
	 * @param String $message
	 * @param String $href
	 * @param String $target
	 */
	public static function alertAfterLocation($message, $href, $target = 'self'){
		self::startJavascript();
		self::$javascript_tag .= 'alert("'.self::removeQuotation($message).'");';
		self::$javascript_tag .= self::getTarget($target) . ' = "'.$href.'";';
		self::endJavascript();

		echo self::$javascript_tag;
		exit;
	}

	/**
	 * 특정 JavaScript 실행 메소드
	 * @param String $script
	 */
	public static function excuteScript($script){
		self::startJavascript();
		self::$javascript_tag .= $script;
		self::endJavascript();

		echo self::$javascript_tag;
		exit;
	}
}