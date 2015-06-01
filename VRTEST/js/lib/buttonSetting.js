$(function(){

			$.drawPointer = function(seq, topPosition, leftPosition, unique_identify){

				if(typeof unique_identify == "undefined"){
			unique_identify = new Date().getTime() + "" + Math.floor(Math.random() * 100);
		}

		var position_layer = $("<div />");
		position_layer.css({
			"margin-left":"20px",
			"margin-top":"10px"
		});

		var x_position_input = $("<input />");
		x_position_input.css("width","30px");
		x_position_input.attr("name","x_point_"+seq+"[]");
		x_position_input.val(leftPosition);

		var y_position_input = $("<input />");
		y_position_input.css("width","30px");
		y_position_input.attr("name","y_point_"+seq+"[]");
		y_position_input.val(topPosition);

		var position_data = $("<div />");
		//var position_data_option = $("<div><input type=\"radio\" name=\"point_data_option_"+seq+"[]\" value=\"image\" /> 이미지 <input type=\"radio\" name=\"point_data_option_"+seq+"[]\" value=\"youtube\" /> YouTube</div>");
		var position_data_input = $("<div><input type=\"text\" name=\"point_file_"+seq+"[]\" id=\"point_file_"+unique_identify+"\" style=\"width:300px;\" /> <input type=\"button\" class=\"find_image\" value=\"찾아보기\" onclick=\"$.findImageLayerOpen(this,"+unique_identify+")\" /></div>");
		//position_data.append(position_data_option);
		position_data.append(position_data_input);

		position_layer.append(" X 좌표 : ");
		position_layer.append(x_position_input);
		position_layer.append(" Y 좌표 : ");
		position_layer.append(y_position_input);
		position_layer.append(position_data);
		position_layer.append(" <a href=\"#\" onclick=\"$.removePointer(this,"+seq+","+unique_identify+")\">[삭제]</a>");
		position_layer.append("<input type=\"hidden\" name=\"point_unique_identify_"+seq+"[]\" value=\""+unique_identify+"\" />");

		var point_symbol = $("<div />");
		point_symbol.attr("class","point_symbol");
		point_symbol.attr("id","point_symbol_"+unique_identify);
		point_symbol.css({
			"top" : topPosition,
			"left" : leftPosition
		});

		$(".image_layer:eq("+seq+") .option_layer").append(position_layer);
		$(".image_layer:eq("+seq+")").append(point_symbol);
	};

	$.removePointer = function(object, seq, unique_identify){
		var _this = $(object);
		_this.parent().remove();
		$(".image_layer:eq("+seq+") #point_symbol_"+unique_identify).remove();
	};

	$.findImageLayerOpen = function(object, unique_identify){
		$(".find_image_layer").css({
			top:$(object).offset().top + $(object).height() + 10,
			left:$(object).offset().left - 400
		});
		$("#input_index").val(unique_identify);
		$(".find_image_layer").show();
	};

	$.findImageLayerClose = function(){
		$(".find_image_layer").hide();
	};

	$.imageUploadSuccess = function(input_index, image_url){
		$("#point_file_"+input_index).val(image_url);
		$.findImageLayerClose();
	};

	$.imageUploadFailed = function(){
		alert("이미지 업로드에 실패 하였습니다.");
		$.findImageLayerClose();
	};

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

	$(".image_layer img").click(function(event){
		var seq = $(".image_layer img").index($(this));
		var top = event.clientY - 20;
		var left = event.clientX - 20;
		$.drawPointer(seq, top, left);
	});

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

	$("#btnSave").click(function(){
		var frm = document.frmButtonSetting;

		frm.action = "/VRTEST/process/buttonSettingSave.proc.php";
		frm.submit();
	});

	$("#btnImageSave").click(function(){
		var frm = document.frmImageUpload;
		frm.target = "ifrmImageUpload";
		frm.action = "../process/subImageSave.proc.php";
		frm.submit();
	});
});