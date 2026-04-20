# 📄 Memoria del Proyecto Web

## 🧭 Introducción

Este proyecto consiste en una página web personal diseñada como una interfaz inspirada en un escritorio tipo Windows clásico. El objetivo es combinar diseño visual interactivo con contenido dinámico cargado mediante JavaScript, manteniendo una estructura ligera basada en HTML, CSS y JavaScript puro.

La web funciona como un “panel personal” donde se muestran proyectos, habilidades, conocimientos y elementos interactivos como música y accesos rápidos.

La página está actualmente **hosteada en Neocities**, una plataforma que permite publicar sitios web estáticos de forma sencilla. Desde allí, se enlazan distintos proyectos externos alojados principalmente en **GitHub Pages**, donde se publican demos, experimentos y páginas adicionales desarrolladas durante el aprendizaje.

---

## 🎯 Objetivos del proyecto

Los principales objetivos del proyecto son:

- Crear una interfaz visual atractiva estilo escritorio
- Practicar manipulación del DOM con JavaScript
- Cargar contenido dinámico desde archivos JSON
- Implementar componentes reutilizables (tabs, listas, grid)
- Mantener una estructura ligera sin frameworks pesados
- Mejorar la experiencia de usuario con animaciones y efectos visuales
- Integrar enlaces externos hacia proyectos alojados en GitHub Pages

---

## 🎯 Propósito del proyecto

Además de ser un proyecto de aprendizaje y experimentación, esta página tiene un segundo objetivo importante:

El sitio está diseñado también como un **portfolio personal y CV en formato web**, donde se pueden mostrar habilidades, conocimientos y proyectos de forma visual e interactiva.

En lugar de un currículum tradicional, esta web funciona como una presentación dinámica del perfil del desarrollador, integrando tanto experiencia técnica como proyectos reales accesibles mediante enlaces externos.


---

## 🧱 Tecnologías utilizadas

El proyecto está desarrollado con tecnologías web estándar:

- **HTML5** → estructura de la página
- **CSS3** → diseño, layout y animaciones
- **JavaScript (ES6)** → lógica dinámica e interactividad
- **JSON** → almacenamiento de datos (skills, proyectos, enlaces)
- **7.css** → librería visual para estilo Windows clásico
- **Font Awesome** → iconos

---

## 🧩 Estructura del proyecto

La página está organizada en bloques tipo “ventanas”:

### 🪟 Ventanas principales

- **Header (Bienvenida)** → título animado
- **Proyectos** → pestañas con enlaces a GitHub y CodePen
- **Perfil** → información personal, skills y conocimientos
- **Quick Launch** → accesos rápidos tipo escritorio
- **Música** → reproductor de audio aleatorio
- **Footer** → información final

---

## 🔗 Sistema de enlaces y proyectos

Una parte importante del proyecto es la sección de enlaces dinámicos.

Los enlaces mostrados en la interfaz:

- Dirigen a repositorios y proyectos en **GitHub**
- Incluyen demos o páginas publicadas en **GitHub Pages**
- Pueden enlazar también a otras webs externas o experimentos personales

Esto permite centralizar en una sola interfaz todos los proyectos desarrollados, actuando como un portafolio interactivo.

---

## ⚙️ Funcionamiento del sistema

### 🗂 Sistema de pestañas (Tabs)

Cada ventana puede contener pestañas. El sistema:

- Detecta botones con `role="tab"`
- Muestra u oculta contenido (`tabpanel`)
- Mantiene independencia entre ventanas
- Permite múltiples grupos de tabs en la misma página

---

### 📄 Carga de datos (JSON)

Se utiliza JavaScript para cargar contenido dinámicamente desde archivos JSON.

Ejemplos:

- Skills
- Conocimientos
- Proyectos GitHub / CodePen

Esto permite modificar el contenido sin tocar el HTML.

---

### 🎵 Reproductor de música

El reproductor:

- Selecciona canciones aleatoriamente
- Evita repetir la última canción
- Inicia reproducción tras interacción del usuario
- Reproduce automáticamente al finalizar una canción

---

### 🧩 Grid de accesos rápidos

Se genera dinámicamente un grid tipo escritorio:

- Iconos
- Enlaces externos
- Descripciones opcionales
- Carga desde JSON

---

### ✨ Animaciones

El sitio incluye efectos visuales:

- Animación de rebote por letra (`lebounce`)
- Efecto wiggle
- Transiciones suaves en elementos interactivos
- Fondos dinámicos

---

## 🎨 Diseño visual

El diseño está inspirado en:

- Escritorio Windows clásico
- Ventanas flotantes
- Estética retro/moderna híbrida
- Uso de transparencias y fondos dinámicos

El objetivo es simular una experiencia de sistema operativo dentro del navegador.

---

## 🌐 Hosting

El sitio está actualmente publicado en **Neocities**, una plataforma de hosting estático orientada a proyectos personales y creativos.

Desde esta página principal se enlazan múltiples proyectos externos alojados en **GitHub Pages**, lo que permite mantener una estructura modular donde cada proyecto puede tener su propia página independiente sin depender del repositorio principal.

---

## ⚡ Rendimiento

Se han aplicado varias optimizaciones:

- Uso de `DocumentFragment` para evitar reflows
- Carga asíncrona de JSON
- Evitar duplicación de código
- Separación de lógica por componentes
- Animaciones ligeras basadas en CSS

---

## 🧠 Aprendizajes

Durante el desarrollo se han trabajado conceptos como:

- Manipulación avanzada del DOM
- Arquitectura modular en JavaScript
- Eventos del navegador
- Accesibilidad básica (ARIA roles)
- Separación de datos y vista (JSON + JS)
- Integración de plataformas de hosting (Neocities + GitHub Pages)

---

## 🚀 Posibles mejoras futuras

Algunas mejoras posibles para el futuro:

- Sistema de ventanas arrastrables (drag & drop)
- Barra de tareas tipo Windows
- Persistencia de estado (localStorage)
- Mejor sistema de temas visuales
- Animaciones más suaves con GPU
- Refactorización en módulos ES6

---

## 📌 Conclusión

Este proyecto combina diseño visual con programación frontend para crear una experiencia interactiva tipo escritorio dentro del navegador.

Ha servido como práctica para mejorar habilidades en JavaScript, diseño UI y organización de código, además de aprender a integrar diferentes plataformas de hosting como Neocities y GitHub Pages.

El resultado es una web personal modular, extensible y fácil de mantener que funciona como portafolio interactivo de proyectos.