//Used to create a single square in the grid
function square(...id){
    const div = document.createElement('div');
    const row = document.getElementById(id[1]);
    div.setAttribute('id', id[0]);
    div.setAttribute('class', "square");
    div.style.width = "16px";
    div.style.height = "16px";
    row.appendChild(div);
    
}
//Used to create singular row of arbitrary size
function row(length, id){
    const row = document.createElement('div');
    const grid = document.getElementById('grid');
    grid.appendChild(row);
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

grid(16);