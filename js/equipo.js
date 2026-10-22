/* Vista del equipo: reservas por noche, confirmar por WhatsApp, cerrar una noche llena. */
(function () {
  const C = window.CONTENIDO;
  const F = window.Fechas;
  const R = window.Reservas;
  const caja = document.querySelector("[data-noches-equipo]");

  function el(etiqueta, clase, texto) {
    const n = document.createElement(etiqueta);
    if (clase) n.className = clase;
    if (texto !== undefined) n.textContent = texto;
    return n;
  }

  const ESTADOS = { pendiente: "Por confirmar", confirmada: "Confirmada", rechazada: "Rechazada" };

  function mensajeConfirmacion(r) {
    const fecha = F.larga(F.deClave(r.fecha));
    return `Hola ${r.nombre}, te escribimos de El Burrito. Tu reserva para ${r.personas} personas el ${fecha} (${r.noche}) está confirmada. Código ${r.id}. ¡Te esperamos!`;
  }

  function fila(r) {
    const li = el("li", `reserva reserva--${r.estado}`);
    const datos = el("div", "reserva__datos");
    datos.append(
      el("p", "reserva__nombre", `${r.nombre} · ${r.personas} ${r.personas === 1 ? "persona" : "personas"}`),
      el("p", "reserva__extra", [r.celular.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3"), r.motivo === "cumpleanos" ? "Cumpleaños" : r.motivo === "otro" ? "Celebración" : "", `Código ${r.id}`].filter(Boolean).join(" · ")),
      el("p", "reserva__estado", ESTADOS[r.estado])
    );
    const acciones = el("div", "reserva__acciones");
    if (r.estado !== "confirmada") {
      const a = el("a", "boton boton--marca", "Confirmar por WhatsApp");
      a.href = `https://wa.me/51${r.celular}?text=${encodeURIComponent(mensajeConfirmacion(r))}`;
      a.target = "_blank";
      a.rel = "noopener";
      a.addEventListener("click", () => { R.cambiarEstado(r.id, "confirmada"); setTimeout(pintar, 0); });
      acciones.append(a);
    }
    if (r.estado !== "rechazada") {
      const b = el("button", "boton boton--borde", "Rechazar");
      b.type = "button";
      b.addEventListener("click", () => { R.cambiarEstado(r.id, "rechazada"); pintar(); });
      acciones.append(b);
    }
    li.append(datos, acciones);
    return li;
  }

  function pintar() {
    const todas = R.todas();
    const cerradas = R.cerradas();
    caja.replaceChildren();
    F.proximas(C.noches, C.reservas.nochesVisibles).forEach((p) => {
      const lista = todas.filter((r) => r.fecha === p.clave);
      const activas = lista.filter((r) => r.estado !== "rechazada");
      const personas = activas.reduce((s, r) => s + r.personas, 0);
      const seccion = el("section", `noche-equipo noche-equipo--${p.noche.tono}`);
      const cab = el("div", "noche-equipo__cabecera");
      const titulo = el("h2", "noche-equipo__titulo", `${F.larga(p.fecha)} · ${p.noche.nombre}`);
      const resumen = el("p", "noche-equipo__resumen", `${activas.length} reservas · ${personas} personas`);
      const cerrada = cerradas.includes(p.clave);
      const boton = el("button", "boton boton--tinta", cerrada ? "Reabrir noche" : "Cerrar noche (completo)");
      boton.type = "button";
      boton.setAttribute("aria-pressed", String(cerrada));
      boton.addEventListener("click", () => { R.alternarCerrada(p.clave); pintar(); });
      cab.append(titulo, resumen, boton);
      seccion.append(cab);
      if (cerrada) seccion.append(el("p", "noche-equipo__cerrada", "Cerrada: en la página aparece como completo."));
      if (lista.length) {
        const ul = el("ul", "reservas");
        lista.forEach((r) => ul.append(fila(r)));
        seccion.append(ul);
      } else {
        seccion.append(el("p", "noche-equipo__vacia", "Todavía no hay reservas para esta noche."));
      }
      caja.append(seccion);
    });
  }

  pintar();
  window.addEventListener("storage", pintar);
})();
