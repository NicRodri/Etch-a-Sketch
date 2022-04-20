const container = document.getElementById('grid');
let drawing = false;
let clicked = "black";
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
//Used to simplify the colour setup to reduce duplicate code
function colorSetup(colour){
    if(clicked == "random"){
        let r = Math.random()*256;
        let g = Math.random()*256;
        let b = Math.random()*256;
        let rgb = [r, g, b];
        return rgb;
    }
    else if(clicked == "gradient"){
        let numberPattern = /\d+/g;
        let rgbValueStr = colour.match(numberPattern);
        let rgbValueNum = [];
        for(let i=0; i<rgbValueStr.length; i++){
            rgbValueNum.push(Number(rgbValueStr[i]));
        }
        colour = rgbValueNum[0] - 25.5;
        return colour;
    }
}
//Used to fill in each indivdual square when mousedown and moving
function drawFunction(e){
    if(drawing&&clicked=="black"){
        this.style.backgroundColor = "rgb(" + 0 + "," + 0 + "," + 0 + ")";
    } 
    else if(drawing&&clicked=="random"){
        let rgb = colorSetup();
        this.style.backgroundColor = "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
    }   
    else if(drawing&&clicked=="gradient"){
        let colour = colorSetup(this.style.backgroundColor);
        this.style.backgroundColor = "rgb(" + colour + "," + colour + "," + colour + ")";
    }
}
//Used to fill one square only if mousedown
function drawMouseDown(e){
    if(clicked=="black"){
        this.style.backgroundColor = "rgb(" + 0 + "," + 0 + "," + 0 + ")";
    } 
    else if(clicked=="random"){
        let rgb = colorSetup();
        this.style.backgroundColor = "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
    }   
    else if(clicked=="gradient"){
        let colour = colorSetup(this.style.backgroundColor);
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
//Waits to see when drawing and draws when event occurs
function drawEvents(){
    boxes.forEach((box)=> {
        box.addEventListener("mouseenter", drawFunction);
        box.addEventListener("mousedown", drawMouseDown);
    }); 
}
//Sets the color to random
function randomColor(e){
    clicked = "random";
    drawEvents();
}
//Sets the color to black
function blackColor(e){
    clicked = "black";
    drawEvents();
}
//Sets the color to increases in black percentage
function percentColor(e){
    clicked = "gradient";
    drawEvents();
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
    //Allows you to draw in black by default.
    drawEvents();
    //Random button is pressed which allows for random colours
    random.addEventListener("click", randomColor);
    //Allow for gradual 10% black increase
    percent.addEventListener("click", percentColor);
    //Used to switch colour back to black
    black.addEventListener("click", blackColor);
}

draw();