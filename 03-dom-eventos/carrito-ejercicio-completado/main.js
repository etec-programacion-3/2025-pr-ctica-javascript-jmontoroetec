// Referencias a los elementos del DOM
const productList = document.getElementById('product-list');
const cartList = document.getElementById('cart-list');
const emptyCartBtn = document.getElementById('empty-cart');
const cartSummary = document.getElementById('cart-summary');

// Estado del carrito (array de productos)
let cart = [];

// Renderiza el carrito en el DOM y muestra el resumen
const renderCart = () => {
  cartList.innerHTML = '';
  cart.forEach((item, idx) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price}`;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Eliminar';
    removeBtn.classList.add('remove');
    removeBtn.dataset.index = idx;
    li.appendChild(removeBtn);

    cartList.appendChild(li);
  });

  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);
  cartSummary.textContent = `Total: $${total} | Productos: ${cart.length}`;
};

productList.addEventListener('click', e => {
  if (e.target.classList.contains('add')) {
    const li = e.target.closest('li');
    const { id, name, price } = li.dataset;
    cart.push({ id, name, price });
    renderCart();
  }
});

cartList.addEventListener('click', e => {
  if (e.target.classList.contains('remove')) {
    const index = e.target.dataset.index;
    cart.splice(index, 1);
    renderCart();
  }
});

emptyCartBtn.addEventListener('click', () => {
  cart = [];
  renderCart();
});

// Render inicial del carrito
renderCart();
