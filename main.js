//Array con las frutas, verduras etc que saldrán aleatoriamente en la máquina

var listaImagenes = ["aubergine", "banana", "carrots", "cherries", "dollar", "lemon", "orange", "peach", "potato", "tomato"];



//Cuando hago click en el botón introducir se ejecuta la función

document.getElementsByName("introducir")[0].onclick = function () {

	//Guardo en la variable monedas, el valor que he introducido en el campo texto del formulario.

	let monedas = document.getElementsByName("monedas")[0].value;

	//Si he puesto un valor mayor a 0 ejecuto el algoritmo, sino devuelvo un alert mostrando un error.

	if (monedas > 0){

		document.getElementsByTagName("ul")[0].innerHTML += "<li>Has introducido monedas</li>"

		//El valor introducido lo muestro como saldo de la cartera en el html, con él jugaré.

		var monedero = document.getElementById("valor");
		monedero.innerHTML = monedas;
		document.getElementsByName("monedas")[0].value = 0;

		//Deshabilito el botón introducir una vez lo pulso.
		deshabilitar_boton();

			//Cuando pulso la palanca se ejecuta el juego.

			document.getElementById("palanca").onclick = function () {

				//Solo puedo jugar si tengo saldo en la tragaperras, en caso de tener 0 monedas el juego me indicará que el saldo es insuficiente

				if (monedero.innerHTML > 0){

					//Bajo la palanca al hacer click

						document.getElementById("palanca").innerHTML = "<img src='img/palancaDOWN.png' id='palancaDOWN'>";

						//Llamo a una funcion que se llama palanqueo, esta subirá la imagen después de 500 ms

						setTimeout(palanqueo,500);

					//Cada vez que le doy a la palanca gasto una moneda y lo muestro en el registro de movimientos

				  monedero.innerHTML -= 1;
				  document.getElementsByTagName("ul")[0].innerHTML += "<li>Has gastas una moneda</li>"
				  var premios = [];

				  //Utilizo una variable premios para guardar el resultado de generar de forma aleatoria un campo de el array listaImagenes


				  for (var i = 0; i < 3; i++){
				  let image = listaImagenes[generar_aleatorio(0, 9)];
				  	
				  	 //también genero las imágenes en el html para que se muestren en la máquina.			  

				  document.getElementsByTagName("div")[i].innerHTML = "<img src='img/"+ image +".png'>";

				  premios[i] = image;

				}
					//Llamo a la función que con el array premios que contiene las imagenes, genero las resompensas.

					consigue_premio(premios);

				}else{
				alert("Saldo insuficiente");

				//Si me quedo sin saldo muestro los pingu
				for(var i = 0; i < 3; i++){
				document.getElementsByTagName("div")[i].innerHTML = "<img src='img/pingu.png'>";
				}
				}
				}

	}else{
		alert("Debes introducir un saldo");
	}








//Cuando hago click en salir devuelvo el valor de mi saldo, al campo texto para para introducirlo de nuevo si quiero

	document.getElementsByName("salir")[0].onclick = function () {

		//Habilito el boton introducir de nuevo
		habilitar_boton ();

		//Guardo el saldo y lo devuelvo al campo text
		let saldo = document.getElementById("valor").innerHTML;

			if (saldo > 0){

			document.getElementsByName("monedas")[0].value = saldo;

			//Pongo mi saldo en 0 por defecto
			document.getElementById("valor").innerHTML = 0;

			//Al salir lo muestro en la lista de movimientos y además genero un alert para indicar que he salido con el saldo X

			document.getElementsByTagName("ul")[0].innerHTML += "<li>Sacas todas las monedas</li>";
			
			//Si descomento la linea de debajo al pulsar salir borro el historial

			//document.getElementsByTagName("ul")[0].innerHTML = " ";
			

			alert("Has conseguido un total de " + saldo + " monedas");

			//Si no hay saldo para sacar muestro un mensaje
			}else{
				alert("No hay saldo para sacar");
			}

			//Si salgo vuelvo a poner a pingu
			for(var i = 0; i < 3; i++){
			document.getElementsByTagName("div")[i].innerHTML = "<img src='img/pingu.png'>";
			}
	}
}




//Creo una función para deshabilitar el botón introducir
function deshabilitar_boton (){
	document.getElementsByName("introducir")[0].disabled = true;
	document.getElementsByName("monedas")[0].disabled = true;
}




//Creo una función para volver a habilitar el botón introducir
function habilitar_boton (){
	document.getElementsByName("introducir")[0].disabled = false;
	document.getElementsByName("monedas")[0].disabled = false;
}



//Con esta función genero valores aleatorios en un intervalo
function generar_aleatorio(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}




//Mediante esta función voy a generar las recompensas de la tragaperras

function consigue_premio (premiados){

//Primero recojo el saldo disponible, a este saldo ya se le ha restado la moneda de la tirada.

var saldo = document.getElementById("valor").innerHTML;

//Guardo los valores de la listaImagenes en 3 variables.

	var valor1 = premiados[0];
	var valor2 = premiados[1];
	var valor3 = premiados[2];

	//Primero valido si las 3 imágenes son iguales, en caso de que sean iguales separo si son todas dollar o normales

if(valor1 == valor2 && valor2 == valor3){

	if(valor1 == "dollar" && valor2 == "dollar" && valor3 == "dollar"){

	
		document.getElementById("valor").innerHTML = parseInt(saldo) + 10;

		document.getElementsByTagName("ul")[0].innerHTML += "<li>¡Tres MONEDAS! Ganas 10 monedas</li>";
 

	}else{

		document.getElementById("valor").innerHTML = parseInt(saldo) + 5;

		document.getElementsByTagName("ul")[0].innerHTML += "<li>¡Tres IGUALES! Ganas 5 monedas</li>";
	}


	//Si no son 3 iguales, por lo tanto máximo tendré parejas, lo que hago es validarlas. Las diferencio entre parejas solas o con un dólar.

}else 

	if((valor1 == "dollar" && valor2 == "dollar") || (valor1 == "dollar" && valor3 == "dollar") || (valor2 == "dollar" && valor3 == "dollar")){

		document.getElementById("valor").innerHTML = parseInt(saldo) + 4;

		document.getElementsByTagName("ul")[0].innerHTML += "<li>¡Dos MONEDAS! Ganas 4 monedas</li>";

		}else if(valor1 == valor2 || valor1 == valor3 || valor2 == valor3){

					if(valor1 == "dollar" || valor2 == "dollar" || valor3 == "dollar"){

						document.getElementById("valor").innerHTML = parseInt(saldo) + 3;

						document.getElementsByTagName("ul")[0].innerHTML += "<li>¡Una MONEDA y Dos IGUALES! Ganas 3 monedas</li>";

					}else{

						document.getElementById("valor").innerHTML = parseInt(saldo) + 2;

						document.getElementsByTagName("ul")[0].innerHTML += "<li>¡Dos IGUALES! Ganas 2 monedas</li>";
					}

					//Finalmente si no son parejas sueltas o con un dollar, verifico si al menos hay una moneda dollar sola, sino no muestro nada.

				}else if(valor1 == "dollar" || valor2 == "dollar" || valor3 == "dollar"){

						document.getElementById("valor").innerHTML = parseInt(saldo) + 1;

						document.getElementsByTagName("ul")[0].innerHTML += "<li>¡Una MONEDA! Ganas 1 moneda</li>";
				}
      
	
}

 	
function palanqueo(){
							document.getElementById("palanca").innerHTML = "<img src='img/palancaUP.png' id='palancaUP'>";
						}