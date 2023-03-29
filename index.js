const inputName = document.getElementById('name')
const inputLastname = document.getElementById('lastname')
const formulario = document.getElementById('formulario')
const errorMessage = document.getElementById('errorMessage')
const divProductos = document.getElementById('divProductos')
const welcomeMessage = document.getElementById('welcomeMessage')
const parrafoTotal = document.getElementById('parrafoTotal')

formulario.onsubmit = (e) => {
    e.preventDefault()
    const infoUsuario = {
      inputName: inputName.value,
      inputLastname: inputLastname.value
    }
    console.log(infoUsuario)
    if(!inputName.value && !inputLastname.value){
        errorMessage.innerText = 'Ingresa tus datos'
        errorMessage.style.color = "red";
    } else if(!inputName.value){
        errorMessage.innerText = 'Ingresa tu nombre'
        errorMessage.style.color = "red";
    } else if(!inputLastname.value){
        errorMessage.innerText = 'Ingresa tu apellido'
        errorMessage.style.color = "red";
    } else {
        console.log(infoUsuario)
        errorMessage.remove()
        localStorage.setItem('infoUsuario', JSON.stringify(infoUsuario))
        formulario.remove()
        welcomeMessage.innerText = `Bienvenido ${inputName.value} ${inputLastname.value}, agrega productos a tu carrito`
    }

}

//clase banco
class Producto {
    constructor(id, nombre, precio, stock){
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.stock = stock
    }
}

// //agregar bancos al array/arreglo
const productos = [
    new Producto(1, 'Santander', 100, 10),
    new Producto(2, 'Bbva', 200, 20),
    new Producto(3, 'Scotiabank',300, 30),
    new Producto(4, 'HSBC', 400, 40),
    new Producto(5, 'Banco del Bienestar', 500, 50)
]

//recorremos el array
productos.forEach((prod) => {
    divProductos.innerHTML += `<div class="cardProducto">
        <div class="card-body">
            <h5 class="card-title">${prod.nombre}</h5>
            <p class="card-text">${prod.precio}</p>
            <button class="btn btn-primary" id=${prod.id}>AGREGAR</button>
        </div>
    </div>
    `
})

//carrito para guardar producto
const carrito = []

//generar funcion guardar en cada boton agregar
// const botonesAgregar = document.getElementsByClassName('btn btn-primary')
const botonesAgregar = document.querySelectorAll('.btn-primary')
botonesAgregar.forEach((boton) => {
    boton.onclick = () => {
        const producto = productos.find(p => p.id ===parseInt(boton.id))

        const prodCarrito = {
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        }

        const indexProd = carrito.findIndex(prod => prod.id === prodCarrito.id)
        if(indexProd === -1){
            carrito.push(prodCarrito)
        } else {
            carrito[indexProd].cantidad++
        }
        console.log(carrito)
    }
})

//boton finalizar
const botonFinalizar = document.querySelector('#finalizar')
const thead = document.querySelector('#thead')
const tbody = document.querySelector('#tbody')
console.log(botonFinalizar)
botonFinalizar.onclick = () => {
divProductos.remove()
botonFinalizar.remove()
welcomeMessage.innerText = `Abajo verás tu total, ${inputName.value}`
thead.innerHTML += `
    <tr>
        <th scrope="col">Productos</th>
        <th scrope="col">Cantidad</th>
        <th scrope="col">Total</th>
    </tr>
`
let totalCompra = 0

carrito.forEach(prod => {
    totalCompra += prod.cantidad * prod.precio
    tbody.innerHTML += `
    <tr>
        <td>${prod.nombre}</td>
        <td>${prod.cantidad}</td>
        <td>${prod.cantidad * prod.precio}</td>
    </tr>
    `
})
if(totalCompra > 0){
    parrafoTotal.innerText = `el total de tu compra es: ${totalCompra}`
    parrafoTotal.style.color = 'green'
} else {
    parrafoTotal.innerText = `el total de tu compra es: ${totalCompra}, agrega más productos`
    parrafoTotal.style.color = 'red'
}
}

// //funcionar calcular cuota dependiendo de monto, intereses, meses
// function calcularCuota(monto, interes, meses){
//     const cuota = (monto + (monto * interes))/100/meses
//     return cuota
// }


// document.querySelector('.result').innerHTML = 'Tu banco elegido es: ' + banco.nombre
// document.querySelector('.creditResult').innerHTML = `Las opciones que te ofrece ${banco.nombre} son: <br><br>1) $${cuota12.toFixed(2)} pesos a 12 meses <br> 2) $${cuota24.toFixed(2)} pesos a 24 meses <br> 3) $${cuota36.toFixed(2)} pesos a 36 meses`
