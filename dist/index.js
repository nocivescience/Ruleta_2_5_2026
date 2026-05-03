const canvas = document.getElementById('ruleta');
const ctx = canvas.getContext('2d');
const btnGirar = document.getElementById('btnGirar');
// Configuración de la ruleta
const colores = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33']; // 4 colores
let anguloActual = 0;
let velocidad = 0;
const friccion = 0.985; // Cuanto más cercano a 1, más tarda en frenar
let enMovimiento = false;
function dibujarRuleta() {
    const centro = canvas.width / 2;
    const radio = canvas.width / 2 - 10; // Un pequeño margen
    const numSectores = colores.length;
    const arco = (Math.PI * 2) / numSectores; // 90 grados por sector
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    colores.forEach((color, i) => {
        const anguloInicio = anguloActual + i * arco;
        const anguloFin = anguloInicio + arco;
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.strokeStyle = '#222'; // Línea divisoria
        ctx.lineWidth = 2;
        ctx.moveTo(centro, centro);
        ctx.arc(centro, centro, radio, anguloInicio, anguloFin);
        ctx.lineTo(centro, centro);
        ctx.fill();
        ctx.stroke();
        // Opcional: Dibujar un pequeño círculo en el centro para que parezca un eje
        ctx.beginPath();
        ctx.fillStyle = '#fff';
        ctx.arc(centro, centro, 5, 0, Math.PI * 2);
        ctx.fill();
    });
    dibujarFlecha();
}
function dibujarFlecha() {
    const centro = canvas.width / 2;
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(centro - 15, 10);
    ctx.lineTo(centro + 15, 10);
    ctx.lineTo(centro, 40); // Punta de la flecha
    ctx.fill();
}
function animar() {
    if (velocidad > 0) {
        anguloActual += velocidad;
        velocidad *= friccion; // Aplicamos la desaceleración gradual
        // Si la velocidad es muy baja, la detenemos totalmente
        if (velocidad < 0.0005) {
            velocidad = 0;
            enMovimiento = false;
        }
    }
    dibujarRuleta();
    requestAnimationFrame(animar);
}
btnGirar.addEventListener('click', () => {
    if (!enMovimiento) {
        // Le damos un impulso inicial aleatorio
        velocidad = Math.random() * 0.4 + 0.3;
        enMovimiento = true;
    }
});
// Iniciar
animar();
export {};
//# sourceMappingURL=index.js.map