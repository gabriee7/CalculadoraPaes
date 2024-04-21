/*var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', function () {
  myInput.focus()
})*/

import IngredientePadrao from "./public/IngredientePadrao.js";
import Ingrediente from "./public/Ingrediente.js";
import Pao from "./public/Pao.js";
import CalculadoraIngredientesService from "./public/CalculadoraIngredientesService.js";

document.getElementById('btnSalvarPao').addEventListener('click', salvarPao)


function salvarPao(){
    let nome = document.getElementById('inputNomePao').value
    let descricao = document.getElementById('inputDescricaoPao').value
    let esclha = document.getElementById('nomeIngredienteEscolha-1').value
    console.log({nome, descricao, esclha})
}

document.getElementById("addRow").addEventListener("click", function() {
    var table = document.getElementById("myTable");
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = '<td><input list="nomes" class="form-control" placeholder="Escolha"><datalist id="nomes"><option value="Nome1"><option value="Nome2"><option value="Nome3"> <!-- Adicione mais opções conforme necessário --></datalist></td>';
    cell2.innerHTML = '<input type="number" step="0.01" class="form-control" placeholder="Percentual">';
});



function teste(){
    let agua = new IngredientePadrao('agua');
    let gelo = new IngredientePadrao('gelo');
    let sal = new IngredientePadrao('sal');
    let farinhaTrigo = new IngredientePadrao('farinha gold');
    let acucar = new IngredientePadrao('açucar');
    let fermento = new IngredientePadrao('fermento Seco');
    let melhorador = new IngredientePadrao('melhorador');
    let bisnaga = new IngredientePadrao('Bisnaga');

    let percentualInTotal = [agua,gelo, sal,farinhaTrigo,acucar,fermento,melhorador,bisnaga]

    let percentualagua = 37.5
    let percentualgelo = 62.5
    let percentualsal = 2
    let percentualfarinhaTrigo = 100
    let percentualacucar = 1
    let percentualfermento =0.1
    let percentualmelhorador = 1
    let percentualbisnaga = 0.2

    let percentualTotal = [percentualagua,percentualgelo,percentualsal, percentualfarinhaTrigo, percentualacucar, percentualfermento, percentualmelhorador, percentualbisnaga]


    let pao;
    pao = new Pao('Brotinho Gold-manha','lorem ipsum', percentualTotal,percentualInTotal);

    let quantidadeAProduzir = parseFloat(prompt("quantidade a produzir"))
    let pesoUnitario = parseFloat(prompt("peso unitario"))
    let percentualAguaeGelo = parseFloat(prompt("percentualAguaeGelo"))

    let service = new CalculadoraIngredientesService()
    let resultado =service.calcular(pao,quantidadeAProduzir,pesoUnitario, percentualAguaeGelo)

}


teste();