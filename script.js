// gestion des parallaxes _________________________________
window.addEventListener('scroll', function () {
  const scrollY = window.scrollY;
  const medium = document.querySelector('.medium');
  const fast = document.querySelector('.fast');
  // pour modifier la vitesse
  medium.style.transform = `translateY(${scrollY * 0.8}px)`; // Moyen
  fast.style.transform = `translateY(${scrollY * 0.4}px)`; // Rapide
});

// color picker ___________________________________________
const colorPicker = document.getElementById('background-color-picker');
const fond = document.querySelector('.fond');

colorPicker.addEventListener('input', function () {
  fond.style.backgroundColor = this.value;
});

document.querySelector('.color-picker input').value = "#800080" ;

// Modale 'voir plus' _____________________________________________

const modal = document.getElementById('modal');

document.getElementById('voir-plus').addEventListener('click', function (event) {
  event.stopPropagation(); 
  modal.style.display = 'flex'; // Affiche la modale
});

document.querySelector('.close').addEventListener('click', function () {
  modal.style.display = 'none'; // Ferme la modale quand on clique sur la croix
});

modal.addEventListener('click', function (event) {
  event.stopPropagation(); // Empêche les clics à l'intérieur de la modale de fermer la modale
});

window.addEventListener('click', function () {
  modal.style.display = 'none'; // Ferme la modale si on clique en dehors de la modale
});

// Ferme la modale si on scroll au-delà d'une certaine hauteur
window.addEventListener('scroll', function () {
  const scrollPosition = window.scrollY;

  if (modal.style.display === 'flex' && scrollPosition > 700) {
    modal.style.display = 'none';
  }
});

// collapse containers ___________________________________

function openOnglet(evt, ongletName) {

  const ongletButtons = document.querySelectorAll('.onglet-button');
  ongletButtons.forEach((button) => {
    button.classList.remove('active'); // Retire la classe 'active' de tous les liens d'onglets
  });

  const ongletContents = document.querySelectorAll('.onglet-content');
  ongletContents.forEach((content) => {
    content.style.display = 'none';   // Masque tous les contenus d'onglets
  });
 
   evt.currentTarget.classList.add('active');  // Ajoute la classe 'active' au bouton cliqué
   document.getElementById(ongletName).style.display = 'flex';// Affiche le contenu de l'onglet sélectionné
}

  //  récupérer les data attributs de l'onglet cliqué
document.addEventListener('DOMContentLoaded', function () {
  const ongletButtons = document.querySelectorAll('.onglet-button');

  ongletButtons.forEach((button) => {
    button.addEventListener('click', function (event) {
      const ongletName = button.getAttribute('data-onglet');
      openOnglet(event, ongletName);
    });
  });
  
  document.querySelector('.onglet-button.active').click(); // click automatique pour le premier onglet
});




// Affichage des projets ________________________________________________

fetch('projets.json')
  .then((response) => response.json())
  .then((projetsTab) => {
    const projetsContainer = document.getElementById('projets-container');
    const totalProjets = projetsTab.length;
    let currentIndex = 0;


    // Mise à jour du compteur du carousel
    const updateCounter = () => {
      document.querySelectorAll('.counter').forEach((counter) => {
        counter.textContent = `${currentIndex + 1} / ${totalProjets}`;
      });
    };

    // Affichage des projets
    projetsTab.forEach((projet) => {
      const projetDiv = document.createElement('div');
      projetDiv.classList.add('projet-item', 'encadre');

      // Création des boutons pour GitHub et le site (si les liens existent)
      let buttonsHTML = '';
      if (projet['lien-repo-github'] !== null) {
        buttonsHTML += `<button onclick="window.open('${projet['lien-repo-github']}', '_blank')">Repo GitHub</button>`;
      }
      if (projet['lien-site'] !== null) {
        buttonsHTML += `<button onclick="window.open('${projet['lien-site']}', '_blank')">Voir site</button>`;
      }

      // Vérifie si le lien de l'image existe
      let imageHTML = '';
      if (projet['img-site'] !== null) {
        imageHTML = `<img src="${projet['img-site']}" alt="${projet.alt}">`;
      } else {
        imageHTML = `<p>(Image non disponible)</p>`;
      }

      // Ajoute le html dans le DOM
      projetDiv.innerHTML = `
        <div class="content-image">
          ${imageHTML}
          <div class="carousel-controls">
            <button class="prevButton">▲ précédent</button>
            <div class="counter"></div>
            <button class="nextButton">suivant ▼</button>
          </div>
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

    updateCounter();     // Initialisation du compteur

    // Gestion des boutons de navigation
    const nextButtons = document.querySelectorAll('.nextButton');
    const prevButtons = document.querySelectorAll('.prevButton');

    // Fonction pour afficher le projet en fonction de l'index
    const afficheProjet = (index) => {
      projetsContainer.scrollTop = projetsContainer.offsetHeight * index;
      updateCounter();
    };

    // Projet suivant
    nextButtons.forEach((button) => {
      button.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalProjets; // Boucle au début après le dernier projet
        afficheProjet(currentIndex);
      });
    });

    // Projet précédent
    prevButtons.forEach((button) => {
      button.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalProjets) % totalProjets; // Boucle à la fin après le premier projet
        afficheProjet(currentIndex);
      });
    });
  });





