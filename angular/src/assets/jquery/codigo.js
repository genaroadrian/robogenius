$(document).ready(function(){
/* $('#fecha').change(function () {

		var fecha = $('#fecha').val();
		$("#hora").prop("disabled",true);
		$.ajax({
				
			url: 'http://localhost/proden/public/gethorario',
			headers: {'X-CSRF-TOKEN': $('input[name=_token]').val()},
			type: 'POST',
			data: {date: fecha},
			success: function (resp) {
				if(resp.length>0){
					$(".hora").remove();
					for(i=0; i<resp.length; i++){
					$("#hora").append("<option class='hora' value='"+resp[i].id_horario+"'>"+resp[i].hora_con+"</option>");
					$("#hora").prop("disabled",false);
				}
			}else{
				alert("No hay horarios disponibles para esa fecha");
			}
			}
		});
	}); */
	
	/* $('#dias').change(function(){
		$(".hora").remove();
		$("#hora").prop("disabled",true);
		var dias = $('#dias').val();
		$.ajax({
			url: 'http://localhost:8000/getdias',
			headers: {'X-CSRF-TOKEN': $('input[name=_token]').val()},
			type: 'GET',
			data: {date: dias},
			success: function (resp) {
				if(resp.length>0){
					
					for(i=0; i<resp.length; i++){
						$('#hora').append("<option class='hora' value='"+resp[i].idhor+"'>"+resp[i].hora+"</option>")
						$("#hora").prop("disabled",false);
					}
				}
			}
		});
	}); */
});