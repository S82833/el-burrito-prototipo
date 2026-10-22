/* Fechas de las noches abiertas. Sin dependencias. */
(function () {
  const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const MESES_CORTOS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

  function hoy() {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  function aClave(fecha) {
    const m = String(fecha.getMonth() + 1).padStart(2, "0");
    const d = String(fecha.getDate()).padStart(2, "0");
    return `${fecha.getFullYear()}-${m}-${d}`;
  }

  function deClave(clave) {
    const [a, m, d] = clave.split("-").map(Number);
    return new Date(a, m - 1, d);
  }

  function nocheDe(fecha, noches) {
    return noches.find((n) => n.diaSemana === fecha.getDay()) || null;
  }

  /* Próximas noches abiertas, desde hoy inclusive. */
  function proximas(noches, cantidad) {
    const lista = [];
    const fecha = hoy();
    while (lista.length < cantidad) {
      const noche = nocheDe(fecha, noches);
      if (noche) lista.push({ clave: aClave(fecha), fecha: new Date(fecha), noche });
      fecha.setDate(fecha.getDate() + 1);
    }
    return lista;
  }

  function larga(fecha) {
    return `${DIAS[fecha.getDay()]} ${fecha.getDate()} de ${MESES[fecha.getMonth()]}`;
  }

  function corta(fecha) {
    return `${fecha.getDate()} ${MESES_CORTOS[fecha.getMonth()]}`;
  }

  window.Fechas = { hoy, aClave, deClave, nocheDe, proximas, larga, corta };
})();
