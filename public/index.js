var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
document.getElementById("addRow").addEventListener("click", function (ev) {
    ev.preventDefault();
    var table = document.getElementById("myTable");
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = "<input id=\"nomeIngredienteEscolha\" list=\"ingredientes\" class=\"form-control\" placeholder=\"Escolha\"><datalist id=\"ingredientes\"></datalist>";
    cell2.innerHTML = "<input type=\"number\" step=\"0.01\" class=\"form-control\" placeholder=\"Percentual\">";
    cell3.innerHTML = " <button type=\"button\" class=\"btn btn-danger\"><i class=\"bi bi-trash-fill\"></i></button>";
    var inputNomeIngrediente = cell1.querySelector('#nomeIngredienteEscolha');
    inputNomeIngrediente.focus();
    cell3.querySelector("button").addEventListener("click", function () {
        row.remove();
    });
});
document.addEventListener("DOMContentLoaded", function () {
    var btnAddIngrediente = document.getElementById("btnSalvarIngrediente");
    btnAddIngrediente.addEventListener("click", addIngrediente);
});
document.addEventListener("DOMContentLoaded", loadIngredientes);
function loadIngredientes() {
    return __awaiter(this, void 0, void 0, function () {
        var datalist, response, ingredientes, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    datalist = document.getElementById("ingredientes");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch("http://localhost/api/app.php/ingrediente")];
                case 2:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    ingredientes = _a.sent();
                    datalist.innerHTML = "";
                    ingredientes.forEach(function (ingrediente) {
                        var option = document.createElement("option");
                        option.value = ingrediente.nome;
                        datalist.appendChild(option);
                    });
                    return [3 /*break*/, 5];
                case 4:
                    console.error("Erro ao buscar os ingredientes:", response.statusText);
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.error("Erro ao buscar os ingredientes:", error_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
;
function addIngrediente() {
    return __awaiter(this, void 0, void 0, function () {
        var nomeIngredienteInput, nomeIngrediente, response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nomeIngredienteInput = document.getElementById("nomeIngrediente");
                    nomeIngrediente = nomeIngredienteInput.value;
                    if (nomeIngrediente.trim() === "") {
                        alert("Por favor, insira um nome para o ingrediente.");
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch("http://localhost/api/app.php/ingrediente", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                nome: nomeIngrediente,
                            }),
                        })];
                case 2:
                    response = _a.sent();
                    if (response.ok) {
                        alert("Ingrediente adicionado com sucesso.");
                        nomeIngredienteInput.value = "";
                        loadIngredientes();
                    }
                    else {
                        alert("Erro ao adicionar o ingrediente.");
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error("Erro ao adicionar o ingrediente:", error_2);
                    alert("Erro ao adicionar o ingrediente.");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function addPao() {
    return __awaiter(this, void 0, void 0, function () {
        var nomePaoInput, descricaoPaoInput, table, nomePao, descricaoPao, rows, ingredientes, _i, rows_1, row, cells, ingredienteInput, percentualInput, ingrediente, percentual, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nomePaoInput = document.getElementById("inputNomePao");
                    descricaoPaoInput = document.getElementById("inputDescricaoPao");
                    table = document.getElementById("myTable");
                    if (!nomePaoInput || !descricaoPaoInput || !table) {
                        alert("Erro: Elementos de entrada ou tabela não encontrados.");
                        return [2 /*return*/];
                    }
                    nomePao = nomePaoInput.value;
                    descricaoPao = descricaoPaoInput.value;
                    if (nomePao.trim() === "") {
                        alert("Por favor, insira um nome para o pão.");
                        return [2 /*return*/];
                    }
                    if (descricaoPao.trim() === "") {
                        alert("Por favor, insira uma descrição para o pão.");
                        return [2 /*return*/];
                    }
                    rows = Array.from(table.querySelectorAll("tr"));
                    ingredientes = [];
                    for (_i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
                        row = rows_1[_i];
                        cells = row.querySelectorAll("td");
                        if (cells.length < 2) {
                            continue;
                        }
                        ingredienteInput = cells[0].querySelector("input");
                        percentualInput = cells[1].querySelector("input");
                        if (!ingredienteInput || !percentualInput) {
                            continue;
                        }
                        ingrediente = ingredienteInput.value;
                        percentual = parseFloat(percentualInput.value);
                        if (percentualInput.value.trim() === "") {
                            alert("Por favor, insira um percentual válido para o ingrediente.");
                            return [2 /*return*/];
                        }
                        if (isNaN(percentual)) {
                            alert("Por favor, insira um percentual válido para o ingrediente.");
                            return [2 /*return*/];
                        }
                        ingredientes.push({ ingrediente: ingrediente, percentual: percentual });
                    }
                    return [4 /*yield*/, fetch("http://localhost/api/app.php/pao", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                nome: nomePao,
                                descricao: descricaoPao,
                                ingredientes: ingredientes,
                            }),
                        })];
                case 1:
                    response = _a.sent();
                    if (response.ok) {
                        alert("Pão adicionado com sucesso.");
                        nomePaoInput.value = "";
                        descricaoPaoInput.value = "";
                        renderPaes();
                    }
                    else {
                        alert("Erro ao adicionar o pão.");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
var btnSalvarPao = document.getElementById("btnSalvarPao");
btnSalvarPao.addEventListener("click", addPao);
function renderPaes() {
    return __awaiter(this, void 0, void 0, function () {
        var response, contentType, responseText, paes, container_1, h4, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('http://localhost/api/app.php/pao')];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Erro ao buscar os pães');
                    }
                    contentType = response.headers.get('Content-Type');
                    if (!contentType || !contentType.includes('application/json')) {
                        throw new Error('Resposta não é JSON');
                    }
                    return [4 /*yield*/, response.text()];
                case 2:
                    responseText = _a.sent();
                    paes = JSON.parse(responseText);
                    container_1 = document.querySelector('.cards-paes');
                    container_1.innerHTML = "";
                    if (!container_1) {
                        throw new Error('Container para os pães não encontrado');
                    }
                    if (paes.length === 0) {
                        h4 = document.createElement('h4');
                        h4.textContent = "Nenhum pão encontrado.";
                        container_1.appendChild(h4);
                    }
                    else {
                        paes.forEach(function (pao) {
                            var paoHTML = "\n                    <div class=\"col-12 col-sm-6 col-lg-4 p-1 card\"><div class=\"card-body card-".concat(pao.id, "\"><h5 class=\"card-title\"><strong>").concat(pao.nome, "</strong></h5><p class=\"card-text\">").concat(pao.descricao, "</p></div><div class=\"card-footer\"><button id=\"pao-").concat(pao.id, "\" class=\"btn btn-secondary btn-sm btn-block\" data-toggle=\"modal\" data-target=\"#modalMostrarIngredientes\">Abrir</button></div></div>");
                            container_1.insertAdjacentHTML('beforeend', paoHTML);
                            document.getElementById("pao-".concat(pao.id)).addEventListener('click', function () {
                                return __awaiter(this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, mostrarIngredientesPao(pao.id, pao.nome)];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                });
                            });
                        });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error('Erro ao renderizar os pães:', error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
window.addEventListener('load', renderPaes);
function mostrarIngredientesPao(paoID, paoNome) {
    return __awaiter(this, void 0, void 0, function () {
        var response, ingredientes, tableBody_1, btnCalcular, modalTitle, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("http://localhost/api/app.php/pao_ingredientes/id/".concat(paoID))];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        console.error('Erro ao buscar ingredientes do pão:', response.statusText);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    ingredientes = _a.sent();
                    tableBody_1 = document.getElementById('tableIngredientes').querySelector('tbody');
                    tableBody_1.innerHTML = '';
                    ingredientes.forEach(function (ingrediente) {
                        var row = document.createElement('tr');
                        var cellNome = document.createElement('td');
                        cellNome.textContent = ingrediente.nome;
                        row.appendChild(cellNome);
                        var cellPercentual = document.createElement('td');
                        cellPercentual.textContent = trataVirgula(ingrediente.percentual.toFixed(2));
                        cellPercentual.style.setProperty('text-align-last', 'end');
                        row.appendChild(cellPercentual);
                        tableBody_1.appendChild(row);
                    });
                    btnCalcular = document.querySelector('.btnPercentualAguaGelo');
                    btnCalcular.id = 'pao-${paoID}';
                    btnCalcular.addEventListener('click', function () {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, calcularIngredientes(paoID, paoNome)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                    modalTitle = document.getElementById('modalTitle');
                    modalTitle.textContent = "".concat(paoNome);
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    console.error('Erro ao mostrar os ingredientes do pão:', error_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
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
function calcularIngredientes(paoID, paoNome) {
    return __awaiter(this, void 0, void 0, function () {
        var pesoMassa, pesoM, table, percentualAguaGelo, nomesPaes, quantidadePaes, pesoUnitario, tbody, rows, _i, rows_2, row, cells, nomeInput, quantidadeInput, pesoInput, nome, quantidade, peso, response, ingredientesData, percentualTotalIngredientes_1, resultados_1, pesoFarinhaDeTrigo_1, proporcaoAguaEGelo_1, pesoAguaEGelo_1, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pesoMassa = 0;
                    pesoM = 0;
                    table = document.getElementById('tableCalculadora');
                    percentualAguaGelo = parseFloat(document.getElementById('inputPercentualAguaGelo').value);
                    nomesPaes = [];
                    quantidadePaes = 0;
                    pesoUnitario = 0;
                    tbody = table.querySelector('tbody');
                    rows = Array.from(tbody.querySelectorAll("tr"));
                    for (_i = 0, rows_2 = rows; _i < rows_2.length; _i++) {
                        row = rows_2[_i];
                        cells = row.querySelectorAll("td");
                        nomeInput = cells[0].querySelector("input");
                        quantidadeInput = cells[1].querySelector("input");
                        pesoInput = cells[2].querySelector("input");
                        if (!nomeInput || !quantidadeInput || !pesoInput) {
                            continue;
                        }
                        nome = nomeInput.value;
                        quantidade = parseFloat(quantidadeInput.value);
                        peso = parseFloat(pesoInput.value);
                        if (nome.trim() === "") {
                            alert("Por favor, insira um nome");
                            return [2 /*return*/];
                        }
                        if (isNaN(peso) || isNaN(quantidade)) {
                            alert("Por favor, insira um peso válido para o quantidade ou peso.");
                            return [2 /*return*/];
                        }
                        nomesPaes.push([nome, quantidade]);
                        quantidadePaes = quantidade;
                        pesoUnitario = peso;
                        pesoM += quantidade * peso;
                        // pesoMassa += (quantidadePaes * pesoUnitario / (570 * 56));
                        console.log(quantidade, peso, pesoM);
                    }
                    pesoM += 20;
                    // console.log(pesoM);
                    if (isNaN(quantidadePaes) || isNaN(pesoUnitario) || isNaN(percentualAguaGelo)) {
                        alert("Informe os campos corretamente.");
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("http://localhost/api/app.php/pao_ingredientes/id/".concat(paoID))];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Erro ao buscar ingredientes: ' + response.statusText);
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    ingredientesData = _a.sent();
                    percentualTotalIngredientes_1 = 0;
                    ingredientesData.forEach(function (ingrediente) {
                        if (!compararStrings(ingrediente.nome, 'agua') && !compararStrings(ingrediente.nome, 'gelo') && !compararStrings(ingrediente.nome, 'Agua e gelo')) {
                            percentualTotalIngredientes_1 += ingrediente.percentual;
                        }
                    });
                    percentualTotalIngredientes_1 += percentualAguaGelo;
                    console.log(percentualTotalIngredientes_1);
                    console.log("Percentual total de ingrediente: ".concat(percentualTotalIngredientes_1, " ||| ").concat((pesoM * 100) / percentualTotalIngredientes_1));
                    resultados_1 = [];
                    pesoFarinhaDeTrigo_1 = (pesoM * 100) / percentualTotalIngredientes_1;
                    proporcaoAguaEGelo_1 = percentualAguaGelo / 100;
                    pesoAguaEGelo_1 = proporcaoAguaEGelo_1 * pesoFarinhaDeTrigo_1;
                    ingredientesData.forEach(function (ingrediente) {
                        var quantidade;
                        var percentual = ingrediente.percentual / 100;
                        if (ingrediente.nome.toLowerCase() === 'água' || ingrediente.nome.toLowerCase() === 'gelo') {
                            quantidade = percentual * pesoAguaEGelo_1;
                        }
                        else if (compararStrings(ingrediente.nome, 'agua e gelo')) {
                            quantidade = proporcaoAguaEGelo_1 * pesoFarinhaDeTrigo_1;
                        }
                        else {
                            quantidade = percentual * pesoFarinhaDeTrigo_1;
                        }
                        resultados_1.push({
                            nome: ingrediente.nome,
                            quantidade: quantidade.toFixed(2)
                        });
                    });
                    // console.log('Resultados do cálculo dos ingredientes do pão '+paoNome+':', resultados);
                    gerarPDF(nomesPaes, resultados_1, paoNome);
                    return [3 /*break*/, 5];
                case 4:
                    error_5 = _a.sent();
                    console.error('Erro ao calcular ingredientes:', error_5);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
document.getElementById("addRowCalc").addEventListener("click", function (ev) {
    ev.preventDefault();
    var table = document.getElementById("tableCalculadora");
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = "<input type=\"text\" class=\"form-control\" id=\"nomePaoC\" placeholder=\"P\u00E3o\">";
    cell2.innerHTML = "<input type=\"number\" class=\"form-control\" id=\"quantidadePaes\" placeholder=\"Quantidade\">";
    cell3.innerHTML = "<input type=\"number\" class=\"form-control\" id=\"pesoUnitario\" placeholder=\"Peso Unit\u00E1rio\">";
    cell4.innerHTML = " <button type=\"button\" class=\"btn btn-danger\"><i class=\"bi bi-trash-fill\"></i></button>";
    var inputNomePaoC = cell1.querySelector('#nomePaoC');
    inputNomePaoC.focus();
    cell4.querySelector("button").addEventListener("click", function () {
        row.remove();
    });
});
function gerarPDF(nomesPaes, resultados, nomePao) {
    return __awaiter(this, void 0, void 0, function () {
        var jsPDF, doc, title, pageWidth, titleWidth, titleX, titleY, yPosition, drawTableBorders, i, _a, nomePao_1, quantidade, linhaPao, tableStartY, numCols, numRows, pdfDataUri, blob, url;
        return __generator(this, function (_b) {
            jsPDF = window.jspdf.jsPDF;
            doc = new jsPDF();
            title = "Receita ".concat(nomePao);
            pageWidth = doc.internal.pageSize.width;
            titleWidth = doc.getTextWidth(title);
            titleX = (pageWidth - titleWidth) / 2;
            titleY = 20;
            doc.text(title, titleX, titleY);
            yPosition = titleY + 20;
            if (!Array.isArray(resultados)) {
                console.error('Resultados não são um array válido');
                return [2 /*return*/];
            }
            drawTableBorders = function (doc, xStart, yStart, width, height, numRows, numCols) {
                doc.rect(xStart, yStart, width, height);
                var rowHeight = height / numRows;
                for (var i = 1; i < numRows; i++) {
                    var y = yStart + (i * rowHeight);
                    doc.line(xStart, y, xStart + width, y);
                }
                var colWidth = width / numCols;
                for (var i = 1; i < numCols; i++) {
                    var x = xStart + (i * colWidth) + 20;
                    doc.line(x, yStart, x, yStart + height);
                }
            };
            for (i = 0; i < nomesPaes.length; i++) {
                _a = nomesPaes[i], nomePao_1 = _a[0], quantidade = _a[1];
                linhaPao = "P\u00E3o: ".concat(nomePao_1, "   Quantidade: ").concat(quantidade);
                doc.text(linhaPao, 20, yPosition);
                yPosition += 10;
            }
            yPosition += 2;
            doc.text("Ingrediente", 25, yPosition);
            doc.text("Quantidade em Gramas", 127, yPosition);
            yPosition += 10;
            tableStartY = yPosition - 18;
            numCols = 2;
            numRows = resultados.length + 1;
            resultados.forEach(function (ingrediente) {
                var ingredienteText = "".concat(ingrediente.nome);
                var quantidadeText = "".concat(ingrediente.quantidade);
                doc.text(ingredienteText, 25, yPosition);
                doc.text(trataVirgula(quantidadeText), 133, yPosition);
                yPosition += 10;
            });
            drawTableBorders(doc, 20, tableStartY, pageWidth - 40, (numRows * 10), numRows, numCols);
            yPosition += 20;
            nomePao = nomePao.toLowerCase();
            nomePao = nomePao.replace(" " || "-", "_");
            pdfDataUri = doc.output('datauristring');
            blob = doc.output('blob');
            url = URL.createObjectURL(blob);
            window.open(url, '_blank');
            return [2 /*return*/];
        });
    });
}
function compararStrings(string1, string2) {
    var regex = new RegExp(string1.normalize("NFD").replace(/[\u0300-\u036f]/g, ""), 'i');
    return regex.test(string2.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
}
function trataVirgula(valor) {
    var newValor = valor.toString();
    newValor = newValor.replace('.', ',');
    if (newValor.length > 6) {
        newValor = newValor.slice(0, -6) + '.' + newValor.slice(-6);
    }
    return newValor;
}
export {};
