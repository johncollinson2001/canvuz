<?php		
	function GetIncludeContents($filename) {
		if (is_file($filename)) {
			ob_start();
			include $filename;
			$contents = ob_get_contents();
			ob_end_clean();
			return $contents;
		}
		return false;
	}
	
	function GetSelected($check) {
		$uri = explode('/', $_SERVER['REQUEST_URI']);	
		if(count($uri) > 3) {
			$page = $uri[2];
		} else {
			$page = 'about';
		}
	
		if($page==$check) {
			return ' selected';	
		} else {
			return '';
		}
	}
	
	function ListFiles($dir) {
		if($dh = opendir($dir)) {
	
			$files = Array();
			$inner_files = Array();
	
			while($file = readdir($dh)) {
				if($file != "." && $file != ".." && $file[0] != '.') {
					if(is_dir($dir . "/" . $file)) {
						$inner_files = ListFiles($dir . "/" . $file);
						if(is_array($inner_files)) $files = array_merge($files, $inner_files); 
					} else {
						array_push($files, $dir . "/" . $file);
					}
				}
			}
	
			closedir($dh);
			return $files;
		}
	}	
?>