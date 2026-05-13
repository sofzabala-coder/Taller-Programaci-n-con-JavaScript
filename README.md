# Taller-Programación-con-JavaScript / Simulador de Prestaciones Laborales
Universidad El Bosque — Facultad de Comunicación y Creación
Programa de Creación Digital — Taller de Programación con JavaScript

Este proyecto es un simulador de nómina colombiana desarrollado en JavaScript puro.

Cambios y mejoras respecto al código inicial:
El código base con el que empecé el taller era muy básico y tenía varios problemas que fui corrigiendo:
1- Estructura de variables sueltas a algo organizado
El código original declaraba una variable separada por cada nivel de riesgo, lo cual era repetitivo, difícil de mantener y tenía un error de sintaxis (faltaba una comilla en alto). Que cai en cuenta!

-Lo cambié a un objeto donde la clave es el número del nivel (1 al 5) y el valor es directamente la tarifa en decimal. Así puedo hacer ARL_TARIFAS[nivelRiesgo] en lugar de un bloque de if/else gigante.

2. Constantes reales con valores del PDF
Mi código inicial no tenía ninguna constante definida con los valores legales.
--> Por lo que agregué las constantes con los valores vigentes para 2026 que estaban en el enunciado del taller. Un error importante que corregí fue el valor del UVT: en mi versión inicial lo tenía como 5237 (entero), pero el valor correcto es 52.37 pesos — eso afectaba todos los cálculos de retención en la fuente.

3. Las operaciones incompletas — ahora sí calculan todo
El código original solo tenía el comienzo del cálculo del total devengado y salud estaba declarada sin valor. No calculaba nada más. 
--> Por lo que completé todos los cálculos organizados dentro de una función

4. Validación de perfil
El taller pedía bloquear o redirigir al usuario según su edad por lo que agregué una función que retorna el tipo de perfil

5. Asi mismo el enunciado menciona que cada tipo de documento corresponde a un rango de edad por lo que tambien agregué una validación para eso.

6. Y Implementé el cálculo del Art. 383 del Estatuto Tributario, que era el punto extra del taller:)
   pdta: No aparecen los commits completos  dado que al inicio tuve complicaciones para guardar y subir el progreso que iba teniendo en el taller inicialmente :)
7. Cambios finales realizados en HTML y CSS:
 Para esta entrega actualicé el archivo HTML corrigiendo el id del campo de nombre, que estaba como nombreCompleto pero el JavaScript lo buscaba como nombre, también agregué las opciones CE y PP al select de tipo de documento que me faltaban, vinculé el archivo style.css con la etiqueta <link> en el <head> y añadí la sección de resultados al final del formulario para que los cálculos se mostraran en pantalla y no solo en la consola. En cuanto al CSS, creé el archivo style.css con estilos propios para darle una presentación más visual a la página, definí variables de color, apliqué una tipografía más limpia, diseñé las tarjetas de cada paso con bordes redondeados y organicé la sección de resultados diferenciando visualmente los ingresos, las deducciones y el neto a pagar con colores distintos.
Sofia Alejandra Cubillos Zabala - 1011093099
