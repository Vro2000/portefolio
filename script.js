// gestion des parallaxes _________________________________
window.addEventListener('scroll', function() {
  const scrollY = window.scrollY;

  const medium = document.querySelector('.medium');
  const fast = document.querySelector('.fast');
  //const contenu = document.querySelector('.contenu');
  // Modifier la vitesse
  medium.style.transform = `translateY(${scrollY * 0.8}px)`; // Moyen
  fast.style.transform = `translateY(${scrollY * 0.4}px)`; // Rapide
  /*contenu.style.transform = `translateY(${scrollY * 0.7}px)`; // Contenu (technologies + projets)*/
});
 
// color picker ___________________________________________
const colorPicker = document.getElementById('background-color-picker');
const fond = document.querySelector('.fond');


colorPicker.addEventListener('input', function() {
  fond.style.backgroundColor = this.value;

});


// Modale 'voir plus' _____________________________________________

// Ouvre la modale quand on clique sur "Voir plus"
document.getElementById("voir-plus").addEventListener("click", function() {
    const modal = document.getElementById("modal");
    modal.style.display = "flex"; // Affiche la modale
  });
  
  // Ferme la modale quand on clique sur la croix
  document.querySelector(".close").addEventListener("click", function() {
    document.getElementById("modal").style.display = "none";
  });
  
  // Ferme la modale si on clique en dehors de la modale
  window.addEventListener("click", function(event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
  // Ferme la modale si on scroll au-delà d'une certaine hauteur
  window.addEventListener("scroll", function() {
    const modal = document.getElementById("modal");
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    if (scrollPosition > 400) {
      modal.style.display = "none";
    }
  });
 

// carousel ________________________________________________

let angle = 0;
let currentImageIndex = 1;
const totalImages = document.querySelectorAll('#carousel .carousel-item').length; // Recherche toutes les divs avec la classe .carousel-item

const carousel = document.getElementById('carousel');
const counter = document.getElementById('counter');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');

// Sélectionner tous les titres
const titres = document.querySelectorAll('.titres h3');

// Fonction pour mettre à jour l'angle, l'image active et la couleur du titre actif
function updateCarousel() {
    carousel.style.transform = `rotateY(${angle}deg)`;
    counter.textContent = `${currentImageIndex} / ${totalImages}`;
    updateTitreColor(currentImageIndex - 1); // Appel fonction pour mettre à jour la couleur du titre actif
}

// Fonction pour mettre à jour la couleur du titre actif
function updateTitreColor(index) {
    titres.forEach((titre, i) => {
        if (i === index) {
            titre.classList.add('active');
        } else {
            titre.classList.remove('active');
        }
    });
}

// Gestion du bouton 'next'
nextButton.addEventListener('click', () => {
    angle -= 60; // Chaque div est à un angle de 60 degrés
    currentImageIndex = (currentImageIndex % totalImages) + 1; // Incrémentation du compteur
    updateCarousel();
});

// Gestion du bouton 'prev'
prevButton.addEventListener('click', () => {
    angle += 60; // Inverse la rotation
    currentImageIndex = (currentImageIndex - 2 + totalImages) % totalImages + 1; // Décrémentation du compteur
    updateCarousel();
});

// Initialisation du carousel
updateCarousel();

// Initialisation des titres (mise à jour de la couleur pour le premier titre)
updateTitreColor(0);


// Affichage des projets ________________________________________________

fetch('projets.json')
  .then(response => response.json())
  .then(projets => {
    const projetsContainer = document.getElementById('projets-container');
    
    projets.forEach(projet => {
      const projetDiv = document.createElement('div');
      projetDiv.classList.add('projet-item', 'encadre');
      
      // Création de boutons (si le lien n'est pas null) pour les liens GitHub et site
      let buttonsHTML = '';
      if (projet['lien-repo-github'] !== null) {
        buttonsHTML += `<button onclick="window.open('${projet['lien-repo-github']}', '_blank')">Repo GitHub</button>`;
      }
      if (projet['lien-site'] !== null) {
        buttonsHTML += `<button onclick="window.open('${projet['lien-site']}', '_blank')">Voir le site</button>`;
      }
      
      // Insertion des données du projet avec objectif et technologies
      projetDiv.innerHTML = `
        <h3>${projet['nom-projet']}</h3>
        <img src="${projet['img-site']}" alt="${projet.alt}">
        <p>${projet.objectif}</p>
        <p><strong>Technologies utilisées :</strong></p>
        <ul>
          ${projet['technologies-utilisées'].map(tech => `<li>${tech}</li>`).join('')}
        </ul>
        <div class="buttons-container">${buttonsHTML}</div>
      `;
      
      projetsContainer.appendChild(projetDiv);
      
      
    });
  });













