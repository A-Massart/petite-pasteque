// BARRE DE NAVIGATION - LETTRES CRÉES EN FONCTION DES SECTIONS EXISTANTES
document.addEventListener("DOMContentLoaded", function () {
    const nav = document.querySelector('nav');
    const sections = document.querySelectorAll('main section');

    sections.forEach(section => {
        const id = section.getAttribute('id');
        if (id) {
            const link = document.createElement('a');
            link.className = 'nav__letter border-properties';
            link.href = `#${id}`;
            link.textContent = id;
            nav.appendChild(link);
        }
    });

    const letters = document.querySelectorAll(".nav__letter");

    let manualClick = false;
    let lastScrollY = window.scrollY;

    // GESTION DU CLIC SUR LES LETTRES
    letters.forEach(letter => {
        letter.addEventListener("click", function () {
            letters.forEach(l => l.classList.remove("clicked"));
            this.classList.add("clicked");

            // Empêche le scroll automatique de modifier l'état trop vite
            manualClick = true;
            setTimeout(() => manualClick = false, 1000);
        });
    });

    // scroll avec marge pour viser le centre de l'écran
    const observer = new IntersectionObserver((entries) => {
        if (manualClick) return;

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const link = document.querySelector(`.nav__letter[href="#${id}"]`);
                if (!link) return;

                const scrollingDown = window.scrollY > lastScrollY;
                lastScrollY = window.scrollY;

                const bounds = entry.boundingClientRect;
                const screenMiddle = window.innerHeight / 2;

                const isTriggerPoint =
                    (scrollingDown && bounds.top <= screenMiddle && bounds.top > 0) ||
                    (!scrollingDown && bounds.bottom >= screenMiddle && bounds.bottom < window.innerHeight);

                if (isTriggerPoint) {
                    letters.forEach(l => l.classList.remove("clicked"));
                    link.classList.add("clicked");
                }
            }
        });
    }, {
        root: null,
        rootMargin: "-50% 0px -50% 0px", // vise le centre
        threshold: 0
    });

    sections.forEach(section => observer.observe(section));
});





// INTERACTIONS DES FILTRES
document.addEventListener("DOMContentLoaded", function () {
    const filterGroups = document.querySelectorAll("#header__bottom__filters__buttons > div");
    const filterContents = document.querySelectorAll("#header__bottom__filters__content > div");

    filterGroups.forEach(group => {
        const button = group.querySelector("button");
        const countDisplay = group.querySelector("p");

        group.addEventListener("click", function () {
            const contentId = button.id.replace("button", "content");
            const content = document.getElementById(contentId);
            const isActive = group.classList.contains("clicked");

            // Reset tous les groupes et contenus
            filterGroups.forEach(g => g.classList.remove("clicked"));
            filterContents.forEach(cnt => cnt.classList.remove("clicked"));

            if (!isActive) {
                group.classList.add("clicked");
                content.classList.add("clicked");
            }

            // Fonction pour maj le compteur
            function updateCount() {
                const selectedButtons = content.querySelectorAll("button.clicked");
                countDisplay.textContent = selectedButtons.length > 0 ? selectedButtons.length : "0";
            }

            // Ajouter listeners sur les boutons de filtre dans le contenu
            content.querySelectorAll("button").forEach(filterBtn => {
                filterBtn.addEventListener("click", function (e) {
                    e.stopPropagation(); // Pour éviter de fermer/ouvrir le contenu en cliquant dans les boutons enfants

                    if (this.id.includes("none")) {
                        content.querySelectorAll("button").forEach(btn => btn.classList.remove("clicked"));
                    } else {
                        this.classList.toggle("clicked");
                        content.querySelector("button[id*='none']")?.classList.remove("clicked");
                    }

                    updateCount();
                });
            });
        });
    });
});


// SYSTÈME DE FILTRAGE DES ÉLÉMENTS
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('#header__bottom__filters__content button');
    const contentSections = document.querySelectorAll('.section__content');

    const activeFilters = {
        type: null,
        domaine: null,
        usage: null,
        ia: null
    };

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterGroup = button.dataset.filter;
            const filterValue = button.dataset.value;

            // Si le filtre actuel est déjà sélectionné, on le désélectionne
            if (activeFilters[filterGroup] === filterValue) {
                activeFilters[filterGroup] = null;
                button.classList.add('clicked');

            } else {
            // Sinon, on sélectionne ce filtre
                activeFilters[filterGroup] = (filterValue === 'none') ? null : filterValue;
                button.classList.remove('clicked');
            }

            applyFilters();
        });
    });

    function applyFilters() {
        contentSections.forEach(section => {
            let visible = true;

            // Si tous les filtres sont "null", on affiche tous les éléments
            if (Object.values(activeFilters).every(value => value === null)) {
                section.style.display = 'block';
                return;
            }

            // Vérifie chaque filtre actif
            for (const [filter, value] of Object.entries(activeFilters)) {
                if (value !== null) {
                    const dataAttr = section.dataset[filter];
                    // Si l'élément ne correspond pas à l'un des filtres actifs, elle est masquée
                    if (!dataAttr || !dataAttr.split(' ').includes(value)) {
                        visible = false;
                        break;
                    }
                }
            }

            section.style.display = visible ? 'block' : 'none';
        });
    }
});

// BARRE DE RECHERCHE POUR TOUT LE CONTENU
document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('header__top__search-bar');
    const contentCards = document.querySelectorAll('.section__content');

    searchBar.addEventListener('input', () => {
        const searchTerm = searchBar.value.toLowerCase();

        contentCards.forEach(card => {
            const title = card.querySelector('h2')?.textContent.toLowerCase() || '';
            const paragraphs = card.querySelectorAll('p');
            let matchFound = title.includes(searchTerm);

            // Si pas encore trouvé, chercher dans les paragraphes
            if (!matchFound) {
                paragraphs.forEach(p => {
                    if (p.textContent.toLowerCase().includes(searchTerm)) {
                        matchFound = true;
                    }
                });
            }

            // Affiche ou masque la carte selon le résultat
            card.style.display = matchFound ? 'block' : 'none';
        });
    });
});



// LA PASTÈQUE TOURNE EN FONCTION DU SCROLL
document.addEventListener('DOMContentLoaded', () => {
    window.onscroll = function rotateScroll() {
        turningWatermelon();
    };
    
    function turningWatermelon() {
        const image = document.getElementById("header__top__img");
        if (!image) return;

        const rotation = window.scrollY / 5; // Ajuste la vitesse ici
        image.style.transform = `rotate(${rotation}deg)`;
        image.style.transition = "transform 50ms linear";
    }
});