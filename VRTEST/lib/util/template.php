<?php
class Template {

	var $vars;
	var $path;

	function Template($path = null) {
		$this->path = $path;
	}

	function set_path($path) {
		$this->path = $path;
	}

	function set($name, $value = null) {
		if (is_array($name)){
			foreach ($name as $key => $val){
				$this->vars[$key] = $val;
			}
		}else{
			$this->vars[$name] = $value;
		}
	}

	function fetch($file) {
		@extract($this->vars);
		ob_start();
		include($this->path . $file);
		$contents = ob_get_contents();
		ob_end_clean();
		return $contents;
	}

}
?>