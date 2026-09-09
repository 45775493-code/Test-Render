// ========================================
// LISTA DE PRODUCTOS
// ========================================

const productos = [

    {
        id: 1,
        nombre: "iPhone 15",
        precio: 2999,
        imagen: "img/iphone15.jpg"
    },

    {
        id: 2,
        nombre: "Samsung Galaxy S24",
        precio: 2799,
        imagen: "img/samsung-s24.jpg"
    },

    {
        id: 3,
        nombre: "Xiaomi 14",
        precio: 2199,
        imagen: "img/xiaomi14.jpg"
    },

    {
        id: 4,
        nombre: "Motorola G84",
        precio: 999,
        imagen: "img/motorola-g84.jpg"
    }

];


// ========================================
// CARRITO
// ========================================

let carrito = [];


// ========================================
// MOSTRAR PRODUCTOS
// ========================================

function mostrarProductos(lista = productos) {

    const contenedor =
        document.getElementById("lista-productos");

    contenedor.innerHTML = "";

    if (lista.length === 0) {

        contenedor.innerHTML =
            "<p>No se encontraron productos.</p>";

        return;
    }

    lista.forEach(producto => {

        const tarjeta =
            document.createElement("div");

        tarjeta.classList.add("producto");

        tarjeta.innerHTML = `

            <img
                src="${producto.imagen}"
                alt="${producto.nombre}"
            >

            <h3>${producto.nombre}</h3>

            <p class="precio">
                S/ ${producto.precio.toFixed(2)}
            </p>

            <button
                class="btn-agregar"
                onclick="agregarCarrito(${producto.id})"
            >
                Agregar al carrito
            </button>

        `;

        contenedor.appendChild(tarjeta);

    });
}


// ========================================
// AGREGAR AL CARRITO
// ========================================

function agregarCarrito(id) {

    const producto =
        productos.find(p => p.id === id);

    carrito.push(producto);

    actualizarCarrito();

    alert(
        `${producto.nombre} fue agregado al carrito`
    );
}


// ========================================
// MOSTRAR CARRITO
// ========================================

function mostrarCarrito() {

    document.getElementById("modal-carrito")
        .style.display = "block";

    actualizarCarrito();
}


// ========================================
// CERRAR CARRITO
// ========================================

function cerrarCarrito() {

    document.getElementById("modal-carrito")
        .style.display = "none";
}


// ========================================
// ACTUALIZAR CARRITO
// ========================================

function actualizarCarrito() {

    const contenedor =
        document.getElementById("productos-carrito");

    const contador =
        document.getElementById("contador-carrito");

    const totalElemento =
        document.getElementById("total");


    // Contador

    contador.textContent = carrito.length;


    // Limpiar

    contenedor.innerHTML = "";


    // Carrito vacío

    if (carrito.length === 0) {

        contenedor.innerHTML =
            "<p>El carrito está vacío.</p>";

        totalElemento.textContent =
            "S/ 0.00";

        return;
    }


    // Mostrar productos

    carrito.forEach((producto, indice) => {

        const item =
            document.createElement("div");

        item.classList.add("item-carrito");

        item.innerHTML = `

            <div>

                <strong>
                    ${producto.nombre}
                </strong>

                <br>

                S/ ${producto.precio.toFixed(2)}

            </div>

            <button
                class="btn-eliminar"
                onclick="eliminarProducto(${indice})"
            >
                Eliminar
            </button>

        `;

        contenedor.appendChild(item);

    });


    // Calcular total

    const total = carrito.reduce(
        (suma, producto) =>
            suma + producto.precio,
        0
    );


    totalElemento.textContent =
        `S/ ${total.toFixed(2)}`;
}


// ========================================
// ELIMINAR PRODUCTO
// ========================================

function eliminarProducto(indice) {

    carrito.splice(indice, 1);

    actualizarCarrito();
}


// ========================================
// BUSCADOR
// ========================================

function buscarProducto() {

    const texto =
        document.getElementById("buscar")
        .value
        .toLowerCase();

    const resultados =
        productos.filter(producto =>
            producto.nombre
                .toLowerCase()
                .includes(texto)
        );

    mostrarProductos(resultados);
}


// ========================================
// REALIZAR COMPRA
// ========================================

function realizarCompra() {

    if (carrito.length === 0) {

        alert("Tu carrito está vacío.");

        return;
    }

    alert(
        "¡Compra realizada correctamente!"
    );

    carrito = [];

    actualizarCarrito();

    cerrarCarrito();
}


// ========================================
// FORMULARIO CONTACTO
// ========================================

document
    .getElementById("form-contacto")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const nombre =
            document.getElementById("nombre").value;

        alert(
            `Gracias ${nombre}, tu mensaje fue enviado.`
        );

        this.reset();

    });


// ========================================
// INICIAR PÁGINA
// ========================================

mostrarProductos();