// Leer productos desde localStorage
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
            console.log('Service Worker registrado con éxito:', registration);
        })
        .catch(error => {
            console.error('Error al registrar el Service Worker:', error);
        });
}





function getProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
}

// Guardar productos en localStorage
function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// Añadir un nuevo producto
function addProduct(product) {
    const products = getProducts();
    products.push(product);
    saveProducts(products);
}

// Generar la tabla de productos dinámicamente
function renderProductTable(tableElement) {
    const products = getProducts();
    tableElement.innerHTML = ''; // Limpiar la tabla
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>${product.expiry}</td>
            <td><img src="${product.image}" alt="Imagen de ${product.name}" class="img-thumbnail" style="max-width: 100px;"></td>
        `;
        tableElement.appendChild(row);
    });
}

// Comprobar si un producto está cerca de la fecha de caducidad
function checkExpiryAlerts() {
    const products = getProducts();
    const today = new Date();

    products.forEach(product => {
        const expiryDate = new Date(product.expiry);
        const timeDifference = expiryDate - today;
        const daysToExpire = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Días restantes

        // Mostrar alerta si quedan menos de 5 días
        if (daysToExpire > 0 && daysToExpire <= 5) {
            alert(`⚠️ El producto "${product.name}" está cerca de su fecha de caducidad (${product.expiry}). Quedan ${daysToExpire} días.`);
        }
    });
}

// Función para eliminar un producto
function deleteProduct(index) {
    // Obtener los productos del almacenamiento local
    const products = JSON.parse(localStorage.getItem('products')) || [];
    
    // Eliminar el producto correspondiente
    products.splice(index, 1); // Eliminar el producto en el índice indicado
    
    // Actualizar el almacenamiento local con la lista de productos actualizada
    localStorage.setItem('products', JSON.stringify(products));
    
    // Volver a renderizar la tabla de productos
    renderProductTable();
}

// Función para renderizar la tabla de productos
function renderProductTable() {
    const productTable = document.getElementById('productTable');
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Limpiar la tabla antes de renderizar los productos
    productTable.innerHTML = '';

    // Renderizar cada producto
    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>${product.expiry}</td>
            <td><img src="${product.image}" class="img-thumbnail" alt="${product.name}"></td>
            <td><button class="btn btn-danger" onclick="deleteProduct(${index})">Eliminar</button></td>
        `;
        productTable.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderProductTable();  // Renderizar la tabla de productos
});



