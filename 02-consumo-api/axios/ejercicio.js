// URL base de la API de productos
const BASE_URL = 'http://localhost:5000/api/products';

// Referencias a los elementos del DOM
const list = document.getElementById('product-list');
const form = document.getElementById('product-form');

// Obtiene y muestra la lista de productos desde la API usando axios (GET resuelto)
async function fetchProducts() {
  try {
    const res = await axios.get(BASE_URL);
    const products = res.data;
    list.innerHTML = '';
    products.forEach(prod => {
      const li = document.createElement('li');
      li.textContent = `${prod.name} - $${prod.price}`;
      // Llama a showDetails al hacer clic en el nombre del producto
      li.onclick = () => showDetails(prod.id);
      
      const btn = document.createElement('button');
      btn.textContent = 'Eliminar';
      btn.onclick = async e => {
        e.stopPropagation();
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

// EJERCICIO: Completa la función para crear un producto usando axios POST
async function createProduct(name, price, description) {
  try {
    await axios.post(BASE_URL, {
      name,
      price,
      description
    });
  } catch (err) {
    alert('Error al crear producto');
    console.error(err);
  }
}

// EJERCICIO: Completa la función para eliminar un producto usando axios DELETE
async function deleteProduct(id) {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (err) {
    alert('Error al eliminar producto');
    console.error(err);
  }
}

// EJERCICIO: Completa la función para mostrar detalles usando axios GET /products/:id
async function showDetails(id) {
  try {
    const res = await axios.get(`${BASE_URL}/${id}`);
    const product = res.data;
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
