import { Pao } from "./Pao.js";

document.getElementById("addRow").addEventListener("click", function (ev) {
    ev.preventDefault();
    const table = document.getElementById("myTable") as HTMLTableElement;
    
    const row = table.insertRow(-1);
    
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    
    cell1.innerHTML = `<input id="nomeIngredienteEscolha" list="ingredientes" class="form-control" placeholder="Escolha"><datalist id="ingredientes"></datalist>`;
    
    cell2.innerHTML = `<input type="number" step="0.01" class="form-control" placeholder="Percentual">`;
    
    cell3.innerHTML = ` <button type="button" class="btn btn-danger"><i class="bi bi-trash-fill"></i></button>`;
    const inputNomeIngrediente = cell1.querySelector('#nomeIngredienteEscolha') as HTMLInputElement;
    inputNomeIngrediente.focus();
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
                    <div class="col-12 col-sm-6 col-lg-4 p-1 card"><div class="card-body card-${pao.id}"><h5 class="card-title"><strong>${pao.nome}</strong></h5><p class="card-text">${pao.descricao}</p></div><div class="card-footer"><button id="pao-${pao.id}" class="btn btn-secondary btn-sm btn-block" data-toggle="modal" data-target="#modalMostrarIngredientes">Abrir</button></div></div>`;
                    
                container.insertAdjacentHTML('beforeend', paoHTML);

                document.getElementById(`pao-${pao.id}`).addEventListener('click', async function() {
                    await mostrarIngredientesPao(pao.id, pao.nome);
                });
            });
        }
    } catch (error) {
        console.error('Erro ao renderizar os pães:', error);
    }
}

window.addEventListener('load', renderPaes);


async function mostrarIngredientesPao(paoID, paoNome) {
    try {
        const response = await fetch(`http://localhost/api/app.php/pao_ingredientes/id/${paoID}`);

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
            cellPercentual.textContent = trataVirgula(ingrediente.percentual.toFixed(2));
            cellPercentual.style.setProperty('text-align-last', 'end');
            row.appendChild(cellPercentual);
            
            tableBody.appendChild(row);
        });

        const btnCalcular = document.querySelector('.btnPercentualAguaGelo');
        btnCalcular.id = 'pao-${paoID}';
        btnCalcular.addEventListener('click', async function () {
            await calcularIngredientes(paoID, paoNome);            
        });

        const modalTitle = document.getElementById('modalTitle');
        modalTitle.textContent = `${paoNome}`;

    } catch (error) {
        console.error('Erro ao mostrar os ingredientes do pão:', error);
    }
}

//     try {
//         // Fazer uma requisição GET para a API com o nome do pão
//         const response = await fetch(`http://localhost/api/app.php/pao_ingredientes/nome/${paoNome}`);
        
//         // Verificar se a resposta está OK
//         if (!response.ok) {
//             throw new Error('Erro ao buscar o pão: ' + response.statusText);
//         }

//         const paoData = await response.json();

//         // Verificar se paoData é um array não vazio
//         if (!Array.isArray(paoData) || paoData.length === 0) {
//             throw new Error('Dados de pão inválidos ou ausentes');
//         }

//         const ingredientes = [];
//         const percentuais = [];

//         paoData.forEach(ingrediente => {
//             ingredientes.push({ nome: ingrediente.nome });
//             percentuais.push(ingrediente.percentual);
//         });

//         const pao = new Pao(paoNome, '', percentuais, ingredientes);

//         return pao;

//     } catch (error) {
//         console.error('Erro ao obter pão por nome:', error);
//         return null; // Retornar null em caso de erro
//     }
// }

async function calcularIngredientes(paoID, paoNome) {
    let pesoMassa =0;
    let pesoM = 0;
    const table = document.getElementById('tableCalculadora');
    const percentualAguaGelo = parseFloat((document.getElementById('inputPercentualAguaGelo') as HTMLInputElement).value);
    let nomesPaes: [String, Number][] = [];
    let quantidadePaes= 0;
    let pesoUnitario = 0;

    const tbody = table.querySelector('tbody')
    const rows = Array.from(tbody.querySelectorAll("tr"));

    for (const row of rows) {
        const cells = row.querySelectorAll("td");

        const nomeInput = cells[0].querySelector("input") as HTMLInputElement;
        const quantidadeInput = cells[1].querySelector("input") as HTMLInputElement;
        const pesoInput = cells[2].querySelector("input") as HTMLInputElement;

        if (!nomeInput || !quantidadeInput || !pesoInput) {
            continue;
        }

        const nome = nomeInput.value;
        const quantidade = parseFloat(quantidadeInput.value);
        const peso = parseFloat(pesoInput.value);

        if (nome.trim() === "") {
            alert("Por favor, insira um nome");
            return;
        }

        if (isNaN(peso) || isNaN(quantidade)) {
            alert("Por favor, insira um peso válido para o quantidade ou peso.");
            return;
        }

        nomesPaes.push([nome, quantidade]);
        quantidadePaes = quantidade;
        pesoUnitario = peso;
        pesoM += quantidade * peso;
        // pesoMassa += (quantidadePaes * pesoUnitario / (570 * 56));
        console.log(quantidade, peso, pesoM);
        
    }
    pesoM+= 20;
    // console.log(pesoM);
    

    if(isNaN(quantidadePaes) || isNaN(pesoUnitario) || isNaN(percentualAguaGelo)){
        alert("Informe os campos corretamente.")
        return
    }

    
    try {
        const response = await fetch(`http://localhost/api/app.php/pao_ingredientes/id/${paoID}`);
        
        if (!response.ok) {
            throw new Error('Erro ao buscar ingredientes: ' + response.statusText);
        }
        

        const ingredientesData = await response.json();

        //RECEITA NOVA
        let percentualTotalIngredientes = 0;
        ingredientesData.forEach(ingrediente => {
            if(!compararStrings(ingrediente.nome, 'agua') && !compararStrings(ingrediente.nome, 'gelo') && !compararStrings(ingrediente.nome, 'Agua e gelo' )){
                percentualTotalIngredientes += ingrediente.percentual;
            }
        })
        percentualTotalIngredientes += percentualAguaGelo
        console.log(percentualTotalIngredientes);
        
        console.log(`Percentual total de ingrediente: ${percentualTotalIngredientes} ||| ${(pesoM * 100)/ percentualTotalIngredientes}`);
        
        //FIM RECEITA NOVA (falta incluir a margem de sobra ex. 1.05)

        const resultados = [];

        const pesoFarinhaDeTrigo = (pesoM * 100)/ percentualTotalIngredientes;
        const proporcaoAguaEGelo = percentualAguaGelo / 100;
        const pesoAguaEGelo = proporcaoAguaEGelo * pesoFarinhaDeTrigo;

        ingredientesData.forEach(ingrediente => {
            let quantidade;
            const percentual = ingrediente.percentual / 100;

            if (ingrediente.nome.toLowerCase() === 'água' || ingrediente.nome.toLowerCase() === 'gelo') {
                quantidade = percentual * pesoAguaEGelo;
            }else if(compararStrings(ingrediente.nome, 'agua e gelo')){
                quantidade = proporcaoAguaEGelo * pesoFarinhaDeTrigo;
            } else {
                quantidade = percentual * pesoFarinhaDeTrigo;
            }

            resultados.push({
                nome: ingrediente.nome,
                quantidade: quantidade.toFixed(2)
            });
        });

        // console.log('Resultados do cálculo dos ingredientes do pão '+paoNome+':', resultados);

        gerarPDF(nomesPaes,resultados, paoNome);
    } catch (error) {
        console.error('Erro ao calcular ingredientes:', error);
    }
}

document.getElementById("addRowCalc").addEventListener("click", function (ev) {
    ev.preventDefault();
    const table = document.getElementById("tableCalculadora") as HTMLTableElement;
    
    const row = table.insertRow(-1);
    
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    
    cell1.innerHTML = `<input type="text" class="form-control" id="nomePaoC" placeholder="Pão">`;
    
    cell2.innerHTML = `<input type="number" class="form-control" id="quantidadePaes" placeholder="Quantidade">`;
    
    cell3.innerHTML = `<input type="number" class="form-control" id="pesoUnitario" placeholder="Peso Unitário">`;

    cell4.innerHTML = ` <button type="button" class="btn btn-danger"><i class="bi bi-trash-fill"></i></button>`;
    
    const inputNomePaoC = cell1.querySelector('#nomePaoC') as HTMLInputElement;
    inputNomePaoC.focus();
    cell4.querySelector("button").addEventListener("click", function () {
        row.remove();
    });
});


async function gerarPDF(nomesPaes, resultados, nomePao) {

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const title = `Receita ${nomePao}`;
    const pageWidth = doc.internal.pageSize.width;
    const titleWidth = doc.getTextWidth(title);
    const titleX = (pageWidth - titleWidth) / 2;
    const titleY = 20;

    doc.text(title, titleX, titleY);

    let yPosition = titleY + 20;

    if (!Array.isArray(resultados)) {
        console.error('Resultados não são um array válido');
        return;
    }

    const drawTableBorders = (doc, xStart, yStart, width, height, numRows, numCols) => {
        doc.rect(xStart, yStart, width, height);

        const rowHeight = height / numRows;
        for (let i = 1; i < numRows; i++) {
            const y = yStart + (i * rowHeight);
            doc.line(xStart, y, xStart + width, y);
        }

        const colWidth = width / numCols;
        for (let i = 1; i < numCols; i++) {
            const x = xStart + (i * colWidth)+20;
            doc.line(x, yStart, x, yStart + height);
        }
    };

    for (let i = 0; i < nomesPaes.length; i++) {
        const [nomePao, quantidade] = nomesPaes[i];

        const linhaPao = `Pão: ${nomePao}   Quantidade: ${quantidade}`;
        doc.text(linhaPao, 20, yPosition);
        yPosition += 10;
    }
    yPosition += 2;

    doc.text("Ingrediente", 25, yPosition);
    doc.text("Quantidade em Gramas", 127, yPosition);
    yPosition += 10;

    const tableStartY = yPosition - 18;
    const numCols = 2;
    const numRows = resultados.length + 1; // Inclui cabeçalhos

    resultados.forEach((ingrediente) => {
        const ingredienteText = `${ingrediente.nome}`;
        const quantidadeText = `${ingrediente.quantidade}`;
        

        doc.text(ingredienteText, 25, yPosition);

        doc.text(trataVirgula(quantidadeText), 133, yPosition);

        yPosition += 10;
    });

    drawTableBorders(doc, 20, tableStartY, pageWidth - 40, (numRows * 10), numRows, numCols);

    yPosition += 20;

    nomePao = nomePao.toLowerCase();
    nomePao = nomePao.replace(" " || "-", "_");
    const pdfDataUri = doc.output('datauristring');
    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');

}

function compararStrings(string1: string, string2: string): boolean {
    const regex = new RegExp((string1 as any).normalize("NFD").replace(/[\u0300-\u036f]/g, ""), 'i');
    return regex.test((string2 as any).normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
}

function trataVirgula(valor){
    let newValor = valor.toString();
    newValor = newValor.replace('.',',');
    
    if (newValor.length > 6) {
        newValor = newValor.slice(0, -6) + '.' + newValor.slice(-6);
    }
    
    return newValor;
}