<!doctype html>
<html lang="ko">
	<head>
		<meta charset="utf-8">
	</head>
	<body>
		<form name="frmDocument" action="../process/vrListSave.proc.php" method="post" enctype="multipart/form-data" target="upload-frame">
			<div style="margin-top:20px;margin-left:20px;">
				<div style="margin-bottom:20px">
					<div style="margin-bottom:10px">
						<input type="text" id="file_id" name="file_id" placeholder="상품코드 입력" />
					</div>
					<div style="margin-bottom:10px">
						<input type="text" id="file_width" name="file_width" placeholder="가로폭" /> X <input type="text" id="file_height" name="file_height" placeholder="세로폭" />
					</div>
				</div>
				<div>
					<input name="files[]" type="file" multiple="multiple" id="imageList" class="with-preview" />
					<input type="button" id="btnSubmit" value="전송" />
				</div>
				<div id="imagePreview">
				</div>
			</div>
			<iframe id="upload-frame" name="upload-frame" src="about:blank" style="display: none"></iframe>
		</form>
		<script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
		<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/jquery-placeholder/2.0.8/jquery.placeholder.min.js"></script>
		<script src="/VRTEST/js/lib/plugin/jquery.form.js"></script>
		<script src="/VRTEST/js/lib/plugin/jquery.MetaData.js"></script>
		<script src="/VRTEST/js/lib/plugin/jquery.MultiFile.min.js"></script>
		<script src="/VRTEST/js/lib/admin.js"></script>
	</body>
</html>