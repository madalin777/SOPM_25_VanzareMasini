// Datele detaliate pentru fiecare mașină din catalog
const carDetails = {
  bmw: {
    title: "BMW Seria 3 • 320d xDrive",
    price: "€25.900",
    year: "2020",
    km: "45.000 km",
    transmission: "Automată",
    specs: {
      "Putere": "190 CP",
      "Motor": "2.0 Diesel",
      "Tracțiune": "4x4",
      "Norma Euro": "EURO 6",
      "Combustibil": "Diesel",
      "Culoare": "Gri metalizat"
    },
    description: "BMW Seria 3 320d xDrive în stare excelentă, cu tracțiune integrală și cutie automată. Mașina este complet verificată tehnic și vine cu garanție."
  },
  audi: {
    title: "Audi A4 • 35 TFSI",
    price: "€22.400",
    year: "2019",
    km: "62.000 km",
    transmission: "Manuală",
    specs: {
      "Putere": "150 CP",
      "Motor": "1.5 Benzină",
      "Tracțiune": "FWD",
      "Norma Euro": "EURO 6",
      "Combustibil": "Benzină",
      "Culoare": "Albastru metalizat"
    },
    description: "Audi A4 35 TFSI cu motor pe benzină, economic și fiabil. Mașina are istoric complet și toate verificările tehnice la zi."
  },
  tesla: {
    title: "Tesla Model 3 • RWD",
    price: "€34.700",
    year: "2021",
    km: "28.000 km",
    transmission: "Automată",
    specs: {
      "Autonomie": "430 km",
      "Tip": "Electric",
      "Accelerare": "0–100 km/h: 6,1s",
      "Sistem": "Pilot automat",
      "Încărcare": "Supercharger inclus",
      "Culoare": "Negru"
    },
    description: "Tesla Model 3 electrică cu autonomie excelentă și tehnologie avansată. Include pilot automat și acces la rețeaua Supercharger."
  },
  mercedes: {
    title: "Mercedes-Benz GLC 220d",
    price: "€29.900",
    year: "2018",
    km: "78.000 km",
    transmission: "Automată",
    specs: {
      "Putere": "170 CP",
      "Motor": "2.1 Diesel",
      "Tracțiune": "AWD",
      "Norma Euro": "EURO 6",
      "Combustibil": "Diesel",
      "Culoare": "Negru metalizat"
    },
    description: "Mercedes-Benz GLC 220d SUV premium cu tracțiune integrală. Mașina este în stare foarte bună și are toate dotările premium."
  },
  volkswagen: {
    title: "Volkswagen Golf VII • 1.6 TDI",
    price: "€12.800",
    year: "2017",
    km: "95.000 km",
    transmission: "Manuală",
    specs: {
      "Putere": "115 CP",
      "Motor": "1.6 Diesel",
      "Tracțiune": "FWD",
      "Norma Euro": "EURO 6",
      "Combustibil": "Diesel",
      "Culoare": "Galben"
    },
    description: "Volkswagen Golf VII cu motor diesel economic și fiabil. Mașina este perfectă pentru oraș și drumuri lungi, cu consum redus."
  },
  dacia: {
    title: "Dacia Duster • 1.3 TCe 4x4",
    price: "€18.900",
    year: "2022",
    km: "17.500 km",
    transmission: "Manuală",
    specs: {
      "Putere": "150 CP",
      "Motor": "1.3 Benzină",
      "Tracțiune": "4x4",
      "Norma Euro": "EURO 6",
      "Combustibil": "Benzină",
      "Culoare": "Negru"
    },
    description: "Dacia Duster 1.3 TCe 4x4 aproape nouă cu doar 17.500 km. Mașina este perfectă pentru aventuri off-road și familie."
  }
};

// Funcția pentru afișarea detaliilor mașinii în modal
function showDetails(carId) {
  const car = carDetails[carId];
  if (!car) {
    console.error('Mașina cu ID-ul', carId, 'nu a fost găsită');
    return;
  }

  const modal = document.getElementById('detailsModal');
  const modalBody = document.getElementById('modalBody');

  // Construirea conținutului modal-ului cu informațiile mașinii
  modalBody.innerHTML = `
    <h2>${car.title}</h2>
    <div class="modal-price">${car.price}</div>
    <div class="modal-info">
      <p><strong>An:</strong> ${car.year}</p>
      <p><strong>Kilometraj:</strong> ${car.km}</p>
      <p><strong>Cutie de viteze:</strong> ${car.transmission}</p>
    </div>
    <div class="modal-specs">
      <h3>Specificații tehnice:</h3>
      <ul>
        ${Object.entries(car.specs).map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`).join('')}
      </ul>
    </div>
    <div class="modal-description">
      <h3>Descriere:</h3>
      <p>${car.description}</p>
    </div>
  `;

  // Afișarea modal-ului
  modal.style.display = 'block';
  
  // Prevenirea scroll-ului pe body când modal-ul este deschis
  document.body.style.overflow = 'hidden';
}

// Funcția pentru închiderea modal-ului de detalii
function closeDetails() {
  const modal = document.getElementById('detailsModal');
  modal.style.display = 'none';
  
  // Restabilirea scroll-ului pe body
  document.body.style.overflow = 'auto';
}

// Funcția pentru gestionarea filtrelor de categorii
function initializeFilters() {
  document.querySelectorAll('.chip').forEach(function(chip) {
    chip.addEventListener('click', function() {
      // Eliminarea clasei active de pe toate filtrele
      document.querySelectorAll('.chip').forEach(function(c) { 
        c.classList.remove('active'); 
      });
      
      // Adăugarea clasei active pe filtrul selectat
      chip.classList.add('active');
      
      // Aplicarea filtrului selectat
      const selectedFilter = chip.textContent.trim();
      filterCars(selectedFilter);
      
      console.log('Filtrul selectat:', selectedFilter);
    });
  });
}

// Funcția pentru filtrarea mașinilor după categorie
function filterCars(category) {
  const allCards = document.querySelectorAll('.card');
  let visibleCount = 0;
  
  allCards.forEach(function(card) {
    const shouldShow = shouldShowCard(card, category);
    
    if (shouldShow) {
      visibleCount++;
      card.style.display = 'flex';
      // Animatie subtila de aparitie
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      
      setTimeout(function() {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 100);
    } else {
      // Animatie subtila de disparitie
      card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      card.style.opacity = '0';
      card.style.transform = 'translateY(-20px)';
      
      setTimeout(function() {
        card.style.display = 'none';
      }, 300);
    }
  });
  
  // Actualizarea contorului de mașini afișate
  updateResultsCounter(visibleCount, category);
}

// Funcția pentru actualizarea contorului de rezultate
function updateResultsCounter(count, category) {
  let counterElement = document.getElementById('resultsCounter');
  
  if (!counterElement) {
    // Crearea elementului contor dacă nu există
    counterElement = document.createElement('div');
    counterElement.id = 'resultsCounter';
    counterElement.className = 'results-counter';
    
    // Inserarea contorului după filtre
    const filtersElement = document.querySelector('.filters');
    filtersElement.parentNode.insertBefore(counterElement, filtersElement.nextSibling);
  }
  
  const categoryText = category === 'Toate' ? 'toate mașinile' : `mașini ${category.toLowerCase()}`;
  counterElement.innerHTML = `<span>${count} ${count === 1 ? 'mașină' : 'mașini'} ${category === 'Toate' ? 'disponibile' : 'găsite'}</span>`;
}

// Funcția pentru determinarea dacă o mașină trebuie afișată
function shouldShowCard(card, category) {
  if (category === 'Toate') {
    return true;
  }
  
  // Extragerea informațiilor despre mașină din card
  const title = card.querySelector('h3').textContent.toLowerCase();
  const specs = card.querySelectorAll('.spec');
  
  // Verificarea categoriei pe baza titlului și specificațiilor
  switch (category) {
    case 'SUV':
      return title.includes('glc') || title.includes('duster') || title.includes('suv');
      
    case 'Sedan':
      return title.includes('seria 3') || title.includes('a4') || title.includes('sedan');
      
    case 'Hatchback':
      return title.includes('golf') || title.includes('hatchback');
      
    case 'Electric':
      return title.includes('tesla') || title.includes('model 3') || 
             Array.from(specs).some(spec => spec.textContent.toLowerCase().includes('electric'));
      
    default:
      return true;
  }
}

// Funcția pentru resetarea filtrelor și afișarea tuturor mașinilor
function resetFilters() {
  const allCards = document.querySelectorAll('.card');
  allCards.forEach(function(card) {
    card.style.display = 'flex';
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  });
}

// Funcția pentru închiderea modal-ului când se face click în afara conținutului
function initializeModalCloseOnOutsideClick() {
  window.addEventListener('click', function(event) {
    const modal = document.getElementById('detailsModal');
    if (event.target === modal) {
      closeDetails();
    }
  });
}

// Funcția pentru închiderea modal-ului cu tasta Escape
function initializeModalCloseOnEscape() {
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      const modal = document.getElementById('detailsModal');
      if (modal.style.display === 'block') {
        closeDetails();
      }
    }
  });
}

// Funcția principală de inițializare care rulează când se încarcă pagina
function initializeApp() {
  // Inițializarea filtrelor de categorii
  initializeFilters();
  
  // Inițializarea funcționalității de închidere a modal-ului
  initializeModalCloseOnOutsideClick();
  
  // Inițializarea închiderii modal-ului cu tasta Escape
  initializeModalCloseOnEscape();
  
  // Afișarea contorului inițial pentru "Toate" mașinile
  const totalCars = document.querySelectorAll('.card').length;
  updateResultsCounter(totalCars, 'Toate');
  
  console.log('Aplicația VanzareMasini a fost inițializată cu succes!');
  console.log(`Total mașini în catalog: ${totalCars}`);
}

// Așteptarea încărcării complete a DOM-ului înainte de inițializare
document.addEventListener('DOMContentLoaded', initializeApp);
