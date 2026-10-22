/* Página de la carta: pinta tragos y piqueos desde contenido/sitio.js. */
(function () {
  const C = window.CONTENIDO;
  const { $, $$, el } = window.Dom;

  /* Carta en HTML: cada sección con sus items; si todos tienen foto, van como tarjetas. */
  function pintarCarta() {
    for (const clave of ["tragos", "piqueos"]) {
      const carta = C.cartas[clave];
      const panel = $(`[data-panel="${clave}"]`);
      panel.append(el("p", { clase: "carta__fecha", texto: `Carta actualizada al ${carta.actualizada}` }));
      carta.secciones.forEach((sec) => {
        const conFotos = sec.items.every((i) => i.foto);
        const ul = el("ul", { clase: conFotos ? "platos platos--fotos" : "platos" });
        sec.items.forEach((i) => {
          ul.append(el("li", { clase: "plato" }, [
            i.foto ? el("img", { clase: "plato__foto", src: i.foto, alt: "", loading: "lazy", width: "426", height: "757" }) : null,
            el("div", { clase: "plato__linea" }, [
              el("h3", { clase: "plato__nombre", texto: i.nombre }),
              el("p", { clase: "plato__precio", texto: i.precio })
            ]),
            i.desc ? el("p", { clase: "plato__desc", texto: i.desc }) : null
          ]));
        });
        panel.append(el("section", { clase: "carta__seccion" }, [el("h2", { clase: "carta__subtitulo", texto: sec.titulo }), ul]));
      });
    }
    $("[data-carta-pdf]").href = C.cartas.enlacePdf;
  }

  /* Pestañas Tragos / Piqueos con teclado (flechas), patrón Tabs del APG. */
  function pestanas() {
    const tabs = $$('[role="tab"]');
    function activar(tab, enfocar) {
      tabs.forEach((t) => {
        const activa = t === tab;
        t.setAttribute("aria-selected", String(activa));
        t.tabIndex = activa ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !activa;
      });
      if (enfocar) tab.focus();
      history.replaceState(null, "", `#${tab.id.replace("pestana-", "")}`);
    }
    /* carta.html#piqueos abre directo esa pestaña */
    const inicial = tabs.find((t) => t.id === `pestana-${location.hash.slice(1)}`);
    if (inicial) activar(inicial, false);
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => activar(t, false));
      t.addEventListener("keydown", (e) => {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        e.preventDefault();
        activar(tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length], true);
      });
    });
  }

  function pie() {
    $("[data-lema]").textContent = C.marca.lema;
    document.body.classList.add("con-flotante");
  }

  pintarCarta();
  pestanas();
  pie();
})();
