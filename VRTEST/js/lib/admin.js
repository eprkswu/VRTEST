$(function(){
	/**
	 * 이미지 미리보기 가능 하도록 태그 지정
	 */
	$("#imageList").MultiFile({
		list : "#imagePreview"
	});

	/**
	 * VR 이미지 업로드 저장
	 */
	$("#btnSubmit").click(function(){
		if($.trim($("#file_id").val()) == ""){
			alert("상품코드는 필수 입니다.");
			$("#file_id").focus();
		}else if($.trim($("#file_width").val()) == ""){
			alert("가로폭은 필수 입니다.");
			$("#file_width").focus();
		}else if($.trim($("#file_height").val()) == ""){
			alert("세로폭은 필수 입니다.");
			$("#file_height").focus();
		}else{
			var frm = document.frmDocument;
			frm.action = "../process/vrListSave.proc.php";
			frm.method = "post";
			frm.target = "upload-frame";
			frm.submit();
		}
	});
});