/* Ayudas mínimas para el DOM, compartidas por las páginas. */
(function () {
  const $ = (sel, raiz = document) => raiz.querySelector(sel);
  const $$ = (sel, raiz = document) => [...raiz.querySelectorAll(sel)];

  function el(etiqueta, atributos = {}, hijos = []) {
    const nodo = document.createElement(etiqueta);
    for (const [k, v] of Object.entries(atributos)) {
      if (k === "texto") nodo.textContent = v;
      else if (k === "clase") nodo.className = v;
      else nodo.setAttribute(k, v);
    }
    for (const h of [].concat(hijos)) if (h) nodo.append(h);
    return nodo;
  }

  window.Dom = { $, $$, el };
})();
