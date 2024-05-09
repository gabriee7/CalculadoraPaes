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
        const response = await fetch("http://localhost/api/app.php/ingrediente");
        
        if (response.ok) {
            const ingredientes = await response.json();

            datalist.innerHTML = "";

            ingredientes.forEach((ingrediente) => {
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
        const response = await fetch("http://localhost/api/app.php/ingrediente", {
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


async function addPao() {
    const nomePaoInput = document.getElementById("inputNomePao") as HTMLInputElement;
    const descricaoPaoInput = document.getElementById("inputDescricaoPao") as HTMLInputElement;
    const table = document.getElementById("myTable");


    if (!nomePaoInput || !descricaoPaoInput || !table) {
        console.error("Elementos de entrada ou tabela não encontrados.");
        alert("Erro: Elementos de entrada ou tabela não encontrados.");
        return;
    }

    const nomePao = nomePaoInput.value;
    const descricaoPao = descricaoPaoInput.value;

    if (nomePao.trim() === "") {
        alert("Por favor, insira um nome para o pão.");
        return;
    }

    if (descricaoPao.trim() === "") {
        alert("Por favor, insira uma descrição para o pão.");
        return;
    }

    const rows = Array.from(table.querySelectorAll("tr"));


    const ingredientes = [];

    for (const row of rows) {
        const cells = row.querySelectorAll("td");
        
        if (cells.length < 2) {
            continue;
        }

        const ingredienteInput = cells[0].querySelector("input") as HTMLInputElement;
        const percentualInput = cells[1].querySelector("input") as HTMLInputElement;

        if (!ingredienteInput || !percentualInput) {
            continue;
        }

        const ingrediente = ingredienteInput.value;
        const percentual = parseFloat(percentualInput.value);

        if (ingrediente.trim() !== "" && !isNaN(percentual)) {
            ingredientes.push({ ingrediente, percentual });
        }
    }
    const response = await fetch("http://localhost/api/app.php/pao", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nome: nomePao,
            descricao: descricaoPao,
            ingredientes,
        }),
    });

    if (response.ok) {
        alert("Pão adicionado com sucesso.");
        nomePaoInput.value = "";
        descricaoPaoInput.value = "";
    } else {
        alert("Erro ao adicionar o pão.");
    }
}

const btnSalvarPao = document.getElementById("btnSalvarPao") as HTMLButtonElement;
btnSalvarPao.addEventListener("click", addPao);
