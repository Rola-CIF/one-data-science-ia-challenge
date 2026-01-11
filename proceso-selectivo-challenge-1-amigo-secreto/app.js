// Estado de la app
let amigos = [];

// Referencias al DOM
const input = document.getElementById("amigo");
const ulLista = document.getElementById("listaAmigos");
const ulResultado = document.getElementById("resultado");

// Agregar con botón o tecla Enter
function agregarAmigo() {
  const amigo = (input.value || "").trim();

  // Validación: no vacío
  if (!amigo) {
    alert("La casilla está vacía, por favor escribe un nombre de amigo.");
    input.focus();
    return;
  }

  // Validación: solo letras (incluye acentos y ñ) y espacios
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  if (!regex.test(amigo)) {
    alert("El nombre de amigo solo puede contener letras y espacios.");
    input.select();
    return;
  }

  // Evitar duplicados (case-insensitive)
  const existe = amigos.some(n => n.toLowerCase() === amigo.toLowerCase());
  if (existe) {
    alert(`"${amigo}" ya está en la lista, escribe uno diferente.`);
    input.select();
    return;
  }

  // Guardar y mostrar
  amigos.push(amigo);
  renderLista();
  limpiarResultado();

  input.value = "";
  input.focus();
}

// Render de la UL con los amigos
function renderLista() {
  ulLista.innerHTML = "";
  amigos.forEach((amigo, idx) => {
    const li = document.createElement("li");
    li.textContent = `${idx + 1}. ${amigo}`;
    ulLista.appendChild(li);
  });
}

// Borrar resultado previo
function limpiarResultado() {
  ulResultado.innerHTML = "";
}

// Sortear un amigo secreto al azar
function sortearAmigo() {
  limpiarResultado();
  
  // Si ya hay un resultado, no dejar sortear de nuevo
  if (ulResultado.children.length > 0) {
    alert("Ya sorteaste un amigo secreto. Solo puedes hacerlo una vez.");
    return;
  }

  if (amigos.length === 0) {
    alert("Primero agrega al menos 1 nombre de amigo.");
    input.focus();
    return;
  }

  // Elegir índice aleatorio
  const indice = Math.floor(Math.random() * amigos.length);
  const sorteado = amigos[indice];

  // Mostrar en la UL de resultados
  const li = document.createElement("li");
  li.textContent = `El amigo secreto es: ${sorteado}`;
  ulResultado.appendChild(li);
}

// (Opcional) Permitir Enter en el input
input.addEventListener("keydown", (ev) => {
  if (ev.key === "Enter") agregarAmigo();
});

// Exponer funciones a window porque en el HTML se usan con onclick
window.agregarAmigo = agregarAmigo;
window.sortearAmigo = sortearAmigo;
