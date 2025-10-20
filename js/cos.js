// Sistem de gestionare a coșului de cumpărături pentru VanzareMasini

// Clasa principală pentru gestionarea coșului
class ShoppingCart {
  constructor() {
    this.items = [];
    this.loadFromStorage();
    this.initializeEventListeners();
    this.render();
  }

  // Încărcarea coșului din localStorage
  loadFromStorage() {
    const savedCart = localStorage.getItem('vanzaremasini_cart');
    if (savedCart) {
      this.items = JSON.parse(savedCart);
    }
  }

  // Salvarea coșului în localStorage
  saveToStorage() {
    localStorage.setItem('vanzaremasini_cart', JSON.stringify(this.items));
  }

  // Adăugarea unui produs în coș
  addItem(carData) {
    const existingItem = this.items.find(item => item.id === carData.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
      this.showNotification('Produsul a fost actualizat în coș!', 'success');
    } else {
      this.items.push({
        ...carData,
        quantity: 1,
        addedAt: new Date().toISOString()
      });
      this.showNotification('Produsul a fost adăugat în coș!', 'success');
    }
    
    this.saveToStorage();
    this.render();
  }

  // Eliminarea unui produs din coș
  removeItem(itemId) {
    this.items = this.items.filter(item => item.id !== itemId);
    this.saveToStorage();
    this.render();
    this.showNotification('Produsul a fost eliminat din coș!', 'info');
  }

  // Actualizarea cantității unui produs
  updateQuantity(itemId, newQuantity) {
    if (newQuantity <= 0) {
      this.removeItem(itemId);
      return;
    }

    const item = this.items.find(item => item.id === itemId);
    if (item) {
      item.quantity = newQuantity;
      this.saveToStorage();
      this.render();
    }
  }

  // Golirea completă a coșului
  clearCart() {
    this.items = [];
    this.saveToStorage();
    this.render();
    this.showNotification('Coșul a fost golit!', 'info');
  }

  // Calcularea subtotalului
  calculateSubtotal() {
    return this.items.reduce((total, item) => {
      const price = parseFloat(item.price.replace('€', '').replace(',', ''));
      return total + (price * item.quantity);
    }, 0);
  }

  // Calcularea taxei de procesare (5% din subtotal)
  calculateProcessingFee() {
    return this.calculateSubtotal() * 0.05;
  }

  // Calcularea totalului final
  calculateTotal() {
    return this.calculateSubtotal() + this.calculateProcessingFee();
  }

  // Afișarea notificărilor
  showNotification(message, type = 'info') {
    // Crearea elementului de notificare
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <span>${message}</span>
      <button onclick="this.parentElement.remove()">&times;</button>
    `;

    // Adăugarea în pagină
    document.body.appendChild(notification);

    // Auto-eliminarea după 3 secunde
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 3000);
  }

  // Inițializarea event listeners
  initializeEventListeners() {
    // Event listener pentru butonul de checkout
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => this.handleCheckout());
    }

    // Event listener pentru modalul de confirmare
    const confirmRemoveBtn = document.getElementById('confirmRemoveBtn');
    if (confirmRemoveBtn) {
      confirmRemoveBtn.addEventListener('click', () => this.confirmRemove());
    }
  }

  // Gestionarea checkout-ului
  handleCheckout() {
    if (this.items.length === 0) {
      this.showNotification('Coșul este gol!', 'error');
      return;
    }

    // Simularea procesului de checkout
    this.showLoadingState();
    
    setTimeout(() => {
      this.processOrder();
    }, 2000);
  }

  // Afișarea stării de loading
  showLoadingState() {
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
      checkoutBtn.disabled = true;
      checkoutBtn.innerHTML = '⏳ Se procesează...';
    }
  }

  // Procesarea comenzii
  processOrder() {
    // Simularea unei comenzi reușite
    const orderNumber = 'ORD-' + Date.now().toString().slice(-6);
    
    this.showOrderConfirmation(orderNumber);
    this.clearCart();
  }

  // Afișarea confirmării comenzii
  showOrderConfirmation(orderNumber) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-body">
          <div class="success-icon">✅</div>
          <h3>Comanda a fost plasată cu succes!</h3>
          <p>Numărul comenzii: <strong>${orderNumber}</strong></p>
          <p>Veți primi un email de confirmare în curând.</p>
          <p>Vă mulțumim pentru încrederea acordată!</p>
          <div class="modal-actions">
            <button class="btn btn-primary" onclick="this.closest('.modal').remove()">
              Înțeleg
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Eliminarea automată după 10 secunde
    setTimeout(() => {
      if (modal.parentElement) {
        modal.remove();
      }
    }, 10000);
  }

  // Confirmarea eliminării unui produs
  confirmRemove() {
    if (this.itemToRemove) {
      this.removeItem(this.itemToRemove);
      this.closeRemoveModal();
    }
  }

  // Deschiderea modalului de confirmare pentru eliminare
  openRemoveModal(itemId) {
    this.itemToRemove = itemId;
    const modal = document.getElementById('removeModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  // Închiderea modalului de confirmare
  closeRemoveModal() {
    this.itemToRemove = null;
    const modal = document.getElementById('removeModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  // Renderizarea coșului
  render() {
    this.renderCartItems();
    this.renderSummary();
    this.renderRecommendations();
  }

  // Renderizarea listei de produse din coș
  renderCartItems() {
    const emptyCart = document.getElementById('emptyCart');
    const cartItemsList = document.getElementById('cartItemsList');

    if (this.items.length === 0) {
      emptyCart.style.display = 'block';
      cartItemsList.style.display = 'none';
      return;
    }

    emptyCart.style.display = 'none';
    cartItemsList.style.display = 'block';

    cartItemsList.innerHTML = this.items.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.title}" class="cart-item-image">
        <div class="cart-item-info">
          <h4 class="cart-item-title">${item.title}</h4>
          <p class="cart-item-specs">${item.year} • ${item.km} • ${item.transmission}</p>
          <div class="cart-item-specs">
            ${Object.entries(item.specs).slice(0, 2).map(([key, value]) => 
              `<span>${key}: ${value}</span>`
            ).join(' • ')}
          </div>
        </div>
        <div class="cart-item-price">${item.price}</div>
        <div class="cart-item-actions">
          <button class="btn btn-small btn-secondary" onclick="cart.openRemoveModal('${item.id}')">
            🗑️ Elimină
          </button>
        </div>
      </div>
    `).join('');
  }

  // Renderizarea rezumatului comenzii
  renderSummary() {
    const itemCount = document.getElementById('itemCount');
    const subtotal = document.getElementById('subtotal');
    const processingFee = document.getElementById('processingFee');
    const total = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkoutBtn');

    const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotalValue = this.calculateSubtotal();
    const feeValue = this.calculateProcessingFee();
    const totalValue = this.calculateTotal();

    if (itemCount) itemCount.textContent = totalItems;
    if (subtotal) subtotal.textContent = `€${subtotalValue.toFixed(2)}`;
    if (processingFee) processingFee.textContent = `€${feeValue.toFixed(2)}`;
    if (total) total.textContent = `€${totalValue.toFixed(2)}`;
    
    if (checkoutBtn) {
      checkoutBtn.disabled = this.items.length === 0;
      checkoutBtn.textContent = this.items.length === 0 ? 'Coșul este gol' : 'Finalizează comanda';
    }
  }

  // Renderizarea recomandărilor
  renderRecommendations() {
    const recommendationsList = document.getElementById('recommendationsList');
    if (!recommendationsList) return;

    // Produse recomandate bazate pe produsele din coș
    const recommendations = this.generateRecommendations();
    
    if (recommendations.length === 0) {
      recommendationsList.innerHTML = '<p style="text-align: center; color: var(--muted);">Nu avem recomandări în acest moment.</p>';
      return;
    }

    recommendationsList.innerHTML = recommendations.map(rec => `
      <div class="recommendation-item" onclick="cart.addItem(${JSON.stringify(rec).replace(/"/g, '&quot;')})">
        <h4>${rec.title}</h4>
        <p>${rec.year} • ${rec.price}</p>
        <p>${rec.description.substring(0, 100)}...</p>
      </div>
    `).join('');
  }

  // Generarea recomandărilor
  generateRecommendations() {
    // Logica simplă pentru recomandări - produse similare
    const allCars = [
      {
        id: 'recommendation-1',
        title: 'BMW X3 • xDrive30d',
        price: '€32.500',
        year: '2021',
        km: '38.000 km',
        transmission: 'Automată',
        specs: { 'Putere': '265 CP', 'Motor': '3.0 Diesel' },
        description: 'BMW X3 SUV premium cu tracțiune integrală și dotări de lux.',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA4MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjMGIwZTFiIi8+Cjx0ZXh0IHg9IjQwIiB5PSIzNSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjZTZlOWYyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5CTVcgWDM8L3RleHQ+Cjwvc3ZnPgo='
      },
      {
        id: 'recommendation-2',
        title: 'Audi Q5 • 45 TFSI',
        price: '€28.900',
        year: '2020',
        km: '55.000 km',
        transmission: 'Automată',
        specs: { 'Putere': '245 CP', 'Motor': '2.0 Benzină' },
        description: 'Audi Q5 SUV cu tehnologie avansată și confort superior.',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA4MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjMGIwZTFiIi8+Cjx0ZXh0IHg9IjQwIiB5PSIzNSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjZTZlOWYyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5BdWRpIFE1PC90ZXh0Pgo8L3N2Zz4K'
      }
    ];

    return allCars.filter(car => 
      !this.items.some(item => item.id === car.id)
    ).slice(0, 3);
  }
}

// Funcții globale pentru compatibilitate cu HTML
function closeRemoveModal() {
  if (window.cart) {
    window.cart.closeRemoveModal();
  }
}

// Funcția pentru adăugarea unui produs în coș (apelată din alte pagini)
function addToCart(carData) {
  if (typeof carData === 'string') {
    carData = JSON.parse(carData);
  }
  
  if (window.cart) {
    window.cart.addItem(carData);
  }
}

// Inițializarea aplicației când se încarcă pagina
document.addEventListener('DOMContentLoaded', function() {
  // Crearea instanței globale a coșului
  window.cart = new ShoppingCart();
  
  console.log('Pagina de coș a fost inițializată cu succes!');
});

// Gestionarea evenimentelor de închidere modal
window.onclick = function(event) {
  const modal = document.getElementById('removeModal');
  if (event.target === modal) {
    closeRemoveModal();
  }
}
