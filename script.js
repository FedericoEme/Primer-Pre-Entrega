let productos = [
    { id: 1, nombre: "Remera Adventure", categoria: "indumentaria", stock: 10, precio: 5000, rutaImagen: "remeraAdventure.webp", info: "Remera de algodón con con estampa en la espalda" },
    { id: 2, nombre: "Remera Logo", categoria: "indumentaria", stock: 7, precio: 5000, rutaImagen: "remeraLogo.webp", info: "Remera de algodón con logo en el pecho" },
    { id: 3, nombre: "Buzo Adventure", categoria: "indumentaria", stock: 14, precio: 9000, rutaImagen: "buzoAdventure.webp", info: "Buzo con capucha con logo Adventure en la espalda" },
    { id: 4, nombre: "Buzo Logo", categoria: "indumentaria", stock: 11, precio: 9000, rutaImagen: "buzoLogo.webp",info: "Buzo con capucha con logo de Soy Tribu en el pecho" },
    { id: 5, nombre: "Gorra Logo", categoria: "indumentaria", stock: 20, precio: 3500, rutaImagen: "gorraProyecto.webp",info: "Gorra con logo del proyecto" },
    { id: 6, nombre: "Piluso Logo", categoria: "indumentaria", stock: 10, precio: 2500, rutaImagen: "pilusoLogo.webp",info: "Piluso con logo del proyecto"  },
    { id: 7, nombre: "Taza Logo", categoria: "marchandising", stock: 7, precio: 3000, rutaImagen: "tazaLogo.webp" ,info: "Taza Soy Tribu"  },
    { id: 8, nombre: "Calco Logo", categoria: "marchandising", stock: 100, precio: 200, rutaImagen: "calcoLogo.webp",info: "Calco de Soy Tribu"  },
]
  
let carritoRecuperado = localStorage.getItem("carrito")
let carrito = carritoRecuperado ? JSON.parse(carritoRecuperado) : []

renderizarCarrito(carrito)
renderizarProductos(productos, carrito)

//Capturo el botón Buscar y filtro por categoría buscada
let buscador = document.getElementById("buscador")
let botonBuscar = document.getElementById("buscar")
botonBuscar.addEventListener("click", () => filtrarYRenderizar(productos))

//Filtros por categoría
let botonesCategorias = document.getElementsByClassName("filtroCategoria")
for (const botonCategoria of botonesCategorias) {
  botonCategoria.addEventListener("click", (e) => filtrarPorCategoria(e, productos))
}

function filtrarPorCategoria(e, productos) {
  console.log(e)
  let productosFiltrados = productos.filter(producto => {
    return producto.categoria === e.target.id
  })
  renderizarProductos(productosFiltrados)
}

function filtrarYRenderizar(productos) {
  let productosFiltrados = productos.filter(producto => {
    return producto.nombre.includes(buscador.value)
  })
  renderizarProductos(productosFiltrados)
}

function renderizarProductos(productos, carrito) {
  let contenedor = document.getElementById("contenedorProductos")
  contenedor.innerHTML = ""

  productos.forEach(({ nombre, rutaImagen, precio, id, info }) => {
    let tarjeta = document.createElement("div")
    tarjeta.className = "tarjeta"
    tarjeta.id = "tarjeta" + id

    tarjeta.innerHTML = `
      <div>
        <h3>${nombre}</h3>
        <img class=imagenProducto src=./images/${rutaImagen} />
        <p>$${precio}</p>
      </div>
      <div class=oculta>
        <p>${info}</p>
        <button id=${id}>Agregar al carrito</button>
      </div>
    `
    //cuando paso el mouse por la tarjeta muestra Info Extra y el botón para agregar al carrito
    tarjeta.addEventListener("mouseenter", (e) => mostrarInfoExtra(e))
    tarjeta.addEventListener("mouseleave", (e) => mostrarInfoExtra(e))
    contenedor.appendChild(tarjeta)

    let botonAgregarAlCarrito = document.getElementById(id)
    botonAgregarAlCarrito.addEventListener("click", (e) => agregarProductoAlCarrito(productos, carrito, e))
  })
}

function mostrarInfoExtra(e) {
  e.target.children[0].classList.toggle("oculta")
  e.target.children[1].classList.toggle("oculta")
}

function agregarProductoAlCarrito(productos, carrito, e) {
  let productoBuscado = productos.find(producto => producto.id === Number(e.target.id))
  let productoEnCarrito = carrito.find(producto => producto.id === productoBuscado.id)

  if (productoBuscado.stock > 0) {
    if (productoEnCarrito) {
      productoEnCarrito.unidades++
      productoEnCarrito.subtotal = productoEnCarrito.unidades * productoEnCarrito.precioUnitario
    } else {
      carrito.push({
        id: productoBuscado.id,
        nombre: productoBuscado.nombre,
        precioUnitario: productoBuscado.precio,
        unidades: 1,
        subtotal: productoBuscado.precio
      })
    }
    productoBuscado.stock--
    localStorage.setItem("carrito", JSON.stringify(carrito))
  } else {
    alert("No hay más stock del producto seleccionado")
  }

  renderizarCarrito(carrito)
}

function renderizarCarrito(productosEnCarrito) {
  if (productosEnCarrito.length > 0) {
    let divCarrito = document.getElementById("carrito")
    divCarrito.innerHTML = ""

    productosEnCarrito.forEach(({ nombre, precioUnitario, unidades, subtotal }) => {
      let tarjProdCarrito = document.createElement("div")
      tarjProdCarrito.className = "tarjProdCarrito"
      tarjProdCarrito.innerHTML = `
        <p>${nombre}</p>
        <p>$${precioUnitario}</p>
        <p>${unidades}</p>
        <p>$${subtotal}</p>
      `

      divCarrito.appendChild(tarjProdCarrito)
    })

    let boton = document.createElement("button")
    boton.innerHTML = "Finalizar compra"
    boton.addEventListener("click", finalizarCompra)
    divCarrito.appendChild(boton)
  }
}

function finalizarCompra() {
  let carrito = document.getElementById("carrito")
  carrito.innerHTML = ""
  localStorage.removeItem("carrito")
}

let botonVerOcultar = document.getElementById("verOcultar")
botonVerOcultar.addEventListener("click", verOcultarCarrito)

//Esta función es la que pasa a mostrarme el carrito, captura el botón verOcultar
function verOcultarCarrito() {
  let carrito = document.getElementById("carrito")
  let contenedorProductos = document.getElementById("contenedorProductos")

  carrito.classList.toggle("oculta")
  contenedorProductos.classList.toggle("oculta")
}

