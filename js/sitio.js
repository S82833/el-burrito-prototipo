/* Página pública: pinta el contenido y maneja el formulario de reserva. */
(function () {
  const C = window.CONTENIDO;
  const F = window.Fechas;
  const { $, $$, el } = window.Dom;

  /* Datos sueltos (dirección, horario...) */
  function pintarDatos() {
    $$("[data-dato]").forEach((n) => (n.textContent = C.contacto[n.dataset.dato]));
    $("[data-lema]").textContent = C.marca.lema;
    $("[data-mapa]").href = C.contacto.mapa;
    $("[data-telefono]").href = `tel:+${C.contacto.telefonoInternacional}`;
    $("[data-instagram]").href = C.contacto.instagram;
  }

  /* Bloque principal: la noche de hoy o la próxima */
  function pintarHoy() {
    const [proxima] = F.proximas(C.noches, 1);
    const esHoy = proxima.clave === F.aClave(F.hoy());
    const n = proxima.noche;
    $("[data-hoy-fecha]").textContent = esHoy ? `Hoy, ${F.larga(proxima.fecha)}` : `Próxima noche: ${F.larga(proxima.fecha)}`;
    $("[data-hoy-nombre]").textContent = n.nombre;
    $("[data-hoy-genero]").textContent = n.genero;
    $("[data-hoy-desc]").textContent = n.descripcion;
    const boton = $("[data-hoy-reservar]");
    boton.textContent = esHoy ? "Reservar para hoy" : `Reservar el ${n.dia.toLowerCase()}`;
    boton.dataset.fecha = proxima.clave;
    const foto = $("[data-hoy-foto]");
    foto.src = n.foto;
    foto.alt = n.fotoAlt;
    document.body.dataset.tonoHoy = n.tono;
  }

  function pintarEvento() {
    const ev = C.evento;
    if (!ev || ev.fecha < F.aClave(F.hoy())) return;
    const fecha = F.deClave(ev.fecha);
    $("[data-evento-fecha]").textContent = F.larga(fecha);
    $("[data-evento-titulo]").textContent = ev.titulo;
    $("[data-evento-detalle]").textContent = ev.detalle;
    $("[data-evento-reservar]").dataset.fecha = ev.fecha;
    $("[data-evento]").hidden = false;
  }

  function pintarNoches() {
    const proximas = F.proximas(C.noches, 4);
    const lista = $("[data-noches]");
    C.noches.forEach((n, i) => {
      const fecha = proximas.find((p) => p.noche.id === n.id);
      const enlace = el("a", { clase: "boton boton--tinta", href: "#reservar", "data-fecha": fecha.clave, texto: "Reservar mesa" });
      /* Día de la semana como afiche. Sin número: la noche se repite cada semana. */
      const afiche = el("p", { clase: "noche__fecha" }, [
        el("span", { clase: "noche__fecha-cada", texto: "Todos los" }),
        el("span", { clase: "noche__fecha-dia", texto: n.diaPlural })
      ]);
      const articulo = el("article", { clase: `noche noche--${n.tono}${i % 2 ? " noche--invertida" : ""}`, id: n.id, "aria-labelledby": `${n.id}-titulo` }, [
        afiche,
        el("div", { clase: "noche__texto" }, [
          el("p", { clase: "noche__genero", texto: n.genero }),
          el("h3", { clase: "noche__nombre", id: `${n.id}-titulo`, texto: n.nombre }),
          el("p", { clase: "noche__desc", texto: n.descripcion }),
          el("p", { clase: "noche__publico", texto: n.publico }),
          enlace
        ]),
        el("figure", { clase: "noche__foto" }, el("img", { src: n.foto, alt: n.fotoAlt, loading: "lazy", width: "512", height: "640" }))
      ]);
      lista.append(articulo);
    });
  }

  function pintarPreguntas() {
    const caja = $("[data-preguntas]");
    C.preguntas.forEach((q) => {
      caja.append(el("details", { clase: "pregunta" }, [el("summary", { texto: q.p }), el("p", { texto: q.r })]));
    });
  }

  /* ---------- Formulario ---------- */

  function pintarChips() {
    const caja = $("[data-chips]");
    const cerradas = window.Reservas.cerradas();
    F.proximas(C.noches, C.reservas.nochesVisibles).forEach((p) => {
      const cerrada = cerradas.includes(p.clave);
      const input = el("input", { type: "radio", name: "fecha", value: p.clave, "aria-describedby": "error-noche" });
      if (cerrada) input.disabled = true;
      caja.append(el("label", { clase: `chip chip--${p.noche.tono}` }, [
        input,
        el("span", { clase: "chip__fecha", texto: `${p.noche.abrev} ${F.corta(p.fecha)}` }),
        el("span", { clase: "chip__noche", texto: cerrada ? "Completo" : p.noche.nombre })
      ]));
    });
  }

  function elegirFecha(clave) {
    const radio = $(`input[name="fecha"][value="${clave}"]`);
    if (radio && !radio.disabled) radio.checked = true;
  }

  function enlazarBotonesConFecha() {
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a[data-fecha]");
      if (a) elegirFecha(a.dataset.fecha);
    });
  }

  function contador() {
    const input = $("#personas");
    const max = C.reservas.maxPersonas;
    input.max = max;
    const fijar = (v) => (input.value = Math.min(max, Math.max(1, v || 1)));
    $("[data-restar]").addEventListener("click", () => fijar(Number(input.value) - 1));
    $("[data-sumar]").addEventListener("click", () => fijar(Number(input.value) + 1));
  }

  function normalizarCelular(texto) {
    return texto.replace(/[\s\-().]/g, "").replace(/^\+?51/, "");
  }

  function validar(form) {
    const datos = new FormData(form);
    const errores = {};
    if (!datos.get("fecha")) errores.noche = "Elige una noche.";
    const personas = Number(datos.get("personas"));
    if (!personas || personas < 1) errores.personas = "Indica cuántos vienen.";
    else if (personas > C.reservas.maxPersonas) errores.personas = `Para más de ${C.reservas.maxPersonas} personas, llámanos al ${C.contacto.telefono}.`;
    if (!String(datos.get("nombre")).trim()) errores.nombre = "Escribe tu nombre.";
    if (!/^9\d{8}$/.test(normalizarCelular(String(datos.get("celular"))))) errores.celular = "Revisa el celular: son 9 dígitos y empieza con 9.";
    if (!datos.get("acepto")) errores.acepto = "Necesitamos tu permiso para guardar la reserva.";
    return { datos, errores };
  }

  function mostrarErrores(form, errores) {
    $$("[data-error]", form).forEach((p) => {
      const msg = errores[p.dataset.error] || "";
      p.textContent = msg;
      const campo = p.closest(".campo");
      campo.classList.toggle("campo--error", Boolean(msg));
    });
    const mapa = { noche: 'input[name="fecha"]', personas: "#personas", nombre: "#nombre", celular: "#celular", acepto: 'input[name="acepto"]' };
    const primero = Object.keys(mapa).find((k) => errores[k]);
    if (primero) $(mapa[primero], form).focus();
  }

  function formulario() {
    const form = $("[data-form]");
    const recibida = $("[data-recibida]");
    $("#motivo").addEventListener("change", (e) => ($("[data-ayuda-cumple]").hidden = e.target.value !== "cumpleanos"));

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const { datos, errores } = validar(form);
      mostrarErrores(form, errores);
      if (Object.keys(errores).length) {
        $("[data-estado]").textContent = "Revisa los campos marcados.";
        return;
      }
      const boton = $("[data-enviar]");
      boton.disabled = true;
      boton.textContent = "Enviando…";
      $("[data-estado]").textContent = "";

      const fecha = String(datos.get("fecha"));
      const noche = F.nocheDe(F.deClave(fecha), C.noches);
      const reserva = window.Reservas.crear({
        fecha,
        noche: noche.nombre,
        personas: Number(datos.get("personas")),
        nombre: String(datos.get("nombre")).trim(),
        celular: normalizarCelular(String(datos.get("celular"))),
        motivo: String(datos.get("motivo")),
        promos: Boolean(datos.get("promos"))
      });

      setTimeout(() => {
        $("[data-recibida-titulo]").textContent = `${noche.nombre}, ${F.larga(F.deClave(fecha))}`;
        const dl = $("[data-recibida-datos]");
        dl.replaceChildren();
        [["A nombre de", reserva.nombre], ["Personas", String(reserva.personas)], ["Código", reserva.id]].forEach(([k, v]) => {
          dl.append(el("dt", { texto: k }), el("dd", { texto: v }));
        });
        $("[data-recibida-celular]").textContent = reserva.celular.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");
        form.hidden = true;
        recibida.hidden = false;
        recibida.focus();
        boton.disabled = false;
        boton.textContent = "Enviar reserva";
      }, 500);
    });

    $("[data-otra]").addEventListener("click", () => {
      form.reset();
      $("[data-ayuda-cumple]").hidden = true;
      recibida.hidden = true;
      form.hidden = false;
      $('input[name="fecha"]', form).focus();
    });
  }

  /* Botón fijo en celular: se oculta cuando el formulario o el pie están a la vista. */
  function flotante() {
    const barra = $("[data-flotante]");
    if (!("IntersectionObserver" in window)) return;
    document.body.classList.add("con-flotante");
    const visibles = new Set();
    const obs = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => (e.isIntersecting ? visibles.add(e.target) : visibles.delete(e.target)));
      barra.hidden = visibles.size > 0;
    });
    [$("#hoy .hoy__acciones"), $("#reservar"), $(".pie")].forEach((n) => obs.observe(n));
  }

  pintarDatos();
  pintarHoy();
  pintarEvento();
  pintarNoches();
  pintarPreguntas();
  pintarChips();
  enlazarBotonesConFecha();
  contador();
  formulario();
  flotante();
})();
