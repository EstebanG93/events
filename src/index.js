//              Variables de proceso
let prod=0;
let pay = 0;
let estado=0;
let subto=0;
let cuenta_tax=0;
let cantidad = 0;
let cantidad_total=0;
let med_pago = 0;
const items = [];
const productos =   [];
const tipos = [];
const precios = [];
const resumen_product=[];
const resumen_type = []
const resumen_price = [];
const resumen_qty = [];

//                  Funciones flecha con operaciones básicas
const suma = (a,b) => a+b;
const resta = (a,b) => a-b;
const multi = (a,b) => a*b;
const division = (a,b) => a/b;
const taxes = a => a*0.21;

//                  Objeto con todo el protafolio de productos
const menu = [  {item: 1, producto: "Sandwich", tipo:"comida", precio: 3.5},
                {item: 2, producto: "Ensalada", tipo:"comida", precio: 4.5},
                {item: 3, producto: "Hamburguesa", tipo: "comida", precio: 6.5},
                {item: 4, producto: "Hot Dog", tipo:"comida", precio:4.99},
                {item: 5, producto: "Coca-Cola", tipo: "bebida", precio: 3},
                {item: 6, producto: "Pepsi", tipo: "bebida", precio: 2.8},
                {item: 7, producto: "Fanta", tipo: "bebida", precio: 2.5}];


//                  Función para añadir producto
function AddProduct (item, qty){
    
    let unitario = document.querySelector("#unit");
    let fullprice = document.querySelector("#total");

    if(item <= 0){
        alert("Seleccione un producto");
        unitario.innerHTML = `Valor unitario:`
        fullprice.innerHTML = `Valor total:`
    }else{
        let item_actual = items.indexOf(item);
        let producto_actual = productos[item_actual];
        let tipo_actual = tipos[item_actual]
        pay=precios[item_actual];

        resumen_product.push(producto_actual);
        resumen_type.push(tipo_actual);
        resumen_price.push(pay);
        resumen_qty.push(qty);        

        unitario.innerHTML = `Valor unitario: <strong>USD ${pay}</strong>`
        fullprice.innerHTML = `Valor total: <strong>USD ${pay*qty}</strong>`
    }
}

function AdquirirDatos(){
    prod = parseInt(document.querySelector("#item").value);
    cantidad = parseInt(document.querySelector("#Qty").value);
    AddProduct(prod, cantidad);
}

alert("Bienvenido!");

//                  Creación de arrays de cada característica de los objetos
for(const catalogo of menu){
    items.push(catalogo.item);
    productos.push(catalogo.producto);
    tipos.push(catalogo.tipo);
    precios.push(catalogo.precio);
}

let botonAdd = document.getElementById("Add");
let botonEnd = document.querySelector("#End");

botonAdd.onclick = () => {
    AdquirirDatos();
}

botonEnd.onclick = () => {
    let contenedor = document.createElement("div");

    contenedor.innerHTML    =   `<h2>Factura de venta</h2>`;

    document.body.append(contenedor);

    for(i=0; i<resumen_type.length; i++){
        let contenedor = document.createElement("div");
        contenedor.innerHTML    =   `<p>Ítem ${i+1}: <strong>${resumen_product[i]}</strong></p>
                                     <p>Cantidad: ${resumen_qty[i]}</p>
                                     <p>Valor unitario: USD ${resumen_price[i]}</p>
                                     <p>Valor total: USD ${resumen_qty[i]*resumen_price[i]}</p>`;
        document.body.append(contenedor);
    }

    for(let i=0; i<resumen_product.length; i++){
        console.log(resumen_product[i]+" cantidad: "+resumen_qty[i]);
        cantidad_total=suma(cantidad_total,resumen_qty[i]);
        subto=suma(subto,multi(resumen_price[i],resumen_qty[i]));
        cuenta_tax=taxes(subto);
    }

    contenedor.innerHTML    =   `<h3>Subtotal: USD ${subto}</h3>
                                 <h4>IVA: USD ${cuenta_tax}</h4>
                                 <p>Total: USD ${subto+cuenta_tax}</p>`;
    
    document.body.append(contenedor);
}