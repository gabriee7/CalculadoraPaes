document.getElementById("addRow").addEventListener("click", function (ev) {
    ev.preventDefault();
    const table = document.getElementById("myTable") as HTMLTableElement;
    
    // Adiciona uma nova linha à tabela
    const row = table.insertRow(-1);
    
    // Cria as células para a nova linha
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    
    // Adiciona o input para o ingrediente na primeira célula
    cell1.innerHTML = `
        <input id="nomeIngredienteEscolha-1" list="ingredientes" class="form-control" placeholder="Escolha">
        <datalist id="ingredientes"></datalist>
    `;
    
    // Adiciona o input para o percentual na segunda célula
    cell2.innerHTML = `
        <input type="number" step="0.01" class="form-control" placeholder="Percentual">
    `;
    
    // Adiciona o botão para excluir a linha na terceira célula
    cell3.innerHTML = `
        <button type="button" class="btn btn-danger"><i class="bi bi-trash-fill"></i></button>
    `;
    
    // Adiciona um evento de clique ao botão para excluir a linha
    cell3.querySelector("button").addEventListener("click", function () {
        // Remove a linha associada ao botão
        row.remove();
    });
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
    }else if(!nomeIngredienteInput.checkValidity()){
        alert("A primeira letra do nome do ingrediente deve ser maiuscula.")
        return
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
            loadIngredientes()
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
        alert("Erro: Elementos de entrada ou tabela não encontrados.");
        return;
    }else if(!nomePaoInput.checkValidity()){
        alert("A primeira letra do nome do pão deve ser maiuscula.");
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

        if (percentualInput.value.trim() === "") {
            alert("Por favor, insira um percentual válido para o ingrediente.");
            return;
        }

        if (isNaN(percentual)) {
            alert("Por favor, insira um percentual válido para o ingrediente.");
            return;
        }

        ingredientes.push({ ingrediente, percentual });
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
        renderPaes();
    } else {
        alert("Erro ao adicionar o pão.");
    }
}

const btnSalvarPao = document.getElementById("btnSalvarPao") as HTMLButtonElement;
btnSalvarPao.addEventListener("click", addPao);

async function renderPaes() {
    try {
        const response = await fetch('http://localhost/api/app.php/pao');

        if (!response.ok) {
            throw new Error('Erro ao buscar os pães');
        }

        const contentType = response.headers.get('Content-Type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Resposta não é JSON');
        }

        const responseText = await response.text();
        const paes = JSON.parse(responseText);
    
        const container = document.querySelector('.cards-paes');
        container.innerHTML = ""

        if (!container) {
            throw new Error('Container para os pães não encontrado');
        }
        if (paes.length === 0) {
            const h4 = document.createElement('h4');
            h4.textContent = "Nenhum pão encontrado.";
            container.appendChild(h4);
        } else {
            paes.forEach(pao => {
                const paoHTML = `
                    <div class="col-12 col-sm-6 col-lg-4 p-1 card"><div class="card-body card-${pao.id}"><h5 class="card-title"><strong>${pao.nome}</strong></h5><p class="card-text">${pao.descricao}</p></div><div class="card-footer"><button id="pao-${pao.id}" class="btn btn-secondary btn-sm btn-block">Abrir</button></div></div>`;
                    
                container.insertAdjacentHTML('beforeend', paoHTML);
            });
        }
    } catch (error) {
        console.error('Erro ao renderizar os pães:', error);
    }
}

window.addEventListener('load', renderPaes);