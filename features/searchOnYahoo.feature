# language: es

@yahoo
Característica: Busqueda en Yahoo

  Escenario: Abrir la pagina del buscador de Yahoo
    Dado que he navegado a la pagina del buscador de Yahoo
    Entonces el titulo de la pagina es "Yahoo Search - Búsqueda en la Web"
    Y puedo ver el campo de texto para realizar la busqueda

  @busqueda
  Escenario: Realizando una busqueda en el buscador
    Dado que he navegado a la pagina del buscador de Yahoo
    Cuando realizo una busqueda de texto con "Nightwatchjs org"
    Entonces se cargan los resultados
    Y el titulo de la pagina contiene el texto "Nightwatchjs org"

  @busqueda
  Escenario: Navegando al cuarto resultado de la segunda pagina de busqueda
    Dado que he realizado una busqueda de texto con "Nightwatchjs org"
    Cuando navego a la siguiente pagina de resultados
    Y hago click sobre el resultado 4
    Entonces navego a la pagina que he seleccionado

  @busqueda @multi
  Esquema del escenario: Introduciendo distintos textos en el buscador
    Dado que he navegado a la pagina del buscador de Yahoo
    Cuando realizo una busqueda de texto con "<text>"
    Entonces se cargan los resultados
    Y el titulo de la pagina contiene el texto "<text>"
    Ejemplos:
      | text                                   |
      | wikipedia                              |
      | Paradigma Digital                      |
      | Bob Esponja cantando We Will Rock You! |
