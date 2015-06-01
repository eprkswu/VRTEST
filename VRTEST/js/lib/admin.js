$(function(){
	$("#imageList").MultiFile({
		list : "#imagePreview"
	});

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
			frm.submit();
		}
	});
});