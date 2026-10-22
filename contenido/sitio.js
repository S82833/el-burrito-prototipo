/*
  Contenido del sitio. Para cambiar textos, horarios, noches o precios se edita este archivo; el diseño no se toca.
  Fuentes: Instagram @elburrito.pe, cartas en Drive (bit.ly/carta-elburrito) y lámina de marca de Savia Studio. Revisado el 2026-10-22.
*/
window.CONTENIDO = {
  marca: {
    nombre: "El Burrito",
    lema: "Bailar, reír y disfrutar. Sin complicaciones.",
    bio: "Aquí todos vienen a bailar y liberar estrés."
  },
  contacto: {
    direccion: "Av. Arequipa 2296, Lince",
    referencia: "C.C. Risso, 2do piso",
    horario: "Abre todos los días desde las 6 p. m.",
    telefono: "924 595 785",
    telefonoInternacional: "51924595785",
    mapa: "https://www.google.com/maps/search/?api=1&query=Centro+Comercial+Risso+Av.+Arequipa+2296+Lince",
    instagram: "https://www.instagram.com/elburrito.pe/"
  },
  noches: [
    {
      id: "miercoles", diaSemana: 3, dia: "Miércoles", diaPlural: "Miércoles", abrev: "Mié",
      nombre: "Miércoles Ochentero", genero: "Rock de los 80",
      descripcion: "Clásicos del rock en inglés y español para cantar como en los 80.",
      publico: "Para grupos de amigos y reencuentros",
      foto: "assets/img/grupo.jpg", fotoAlt: "Grupo de amigos en una mesa de El Burrito",
      tono: "amarillo"
    },
    {
      id: "jueves", diaSemana: 4, dia: "Jueves", diaPlural: "Jueves", abrev: "Jue",
      nombre: "Mezcal Ladys", genero: "Noche de amigas",
      descripcion: "Mezcal, canciones para corear y despecho con humor, al ritmo de las rancheras.",
      publico: "Para amigas que celebran juntas",
      foto: "assets/img/amigas-1.jpg", fotoAlt: "Tres amigas posando en la pista de El Burrito",
      tono: "fucsia"
    },
    {
      id: "viernes", diaSemana: 5, dia: "Viernes", diaPlural: "Viernes", abrev: "Vie",
      nombre: "Viernes de Orquesta", genero: "Orquestas en vivo",
      descripcion: "Salsa, bachata y cumbia con orquesta: la noche para salir a bailar.",
      publico: "Para parejas y amantes del baile",
      foto: "assets/img/escenario.jpg", fotoAlt: "Orquesta en el escenario con la pista llena",
      tono: "ladrillo"
    },
    {
      id: "sabado", diaSemana: 6, dia: "Sábado", diaPlural: "Sábados", abrev: "Sáb",
      nombre: "Sábado de Pachanga", genero: "Música variada",
      descripcion: "Pachanga, hora loca y todos los éxitos para celebrar en grupo.",
      publico: "Para cumpleaños y celebraciones",
      foto: "assets/img/cumpleanos.jpg", fotoAlt: "Cumpleañera con una bengala encendida",
      tono: "blanco"
    }
  ],
  evento: {
    fecha: "2026-10-31",
    titulo: "Halloween en El Burrito",
    detalle: "Orquesta en vivo desde las 7 p. m., activaciones, sorteos y premio al mejor disfraz."
  },
  /*
    Cartas copiadas de los PDF publicados en bit.ly/carta-elburrito:
    tragos (8 de julio de 2026) y piqueos (1 de abril de 2026).
    Corregí solo nombres de marcas mal escritos (Irish, Kahlúa, Johnnie Walker).
  */
  cartas: {
    enlacePdf: "https://bit.ly/carta-elburrito",
    tragos: {
      titulo: "Tragos",
      actualizada: "8 de julio de 2026",
      secciones: [
        {
          titulo: "Tragos de autor",
          items: [
            { nombre: "Osito Fiu Fiu", desc: "Pisco, crema de cacao, leche evaporada, jarabe de granadina y yema de huevo.", precio: "S/ 34.90", foto: "assets/img/trago-osito-fiu-fiu.jpg" },
            { nombre: "Tótem Cuenta Historias", desc: "Ginebra, macerado de cereza, triple sec, jugo de piña, naranja, granadina y amargo de Angostura.", precio: "S/ 34.90", foto: "assets/img/trago-totem.jpg" },
            { nombre: "Cuatro Caras", desc: "Vodka, Frangelico, triple sec, lime juice, Coca-Cola y hielo.", precio: "S/ 34.90", foto: "assets/img/trago-cuatro-caras.jpg" },
            { nombre: "Pinche Calavera", desc: "Ron, vodka, gin perfecto amor, jarabe de granadina y jugo de naranja.", precio: "S/ 34.90", foto: "assets/img/trago-pinche-calavera.jpg" },
            { nombre: "Marilyn Mexicana", desc: "Tequila, Baileys Irish Cream, Kahlúa, crema de cacao y helado tricolor.", precio: "S/ 36.00", foto: "assets/img/trago-marilyn-mexicana.jpg" },
            { nombre: "La Fiesta del Burrito", desc: "Tequila, macerado de arándano, Johnnie Walker Red, vodka, Blue Curaçao y mix de jugos (durazno y piña).", precio: "S/ 38.00", foto: "assets/img/trago-fiesta-del-burrito.jpg" }
          ]
        },
        {
          titulo: "Cócteles de autor",
          items: [
            { nombre: "Tiki Cinnamon", desc: "Ron blanco, ron añejo, Falernum, jugo de piña, cordial de canela, maracuyá, jugo de limón y amargo de Angostura.", precio: "S/ 35.00" },
            { nombre: "Golden Spice", desc: "Pisco quebranta, cordial de aguaymanto, jugo de limón, jarabe de jengibre, solución salina y top de soda.", precio: "S/ 35.00" },
            { nombre: "Dulce Amor", desc: "Ron añejo, jugo de limón, licor de marrasquino, vermouth rosso, bitter y jarabe de goma de flor de Jamaica.", precio: "S/ 35.00" },
            { nombre: "Amor a la Mexicana", desc: "Tequila reposado y tequila blanco infusionados, jugo de limón, jarabe simple y top de Pink Soda.", precio: "S/ 35.00" }
          ]
        },
        {
          titulo: "Los clásicos",
          items: [
            { nombre: "Pisco Sour", desc: "Pisco, jarabe de goma, jugo de limón y clara de huevo.", precio: "S/ 28.00" },
            { nombre: "Tinto de Verano", desc: "Vino tinto, pisco, jarabe y gaseosa de limón.", precio: "S/ 28.00" },
            { nombre: "Aperol Spritz", desc: "Prosecco, Aperol y soda.", precio: "S/ 28.00" },
            { nombre: "Paloma", desc: "Tequila, jugo de limón y soda de toronja.", precio: "S/ 28.00" },
            { nombre: "Gin & Tonic", desc: "Gin y agua tónica.", precio: "S/ 33.00" }
          ]
        },
        {
          titulo: "Sin alcohol",
          items: [
            { nombre: "Sour Fresh", desc: "Frutos rojos (fresa, frambuesa, arándano), limón criollo, jarabe simple, albúmina (o aquafaba) y naranja.", precio: "S/ 35.00" },
            { nombre: "Nativa", desc: "Cordial de pepino, té verde frío especiado, jugo de lima, solución salina y miel.", precio: "S/ 30.00" },
            { nombre: "Fresquito de Kion", desc: "Hierbabuena, limón criollo, jarabe simple, agua fría y ginger beer.", precio: "S/ 30.00" },
            { nombre: "Brew Tonic", desc: "Cold brew, jarabe simple y agua tónica.", precio: "S/ 30.00" }
          ]
        }
      ]
    },
    piqueos: {
      titulo: "Piqueos",
      actualizada: "1 de abril de 2026",
      secciones: [
        {
          titulo: "Piqueos",
          items: [
            { nombre: "Porción de papas fritas grande", precio: "S/ 19.90" },
            { nombre: "Porción de yuquitas", precio: "S/ 19.90" },
            { nombre: "Salchipapas clásicas", precio: "S/ 27.50" },
            { nombre: "Tequeños de queso con guacamole", precio: "S/ 29.90" },
            { nombre: "Alitas broaster con papas fritas", precio: "S/ 39.90" },
            { nombre: "Alitas BBQ con papas fritas", precio: "S/ 39.90" },
            { nombre: "Alitas acevichadas con papas fritas", precio: "S/ 39.90" },
            { nombre: "Ronda de alitas", desc: "BBQ, acevichadas y buffalo.", precio: "S/ 79.90" },
            { nombre: "Salchimix", desc: "Pollo, chorizo, hot dog, huevo y queso edam.", precio: "S/ 44.90" },
            { nombre: "Chicharrón de pollo con papas fritas", precio: "S/ 44.90" },
            { nombre: "Mostrito", desc: "1/8 de broaster con huevo frito, arroz chaufa y papas fritas. Conviértelo en 1/4 por S/ 9.90 más.", precio: "S/ 39.90" },
            { nombre: "Fuente Chelera", desc: "Chicharrón de pollo, alitas broaster con papas fritas y 10 tequeños de queso con guacamole.", precio: "S/ 99.90" }
          ]
        }
      ]
    }
  },
  preguntas: [
    { p: "¿Hay edad mínima?", r: "Solo mayores de 18 años." },
    { p: "¿Celebran cumpleaños?", r: "Sí, hay premios para los cumpleañeros. Avísanos al reservar." },
    { p: "¿Cómo sé que mi reserva está confirmada?", r: "Te escribimos al celular que dejes al reservar." }
  ],
  reservas: { maxPersonas: 20, nochesVisibles: 8 }
};
