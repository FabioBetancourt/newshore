## Resumen
En este proyecto, se emplea el framework Angular para el consumo de APIs, siguiendo patrones de arquitectura estandarizados por Angular. Se utiliza programación orientada a objetos mediante el uso de interfaces, se implementa un riguroso control de versiones y se aplica CSS puro para dar estilo a la página. Además, se presta atención al manejo de excepciones, se implementan interceptors para la gestión de peticiones y se realizan pruebas unitarias exhaustivas para garantizar la calidad del código.

## Que encontrar en este proyecto

- Arquitectura de la solución
- Programación orientada a objetos
- Consumo REST API
- Control de versiones
- Manejo de estilos en cascada CSS
- Control de excepciones
- Test unitarios
- Uso de interceptors

## NewShore

Este proyecto se generó con [Angular CLI](https://github.com/angular/angular-cli) versión 16.2.3.

## Servidor de desarrollo

Ejecute `ngserve` para un servidor de desarrollo. Navegue hasta `http://localhost:4200/`.

## Construir

Ejecute `ng build` para construir el proyecto. Los artefactos de compilación se almacenarán en el directorio `dist/`.

## Ejecución de pruebas unitarias

Ejecute `ng test` para ejecutar las pruebas unitarias


## Cosas a mejorar

Debido a limitaciones de tiempo, no fue posible implementar el uso de un gestor de estados (state manager) ni la utilización de tokens de inyección en este proyecto. Sin embargo, tengo conocimientos sobre cómo realizarlo. Para el manejo de estados, se podría integrar una biblioteca como NgRx o Redux, creando acciones y reducers que permitan manejar el estado de manera centralizada. En cuanto a los tokens de inyección, se utilizarían para proporcionar dependencias de manera eficiente y escalable a través del sistema de inyección de dependencias de Angular, definiendo y utilizando proveedores específicos en los módulos o componentes donde se necesiten
