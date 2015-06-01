<!doctype html>
<html lang="ko">
	<head>
		<meta charset="utf-8">
		<link rel="stylesheet" href="/VRTEST/css/admin.css">
	</head>
	<body>
		<div id="wrap">
			<form name="frmButtonSetting" id="frmButtonSetting" method="post">
				<input type="hidden" name="file_id" value="<?=$file_id?>" />
				<?php
				if(count($data['image_list']) > 0){
					foreach($data['image_list'] as $seq => $image){
						$hide_class = 'hide';
						if($seq == 0){
							$hide_class = 'show';
						}
						echo '
							<input type="hidden" name="frame_list[]" value="'.$seq.'" />
							<div class="image_layer '.$hide_class.'">
								<img src="/VRTEST/'.$image.'" style="width:'.$data['file_width'].'px;height:'.$data['file_height'].'px" />
								<div class="option_layer"></div>
							</div>
							<div style="clear:both;"></div>
						';
					}
				?>
					<div class="page_layer" data-last-frame="<?=$data['frames'] - 1?>" style="text-align:center;width:<?=$data['file_width']?>px;">
						<a href="#" class="prev"><</a>
						<span class="current_frame">1</span> / <?=$data['frames']?>
						<a href="#" class="next">></a>
					</div>
				<?php
				}
				?>
			</form>
			<div class="button_layer" style="width:<?=$data['file_width']?>px;">
				<input type="button" id="btnSave" value="저 장" />
			</div>
			<div class="find_image_layer">
				<form name="frmImageUpload" id="frmImageUpload" method="post" enctype="multipart/form-data">
					<input type="hidden" name="file_id" value="<?=$file_id?>" />
					<input type="hidden" name="input_index" id="input_index" />
					<h3>이미지 찾기</h3>
					<input type="file" name="upload_file" />
					<div class="button_layer">
						<input type="button" id="btnImageSave" value="저장" />
						<input type="button" value="닫기" onclick="$.findImageLayerClose();" />
					</div>
				</form>
				<iframe name="ifrmImageUpload" id="ifrmImageUpload" style="display: none"></iframe>
			</div>
		</div>
		<script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
		<script>
		var annotation_list = <?=json_encode($data['annotation_list']);?>;
		</script>
		<script src="/VRTEST/js/lib/buttonSetting.js"></script>
	</body>
</html>