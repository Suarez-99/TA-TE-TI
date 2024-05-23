const contenedorGrilla = document.getElementById('contenedorGrilla');
const cuadros = document.querySelectorAll('.cuadrado');
const indicadorTurno = document.getElementById('turnoActual');
const dialogoGanador = document.getElementById('dialogoGanador');
const mensajeGanador = document.getElementById('mensajeGanador');
const botonReinicio = document.getElementById('botonReinicio');
const botonModo = document.getElementById('botonModo');

let turno = 'X';
let modoOscuro = false;

const sonidoClick = new Audio('click.mp3');
const sonidoVictoria = new Audio('win.mp3');

function cambiarTurno() {
    turno = turno === 'X' ? 'O' : 'X';
    indicadorTurno.textContent = turno;
    indicadorTurno.style.color = turno === 'X' ? 'var(--color-x)' : 'var(--color-o)';
}

function verificarGanador() {
    const combinacionesGanadoras = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combinacion of combinacionesGanadoras) {
        const [a, b, c] = combinacion;
        if (cuadros[a].textContent && cuadros[a].textContent === cuadros[b].textContent && cuadros[a].textContent === cuadros[c].textContent) {
            combinacion.forEach(index => cuadros[index].classList.add('ganador'));
            mostrarGanador(turno);
            sonidoVictoria.play();
            return true;
        }
    }

    return false;
}

function mostrarGanador(ganador) {
    mensajeGanador.querySelector('#ganador').textContent = ganador;
    dialogoGanador.showModal();
}

function reiniciarJuego() {
    cuadros.forEach(cuadro => {
        cuadro.textContent = '';
        cuadro.classList.remove('ganador', 'x', 'o');
    });
    turno = 'X';
    indicadorTurno.textContent = turno;
    indicadorTurno.style.color = 'var(--color-x)';
    dialogoGanador.close();
}

function cambiarModo() {
    modoOscuro = !modoOscuro;
    document.body.classList.toggle('dark-mode', modoOscuro);
    botonModo.textContent = modoOscuro ? 'Modo Claro' : 'Modo Oscuro';
}

cuadros.forEach(cuadro => {
    cuadro.addEventListener('click', () => {
        if (cuadro.textContent === '' && !dialogoGanador.open) {
            cuadro.textContent = turno;
            cuadro.classList.add(turno.toLowerCase());
            sonidoClick.play();
            if (!verificarGanador()) {
                cambiarTurno();
            }
        }
    });
});

botonReinicio.addEventListener('click', reiniciarJuego);
