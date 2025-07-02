// URL base de la API de productos
const BASE_URL = 'http://localhost:5000/api/products';

// Referencias a los elementos del DOM
const list = document.getElementById('product-list');
const form = document.getElementById('product-form');

// Obtiene y muestra la lista de productos desde la API (GET resuelto)
async function fetchProducts() {
  try {
    const res = await fetch(BASE_URL);
    const products = await res.json();
    list.innerHTML = '';
    products.forEach(prod => {
      const li = document.createElement('li');
      li.textContent = `${prod.name} - $${prod.price}`;

      // Llama a showDetails al hacer clic en el nombre del producto
      li.onclick = () => showDetails(prod.id);

      // Botón para eliminar
      const btn = document.createElement('button');
      btn.textContent = 'Eliminar';
      btn.onclick = async e => {
        e.stopPropagation(); // evita que se dispare el click del li
        await deleteProduct(prod.id);
        await fetchProducts();
      };

      li.appendChild(btn);
      list.appendChild(li);
    });
  } catch (err) {
    alert('Error al obtener productos');
    console.error(err);
  }
}

// EJERCICIO 1: Crear producto usando fetch POST
async function createProduct(name, price, description) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, price, description })
    });

    if (!res.ok) throw new Error('Error al crear producto');
  } catch (err) {
    alert('Error al crear producto');
    console.error(err);
  }
}

// EJERCICIO 2: Eliminar producto usando fetch DELETE
async function deleteProduct(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE'
    });

    if (!res.ok) throw new Error('Error al eliminar producto');
  } catch (err) {
    alert('Error al eliminar producto');
    console.error(err);
  }
}

// EJERCICIO 3: Mostrar detalles usando fetch GET /products/:id
async function showDetails(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error('No se pudo obtener el producto');

    const product = await res.json();
    alert(`Nombre: ${product.name}\nPrecio: $${product.price}\nDescripción: ${product.description}`);
  } catch (err) {
    alert('Error al obtener detalles del producto');
    console.error(err);
  }
}

// Maneja el submit del formulario para crear un producto
form.onsubmit = async e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const description = document.getElementById('description').value;

  await createProduct(name, price, description);
  await fetchProducts();
  form.reset();
};

// Render inicial
fetchProducts();
