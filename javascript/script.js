let form = document.getElementById('form');
let rName = document.getElementById('recipeName');
let ing = document.getElementById('ingreidents');
let cusine = document.getElementById('cusine');
let instruction = document.getElementById('instruction');
let data = document.querySelector("#table tbody");
let update = document.getElementById('updt');
let collect = JSON.parse(localStorage.getItem("collect")) || [];
let edit=-1;

rName.focus();
form.addEventListener('submit', (e) => {
    e.preventDefault();

    let obj = {
        rName: rName.value,
        ing: ing.value,
        cusine: cusine.value,
        instruction: instruction.value
    }
    if (edit == -1) {
        collect.push(obj);
    }
    else {
        collect[edit] = obj;
        edit = -1;
        update.innerText = "Let's Check";
        update.classList.remove('btn-primary');
        update.classList.add('btn-info');
    }
    // console.log(obj);
 
    localStorage.setItem("collect", JSON.stringify(collect));
    rName.value = " ";
    ing.value = " ";
    cusine.value = " ";
    instruction.value = " ";
    rName.focus();
    displayRecipes();
})
const displayRecipes = () => {
    data.innerHTML = '';
    collect.map((obj, index) => {
        let row = document.createElement('tr');

        row.innerHTML =
            `
    <td>${index + 1}</td>
    <td>${obj.rName}</td>
    <td>${obj.ing}</td>
    <td>${obj.cusine}</td>
    <td>${obj.instruction}</td>
     <td>
         
        <button class="btn btn-danger" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" onclick="deleteRecipe(${index})" >

        <i class="fas fa-trash-alt"></i> 
        </button>

        <button class="btn btn-warning" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit" onclick="editRecipe(${index})">
        <i class="fas fa-edit"></i> 
        
        </button>
             </td>
    `
        data.append(row);
    })
}

let editRecipe = (index) => {
    rName.focus();
    let taste = collect.filter((_, idx) => idx == index)[0];

    rName.value = taste.rName;
    ing.value=taste.ing;
    cusine.value=taste.cusine;
    instruction.value=taste.instruction;

    update.innerText = "Update";
    update.classList.remove('btn-info');
    update.classList.add('btn-primary');
    edit = index;
}
let deleteRecipe = (index) => {
    collect.splice(index, 1);
    localStorage.setItem("collect", JSON.stringify(collect));

    displayRecipes();
}
displayRecipes();