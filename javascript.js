const container = document.getElementById('grid');
let drawing = false;
let clicked = "none";
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
    div.style.backgroundColor = "rgb(" + 255 + "," + 255 + "," + 255 + ")";
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
    if(drawing&&clicked=="black"){
        this.style.backgroundColor = "rgb(" + 0 + "," + 0 + "," + 0 + ")";
    } 
    else if(drawing&&clicked=="random"){
        let r = Math.random()*256;
        let g = Math.random()*256;
        let b = Math.random()*256;
        this.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
    }   
    else if(drawing&&clicked=="gradient"){
        console.log(this.style.backgroundColor);
        let colour = this.style.backgroundColor;
        let numberPattern = /\d+/g;
        let rgbValueStr = colour.match(numberPattern);
        let rgbValueNum = [];
        for(let i=0; i<rgbValueStr.length; i++){
            rgbValueNum.push(Number(rgbValueStr[i]));
        }
        console.log(rgbValueNum);
        colour = rgbValueNum[0] - 25.5;
        this.style.backgroundColor = "rgb(" + colour + "," + colour + "," + colour + ")";
    }
}

function drawMouseDown(e){
    if(clicked=="black"){
        this.style.backgroundColor = "rgb(" + 0 + "," + 0 + "," + 0 + ")";
    } 
    else if(clicked=="random"){
        let r = Math.random()*256;
        let g = Math.random()*256;
        let b = Math.random()*256;
        this.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
    }   
    else if(clicked=="gradient"){
        console.log(this.style.backgroundColor);
        let colour = this.style.backgroundColor;
        let numberPattern = /\d+/g;
        let rgbValueStr = colour.match(numberPattern);
        let rgbValueNum = [];
        for(let i=0; i<rgbValueStr.length; i++){
            rgbValueNum.push(Number(rgbValueStr[i]));
        }
        console.log(rgbValueNum);
        colour = rgbValueNum[0] - 25.5;
        this.style.backgroundColor = "rgb(" + colour + "," + colour + "," + colour + ")";
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
    
    output.innerHTML = String(slider.value) + " x " + String(slider.value);

    slider.oninput = () =>{
        output.innerHTML = String(slider.value) + " x " + String(slider.value);  
        length = slider.value;
        removeGrid();
        draw();  
    }

}
function randomColor(e){
    clicked = "random";

    boxes.forEach((box)=> {
        box.addEventListener("mouseenter", drawFunction);
        box.addEventListener("mousedown", drawMouseDown);
    }); 
}
function blackColor(e){
    clicked = "black";

    boxes.forEach((box)=> {
        box.addEventListener("mouseenter", drawFunction);
        box.addEventListener("mousedown", drawMouseDown);
    });
}
function percentColor(e){
    clicked = "gradient";

    boxes.forEach((box)=> {
        box.addEventListener("mouseenter", drawFunction);
        box.addEventListener("mousedown",  drawMouseDown);
    });
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
    random = document.getElementById("random");
    black = document.getElementById("black");
    percent = document.getElementById("percent");

    //Checks to see if you click on the clear button and resets grid if you do
    button.addEventListener("click", (e) =>{
        boxes.forEach((box) => {
            box.style.backgroundColor = "rgb(" + 255 + "," + 255 + "," + 255 + ")";;
        });
    });
    //Random button is pressed which allows for random colours
    random.addEventListener("click", randomColor);
    //Allow for gradual 10% black increase
    percent.addEventListener("click", percentColor);
    //Used to switch colour back to black
    black.addEventListener("click", blackColor);
    //Used to fill in the squares with black if grid is interacted with. (On by default)

}

draw();