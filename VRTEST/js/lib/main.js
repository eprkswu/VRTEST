$(function(){
	var vr_data = null;
	$.ajax({
		cache:false,
		url:"./cache/"+file_id+".json",
		dataType:"json",
		success:function(data){
			
			vr_data = data;
			
			$image = $("<img />");
			$image.attr("src",vr_data.image_list[0]);
			$image.attr("width",vr_data.file_width);
			$image.attr("height",vr_data.file_height);
			$image.attr("class","reel");
			$image.attr("id","image");

			$slider = $("<div />");
			$slider.attr("id", "slider");
			$slider.css({
				"width":vr_data.file_width+"px",
				"margin-top":"20px"
			});

			$("#reelLayer").append($image);
			$("#reelLayer").append($slider);
						
			var annotations = {};			
			if(vr_data.annotation_list != null){
								
				$annotation_data = new Array();
				$annotation_tag = new Array();
				
				for(var seq in vr_data.annotation_list){					
					$annotation_tag[seq] = $("<a />");
					$annotation_tag[seq].attr("class","point_symbol");
					$annotation_tag[seq].attr("href","#");
					$annotation_tag[seq].attr("onclick","$.subLayerOpen("+seq+", event)");									
					
					$annotation_data[seq] = {
						start:vr_data.annotation_list[seq].start,
						end:vr_data.annotation_list[seq].end,
						x:parseInt(vr_data.annotation_list[seq].x),
						y:parseInt(vr_data.annotation_list[seq].y)
					}
				}				
				
				$("#reelLayer").append($annotation_tag);							
				
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

			$image.reel({
				images:vr_data.image_format,
				frames:data.frames,
				loops:false,
				cursor:"pointer",
				annotations:annotations
			});

			$slider.slider({
				range: "min",
				min:1,
				max:vr_data.frames,
				slide : function(event, ui){
					$("#image").reel("frame", ui.value);
				}
			});

			$image.on("frameChange", function(){
				$slider.slider("value",$(this).reel("frame"));
			});
		}
	});
	
	var sub_layer_check = new Array();
	$.subLayerOpen = function(seq, event){
		event.preventDefault();
		if(sub_layer_check[seq] == true){
			$("#sub_image_" + seq).show();
		}else{
			if(
				vr_data.annotation_list[seq].sub_image != null
				&& vr_data.annotation_list[seq].sub_image != ""
			){			
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
	
	$.subLayerClose = function(object){
		$(object).hide();
	};	
});