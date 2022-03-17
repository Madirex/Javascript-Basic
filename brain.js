class Brain{

    constructor(){
        this.images = [];
    }


    /* Init */
    init = function init(){
        document.body.style.margin = "50px";
        document.body.style.backgroundColor = "#eeeeee";
    }
    
    /* Crea 6 headers de mayor a menor */
    showLoopTitles = function showLoopTitles(){
        Util.createTitle("Loop de títulos:")
        for(let i = 1; i <= 6; i++){
            var title = document.createElement("h" + i);
            var text = document.createTextNode("Título " + i);
            title.appendChild(text);
            document.body.appendChild(title);
        }
    }

    /* Recoge elementos de una API y muestra el contenido en la página */
    apiStart = function apiStart(){
        Util.createTitle("Utilizando una API:");
        let content = document.createElement('div');
        let url = "https://randomuser.me/api/?results=1";
        let image = document.createElement('img');
        let name = document.createElement('p');
        let email = document.createElement('p');
        let gender = document.createElement('p');
        let country = document.createElement('p');
        let phone = document.createElement('p');

        let loading = Util.getLoadingImg();
        document.body.appendChild(loading);


        fetch(url)
        .then(response => response.json())
        .then(data => {
            let person = data.results[0];
            image.setAttribute("src", person.picture.large);
            name.textContent = "Nombre: " + person.name.first + " " + person.name.last;
            email.textContent = "Email: " + person.email;
            gender.textContent = "Género: " + person.gender;
            country.textContent = "País: " + person.location.country;
            phone.textContent = "Teléfono: " + person.phone;

            content.appendChild(image);
            content.appendChild(name);
            content.appendChild(email);
            content.appendChild(gender);
            content.appendChild(country);
            content.appendChild(phone);

            //Eliminar loading
            document.body.removeChild(loading);
        });
        document.body.appendChild(content);
    }

    /* Cambia una imagen aleatoria de la array de imágenes */
    changeRandomPicture = function(){
        let url = "https://randomuser.me/api/?results=1";

        fetch(url)
        .then(response => response.json())
        .then(data => {
            let select = parseInt(Util.getRandom(0,this.images.length - 1));
            let person = data.results[0];
            this.images[select].src = person.picture.large;
        });
    }

    apiImagesRandom = function apiImagesRandom(){
        Util.createTitle("API Imágenes Random:");
        let content = document.createElement('div');
        let maxImages = 50;
        let url = "https://randomuser.me/api/?results=" + maxImages;

        let loading = Util.getLoadingImg();
        document.body.appendChild(loading);

        fetch(url)
        .then(response => response.json())
        .then(data => {

            for(let i = 0; i<maxImages; i++){
                let image = document.createElement('img');
                this.images.push(image);
                content.appendChild(image);
                let person = data.results[i];
                image.setAttribute("src", person.picture.large);
                content.appendChild(image);
            }

            //Eliminar loading
            document.body.removeChild(loading);

            //Agregar cambio de imagen cada x tiempo
            for(let n = 0; n < 1000; n++){
                setInterval(this.changeRandomPicture(),1000 * n);
            }
        });
    
        document.body.appendChild(content);
    }

    /* Crea cajas alrededor de la pantalla de manera aleatoria */
    randomBoxes = function randomBoxes(){
        Util.createTitle("Loop de cajas:");
        let content = document.createElement("div");
        let height = 600;
        for(let i= 0; i < 100; i++){
            var box = this.createRandomBox(height);
            content.appendChild(box);
        }
        content.style.height = height + "px";
        document.body.appendChild(content);
    }

    /* Función: Crea una caja aleatoria con una posición y color aleatorio */
    createRandomBox = function createRandomBox(maxBoxHeight){
        
        let boxSize = 50;

        let minWidth = 0;
        let maxWidth = parseInt(screen.width); //parseInt(window.innerWidth);
        let minHeight = 0;
        let maxHeight = maxBoxHeight;

        let randomX = Util.getRandom(minWidth, maxWidth);
        let randomY = Util.getRandom(minHeight, maxHeight);

        while (randomX + boxSize > maxWidth){
            randomX -= boxSize;
        }

        while (randomY + boxSize > maxHeight){
            randomY -= boxSize;
        }

        let box = document.createElement('div');
        box.style.width = boxSize + 'px';
        box.style.height = boxSize + 'px';
        box.style.border = "2px solid black";
        box.style.display = "flex";
        box.style.position = "absolute";
        box.style.right = randomX + 'px';
        box.style.marginTop = randomY + 'px';
        box.style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16);
        
        return box;
    }

}

class Util{
    /* Crea un título */
    static createTitle(name){
        var title = document.createElement("h1");
        var text = document.createTextNode(name);
        title.id = "title";
        title.appendChild(text);
        title.style.marginTop = "50px";
        document.body.appendChild(title);
    }

    /* Obtiene un número random dado un mínimo y un máximo */
    static getRandom(min, max){
        return (Math.random() * (max - min)) + min;
    }

    static getLoadingImg(){
        //Loading
        let loading = document.createElement('img');
        loading.textContent = "Cargando...";
        loading.src = './images/loading.gif'
        loading.style.height = "64px";
        loading.style.width = "64px";
        return loading;
    }
}

/* Init */
brain = new Brain();
brain.init();
brain.apiStart();
brain.apiImagesRandom();
brain.showLoopTitles();
brain.randomBoxes();