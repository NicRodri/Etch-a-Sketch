const container = document.getElementById('grid');
let drawing = false;
//Used to create a single square in the grid
function square(...id){
    const div = document.createElement('div');
    const row = document.getElementById(id[1]);
    div.setAttribute('class', id[0]);
    div.classList.add('square');
    div.style.width = "16px";
    div.style.height = "16px";
    row.appendChild(div);
    
}
//Used to create singular row of arbitrary size
function row(length, id){
    const row = document.createElement('div');
    container.appendChild(row);
    row.setAttribute('class', 'row');
    row.setAttribute('id', id);
    for(let i = 1; i<=length; i++){
        square(String(i), id);
    }
}
//Used to create grid of arbitrary size
function grid(length){
    for(let i=1; i<=length; i++){
        row(length, "row" + String(i));
    }
}

function drawFunction(event){
    console.log(event.type);
    console.log(drawing);
    if(drawing){
        this.style.backgroundColor = "black";
    }    
}
//Checks to see if you are drawing or not and updates the global variable drawing
function isDrawing(){    
    container.addEventListener("mouseleave", function(e){
        drawing = false;
    });
    container.addEventListener("mousedown", function(e){
        drawing = true;
    });
    container.addEventListener("mouseup", function(e){
        drawing = false;
    });
    
}
//The function that builds and draws the whole program
function draw(){  
    grid(16);
    isDrawing();

    boxes = document.querySelectorAll(".square");

    boxes.forEach((box)=> {
        box.addEventListener("mousemove", drawFunction);
        box.addEventListener("mousedown", (e) =>{
            box.style.backgroundColor = "black";
        });
    });

}

draw();