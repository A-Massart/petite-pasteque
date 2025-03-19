// Le titre se redimensionne lorsqu'il est scrollé
window.addEventListener("scroll", function() {
    let scrollPosition = window.scrollY;
    let title = document.getElementById("dynamicTitle");

    let maxScroll = 150;

    if (scrollPosition > maxScroll) {
        title.style.fontSize = "30px";
        title.style.top = "25px";
        title.style.textTransform = "uppercase";
        title.style.color = "#cae799"
    } else {
        title.style.fontSize = "100px";
        title.style.top = "var(--title-top-position)";
        title.style.textTransform = "lowercase";
        title.style.color = "#d7f6a2"
    }

    title.style.transition = "font-size 0.25s ease, top 0.25s ease, text-transform 0.25s ease";
});

// Ouverture et Fermeture de l'onglet lettre
const $lettres = document.querySelectorAll('h3.letter-cat__lettre');

$lettres.forEach(($lettre) => {
    $lettre.addEventListener('click', () => {
        console.log("click lettre");
        const $letterCat = $lettre.parentNode;

        // Close all other sections before opening the clicked one
        document.querySelectorAll('.letter-cat').forEach(($otherLetterCat) => {
            if ($otherLetterCat !== $letterCat) {
                $otherLetterCat.classList.add('closed');
            }
        });

        // Toggle the clicked section
        $letterCat.classList.toggle('closed');
    });
});


// Ouverture et Fermeture du mot au sein de la lettre
const $letterCatClose = document.querySelectorAll('.letter-cat__item__close');
console.log($letterCatClose);

$letterCatClose.forEach(($catClose) => {
    $catClose.addEventListener('click', () => {
        console.log("click cat close");

        // Find the parent element that needs to be toggled
        const $letterCatItem = $catClose.closest('.letter-cat__item');
        console.log($letterCatItem);

        if ($letterCatItem.classList.contains('closed')) {
            console.log("est closed");
            $letterCatItem.classList.remove('closed');
            $catClose.classList.remove('closed');
        } else {
            console.log("n'est pas closed");
            $letterCatItem.classList.add('closed');
            $catClose.classList.add('closed');
        }
    });
});

/*
function toggleContent(id) {
    const letterContent = document.getElementById(id);
    const letterBlock = letterContent.previousElementSibling;

    document.querySelectorAll('.hiddenContent').forEach(content => {
        if (content.id !== id) {
            content.style.display = "none";
            content.style.width = "0";

            const block = content.previousElementSibling;
            block.style.width = "100%";
            block.style.height = "auto";
            block.style.textAlign = "";
            block.style.lineHeight = "";
            block.style.fontSize = "";
            block.style.fontWeight = "";

            block.style.transition = "width 0.25s ease, height 0.25s ease, text-align 0.25s ease, line-height 0.25s ease, font-size 0.25s ease, font-weight 0.25s ease";
            content.style.transition = "width 0.25s ease, height 0.25s ease";
        }
    });

    // Toggle visibility of the corresponding letterContent
    if (letterContent.style.display === "block") {
        letterContent.style.display = "none";
        letterContent.style.width = "0"

        letterBlock.style.width = "100%";
        letterBlock.style.height = "auto";
        letterBlock.style.textAlign = "";
        letterBlock.style.lineHeight = "";
        letterBlock.style.fontSize = "";
        letterBlock.style.fontWeight = "";

        letterBlock.style.transition = "width 0.25s ease, height 0.25s ease, text-align 0.25s ease, line-height 0.25s ease, font-size 0.25s ease, font-weight 0.25s ease";
        letterContent.style.transition = "width 0.25s ease, height 0.25s ease";

    }
    else {
        letterContent.style.display = "block";
        letterContent.style.width = "67%";

        letterBlock.style.width = "30%";
        letterBlock.style.height = "var(--height-letter-block)";
        letterBlock.style.textAlign = "center";
        letterBlock.style.lineHeight = "var(--height-letter-block)";
        letterBlock.style.fontSize = "30px";
        letterBlock.style.fontWeight = "500";

        letterBlock.style.transition = "width 0.5s ease, height 0.5s ease, text-align 0.5s ease, line-height 0.5s ease, font-size 0.5s ease, font-weight 0.5s ease";
        letterContent.style.transition = "width 0.5s ease, height 0.5s ease";
    }
}

function toggleButton(contentId) {
    const glossaryContent = document.getElementById(contentId);
    const button = glossaryContent?.previousElementSibling; // Get the button
    const img = button?.querySelector("img"); // Get the image inside the button

    if (!glossaryContent) {
        console.error(`Element with ID '${contentId}' not found.`);
        return;
    }

    if (glossaryContent.style.display === "block") { 
        glossaryContent.style.display = "";
        if (img) img.style.transform = "rotate(0deg)";
    }

    else {
        glossaryContent.style.display = "block";
        if (img) img.style.transform = "rotate(180deg)";
    }

    img.style.transition = "transform 0.5s ease";

}
*/