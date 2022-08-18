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

//                  Función para verificar el estado del pedido
function Estado(){
    estado = parseFloat(prompt("Ingrese la opción deseada:\n\n1. Añadir producto.\n2. Ir a pagar."));

    while(estado>2 || estado<1 || estado%1!=0 || isNaN(estado)){
        alert("Ingrese una opción válida!");
        estado = parseFloat(prompt("Ingrese la opción deseada:\n\n1. Añadir producto.\n2. Ir a pagar."));
    }
}

//                  Función para añadir producto
function AddProduct (){
    prod = parseFloat(prompt("Por favor indique el producto que desea:\n\n1. Sandwich: USD 3.5 c/u\n2. Ensalada: USD 4.5\n3. Hamburguesa: USD 6.5\n4. Hot Dog: USD 4.99\n5. Coca-Cola: USD 3\n6. Pepsi: USD 2.8\n7. Fanta: USD 2.5"));

    while(prod>7 || prod<1 || prod%1!=0 || isNaN(prod)){
        alert("Ingrese una opción válida!");
        prod = parseFloat(prompt("Por favor indique el producto que desea:\n\n1. Sandwich: USD 3.5 c/u\n2. Ensalada: USD 4.5\n3. Hamburguesa: USD 6.5\n4. Hot Dog: USD 4.99\n5. Coca-Cola: USD 3\n6. Pepsi: USD 2.8\n7. Fanta: USD 2.5"));
    }

    let item_actual = items.indexOf(prod);
    let producto_actual = productos[item_actual];
    let tipo_actual = tipos[item_actual]
    pay=precios[item_actual];

    cantidad=parseFloat(prompt("Ingrese la cantidad solicitada:"));

    while(cantidad%1!=0 || isNaN(cantidad)){
        alert("Ingrese una opción válida!");
        cantidad=parseFloat(prompt("Ingrese la cantidad solicitada:"));
    }

    resumen_product.push(producto_actual);
    resumen_type.push(tipo_actual);
    resumen_price.push(pay);
    resumen_qty.push(cantidad);
}

//                  Función para indicar medio de pago
function Payment(method){
    let cuotas=0;
    let valor_cuota=0;
    if(method==2){
        cuotas=parseFloat(prompt("Ingrese cantidad de cuotas:"));
        while(cuotas<1 || cuotas%1!=0 || isNaN(cuotas)){
            alert("ingrese un valor válido!");
            cuotas=parseFloat(prompt("Ingrese cantidad de cuotas:"));
        }
        valor_cuota=division(suma(subto,cuenta_tax),cuotas);
    }else{
        cuotas=1;
        valor_cuota=suma(subto,cuenta_tax);
    }
    alert("El pago se realizará en "+cuotas+" pago(s) de USD "+valor_cuota);
}

alert("Bienvenido!");
Estado();

//                  Creación de arrays de cada característica de los objetos
for(const catalogo of menu){
    items.push(catalogo.item);
    productos.push(catalogo.producto);
    tipos.push(catalogo.tipo);
    precios.push(catalogo.precio);
}

while(estado!=2){
    AddProduct();
    Estado();
}

console.log("Pedido confirmado:")

for(let i=0; i<resumen_product.length; i++){
    console.log(resumen_product[i]+" cantidad: "+resumen_qty[i]);
    cantidad_total=suma(cantidad_total,resumen_qty[i]);
    subto=suma(subto,multi(resumen_price[i],resumen_qty[i]));
    cuenta_tax=taxes(subto);
}

alert("Cantidad ítems: "+cantidad_total+"\nSubtotal: USD "+subto+"\nIVA: USD "+cuenta_tax);

med_pago=parseFloat(prompt("Ingrese el medio de pago:\n\n1. Débito / Efectivo.\n2. Crédito."));

while(med_pago%1!=0 || med_pago>2 || med_pago<1 || isNaN(med_pago)){
    alert("ingrese un valor válido!");
    med_pago=parseFloat(prompt("Ingrese el medio de pago:\n\n1. Débito / Efectivo.\n2. Crédito."));
}

Payment(med_pago);

for(i=0; i<resumen_type.length; i++){
    let contenedor = document.createElement("div");
    contenedor.innerHTML    =   `<p>Ítem ${i+1}: <strong>${resumen_product[i]}</strong></p>
                                 <p>Cantidad: ${resumen_qty[i]}</p>
                                 <p>Valor unitario: USD ${resumen_price[i]}</p>
                                 <p>Valor total: USD ${resumen_qty[i]*resumen_price[i]}</p>`;
    document.body.append(contenedor);
}

let contenedor = document.createElement("div");

contenedor.innerHTML    =   `<h3>Subtotal: USD ${subto}</h3>
                             <h4>IVA: USD ${cuenta_tax}</h4>
                             <p>Total: USD ${subto+cuenta_tax}</p>`;

document.body.append(contenedor);
console.log(resumen_product);
console.log(resumen_type);
console.log(resumen_price);
console.log(resumen_qty);