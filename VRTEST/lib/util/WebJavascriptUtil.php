<?php
class WebJavascriptUtil{

	private static $javascript_tag;

	private static function startJavascript(){
		self::$javascript_tag = '<script>';
	}

	private static function endJavascript(){
		self::$javascript_tag .= '</script>';
	}

	private static function removeQuotation($message){
		$message = preg_replace('/\"/','\'',$message);
		return $message;
	}

	private static function getTarget($target){
		if($target == 'self'){
			return 'location.href';
		}else if($target == 'parent'){
			return 'parent.location.href';
		}
	}

	public static function alert($message){
		self::startJavascript();
		self::$javascript_tag .= 'alert("'.self::removeQuotation($message).'");';
		self::endJavascript();

		echo self::$javascript_tag;
		exit;
	}

	public static function alertAfterLocation($message, $href, $target = 'self'){
		self::startJavascript();
		self::$javascript_tag .= 'alert("'.self::removeQuotation($message).'");';
		self::$javascript_tag .= self::getTarget($target) . ' = "'.$href.'";';
		self::endJavascript();

		echo self::$javascript_tag;
		exit;
	}

	public static function excuteScript($script){
		self::startJavascript();
		self::$javascript_tag .= $script;
		self::endJavascript();

		echo self::$javascript_tag;
		exit;
	}
}