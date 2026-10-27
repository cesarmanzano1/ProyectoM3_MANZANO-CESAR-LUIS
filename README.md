# ChatVerso — Chat con personajes 3D e inteligencia artificial

<p align="center">
  <img src="./img/chatverso-logo0.png" alt="Logo de ChatVerso" width="180">
</p>

<p align="center">
  <strong>Proyecto Módulo 3 · César Luis Manzano</strong>
</p>

<p align="center">
  <a href="https://proyecto-m3-omega.vercel.app/">Ver aplicación desplegada</a> ·
  <a href="https://github.com/cesarmanzano1/ProyectoM3_MANZANO-CESAR-LUIS">Repositorio de GitHub</a>
</p>

---

## 📖 Descripción del proyecto

**ChatVerso** es una aplicación web interactiva que permite seleccionar personajes conocidos, visualizar sus modelos 3D y acceder a un chat con inteligencia artificial para conversar con ellos.

El proyecto fue desarrollado como parte del **Proyecto del Módulo 3**. Su objetivo es combinar una interfaz web dinámica, la visualización de personajes en tres dimensiones y la interacción mediante una API de inteligencia artificial.

La aplicación cuenta con cuatro vistas principales: **Inicio**, **Acerca de nosotros**, **Director** y **Chat**. La navegación se encuentra organizada mediante un enrutador propio, y la funcionalidad de conversación se comunica con una función del servidor ubicada en `api/chat.js`.

---

## 🎭 Personajes seleccionados

La aplicación incluye tres personajes:

- **Eric Cartman:** personaje de *South Park*, conocido por su personalidad provocadora, sarcástica y autoritaria.
- **Homero Simpson:** protagonista de *Los Simpson*, reconocido por su humor, sus ocurrencias y su personalidad despreocupada.
- **Elmo:** personaje de *Plaza Sésamo*, caracterizado por su alegría, curiosidad y personalidad amigable.

Cada personaje aporta una personalidad diferente para ofrecer una experiencia de conversación entretenida e interactiva.

---

## ✨ Funcionalidades principales

- Selección de tres personajes.
- Visualización de modelos 3D.
- Navegación entre las cuatro vistas de la aplicación.
- Acceso al chat asociado al personaje seleccionado.
- Integración con una API de chat mediante una función del servidor.
- Interfaz desarrollada con HTML, CSS y JavaScript.
- Despliegue público en Vercel.

---

## 🖥️ Vistas de la aplicación

| Vista | Descripción |
| :--- | :--- |
| **Inicio** | Permite explorar y seleccionar a Eric Cartman, Homero Simpson o Elmo, con sus respectivos modelos 3D. |
| **Acerca de nosotros** | Presenta información sobre la aplicación y el proyecto. |
| **Director** | Contiene la vista destinada a la funcionalidad de directorio del proyecto. |
| **Chat** | Permite acceder a la conversación con el personaje seleccionado. |

---

## 🎬 Vista previa

<p align="center">
  <img src="./img/chat_verso_vista.gif" alt="Demostración de ChatVerso en funcionamiento" width="800">
</p>

La animación muestra una demostración visual de la aplicación y de su funcionamiento.

---

## 🛠️ Tecnologías utilizadas

- **HTML5:** estructura de la aplicación.
- **CSS3:** estilos y diseño de la interfaz.
- **JavaScript:** lógica de la aplicación e interacción con el usuario.
- **Model Viewer:** visualización de modelos 3D en el navegador.
- **GLB:** formato de los modelos tridimensionales.
- **Node.js y npm:** entorno de ejecución y administración de dependencias.
- **Vercel:** ejecución local del entorno de desarrollo y despliegue.
- **API de inteligencia artificial:** generación de respuestas en el chat.
- **Vitest:** ejecución de pruebas automatizadas, si corresponde a la configuración del proyecto.
- **Git y GitHub:** control de versiones y almacenamiento del código fuente.

---

## 📋 Requisitos previos

Para ejecutar el proyecto localmente se necesita:

- **Node.js** instalado.
- **npm**, incluido con Node.js.
- **Git**.
- Una clave de API válida para el proveedor de inteligencia artificial utilizado por el proyecto.
- **Vercel CLI** para ejecutar la aplicación mediante `vercel dev`.

---

## 🚀 Instalación y ejecución local

### 1. Clonar el repositorio

Abrir una terminal y ejecutar:

```bash
git clone https://github.com/cesarmanzano1/ProyectoM3_MANZANO-CESAR-LUIS.git
```

Ingresar a la carpeta del proyecto:

```bash
cd ProyectoM3_MANZANO-CESAR-LUIS
```

### 2. Instalar las dependencias

Ejecutar:

```bash
npm install
```

Este comando instala las dependencias declaradas en `package.json`. La carpeta `node_modules/` se genera localmente y no es necesario subirla a GitHub.

### 3. Configurar las variables de entorno

El repositorio incluye el archivo `.env.example`, que sirve como referencia para configurar las variables necesarias.

Crear un archivo `.env` a partir del ejemplo:

- En **Windows (PowerShell)**:
  ```powershell
  Copy-Item .env.example .env
  ```
- En **Linux o macOS**:
  ```bash
  cp .env.example .env
  ```

Abrir el archivo `.env` y completar las variables requeridas con sus valores correspondientes. Si el proyecto utiliza Google Gemini, la configuración podría incluir una variable como la siguiente:

```env
GEMINI_API_KEY=tu_clave_de_api
```

> **Importante:** Consultar `.env.example` y `api/chat.js` para verificar el nombre exacto de la variable. No compartir claves privadas ni subir el archivo `.env` al repositorio.

### 4. Instalar Vercel CLI

Si todavía no está instalado, ejecutar:

```bash
npm install -g vercel
```

También se puede utilizar Vercel CLI sin instalarlo globalmente mediante `npx`.

### 5. Ejecutar la aplicación localmente

Desde la raíz del proyecto, ejecutar:

```bash
npx vercel dev
```

El comando inicia el entorno local de Vercel, incluyendo las funciones de API configuradas en el proyecto.

Abrir en el navegador:
`http://localhost:3000`

Desde allí se puede navegar por las vistas, seleccionar personajes y probar el chat.

---

## 🧪 Cómo ejecutar los tests

El proyecto permite ejecutar las pruebas automatizadas mediante el comando:

```bash
npm test
```

Este comando utiliza el script de pruebas definido en `package.json`. Las pruebas deben ejecutarse desde la raíz del repositorio, después de instalar las dependencias.

Se recomienda verificar:
- El comportamiento de las funciones auxiliares.
- La transformación de los datos enviados al chat.
- El manejo de respuestas correctas y errores de la API.
- La navegación entre las vistas.
- La selección del personaje y la identificación del personaje en el chat.

> Los casos anteriores son aspectos recomendados para comprobar; los tests efectivamente implementados deben consultarse en la carpeta `test/`.

---

## 🌐 Cómo desplegar en Vercel

La aplicación se encuentra desplegada públicamente en Vercel.

### Despliegue desde GitHub
1. Ingresar a Vercel.
2. Iniciar sesión y seleccionar el proyecto correspondiente.
3. Verificar que el repositorio de GitHub esté vinculado.
4. Configurar las variables de entorno necesarias en el panel del proyecto.
5. Realizar el despliegue desde Vercel o actualizar la rama configurada para producción.

### Despliegue desde la terminal
Para generar un despliegue de prueba:
```bash
npx vercel
```

Para desplegar en producción:
```bash
npx vercel --prod
```

Si el proyecto todavía no está vinculado a Vercel, seguir las instrucciones de la CLI para completar la configuración.

### Aplicación publicada
- **URL de producción:** [https://proyecto-m3-omega.vercel.app/](https://proyecto-m3-omega.vercel.app/)

Después del despliegue, se recomienda comprobar la navegación, la carga de los modelos 3D y el funcionamiento del chat.

---

## 📸 Capturas de pantalla

Las siguientes capturas permiten documentar el funcionamiento de la aplicación:

- **Inicio**
- **Vista 3D**
- **Acerca de nosotros**
- **Chat**

*Para que las imágenes se visualicen en GitHub, agregar las capturas reales a la carpeta `img/` y vincularlas en este apartado.*

---

## 🤖 Registro del uso de inteligencia artificial

Durante el desarrollo de **ChatVerso** se utilizaron herramientas de inteligencia artificial como apoyo en tareas de programación, análisis de errores y mejora de la aplicación.

### Herramientas utilizadas
- **Google Gemini:** motor de inteligencia artificial para el chat, según la configuración utilizada en el proyecto.
- **ChatGPT:** asistencia en la comprensión de errores, revisión de código, organización de componentes, estilos CSS y resolución de problemas durante el desarrollo.

### Actividades asistidas por IA
- Revisión y depuración de código JavaScript.
- Apoyo en la organización de la navegación entre vistas.
- Resolución de problemas relacionados con la carga de modelos 3D.
- Orientación para la integración del chat con una API.
- Asistencia en la documentación y preparación del `README.md`.

### Criterios de utilización
Las herramientas de IA se utilizaron como apoyo al proceso de desarrollo. Las sugerencias se revisaron y adaptaron al código del proyecto.

---

## 📁 Estructura del proyecto

La organización principal del repositorio es la siguiente:

```text
PROYECTOM3_MANZANO-CESAR-LUIS/
│
├── api/
│   └── chat.js
│
├── img/
│   ├── chatverso-logo0.png
│   ├── modelos-3D-y-recursos-visuales
│   └── gif-de-presentacion
│
├── src/
│   ├── services/
│   ├── styles/
│   ├── transform/
│   ├── docIA/
│   ├── views/
│   ├── main.js
│   └── router.js
│
├── test/
│
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vercel.json
└── README.md
```

### Descripción de las carpetas principales
- `api/`: contiene las funciones del servidor, incluida la función `chat.js`.
- `img/`: almacena el logo (`chatverso-logo0.png`), los modelos 3D, el GIF de presentación y otros recursos visuales.
- `src/services/`: contiene los servicios y las funciones de comunicación con otras herramientas o APIs.
- `src/styles/`: contiene los estilos CSS de la aplicación.
- `src/transform/`: contiene las funciones de transformación de datos.
- `src/views/`: contiene las vistas de la aplicación.
- `src/main.js`: punto de entrada principal de JavaScript.
- `src/router.js`: administra la navegación entre las vistas.
- `test/`: contiene los archivos de pruebas automatizadas.
- `.env.example`: ejemplo de configuración de variables de entorno.
- `vercel.json`: configuración de Vercel.
- `package.json`: define los metadatos, scripts (`npm test`, etc.) y dependencias del proyecto.

> **Nota:** `.env`, `.env.local`, `node_modules/` y `.vercel/` son elementos de trabajo local que no se incluyen en el repositorio público.

---

## 📦 Entregable final

- Repositorio con el código fuente del proyecto.
- Aplicación publicada en Vercel.
- Cuatro vistas para navegar por la aplicación.
- Selección y visualización de personajes 3D.
- Integración del chat mediante una función de API.
- Tests ejecutables mediante `npm test`.
- README con instrucciones de instalación, ejecución, pruebas, despliegue y registro de uso de IA.

---

## 👨‍💻 Autor

**César Luis Manzano**  
Desarrollador web Full Stack en formación.

- **GitHub:** [@cesarmanzano1](https://github.com/cesarmanzano1)
- **Repositorio:** [Proyecto Módulo 3](https://github.com/cesarmanzano1/ProyectoM3_MANZANO-CESAR-LUIS)
- **Aplicación:** [ChatVerso en Vercel](https://proyecto-m3-omega.vercel.app/)

<p align="center">
  <strong>ChatVerso — Elegí tu personaje y comenzá la conversación.</strong>
</p>