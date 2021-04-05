## Resumen Next JS

### pages

- pages/about.js crea una ruta http://localhost:3000/about, o bien http://baseUrl/about en producción
- ... siempre que en about.js tengamos un componente About.js
- la convención nos dice que los componentes que abrimos en la carpeta pages, van en minúsculas,
  y los componentes en otras carpetas, en mayúsculas.

#### Subrutas en pages

- si abrimos por ejemplo pages/product/productone.js, tendríamos acceso al componente productone.js
  en la subruta http://localhost/product/productone, o en producción, en baseUrl//product/productone

#### Rutas dinámicas en pages

- si abrimos p.ejemplo pages/product/[id].js , tendremos acceso a la ruta localhost:3000/product/1 o 2 , etc...

#### Pre-rendering

- Por defecto, Next.js genera HTML para cada página (hace un pre-render) antes de que se carga.
- Esta característica contrasta con React.js, que deja que el navegador (Chrome) sea el que cree el HTML (el Javascript de ejecuta en el cliente)
- Como lo hace ?
  - Cada HTML lleva asociado una cantidad mínima de JS para esa página. Cuando se carga la página, el resto de Javascript se ejecuta e hidrata dicha página (la hace totalmente interactiva)
- Gracias a esto, Next.js se lleva mejor con el SEO que React.js

##### Static Generation vs Server-side Rendering

- Tenemos estas dos opciones para pre-renderizar nuestros componentes.
- Si la página usa Static Generation, el HTML se genera cuando ejecutamos next/build. El HTML estará en cache y se reutiliza en cada carga.
- Si la página utilizar Server-side rendering, el HTML se genera cada vez que cargamos la página.
- Solo se recomienda utilizar Server-side rendering si hay que actualizar el contenido de la página en cada carga.

##### Uso de Static Generation sin datos

- Este es el comportamiento por defecto en Next.js. Si escribimos un componente normal, utilizará SG sin más.

##### Uso de Static Generation con datos.

- Puede que nuestra página use datos externos.
- Si el contenido de la página depende de datos externos, usamos getStaticProps.
- Si las rutas de la página depende de datos externos usamos getStaticPaths.
- Podemos usar getStaticProps, o bien los dos (getStaticProps y getStaticPaths) conjuntamente.

##### Uso de Server-side rendering

- En caso de que nuestra página requiera actualizarse continuamente, utilizaremos Server-side rendering.
- La función que se utiliza es getServerSideProps()

### Data Fetching

- Vamos a ver las 3 funciones más en detalle.

#### getStaticProps()

- la función tiene esta pinta

`export async function getStaticProps(context) { return { props: {}, // se pasa al compontente como props. } }`

- El objeto context contiene varios pares llave/valor.
- Destacamos la llave params, que contiene las rutas dinámicas.
- Si el nombre de la página es [id].js, entonces params será {id: ...}
- Esta llave params se utiliza conjuntamente con getStaticPaths

#### getStaticPaths

- Si una página tiene rutas dinámicas y utiliza getStaticProps, necesita definir una lista de rutas
  en las que se renderizará el HTML cuando ejecutemos next run build

- la función tiene esta pinta

`export async function getStaticPaths() { return { paths: [ { params: { ... } } ], fallback: true or false }; }`

- paths determina que rutas renderizarán el HTML

- Ejemplo.
- Si tenemos una página que utiliza rutas dinámicas : `pages/posts/[id].js, y la función
  getStaticPaths retorna {paths : [
  {params: {id: "1"}},
  {params: {id: "2"}}
  ],
  fallback: true,
  }
- ... entonces, NextJs generará de manera estática `posts/1` y `posts/2` en el momento en que hagamos yarn build.

- fallback. Si es falso, solo se renderizarán las rutas especificadas en params. El resto, retornará 404.

- si fallback es verdadero, las rutas retornadas por getStaticPaths serán renderizadas a HTML en el momento del build.

- En el caso que tenemos de un e-commerce, que tiene un gran número de páginas estáticas que dependen de datos, el build sería muy pesado - ya que pre-renderizariamos todas las páginas en ese momento.
- En lugar de hacer eso, podemos pre-rendizar un conjunto pequeño de páginas, y utilizar fallbacK: true, para el resto. De esta manera, cuando alguien carga una página que todavía no ha sido generada, el usuario verá la página con un indicador loader de carga. Una vez finalizada, dicha página se queda en el cache y estará disponible para posteriores cargas.

## CSS - ESTILOS

### Hoja de estilos global

Para crear una hoja de estilos global, debemos

- crear `pages/_app.js`
- `import "../styles.css"` dentro de \_app.js
- Dichos estilos serán globales

### Estilos en los componentes

- Los estilos para componentes se pueden crear en cualquier sitio, e importar en cualquier sitio.
- El único requerimiento es que sigan la convención .module.css
- Nextjs crea clases adicionales para asegurarse de que nuestros estilos no colisionan entre componentes.
- En producción, todos los archivos tipo .module.css serán concatenados y minificados.

### CSS-in-JS

- Pueden utilizarse in-line styles, como por ejemplo `<p style={{color: "red"}}>hi there</p>`
- o bien los llamados `styled-jsx`, que son los que hemos utilizado hasta ahora en nuestros componentes.

### Bootstrap o similar

Para utilizar Bootstrap o similar, debemos importar el archivo de `node_modules`, e importarlo
en `pages/_app.js`.

- por ejemplo, en el archivo \_app.js,

`
import 'bootstrap/dist/css/bootstrap.css'

export default function MyApp({ Component, pageProps }) {
return <Component {...pageProps} />
}

`

### Sass

- Nextjs da soporte a Sass. Simplemente hay que instalar sass (yarn add sass), y
  utilizar las extensiones `.scss`o bien `.css`

## Archivos estáticos ( imágenes y HTML)

- Nextjs las sirve desde la carpeta public.
- Nextjs buscará en la carpeta public las imágenes, así que no hay que referenciar `public` en los paths. Ver nuestro ejemplo en el componente Navbar.js
- También se pueden incluir HTML estáticos en la carpeta public

### Componente Image

- El componente Image de nextjs llegó para optimizar el tratamiento de imágenes, sobretodo en los
  dispositivos móviles.
- Tenemos el "Automatic Image Optimization", optimiza las imágenes al ser redimensionadas, y permite
  formatos modernos como .webp
- Las imágenes se cargan con "lazy loading" por defecto. Esto significa que las imágenes solo se
  van cargando a medida que se van aproximando al "viewport".
- Podemos ver un ejemplo del componente Image en nuestro componente Navbar... previo import de "next/image".

- una última cosa, ... para permitir la optimización de imágenes procedentes de un sitio web externo, debemos especificar los dominios que permitimos en `next.config.js`

## Rutas API

- Cualquier archivo que abrimos dentro de `pages/api`, es tratado por Nextjs como el "endpoint"
  de un API.

- Por ejemplo, si abrimos un `pages/api/hello.js`, y
- en hello.js escribimos

`export default function handler(req, res) { res.status(200).json({ name: 'John Doe' }) }`
