//Arreglo de elementos que serán usados en el carrito
let productos = [
    { id: 1, nombre: "remera adventure", categoria: "indumentaria", stock: 10, precio: 5000 },
    { id: 2, nombre: "remera logo proyecto", categoria: "indumentaria", stock: 7, precio: 5000 },
    { id: 3, nombre: "buzo adventure", categoria: "indumentaria", stock: 14, precio: 9000 },
    { id: 4, nombre: "buzo logo proyecto", categoria: "indumentaria", stock: 11, precio: 9000 },
    { id: 5, nombre: "gorra logo", categoria: "indumentaria", stock: 20, precio: 3500 },
    { id: 6, nombre: "control velocidad crucero", categoria: "accesorios", stock: 10, precio: 2500 },
    { id: 7, nombre: "soporte mando de drone", categoria: "accesorios", stock: 7, precio: 4000 },
    { id: 8, nombre: "soporte celular", categoria: "accesorios", stock: 3, precio: 6000 },
    { id: 9, nombre: "calco adventure", categoria: "marchandising", stock: 100, precio: 200 },
    { id: 10, nombre: "calco proyecto", categoria: "marchandising", stock: 200, precio: 200 },
]


//Simulo que el usuario y la contraseña viene de una Base de Datos
let usuarioBD = "Fede"
let contraseniaBD = "Fede123"
//Función que genera el carrito de compras
login(usuarioBD, contraseniaBD)
main(productos)

function main(productos) {
    let carrito = []
    let cat
    let opcion
    do {
        opcion = Number(prompt("Ingrese opción:\n1 - Listado de productos\n2 - Agregar producto al carrito\n3 - Filtrar por categoria\n4 - Ordenar por precio asc\n5 - Ordenar por precio desc\n6 - Finalizar compra\n0 - Para salir"))
        switch (opcion) {
            case 1:
                alert(listar(productos, "id", "nombre", "precio"))
                break
            case 2:
                agregarAlCarrito(productos, carrito)
                break
            case 3:
                cat = prompt("Ingrese la categoría deseada: \nIndumentaria\nAccesorios\nMarchandising").toLowerCase()
                let categoriaProducto = productos.filter(producto => producto.categoria === cat)
                if (categoriaProducto){
                alert(listar(categoriaProducto,"id", "nombre", "precio"))
                } else{
                    alert ("La categoría ingresada es incorrecta")
                }
                break

            case 4:
                ordenar(productos, "precio", true)  
                alert(listar(productos,"id",  "nombre", "precio"))
                break
            case 5:
                ordenar(productos, "precio", false)  
                alert(listar(productos, "id", "nombre", "precio"))
                break
            case 6:
                finalizarCompra(carrito)
                carrito = []
                break
            default:
                break
        }
    } while (opcion != 0)
}

//Función para ordenar por precio Ascedente o descendente
function ordenar(productos, propiedad, esAscendente) {
    productos.sort((a, b) => {
      if (a[propiedad] < b[propiedad]) {
        return -1
      }
      if (a[propiedad] > b[propiedad]) {
        return 1
      }
      return 0
    })
    if (!esAscendente) {
      productos.reverse()
    }
  }
//Función para finalizar la compra
function finalizarCompra(carrito) {
    if (carrito.length === 0) {
        alert("Primero debe agregar productos al carrito")
    } else {
        let total = carrito.reduce((acum, producto) => acum + producto.subtotal, 0)
        alert("El total a pagar es " + total)
        alert("Gracias por su compra")
    }
}


function listar(productos, prop1, prop2, prop3) {
    return productos.map(producto => producto[prop1] + " - " + producto[prop2] + " - " + producto[prop3]).join("\n")
  }

//Esta función agrega productos al carrito. Cuando se agrega un producto bajo el stock del mismo
function agregarAlCarrito(productos, carrito) {
    let id = Number(prompt("Seleccione producto por id:\n" + listar(productos, "id", "nombre", "precio")))
    let productoBuscado = productos.find(producto => producto.id === id)
    let productoEnCarrito = carrito.find(producto => producto.id === productoBuscado.id)
    let cantidad = Number(prompt("Ingrese la cantidad de unidades a comprar"))
    let nombre
    if (productoBuscado.stock > cantidad) {
        if (productoEnCarrito) {
            productoEnCarrito.unidades = productoEnCarrito.unidades + cantidad
            productoEnCarrito.subtotal = productoEnCarrito.unidades * productoEnCarrito.precioUnitario
        } else {
            carrito.push({
                id: productoBuscado.id,
                nombre: productoBuscado.nombre,
                precioUnitario: productoBuscado.precio,
                unidades: cantidad,
                subtotal: productoBuscado.precio * cantidad
            })
        }
        productoBuscado.stock = productoBuscado.stock - cantidad
        alert("Se agregaron " + cantidad + " unidades de " + productoBuscado.nombre + " al carrito")
    } else {
        alert("No hay suficiente stock del producto seleccionado")
    }
}

//Función que valida el logueo del usuario --> Se le pasa el usuario y contraseñas correcto y devuelve si se consiguió el logueo o no
function login(usuarioBD, contraseniaBD) {
    let usuario
    let contrasenia
    let contador = 0
    let inicioCorrecto = false

    do {
        usuario = prompt("Ingrese usuario")
        contrasenia = prompt("Ingrese contraseña")
        contador++

        if (usuario === usuarioBD && contrasenia === contraseniaBD) {
            alert("Bienvenido " + usuario)
            inicioCorrecto = true
            break
        } else {
            alert("Usuario y/o contraseña incorrecto/s")
        }
    } while (contador < 3)

    if (contador === 3 && !inicioCorrecto) {
        alert("Agotaste tus intentos, volvé más tarde")
    }
    return (inicioCorrecto)
}
