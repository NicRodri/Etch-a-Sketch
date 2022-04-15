const container = document.getElementById('grid');
let drawing = false;
let length = 16;

//Used to calculate the size the squares should be so that the overall grid doesnt change in size
function pixelSize(length){
    let pixel = 0;
    let gridSide = 600;
    pixel = (gridSide/length) -2;
    return String(pixel);
}
//Used to create a single square in the grid
function square(...id){
    const div = document.createElement('div');
    const row = document.getElementById(id[1]);
    div.setAttribute('class', id[0]);
    div.classList.add('square');
    div.style.width = pixelSize(length)+"px";
    div.style.height = pixelSize(length)+"px";
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
//Used to fill in each indivdual square
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
//Used to remove the grid for the slider when slider is used
function removeGrid(){
    while (container.firstChild){
        container.firstChild.remove();
    }
}
//Used to allow a change in size to the grid
function slider(){

    let slider = document.getElementById("myRange");
    let output = document.getElementById("output");
    
    output.innerHTML = slider.value;

    slider.oninput = () =>{
        output.innerHTML = slider.value;  
        length = output.textContent;
        removeGrid();
        draw();  
    }

}
//The function that builds and draws the whole program
function draw(){ 

    //Creates the grid
    grid(length);
    //Allows for slider to interact with grid
    slider();
    //Checks to see if you are drawing
    isDrawing();

    button = document.getElementById("clear");
    boxes = document.querySelectorAll(".square");

    button.addEventListener("click", (e) =>{
        boxes.forEach((box) => {
            box.style.backgroundColor = "white";
        });
    });

    boxes.forEach((box)=> {
        box.addEventListener("mousemove", drawFunction);
        box.addEventListener("mousedown", (e) =>{
            box.style.backgroundColor = "black";
        });
    });

}

draw();