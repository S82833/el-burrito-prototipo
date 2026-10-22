/*
  Almacén de reservas del prototipo.
  En la versión real esto llama al servidor; aquí guarda en el navegador (localStorage)
  para que la página y la vista del equipo se puedan probar sin internet.
*/
(function () {
  const CLAVE = "elburrito-reservas-demo";
  const CLAVE_CERRADAS = "elburrito-noches-cerradas-demo";

  function leer(clave, vacio) {
    try {
      return JSON.parse(localStorage.getItem(clave)) || vacio;
    } catch (error) {
      return vacio;
    }
  }

  function guardar(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
  }

  function codigo() {
    const letras = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let c = "";
    for (let i = 0; i < 5; i++) c += letras[Math.floor(Math.random() * letras.length)];
    return c;
  }

  function todas() {
    return leer(CLAVE, []);
  }

  function crear(datos) {
    const reserva = { ...datos, id: codigo(), estado: "pendiente", creada: new Date().toISOString() };
    const lista = todas();
    lista.push(reserva);
    guardar(CLAVE, lista);
    return reserva;
  }

  function cambiarEstado(id, estado) {
    const lista = todas().map((r) => (r.id === id ? { ...r, estado } : r));
    guardar(CLAVE, lista);
  }

  function cerradas() {
    return leer(CLAVE_CERRADAS, []);
  }

  function alternarCerrada(fecha) {
    const lista = cerradas();
    const nueva = lista.includes(fecha) ? lista.filter((f) => f !== fecha) : [...lista, fecha];
    guardar(CLAVE_CERRADAS, nueva);
    return nueva.includes(fecha);
  }

  window.Reservas = { todas, crear, cambiarEstado, cerradas, alternarCerrada };
})();
