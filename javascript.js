//Used to create a single square in the grid
function square(id){
    const div = document.createElement('div');
    const row = document.querySelector('.row');
    div.setAttribute('id', id);
    div.setAttribute('class', "square");
    div.style.width = "16px";
    div.style.height = "16px";
    row.appendChild(div);
}
//Used to create singular row of arbitrary size
function row(length){
    const row = document.createElement('div');
    const grid = document.getElementById('grid');
    grid.appendChild(row);
    row.setAttribute('class', 'row');
    for(let i = 1; i<=length; i++){
        square(String(i));
    }
}
//Used to create grid of arbitrary size
function grid(length){

}

row(16);
//row(10);
//row(10);
