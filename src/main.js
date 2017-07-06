$(document).ready(init);


var spinning = false;
var circle;
var fatia = 22.5;
var sorte = 15;
var pode_cair_vip = false;



function init(){

	circle = document.getElementById("circle");
	TweenLite.to("#canudo", 0, {opacity:0});

	
	//Swipe settings / block ios screen bounce
	$.event.special.swipe.horizontalDistanceThreshold = 10;
	$.event.special.swipe.verticalDistanceThreshold = 300;
	document.ontouchmove = function(e) {e.preventDefault()};




	//Retangulo de cima ******
	$('#calltotop').on('swiperight', swipeTopRight);
	$('#calltotop').on('swipeleft', swipeTopLeft);

	function swipeTopRight(event){
		console.log('de cima, arrastou pra direita');
		if(!spinning){
			spin();
		}
	}
	function swipeTopLeft(event){
		console.log('de cima, arrastou pra esquerda');
		if(!spinning){
			spin('left');
		}
	}


	//Retangulo de baixo ******
	$('#calltobottom').on('swiperight', swipeBottomRight);
	$('#calltobottom').on('swipeleft', swipeBottomLeft);

	function swipeBottomRight(event){
		console.log('de baixo, arrastou pra direita');
		if(!spinning){
			spin('left');
		}
	}
	function swipeBottomLeft(event){
		console.log('de baixo, arrastou pra esquerda');
		if(!spinning){
			spin();
		}
	}


	//Preparar para nova rodada
	$("#premios").on('tap', tapPremio);
	function tapPremio(event) {
		reiniciar();
	}

	//Vip booster
	TweenLite.to("#valeVip", 0, {opacity:0});
 	$("#valeVip").on('tap', tapVip);
    function tapVip(event) {
		switchVip();
	}

    intro();
}



function intro(){
	TweenLite.to(circle, .5, {z:-1, rotation:"0_short", width:"680px", height:"680px", ease:Sine.easeInOut});
}



//Inicia processo de giro
function spin(_direction){

	spinning = true;
	$("#calltotop").hide();
	$("#calltobottom").hide();
	TweenLite.to("#canudo", .5, {opacity:1});
	TweenLite.to(circle, 0, {z:-1, rotation:"0_short", width:"680px", height:"680px", ease:Sine.easeInOut, onComplete:function(){


	    //Trajeto padrão de 4 voltas...
	    var trajeto = 4 * 360;

	    //...e um dos 16 possíveis resultados (indice resultante é de 0 a 15, no sentido anti horario.). 
	   	sorte = Math.floor(Math.random()*16);
	    //var sorte = 4;
		console.log("Sorte: "+sorte);
		console.log("allow vip: "+pode_cair_vip);

		//Se vip está desligado, mas usuário tirou o que era pra ser vip, muda pra outro (pronto)
		if(pode_cair_vip == false && sorte == 0){
			sorte = 3;
			console.log("Sorte: "+sorte);
		}


		//Ajuste: APENAS PRONTO
		
		if(sorte==4){
			sorte=1;
		}
		
		if(sorte==5){
			sorte=2;
		}
		
		if(sorte==8){
			sorte=3;
		}
		
		if(sorte==10){
			sorte=6;
		}
		
		if(sorte==12){
			sorte=7;
		}
		if(sorte==14){
			sorte=11;
		}


		



		//Vip boost ligado: acrescenta duas chances (ficam 3 em 16) de sair o vip (alguns dos prontos que cairem vai virar vip)
		if(pode_cair_vip){
			if(sorte == 1 || sorte == 2){
				sorte = 0;
			}
		}

		//Somas
		trajeto += sorte*fatia;

		//Inexatidão milimétrica pra organicidade
		var inexact = -5 + Math.floor(Math.random()*10);
		trajeto += inexact;

		
		//Dependendo do swipe é antihorario
		if(_direction=="left"){
			trajeto += "_ccw";
		}

		console.log("Trajeto: "+trajeto);
	    TweenLite.to(circle, 5, {rotation:trajeto, z:0, ease:Sine.easeOut, onComplete:spun});

	}});
}



//Finaliza processo de giro
function spun(){
	console.log('girou');
	premiar();
}


//Mostra premio de acordo com numero resultante
function premiar(){


/*PNG:

0 vip
1 pronto
2 pronto
3 pronto
4 kit
5 almofada
6 pronto
7 pronto
8 kit
9 pronto
10 almofada
11 pronto
12 kit
13 pronto
14 almofada
15 pronto
*/



    console.log('premiar --- pronto only');

    $("#premio_vip").hide();
    $("#premio_kit").hide();
    $("#premio_pronto").hide();
    $("#premio_almofada").hide();

    switch(sorte){
		case 0:
		  //premio vip
		  $("#premio_vip").show();
		  break;
		case 5:
		case 10:
		case 14:
		  //premio almofada
		  $("#premio_almofada").show();
		  break;
		case 4:
		case 8:
		case 12:
		  //Premio kit
		  $("#premio_kit").show();
		  break;
		default:
		  //premio pronto
		  $("#premio_pronto").show();
	}


	TweenLite.to("#canudo", 1, {opacity:0, delay:1});
	$("#premios").css({"opacity":0});
	$("#premios").show();
	TweenLite.to("#premios", 1, {opacity:1, delay:1});


}




function reiniciar(){
	//volta ao estado inicial
	$("#calltotop").show();
	$("#calltobottom").show();

	TweenLite.to(circle, 0, {rotation:"0_short"});
	$("#premios").hide();
	spinning = false;
}





function switchVip(){
	pode_cair_vip = !pode_cair_vip;

	if(pode_cair_vip){
		TweenLite.to("#valeVip", 0, {opacity:1});
	}else{
		TweenLite.to("#valeVip", 0, {opacity:0});
	}
}





//Forçar atualização imediata de cache se detectada mudança no manifest
function updateSite(event) {
    window.applicationCache.swapCache();
}
window.applicationCache.addEventListener('updateready', updateSite, false);