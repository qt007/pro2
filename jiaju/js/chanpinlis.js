$(function(){
	$("input").click(function(){
		$(this).css({border: "1px solid #62A8EA"});
	})
	$("input").blur(function(){
		$(this).css({border: "1px solid #e4eaec"});
	})
})