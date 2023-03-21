// creamos las constates con sus respectivos botones
const containerOne = document.querySelector(".container");
const iniciar = document.createElement("button");
const reiniciar = document.createElement("button");
const sendNumber = document.createElement("button");
const changeCars = document.createElement("button");
const menu = document.createElement("div");

// Arrays donde guardamos las posiciones finales
let playersArray = [];
let positionsArray = [];
let finalResults = [];

//Funcion del menu principal donde crearemos un desplegable para seleccionar el número de participantes
const mainMenu = () => {
  
  menu.classList.add("menu");
  menu.innerHTML = "<h1 id='menuTitle'>Menu</h1>";

  // Seleccionamos el numero de coches que correran
  const selectPlayers = document.createElement("div");
  selectPlayers.innerHTML = `
                            <h2>Selecciona los corredores:</h2>
                                <select class="selector" id="jugadores" name="jugadores">
                                    <!-- Opciones de la lista -->
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                </select>
                            `;
  // boton para iniciar el juego
  sendNumber.innerText = "Iniciar";
  sendNumber.classList.add("btn-send");

  // Event para iniciar el boton 
  sendNumber.addEventListener("click", (event) => {
    const prueba = document.querySelector(".selector").value;
    menu.style.display = "none"; //Escondemos el menu al inciar
    return startRace(prueba); // Llamamos a la funcion principal
  });

  //mandamos elementos al container
  menu.appendChild(selectPlayers);
  menu.appendChild(sendNumber);
  containerOne.appendChild(menu);
};

const startRace = (players) => {
  //Funcion principal (Carrera)
  //Creamos un nuevo elemento para colocar los elementos de la carrera
  const menuCarrera = document.createElement("div");

  //Con este loop creamos el numero de elementos de corredor que hayamos seleccionado
  for (let x = 0; x < players; x++) {
    let dorsal = document.createElement("div");
    dorsal.innerHTML = `<p>${x + 1}</p>`;
    dorsal.classList.add("dorsal");
    // La carretera
    let position = document.createElement("div");
    position.classList.add("road");
    // Los coches
    let car = document.createElement("img");
    car.classList.add("vehicles");
    car.classList.add(`jquery-race${x}`);
    car.src = `./img/car${x + 1}.png`;
    car.name = x + 1; //Esta sentecia servira para marcar los coches con sus posiciones
    playersArray.push(car);

    //Añadimos el coche dentro de la carretera
    position.appendChild(car);//  inserta un nuevo nodo dentro de la estructura coches
    containerOne.appendChild(dorsal); // inserta un nuevo nodo dentro de la estructura dorsal
    containerOne.appendChild(position);//  inserta un nuevo nodo dentro de la estructura posiciones
  }

  //botones principales inicio
  iniciar.classList.add("btn-send");
  iniciar.innerText = "Iniciar";
  iniciar.id = "race-btn";
  iniciar.style.display = "initial";

  //Numero de coches Button => estilos y eventos
  changeCars.classList.add("btn-send");
  changeCars.innerText = "Menu";// boton para volver al principio
  changeCars.style.display = "initial";// boton para centrar el boton
  changeCars.onclick = () => location.reload();// localizacion 

  //botones para reiniciar la carrera
  reiniciar.classList.add("btn-send");
  reiniciar.id = "restart-race";// reiniciar la carrera
  reiniciar.innerText = "Reiniciar";// boton reinicio
  reiniciar.style.display = "none";// boton para esconder el coche
  
  // inciamos jquery
  $(document).ready(function () {
    $("#restart-race").click(function () {
      for (let p = 0; p < playersArray.length; p++) {
        //Detenemos y devolvemos a la posicion inicial a cada elemento
        $(`.jquery-race${p}`).stop();
        $(`.jquery-race${p}`).animate({ marginLeft: "0px" }, 50);// aplicamos el marginLeft a 0 px tal como dice el ejercicio
      }
      //Mostramos y ocultamos botones de nuevo
      reiniciar.style.display = "none";// boton oculo
      iniciar.style.display = "initial";// inicio
      changeCars.style.display = "initial";// inicio
    });
  });


  // Elemento donde colocar los buttons
  menuCarrera.classList.add("menu-carrera");
  menuCarrera.appendChild(iniciar);//inserta un nuevo nodo dentro de la estructura inicio
  menuCarrera.appendChild(reiniciar);//inserta un nuevo nodo dentro de la estructura reinicio
  menuCarrera.appendChild(changeCars);//inserta un nuevo nodo dentro de la estructura 
  //Añadimos al container principal el elemento
  containerOne.appendChild(menuCarrera);

 
  $(document).ready(function () {
    $("#race-btn").click(function () {
      /* Escondemos el boton iniciar y mostramos el de reiniciar una vez 
        comienza la carrera */
      setTimeout(() => {
        iniciar.style.display = "none";
        changeCars.style.display = "none";
        reiniciar.style.display = "initial";
      }, 100);
      //Creamos el elemento donde mostrar las posiciones finales
      const tablePositions = document.createElement("div");
      tablePositions.innerHTML = "<h1 id='positionsTitle'>Posiciones</h1>";

      // hacemos un array para que a cada carrera la velocidad de los coches sea aleatoria y no ganen siempre los mismos
      for (let y = 0; y < playersArray.length; y++) {
        let duration = Math.random() * (10 - 1) + 1;
        duration = Math.round(duration) * 1000;
        //pondremos .animate a cada vehiculo para que los coches no tarden lo mismo
        $(`.jquery-race${y}`).animate(
          { marginLeft: "90%" },
          duration,
          null,
          function () {
            //Al completarse
            positionsArray.push(this.name); //Conforme vayan llegando los coches los añadimos a un array
            console.log(positionsArray);
             // hasta que el ultimo coche no llega no se ejecuta la array
            if (positionsArray.length == playersArray.length) {
              
              reiniciar.style.display = "none";
              iniciar.style.display = "initial";
              //Pasamos las posiciones al array final donde los mostraremos
              finalResults = positionsArray;
              //Y limpiamos el array para la siguiente partida
              positionsArray = [];
              //Ocultamos los coches y la pista para mostrar los resultados
              let coches = document.querySelectorAll(".road");
              let dorsales = document.querySelectorAll(".dorsal");
              coches.forEach((coche) => {
                coche.style.display = "none";
              });
              //Ocultamos tambien los numeros dorsales
              dorsales.forEach((drsl) => {
                drsl.style.display = "none";
              });
              //Aqui construimos la lista de posiciones

              for (let x = 0; x < finalResults.length; x++) {
                let pos = document.createElement("div");
                pos.classList.add("posiciones");
                pos.innerHTML = `<p><u>Posicion ${x + 1} :</u> Coche ${
                  finalResults[x]
                }</p></br>`;
                tablePositions.appendChild(pos);
              }
              iniciar.style.display = "none"; //Ocultamos el boton en los resultados
              containerOne.appendChild(tablePositions); //Los mostramos por pantalla

              //Mostrara las posiciones 5 segundos i volvera al inicio de nuevo
              
              setTimeout(() => {
                window.location.reload();
              }, 5000);
            }
          }
        );
      }
    });
  });

 
};

//Ejecutamos la funcion
mainMenu();
