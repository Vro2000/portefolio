// gestion des parallaxes _________________________________
window.addEventListener('scroll', function () {
  const scrollY = window.scrollY;

  const medium = document.querySelector('.medium');
  const fast = document.querySelector('.fast');
  // const contenu = document.querySelector('.contenu');
  // Modifier la vitesse
  medium.style.transform = `translateY(${scrollY * 0.8}px)`; // Moyen
  fast.style.transform = `translateY(${scrollY * 0.4}px)`; // Rapide
  // contenu.style.transform = `translateY(${scrollY * 0.7}px)`; // Contenu (technologies + projets)
});

// color picker ___________________________________________
const colorPicker = document.getElementById('background-color-picker');
const fond = document.querySelector('.fond');

colorPicker.addEventListener('input', function () {
  fond.style.backgroundColor = this.value;
});

// Modale 'voir plus' _____________________________________________

// Ouvre la modale quand on clique sur "Voir plus"
document.getElementById('voir-plus').addEventListener('click', function (event) {
  event.stopPropagation(); // Empêche la propagation pour éviter de déclencher la fermeture
  const modal = document.getElementById('modal');
  modal.style.display = 'flex'; // Affiche la modale
});

// Ferme la modale quand on clique sur la croix
document.querySelector('.close').addEventListener('click', function () {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
});

// Empêche les clics à l'intérieur de la modale de fermer la modale
document.getElementById('modal').addEventListener('click', function (event) {
  event.stopPropagation();
});

// Ferme la modale si on clique en dehors de la modale
window.addEventListener('click', function () {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
});

// Ferme la modale si on scroll au-delà d'une certaine hauteur
window.addEventListener('scroll', function () {
  const modal = document.getElementById('modal');
  const scrollPosition = window.scrollY || document.documentElement.scrollTop;

  if (scrollPosition > 700) {
    modal.style.display = 'none';
  }
});


// collapse containers ___________________________________

// Fonction pour basculer entre les onglets
function openOnglet(evt, ongletName) {
  // Masquer tous les contenus d'onglets
  const ongletContents = document.querySelectorAll('.onglet-content');
  ongletContents.forEach((content) => {
    content.style.display = 'none';
  });

  // Retirer la classe 'active' de tous les liens d'onglets
  const ongletLinks = document.querySelectorAll('.onglet-link');
  ongletLinks.forEach((link) => {
    link.classList.remove('active');
  });

  // Afficher le contenu de l'onglet sélectionné et ajouter 'active' au bouton
  document.getElementById(ongletName).style.display = 'flex';
  evt.currentTarget.classList.add('active');
}

// Initialisation pour afficher le premier onglet
document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('.onglet-link.active').click();
});




// Affichage des projets ________________________________________________

fetch('projets.json')
  .then((response) => response.json())
  .then((projets) => {
    const projetsContainer = document.getElementById('projets-container');

    projets.forEach((projet) => {
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
      
      // Vérifie si le lien de l'image existe (si le lien n'est pas null)
        let imageHTML = '';
        if (projet['img-site'] !== null) {
          imageHTML = `
            <div class="image-container">
              <img src="${projet['img-site']}" alt="${projet.alt}">
              <div class="image-overlay"></div>
            </div>`;
        } else {
          imageHTML = `<p>(Image non disponible)</p>`;
        }

      // Insertion des données du projet
      projetDiv.innerHTML = `
        <div class="content-image">
          ${imageHTML}
        </div>
        <div class="content-text">
          <h3>${projet['nom-projet']}</h3>
          <p>${projet.objectif}</p>
          <p><strong>Technologies utilisées :</strong></p>
          <ul>
            ${projet['technologies-utilisées'].map((tech) => `<li>${tech}</li>`).join('')}
          </ul>
          <div class="buttons-container">${buttonsHTML}</div>
        </div>
      `;

      projetsContainer.appendChild(projetDiv);
    });
  });

