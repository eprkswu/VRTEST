$(function(){

	//포인터 지정 / X, Y 포인트 태그 생성
	$.drawPointer = function(seq, topPosition, leftPosition, unique_identify){

		//식별자가 없으면 식별자 생성
		if(typeof unique_identify == "undefined"){
			unique_identify = new Date().getTime() + "" + Math.floor(Math.random() * 100);
		}

		/**
		 * X, Y 좌표 Input Layer 생성
		 */
		var position_layer = $("<div />");
		position_layer.css({
			"margin-left":"20px",
			"margin-top":"10px"
		});

		/**
		 * X좌표 Input Tag 생성
		 */
		var x_position_input = $("<input />");
		x_position_input.css("width","30px");
		x_position_input.attr("name","x_point_"+seq+"[]");
		x_position_input.val(leftPosition);

		/**
		 * X좌표 Input Tag 생성
		 */
		var y_position_input = $("<input />");
		y_position_input.css("width","30px");
		y_position_input.attr("name","y_point_"+seq+"[]");
		y_position_input.val(topPosition);

		/**
		 * Point Image 입력 Tag 생성
		 */
		var position_data = $("<div />");
		var position_data_input = $("<div><input type=\"text\" name=\"point_file_"+seq+"[]\" id=\"point_file_"+unique_identify+"\" style=\"width:300px;\" /> <input type=\"button\" class=\"find_image\" value=\"찾아보기\" onclick=\"$.findImageLayerOpen(this,"+unique_identify+")\" /></div>");
		position_data.append(position_data_input);

		/**
		 * X, Y 좌표 Input Layer 태그 추가
		 */
		position_layer.append(" X 좌표 : ");
		position_layer.append(x_position_input);
		position_layer.append(" Y 좌표 : ");
		position_layer.append(y_position_input);
		position_layer.append(position_data);
		position_layer.append(" <a href=\"#\" onclick=\"$.removePointer(this,"+seq+","+unique_identify+")\">[삭제]</a>");
		position_layer.append("<input type=\"hidden\" name=\"point_unique_identify_"+seq+"[]\" value=\""+unique_identify+"\" />");

		/**
		 * Point Tag 생성
		 */
		var point_symbol = $("<div />");
		point_symbol.attr("class","point_symbol");
		point_symbol.attr("id","point_symbol_"+unique_identify);
		point_symbol.css({
			"top" : topPosition,
			"left" : leftPosition
		});

		/**
		 * 좌표 정보 옵션 영역에 추가
		 */
		$(".image_layer:eq("+seq+") .option_layer").append(position_layer);
		/**
		 * Point Tag 이미지 영역에 추가
		 */
		$(".image_layer:eq("+seq+")").append(point_symbol);
	};

	/**
	 * Point tag 삭제
	 */
	$.removePointer = function(object, seq, unique_identify){
		var _this = $(object);
		_this.parent().remove();
		$(".image_layer:eq("+seq+") #point_symbol_"+unique_identify).remove();
	};

	/**
	 * Point 별 이미지 추가 Layer Open
	 */
	$.findImageLayerOpen = function(object, unique_identify){
		$(".find_image_layer").css({
			top:$(object).offset().top + $(object).height() + 10,
			left:$(object).offset().left - 400
		});
		$("#input_index").val(unique_identify);
		$(".find_image_layer").show();
	};

	/**
	 * Point 별 이미지 추가 Layer Close
	 */
	$.findImageLayerClose = function(){
		$(".find_image_layer").hide();
	};

	/**
	 * Point 별 이미지 업로드 완료
	 */
	$.imageUploadSuccess = function(input_index, image_url){
		$("#point_file_"+input_index).val(image_url);
		$.findImageLayerClose();
	};

	/**
	 * Point 별 이미지 업로드 실패
	 */
	$.imageUploadFailed = function(){
		alert("이미지 업로드에 실패 하였습니다.");
		$.findImageLayerClose();
	};

	/**
	 * 입력 되어 있는 Point 정보가 있을 때 Point Draw
	 */
	if(annotation_list != null){
		for(var i in annotation_list){
			var top = parseInt(annotation_list[i].y);
			var left = parseInt(annotation_list[i].x);
			var seq = annotation_list[i].start - 1;
			var unique_identify = annotation_list[i].unique_identify;
			$.drawPointer(seq, top, left, unique_identify);

			$("#point_file_"+unique_identify).val(annotation_list[i].sub_image);
		}
	}

	/**
	 * 이미지 영역 클리시 해당 위치에 Point tag 생성
	 */
	$(".image_layer img").click(function(event){
		var seq = $(".image_layer img").index($(this));
		var top = event.clientY - 20;
		var left = event.clientX - 20;
		$.drawPointer(seq, top, left);
	});

	/**
	 * 이전 이미지로 이동
	 */
	$(".page_layer .prev").click(function(){
		var current_frame = $(".page_layer").data("current-frame");
		if(typeof(current_frame) == "undefined"){
			current_frame = 0;
		}

		if(current_frame == 0){
			alert("첫번째 프레임입니다.");
		}else{
			current_frame = current_frame - 1;
			$(".page_layer").data("current-frame",current_frame);
			$(".page_layer .current_frame").text(current_frame + 1);

			$(".image_layer.show").removeClass("show").addClass("hide");
			$(".image_layer:eq("+current_frame+")").addClass("show");
		}
	});

	/**
	 * 다음 이미지로 이동
	 */
	$(".page_layer .next").click(function(){
		var current_frame = $(".page_layer").data("current-frame");
		if(typeof(current_frame) == "undefined"){
			current_frame = 0;
		}

		if(current_frame >= $(".page_layer").attr("data-last-frame")){
			alert("마지막 프레임입니다.");
		}else{
			current_frame = current_frame + 1;
			$(".page_layer").data("current-frame",current_frame);
			$(".page_layer .current_frame").text(current_frame + 1);

			$(".image_layer.show").removeClass("show").addClass("hide");
			$(".image_layer:eq("+current_frame+")").addClass("show");
		}
	});

	/**
	 * 최종 저장
	 */
	$("#btnSave").click(function(){
		var frm = document.frmButtonSetting;

		frm.action = "/VRTEST/process/buttonSettingSave.proc.php";
		frm.submit();
	});

	/**
	 * Point 별 이미지 저장
	 */
	$("#btnImageSave").click(function(){
		var frm = document.frmImageUpload;
		frm.target = "ifrmImageUpload";
		frm.action = "../process/subImageSave.proc.php";
		frm.submit();
	});
});