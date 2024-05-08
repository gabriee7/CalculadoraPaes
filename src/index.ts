document.getElementById("addRow").addEventListener("click", function(ev) {
    ev.preventDefault();
    var table = document.getElementById("myTable") as HTMLTableElement;
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = '<td><input id="nomeIngredienteEscolha-1" list="ingredientes" class="form-control" placeholder="Escolha"><datalist id="ingredientes"></datalist></td><td>';
    cell2.innerHTML =' <input type="number" step="0.01" class="form-control" placeholder="Percentual"></td>';
});

document.addEventListener("DOMContentLoaded", function() {
    const btnAddIngrediente = document.getElementById("btnSalvarIngrediente") as HTMLButtonElement;


    btnAddIngrediente.addEventListener("click", addIngrediente);
});


document.addEventListener("DOMContentLoaded", loadIngredientes);
async function loadIngredientes() {
    const datalist = document.getElementById("ingredientes");

    try {
        const response = await fetch("http://localhost/api/app.php/ingredientes");
        
        if (response.ok) {
            const ingredientes = await response.json();

            datalist.innerHTML = "";

            ingredientes.forEach((ingrediente) => {
                console.log(ingrediente);
                const option = document.createElement("option");
                option.value = ingrediente.nome; 
                datalist.appendChild(option);
            });
        } else {
            console.error("Erro ao buscar os ingredientes:", response.statusText);
        }
    } catch (error) {
        console.error("Erro ao buscar os ingredientes:", error);
    }
};

async function addIngrediente(){
    const nomeIngredienteInput = document.getElementById("nomeIngrediente") as HTMLInputElement;
    const nomeIngrediente = nomeIngredienteInput.value;

    if (nomeIngrediente.trim() === "") {
        alert("Por favor, insira um nome para o ingrediente.");
        return;
    }

    try {
        const response = await fetch("http://localhost/api/app.php/ingredientes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nome: nomeIngrediente,
            }),
        });

        if (response.ok) {
            alert("Ingrediente adicionado com sucesso.");
            nomeIngredienteInput.value = "";
        } else {
            alert("Erro ao adicionar o ingrediente.");
        }
    } catch (error) {
        console.error("Erro ao adicionar o ingrediente:", error);
        alert("Erro ao adicionar o ingrediente.");
    }
}