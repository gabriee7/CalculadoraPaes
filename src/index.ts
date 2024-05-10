import { Pao } from "./Pao.js";

document.getElementById("addRow").addEventListener("click", function (ev) {
    ev.preventDefault();
    const table = document.getElementById("myTable") as HTMLTableElement;
    
    const row = table.insertRow(-1);
    
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    
    cell1.innerHTML = `<input id="nomeIngredienteEscolha-1" list="ingredientes" class="form-control" placeholder="Escolha"><datalist id="ingredientes"></datalist>`;
    
    cell2.innerHTML = `<input type="number" step="0.01" class="form-control" placeholder="Percentual">`;
    
    cell3.innerHTML = ` <button type="button" class="btn btn-danger"><i class="bi bi-trash-fill"></i></button>`;
    
    cell3.querySelector("button").addEventListener("click", function () {
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
    }
    // else if(!nomeIngredienteInput.checkValidity()){
    //     alert("A primeira letra do nome do ingrediente deve ser maiuscula.")
    //     return
    // }

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
    }
    // else if(!nomePaoInput.checkValidity()){
    //     alert("A primeira letra do nome do pão deve ser maiuscula.");
    //     return;
    // }

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
                    <div class="col-12 col-sm-6 col-lg-4 p-1 card"><div class="card-body card-${pao.id}"><h5 class="card-title"><strong>${pao.nome}</strong></h5><p class="card-text">${pao.descricao}</p></div><div class="card-footer"><button id="pao-${pao.nome}" class="btn btn-secondary btn-sm btn-block" data-toggle="modal" data-target="#modalMostrarIngredientes">Abrir</button></div></div>`;
                    
                container.insertAdjacentHTML('beforeend', paoHTML);

                document.getElementById(`pao-${pao.nome}`).addEventListener('click', async function() {
                    await mostrarIngredientesPao(pao.nome);
                });
            });
        }
    } catch (error) {
        console.error('Erro ao renderizar os pães:', error);
    }
}

window.addEventListener('load', renderPaes);


async function mostrarIngredientesPao(paoNome) {
    try {
        const response = await fetch(`http://localhost/api/app.php/pao_ingredientes/id/18`);

        if (!response.ok) {
            console.error('Erro ao buscar ingredientes do pão:', response.statusText);
            return;
        }

        const ingredientes = await response.json();

        const tableBody = document.getElementById('tableIngredientes').querySelector('tbody');
        tableBody.innerHTML = '';

        ingredientes.forEach(ingrediente => {
            const row = document.createElement('tr');
            
            const cellNome = document.createElement('td');
            cellNome.textContent = ingrediente.nome;
            row.appendChild(cellNome);
            
            const cellPercentual = document.createElement('td');
            cellPercentual.textContent = ingrediente.percentual;
            row.appendChild(cellPercentual);
            
            tableBody.appendChild(row);
        });

        const modalTitle = document.getElementById('modalTitle');
        modalTitle.textContent = `${paoNome}`;

    } catch (error) {
        console.error('Erro ao mostrar os ingredientes do pão:', error);
    }
}

// Função para obter um objeto Pao com base no nome do pão
async function obterPaoPorNome(paoNome) {
    try {
        // Fazer uma requisição GET para a API com o nome do pão
        const response = await fetch(`http://localhost/api/app.php/pao_ingredientes/nome/${paoNome}`);
        
        // Verificar se a resposta está OK
        if (!response.ok) {
            throw new Error('Erro ao buscar o pão: ' + response.statusText);
        }

        // Converter a resposta para JSON
        const paoData = await response.json();

        // Verificar se paoData é um array não vazio
        if (!Array.isArray(paoData) || paoData.length === 0) {
            throw new Error('Dados de pão inválidos ou ausentes');
        }

        // Inicializar arrays para armazenar os ingredientes e percentuais
        const ingredientes = [];
        const percentuais = [];

        // Mapear `paoData` para criar os arrays de `ingredientes` e `percentuais`
        paoData.forEach(ingrediente => {
            ingredientes.push({ nome: ingrediente.nome });
            percentuais.push(ingrediente.percentual);
        });

        // Criar um objeto `Pao` com os dados recebidos
        const pao = new Pao(paoNome, '', percentuais, ingredientes);

        // Retornar o objeto `Pao`
        return pao;

    } catch (error) {
        console.error('Erro ao obter pão por nome:', error);
        return null; // Retornar null em caso de erro
    }
}

// Função para realizar o cálculo dos ingredientes ao clicar no botão "Calcular"
async function calcularIngredientes() {
    // Obter os valores de entrada do formulário
    const quantidadePaes = parseFloat((document.getElementById('quantidadePaes') as HTMLInputElement).value);
    const pesoUnitario = parseFloat((document.getElementById('pesoUnitario') as HTMLInputElement).value);
    const percentualAguaGelo = parseFloat((document.getElementById('percentualAguaGelo') as HTMLInputElement).value);

    // Obter o nome do pão atual no modal
    const paoNome = document.getElementById('modalTitle').textContent;

    // Fazer uma requisição GET para a API com o nome do pão para obter os ingredientes
    try {
        const response = await fetch(`http://localhost/api/app.php/pao_ingredientes/id/18`);
        
        // Verificar se a resposta está OK
        if (!response.ok) {
            throw new Error('Erro ao buscar ingredientes: ' + response.statusText);
        }
        

        // Converter a resposta para JSON
        const ingredientesData = await response.json();
        console.log('Ingredientes data:', ingredientesData, response.statusText);

        // // Verificar se a resposta contém dados válidos
        // if (!Array.isArray(ingredientesData) || ingredientesData.length === 0) {
        //     throw new Error('Dados de ingredientes inválidos ou ausentes');
        // }

        // Inicializar um array para armazenar os resultados
        const resultados = [];

        // Calcular os valores dos ingredientes
        const pesoFarinhaDeTrigo = 20559.67 * (quantidadePaes * pesoUnitario / (570 * 56));
        const proporcaoAguaEGelo = percentualAguaGelo / 100;
        const pesoAguaEGelo = proporcaoAguaEGelo * pesoFarinhaDeTrigo;

        // Calcular as quantidades dos ingredientes com base nos dados obtidos
        ingredientesData.forEach(ingrediente => {
            let quantidade;
            const percentual = ingrediente.percentual / 100;

            if (ingrediente.nome.toLowerCase() === 'água' || ingrediente.nome.toLowerCase() === 'gelo') {
                quantidade = percentual * pesoAguaEGelo;
            } else {
                quantidade = percentual * pesoFarinhaDeTrigo;
            }

            resultados.push({
                nome: ingrediente.nome,
                quantidade: quantidade.toFixed(2)
            });
        });

        // Mostrar o resultado no console
        console.log('Resultados do cálculo dos ingredientes:', resultados);
    } catch (error) {
        console.error('Erro ao calcular ingredientes:', error);
    }
}

// Adicione um evento de clique ao botão "Calcular"
const botaoCalcular = document.getElementById('btnPercentualAguaGelo');
botaoCalcular.addEventListener('click', calcularIngredientes);
