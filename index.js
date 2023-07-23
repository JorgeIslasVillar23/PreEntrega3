
let productos
const catProductos= [{
    id:1,
    nombre:'Camisa',
    costo:400,
    img:"img/camisa.jpg"
},{
    id:2,
    nombre:'Pantalón',
    costo:500,
    img:"img/pantalon.jpg"
},{
    id:3,
    nombre:'Chamarra',
    costo:600,
    img:"img/chamarra.jpg"
},{
    id:4,
    nombre:'Gorra',
    costo:100,
    img:"img/gorra.jpg"
},{
    id:5,
    nombre:'Calcetines',
    costo:20,
    img:"img/calcetines.jpg"
}]
let boton = document.getElementById('btnPrincipal')
boton.addEventListener('click',inicio)

const guardaLocal= (clave, valor) => {localStorage.setItem(clave, valor)}

if(localStorage.getItem('ListaProductosStorage') == null){
    guardaLocal('ListaProductosStorage',JSON.stringify(catProductos))
}


pintar();


function pintar(){
    productosPin = JSON.parse(localStorage.getItem('ListaProductosStorage'))
    let listaProductos = document.getElementById('listaProductos')
for (const producto of productosPin){
    let li = document.createElement('tr')
    li.classList.add('table','table-striped','table-hover')
    li.innerHTML = ` 

    <td class="table-striped table-hover">${producto.id}</td>   
    <td class="table-striped table-hover">${producto.nombre}</td>  
    <td class="table-striped table-hover">${producto.costo}</td>  
    <td class="table-striped table-hover"><img  src="${producto.img}" width="100" height="100"></td>
    `
    listaProductos.appendChild(li)
}
 //   inicio()
}


function inicio(){
    //let condicionInicial = prompt('¿Desea Realizar una compra?      SI/NO')
    Swal.fire({
             title: '¿Desea Realizar una compra?',
             //text: 'Haz cliK en algun boton',
             //icon: 'success',
             confirmButtonText: 'Si',
             showCancelButton: true,
             cancelButtonText: 'No'
         })
         .then(resultado=>{
            confirmarCompra(resultado.isConfirmed)
         })
    
}

function confirmarCompra(accion){
    if(accion){
        procesoDeCompra()
    }else if(accion === false){
        Swal.fire({
            title: '¡Gracias por visitarnos, vuelva pronto!'
        })
    }
}

async function procesoDeCompra(){
    let producto
    let cantidad 
   const { value: idProd } = await  Swal.fire({
       title: 'Alija el producto',
       input: 'text',
       inputValue: producto,
       inputAttributes: {
         autocapitalize: 'off'
       },
       confirmButtonText: 'Aceptar',
       inputValidator: (value) => {
           if (!value) {
             return 'You need to write something!'
           }
         }
   })
   if (idProd) {
     producto = idProd
   }



   const { value: cantSwal } = await Swal.fire({
       title: 'Cantidad del producto escogido',
       input: 'text',
       inputValue: cantidad,
       inputAttributes: {
         autocapitalize: 'off'
       },
       confirmButtonText: 'Aceptar',
       inputValidator: (value) => {
           if (!value) {
             return 'You need to write something!'
           }
         }
   })
   if (cantSwal) {
    cantidad = cantSwal
  }

  // let producto = idProd //Number(prompt('Alija el producto:'))
  // let cantidad = cantSwal //Number(prompt('Cantidad del producto escogido'))
    let cumplido = true;
    let subtotal= 0;
    producto=Number(producto)
    cantidad=Number(cantidad)
    switch(producto){
        case 1:
            subtotal = calcularSubTotal(catProductos[0].costo,cantidad)
        break
            case 2:
            subtotal = calcularSubTotal(catProductos[1].costo,cantidad)
        break
            case 3:
            subtotal = calcularSubTotal(catProductos[2].costo,cantidad)
        break
            case 4:
            subtotal = calcularSubTotal(catProductos[3].costo,cantidad)
        break
            case 5:
            subtotal = calcularSubTotal(catProductos[4].costo,cantidad)
        break
        default:
            cumplido = false
            break
    }
    if(cumplido){
        if(productos === undefined){
            productos = [{
                id:producto,
                cantidad:cantidad,
                costo:catProductos[producto - 1].costo,
                subTotal:subtotal
            }]
        }else{
            productos[productos.length]={
                id:producto,
                cantidad:cantidad,
                costo:catProductos[producto - 1].costo,
                subTotal:subtotal
            }
        }
        //let condicionInicial = prompt('¿Desea comprar otro Producto?      SI/NO')
        //if(condicionInicial.toUpperCase() === 'SI'){
        //    procesoDeCompra()
        //}else if(condicionInicial.toUpperCase() === 'NO'){
        //    calcularTotal()
        //}else{
        //    alert('Error al ingresar el comando')
        //}

        Swal.fire({
            title: '¿Desea comprar otro Producto?',
            confirmButtonText: 'Si',
            showCancelButton: true,
            cancelButtonText: 'No'
        })
        .then(resultado=>{
            if(resultado.isConfirmed){
                procesoDeCompra()
            }else{
                calcularTotal()
            }
        })

    }else{
        alert('No accedio un comando valido')
       // procesoDeCompra()
    }
    
}

function calcularSubTotal(costo,cantidad){
    return costo * cantidad
}

function calcularTotal(){
    let total =0;
    let mensaje = ''
    for(let a = 0; a < productos.length; a++){
        mensaje += 'Producto: ' + catProductos[productos[a].id -1].nombre + ' Cantidad: ' + productos[a].cantidad + ' Costo individual: $' + productos[a].costo + ' SubTotal: $' + productos[a].subTotal + ' \n'
        total = total + productos[a].subTotal
    }
    mensaje += '\n TOTAL: $' + total
    //alert(mensaje)
    Swal.fire(mensaje)
    productos = undefined
}

function suma(num1, num2){
    return num1 + num2;
}

function resta(num1, num2){
    return num1 - num2;
}

function multiplicar(num1, num2){
    return num1 * num2;
}

function dividir(num1, num2){
    return num1 / num2;
}