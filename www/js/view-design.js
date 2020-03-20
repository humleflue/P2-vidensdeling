console.log(window.location.href);

 function showImages () {
    console.log("We're in");

    // Rapport
    if (window.location.href === 'http://localhost:3000/rapport'){
        document.getElementById("design-rapport").addEventListener("click", () => {
            document.getElementById('design-rapportPage').src = 'img/Design/4-rapport.jpg';
        });
    } else if (window.location.href === 'http://localhost:3000/'){
        // Home
        document.getElementById("design-home").addEventListener("click", () => {
            document.getElementById('design-homePage').src = 'img/Design/3-home.jpg';
        });
    } else if (window.location.href === 'http://localhost:3000/evalueringer'){
        // Evalueringer
        document.getElementById("design-evalueringer").addEventListener("click", () => {
            document.getElementById('design-evalueringerPage').src = 'img/Design/6-evalueringer.jpg';
        });
    }
}

showImages();

let sectionDatabase = [
    {section: 2.1, content: {keywords: ['vidensdeling', 'feed-up', 'feed-forward']}},
    {section: 2.2, content: {keywords: ['studier', 'evaluering', 'formativ', 'summativ']}},
    {section: 2.3, content: {keywords: ['metoder', 'active recall', 'spaced repetition']}},
    {section: 2.4, content: {keywords: ['SOTA', 'classkick', 'kahoot!']}},
];

console.log(sectionDatabase[0].content.keywords);