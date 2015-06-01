$(function(){
	var vr_data = null;
	/**
	 * 현재 file_id에 대한 cache file 조회
	 */
	$.ajax({
		cache:false,
		url:"./cache/"+file_id+".json",
		dataType:"json",
		success:function(data){
			
			vr_data = data;
			
			/**
			 * 이미지 태그 생성
			 */
			$image = $("<img />");
			$image.attr("src",vr_data.image_list[0]);
			$image.attr("width",vr_data.file_width);
			$image.attr("height",vr_data.file_height);
			$image.attr("class","reel");
			$image.attr("id","image");

			/**
			 * 슬라이더 태그 생성
			 */
			$slider = $("<div />");
			$slider.attr("id", "slider");
			$slider.css({
				"width":vr_data.file_width+"px",
				"margin-top":"20px"
			});

			$("#reelLayer").append($image);
			$("#reelLayer").append($slider);
						
			/**
			 * Point 태그 생성
			 */
			var annotations = {};			
			if(vr_data.annotation_list != null){
								
				$annotation_data = new Array();
				$annotation_tag = new Array();
				
				for(var seq in vr_data.annotation_list){					
					$annotation_tag[seq] = $("<a />");
					$annotation_tag[seq].attr("class","point_symbol");
					$annotation_tag[seq].attr("href","#");
					$annotation_tag[seq].attr("onclick","$.subLayerOpen("+seq+", event)");									
					
					/**
					 * Point에 대한 포지션과 노출 Page 지정
					 */
					$annotation_data[seq] = {
						start:vr_data.annotation_list[seq].start,
						end:vr_data.annotation_list[seq].end,
						x:parseInt(vr_data.annotation_list[seq].x),
						y:parseInt(vr_data.annotation_list[seq].y)
					}
				}				
				
				$("#reelLayer").append($annotation_tag);							
				
				/**
				 * jQuery.reel에 추가할 annotation 옵션 설정
				 */
				for(var seq in $annotation_data){
					annotations["annotation_"+seq] = {
						node:$annotation_tag[seq],
						start: $annotation_data[seq].start,
						end: $annotation_data[seq].end,
						x: $annotation_data[seq].x,
						y: $annotation_data[seq].y
					}
				}			
			}								

			/**
			 * jQuery.reel 실행
			 */
			$image.reel({
				images:vr_data.image_format,
				frames:data.frames,
				loops:false,
				cursor:"pointer",
				annotations:annotations
			});

			/**
			 * jQuery Slider 실행
			 */
			$slider.slider({
				range: "min",
				min:1,
				max:vr_data.frames,				
				slide : function(event, ui){ //슬라이드 이동시 VR 이미지 이동 처리
					$("#image").reel("frame", ui.value);
				}
			});

			/**
			 * VR 이미지 이동시 슬라이드 이동 처리
			 */
			$image.on("frameChange", function(){
				$slider.slider("value",$(this).reel("frame"));
			});
		}
	});
	
	var sub_layer_check = new Array();
	/**
	 * Point Tag 클릭시 해당 Point 이미지 레이어 오픈
	 */
	$.subLayerOpen = function(seq, event){
		event.preventDefault();
		/**
		 * 한번 호출한 이미지는 다시 호출하지 않는다.
		 */
		if(sub_layer_check[seq] == true){
			$("#sub_image_" + seq).show();
		}else{
			if(
				vr_data.annotation_list[seq].sub_image != null
				&& vr_data.annotation_list[seq].sub_image != ""
			){			
				/**
				 * 지정한 VR 사이즈의 80% 크기로 이미지 처리
				 */
				var sub_tag_width = vr_data.file_width * 0.8;
				var sub_tag_height = vr_data.file_height * 0.8;
				var sub_tag_top = (vr_data.file_height - sub_tag_height) / 2 + 30;
				var sub_tag_left = (vr_data.file_width - sub_tag_width) / 2 + 30;
				
			 	$annotation_sub_tag = $("<div id=\"sub_image_"+seq+"\" style=\"position:absolute;top:"+sub_tag_top+"px;left:"+sub_tag_left+"px;\" onclick=\"$.subLayerClose(this);\"><img src=\""+vr_data.annotation_list[seq].sub_image+"\" style=\"width:"+sub_tag_width+"px;\" /></div>");
				
				$("#reelLayer").append($annotation_sub_tag);
				
				sub_layer_check[seq] = true;
			}
		}
	};
	
	/**
	 * Point 별 이미지 Layer Close
	 */
	$.subLayerClose = function(object){
		$(object).hide();
	};	
});