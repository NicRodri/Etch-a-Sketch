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
    div.style.backgroundColor = "white";
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
    //console.log(clicked);
    if(drawing&&clicked=="black"){
        this.style.backgroundColor = "black";
    } 
    else if(drawing&&clicked=="random"){
        let r = Math.random()*256;
        let g = Math.random()*256;
        let b = Math.random()*256;
        this.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
    }   
    else if(drawing&&clicked=="gradient"){
        console.log(this.style.backgroundColor);
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
function actionListener(){

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
            box.style.backgroundColor = "white";
        });
    });
    //Random button is pressed which allows for random colours
    random.addEventListener("click", (e) =>{
        clicked = "random";
        boxes.forEach((box)=> {
            box.addEventListener("mousemove", drawFunction);
            box.addEventListener("mousedown", (e) =>{
                let r = Math.random()*256;
                let g = Math.random()*256;
                let b = Math.random()*256;
                box.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
            });
        }); 
    });
    percent.addEventListener("click", (e)=>{
        clicked = "gradient";
        let colour = 255;
        boxes.forEach((box)=> {
            box.style.backgroundColor = "rgb(" + colour + "," + colour + "," + colour + ")";
            box.addEventListener("mousemove", drawFunction);
            box.addEventListener("mousedown", (e) =>{
                
                colour = box.style.backgroundColor;
                console.log(colour);
                console.log(colour.replace(/rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})[^\)]/g,''));
                console.log(colour.replace(/([^\d{1,3}])/g,''));
                //console.log(colour.replace(/[\(|\)|,]/g,''));
                //box.style.backgroundColor = "rgb(" + colour + "," + colour + "," + colour + ")";
                colour = colour -"rgb(25.5,25.5,25.5)";
                console.log(colour);
                box.style.backgroundColor = "rgb(" + colour + "," + colour + "," + colour + ")";
            });
        }); 
    });
    //Used to switch colour back to black
    black.addEventListener("click", (e) =>{
        clicked = "black";
        boxes.forEach((box)=> {
            
            box.addEventListener("mousemove", drawFunction);
            box.addEventListener("mousedown", (e) =>{
                box.style.backgroundColor = "black";
            });
        });
    });
    //Used to fill in the squares with black if grid is interacted with. (On by default)

    


}

draw();