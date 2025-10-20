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

  // Construirea conținutului model-ului cu informațiile mașinii
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
      
      // TODO: Aici se poate adăuga logica de filtrare efectivă a mașinilor
      console.log('Filtrul selectat:', chip.textContent);
    });
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
  
  console.log('Aplicația VanzareMasini a fost inițializată cu succes!');
}

// Așteptarea încărcării complete a DOM-ului înainte de inițializare
document.addEventListener('DOMContentLoaded', initializeApp);

