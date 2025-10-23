function cautaMasina() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const cars = document.querySelectorAll('.car-card');
  let found = false;

  cars.forEach(car => {
    const title = car.querySelector('h3').textContent.toLowerCase();
    if (title.includes(input)) {
      car.style.display = "block";
      found = true;
    } else {
      car.style.display = "none";
    }
  });

  if (!found && input !== "") {
    alert("Nu am găsit mașina căutată!");
  }
}