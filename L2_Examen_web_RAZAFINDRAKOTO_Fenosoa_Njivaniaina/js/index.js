let list_item = document.getElementById('list-book');
let add = document.getElementById('form-add');
let search = document.getElementById('form-search');
let d = null; // Contenir les listes des books 

let cat_all = document.getElementById('cat-all');
let cat_science = document.getElementById('cat-science');
let cat_manga = document.getElementById('cat-manga');

// Pour avoir les book disponible
fetch("book-list.json")
.then(response => response.json())
.then(data => {
    localStorage.setItem('data', data);
    d = data;
    lister(d);
})
.catch(error=>{
    console.error(error);
});

// Pour afficher les lists des books
function lister(data) {
    if(data.length) {
        data.forEach(element => {
            let item = document.createElement('li');
            item.classList.add('book-item');
            let image  = document.createElement('div');
            image.classList.add('image');
            let i = document.createElement('img');
            i.src = element.image;
            image.appendChild(i);
            item.appendChild(image);

            let desc  = document.createElement('div');
            desc.classList.add('book-description');
            let title = document.createElement('h4');
            let auteur = document.createElement('span');
            let details = document.createElement('button');
            details.classList.add('more-description');
            details.addEventListener('click', () => {
                let des = document.getElementById('description');
                des.style.display = 'flex';

                let desc_title = document.getElementById('desc-title');
                let desc_auteur = document.getElementById('desc-auteur');
                let desc_isbn = document.getElementById('desc-isbn');
                let desc_date = document.getElementById('desc-date');
                let desc_genre = document.getElementById('desc-genre');
                let desc_resume = document.getElementById('desc-resume');
                let desc_langue = document.getElementById('desc-langue');
                let desc_page = document.getElementById('desc-page');
                let desc_image = document.getElementById('desc-image');
                let desc_etat = document.getElementById('desc-etat');

                desc_title.innerText = 'Titre: '+element.titre;
                desc_auteur.innerText = 'Auteurs: '+element.editeur;
                desc_isbn.innerText = 'Isbn: '+element.isbn;
                desc_image.src = element.image;
                desc_date.innerText = 'Date de publication: '+element.datePublication;
                desc_genre.innerText = 'Genre: '+element.genre;
                desc_resume.innerText = 'Résumer: '+element.resume;
                desc_langue.innerText = 'Langue: '+element.langue;
                desc_page.innerText = 'Nombre de page: '+element.nombrePages;
                desc_etat.innerText = 'Etat : '+element.etat;

                window.location.href = '#description';
            });
            title.innerText = element.titre;
            auteur.innerText = element.editeur;
            details.innerText = 'Details';
            desc.appendChild(title);
            desc.appendChild(auteur);
            desc.appendChild(details);
            item.appendChild(desc);

            list_item.appendChild(item);
        });
    }
    else {
        let element = data;
        let item = document.createElement('li');
        item.classList.add('book-item');
        let image  = document.createElement('div');
        image.classList.add('image');
        let i = document.createElement('img');
        i.src = element.image;
        image.appendChild(i);
        item.appendChild(image);

        let desc  = document.createElement('div');
        desc.classList.add('book-description');
        let title = document.createElement('h4');
        let auteur = document.createElement('span');
        let details = document.createElement('button');
        details.classList.add('more-description');
        details.addEventListener('click', () => {
            let des = document.getElementById('description');
            des.style.display = 'flex';

            let desc_title = document.getElementById('desc-title');
            let desc_auteur = document.getElementById('desc-auteur');
            let desc_isbn = document.getElementById('desc-isbn');
            let desc_date = document.getElementById('desc-date');
            let desc_genre = document.getElementById('desc-genre');
            let desc_resume = document.getElementById('desc-resume');
            let desc_langue = document.getElementById('desc-langue');
            let desc_page = document.getElementById('desc-page');
            let desc_image = document.getElementById('desc-image');
            let desc_etat = document.getElementById('desc-etat');

            desc_title.innerText = 'Titre: '+element.titre;
            desc_auteur.innerText = 'Auteurs: '+element.editeur;
            desc_isbn.innerText = 'Isbn: '+element.isbn;
            desc_image.src = element.image;
            desc_date.innerText = 'Date de publication: '+element.datePublication;
            desc_genre.innerText = 'Genre: '+element.genre;
            desc_resume.innerText = 'Résumer: '+element.resume;
            desc_langue.innerText = 'Langue: '+element.langue;
            desc_page.innerText = 'Nombre de page: '+element.nombrePages;
            desc_etat.innerText = 'Etat : '+element.etat;

            window.location.href = '#description';
        });
        title.innerText = element.titre;
        auteur.innerText = element.editeur;
        details.innerText = 'Details';
        desc.appendChild(title);
        desc.appendChild(auteur);
        desc.appendChild(details);
        item.appendChild(desc);

        list_item.appendChild(item);
    }
}

//  Pour le bouton ajout
add.addEventListener('submit', (event) => {
    event.preventDefault();
    let element = 
    {
        "titre": [document.getElementById('title').value],
        "isbn": document.getElementById('isbn').value,
        "image": document.getElementById('image').value,
        "editeur": document.getElementById('editeur').value,
        "datePublication": document.getElementById('date').value,
        "genre": document.getElementById('genre').value,
        "resume": document.getElementById('resume').value,
        "langue": document.getElementById('langue').value,
        "nombrePages": document.getElementById('page').value,
        "disponibilite": document.getElementById('title').value === "dispo"?true:false,
        "etat": document.getElementById('etat').value,
        "Emplacement": document.getElementById('reserve').value
    };

    d.push(element);
    
    list_item.innerHTML = "";
    lister(d);
});

// Pour le bouton recherche
search.addEventListener('submit', (e) => {
    e.preventDefault();
    cat_all.classList.add('actif');
    cat_science.classList.remove('actif');
    cat_manga.classList.remove('actif');

    let text = document.getElementById('search').value;
    if(text !== "") {
        list_item.innerHTML = "";
        
        d.forEach(element => {
            if(element.titre[0].includes(text)){
                lister(element);
            }
        });
    }

});

cat_all.addEventListener('click', () => {
    list_item.innerHTML = "";
    cat_all.classList.add('actif');
    cat_science.classList.remove('actif');
    cat_manga.classList.remove('actif');
    let text = document.getElementById('search').value;
    
    if(text !== "") {
        d.forEach(element => {
            if(element.titre[0].includes(text)) {
                lister(element);
            }
        });
       
    }
    else {
        d.forEach(element => {
            lister(element);
        });
    }
});
cat_science.addEventListener('click', () => {
    list_item.innerHTML = "";
    cat_all.classList.remove('actif');
    cat_science.classList.add('actif');
    let text = document.getElementById('search').value;
    cat_manga.classList.remove('actif');

    if(text !== "") {
        d.forEach(element => {
            if(element.titre[0].includes(text)) {
                if(element.genre.includes('Science')){
                    lister(element);
                }
            }
        });
    }
    else {
        d.forEach(element => {
            if(element.genre.includes('Science')){
                lister(element);
            }
        });
    }

});
cat_manga.addEventListener('click', () => {
    list_item.innerHTML = "";
    cat_all.classList.remove('actif');
    cat_science.classList.remove('actif');
    cat_manga.classList.add('actif');
    let text = document.getElementById('search').value;

    // d.forEach(element => {
    //     if(element.titre[0].includes(text)) {
    //         if(element.genre.includes('Anime')){
    //             lister(element);
    //         }
    //     }
    // });
    if(text !== "") {
        d.forEach(element => {
            if(element.titre[0].includes(text)) {
                if(element.genre.includes('Anime')){
                    lister(element);
                }
            }
        });
    }
    else {
        d.forEach(element => {
            if(element.genre.includes('Anime')){
                lister(element);
            }
        });
    }
    
});