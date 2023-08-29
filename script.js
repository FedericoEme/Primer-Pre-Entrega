//Simulo que el usuario y la contraseña viene de una Base de Datos
let usuarioBD = "Fede"
let contraseniaBD = "Fede123"
let item = -1
let precioRemeras = 5000
let precioPantalones = 15000
let precioBuzos = 10000
let totalCompra = 0
let totalRemeras = 0
let totalPantalones = 0
let totalBuzos = 0
let cantidadRemeras = 0
let cantidadPantalones = 0
let cantidadBuzos = 0

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

//Función que genera el carrito de compras
function comprar() {
    let opcionIngresada = prompt("Ingrese: \n1 para comprar Remeras \n2 para comprar Pantalones  \n3 para comprar Buzos \n4 Para ir a pagar la compra\n0 Para cancelar compra y salir")

    switch (opcionIngresada) {
        case "1":
            item = 1
            cantidadRemeras = prompt("Ingrese la cantidad de Remeras a comprar")
            alert ("Usted agregó " + cantidadRemeras + " remeras a su carrito")
            break
        case "2":
            item = 2
            cantidadPantalones = prompt("Ingrese la cantidad de Pantalones a comprar")
            alert ("Usted agregó " + cantidadPantalones + " pantalones a su carrito")
            break
        case "3":
            item = 3
            cantidadBuzos = prompt("Ingrese la cantidad de Buzos a comprar")
            alert ("Usted agregó " + cantidadBuzos + " buzos a su carrito")
            break
        case "4":
            item = 4
            alert("Avanzar a la sección de pago")
            break
        case "0":
            alert("Terminó la compra")
            item = 0
            break
        default:
            alert("Ingresaste una opción NO VALIDA")
            break
    }

}

//Función pago
function pago(total) {
    let option = prompt ("Ingrese: \n1 Para pagar en efectivo (10% de descuento) \n2 Para pagar con tarjeta de crédito (10% de Recargo) \n3 Para pagar con tarjeta de débito \n0 Para cancelar compra y salir")
    let totalPago = 0
    let impote = 0
    switch (option) {
        case "1":
            totalPago = totalCompra * 0.9
            importe = totalPago.toFixed(2)
            break;
        case "2":
            totalPago = totalCompra * 1.1
            importe = totalPago.toFixed(2)
            break;
        case "3":
            totalPago = totalCompra
            importe = totalPago.toFixed(2)
            break;
        case "0":
            totalPago = -1
            break;

        default:
            alert ("Ingresó una opción NO VALIDA")
            break;
    }
    return (importe)
}




let inicio = login(usuarioBD, contraseniaBD)
if (inicio = true){ 
    let cantTotRem = 0
    let cantTotPant = 0
    let cantTotBuz = 0
    do {
        comprar()
        console.log(item)
        if (item == 1 ) {
            cantTotRem += cantidadRemeras
            totalRemeras = cantTotRem * precioRemeras
            console.log (totalRemeras)
            
        } else if (item == 2){
            cantTotPant += cantidadPantalones
            totalPantalones = cantTotPant * precioPantalones
            console.log (totalPantalones)
        }else if (item == 3) {
            cantTotBuz += cantidadBuzos
            totalBuzos = cantTotBuz * precioBuzos
            console.log (totalBuzos)
        }
        else if (item == 4){
            totalCompra = parseFloat(totalRemeras + totalPantalones + totalBuzos)
            alert ("El monto total de la compra es de $" + totalCompra )
            let compraTotal = pago(totalCompra) 
            if (compraTotal > 0) {
            alert ("El monto total a pagar es " + compraTotal + " pesos")
            alert ("Gracias por su compra")
            item = 0
            }else{
            alert ("Canceló la compra")  
            item = 0 
            }
        }

    } while (item != 0);


} 




