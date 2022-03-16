class Brain{
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

       
    /* Crea cajas alrededor de la pantalla de manera aleatoria */
    randomBoxes = function randomBoxes(){
        Util.createTitle("Loop de cajas:");
        for(let i= 0; i < 100; i++){
            var box = this.createRandomBox(1500);
            document.body.appendChild(box);
        }
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
}

/* Init */
brain = new Brain();
brain.init();
brain.showLoopTitles();
brain.randomBoxes();