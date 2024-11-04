class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

class Carrito {
    constructor() {
        this.productos = [];
    }

    agregarProducto(producto, cantidad) {
        this.productos.push({ producto, cantidad });
    }

    calculartotal() {
        let total = 0;
        this.productos.forEach(item => {
            total += item.producto.precio * item.cantidad;
        });
        return total;
    }

    mostrarDetalleCompra() {
        alert('Detalle de la Compra: ');
        this.productos.forEach((item, index) => {
            alert(
                `${index + 1}. ${item.producto.nombre} x ${item.cantidad} - $${(item.producto.precio * item.cantidad).toFixed(2)}`
            );
        });
    }
}

const productosDisponibles = [
    new Producto('Leche', 1000),
    new Producto('Pan de Molde', 2000),
    new Producto('Queso', 1200),
    new Producto('Mermelada', 890),
    new Producto('Azucar', 1300),
];

const carritoUsuario = new Carrito();

function mostrarProductos() {
    const productosDiv = document.getElementById('productos');
    productosDiv.innerHTML = ''; // Clear previous products
    productosDisponibles.forEach((producto, index) => {
        const productoDiv = document.createElement('div');
        productoDiv.className = 'producto';
        productoDiv.innerHTML = `
            <span>${producto.nombre} - $${producto.precio}</span>
            <input type="number" id="cantidad-${index}" min="1" placeholder="Cantidad" />
            <button onclick="agregarAlCarrito(${index})">Agregar al Carrito</button>
        `;
        productosDiv.appendChild(productoDiv);
    });
}

function agregarAlCarrito(indexProducto) {
    const cantidadInput = document.getElementById(`cantidad-${indexProducto}`);
    const cantidad = parseInt(cantidadInput.value);

    if (isNaN(cantidad) || cantidad <= 0) {
        alert('Por favor ingrese una cantidad válida');
        return;
    }

    const productoSeleccionado = productosDisponibles[indexProducto];
    carritoUsuario.agregarProducto(productoSeleccionado, cantidad);
    alert(`${cantidad} ${productoSeleccionado.nombre} agregado al carrito`);
    cantidadInput.value = ''; // Clear input field
}

document.getElementById('finalizarCompra').addEventListener('click', function() {
    carritoUsuario.mostrarDetalleCompra();
    const total = carritoUsuario.calculartotal();
    alert(`Compra finalizada Total: $ ${total}`);
});

// Initial call to display products
mostrarProductos();