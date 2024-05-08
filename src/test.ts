import {IngredientePadrao} from "./IngredientePadrao";
import {Pao} from "./Pao";
import {CalculadoraIngredientesService} from "./CalculadoraIngredientesService";

export function teste(){
    let farinhaTrigo:IngredientePadrao = new IngredientePadrao('farinha gold');
    let agua:IngredientePadrao = new IngredientePadrao('agua');
    let gelo:IngredientePadrao = new IngredientePadrao('gelo');
    let sal:IngredientePadrao = new IngredientePadrao('sal');
    let acucar:IngredientePadrao = new IngredientePadrao('açucar');
    let fermento:IngredientePadrao = new IngredientePadrao('fermento Seco');
    let melhorador:IngredientePadrao = new IngredientePadrao('melhorador');
    let bisnaga:IngredientePadrao = new IngredientePadrao('Bisnaga');

    let percentualInTotal = [farinhaTrigo,agua,gelo, sal,acucar,fermento,melhorador,bisnaga]
   
    let percentualfarinhaTrigo:number = 100
    let percentualagua:number = 37.5
    let percentualgelo:number = 62.5
    let percentualsal:number = 2
    let percentualacucar:number = 1
    let percentualfermento:number =0.1
    let percentualmelhorador:number = 1
    let percentualbisnaga:number = 0.2

    let percentualTotal = [percentualfarinhaTrigo, percentualagua,percentualgelo,percentualsal, percentualacucar, percentualfermento, percentualmelhorador, percentualbisnaga]


    let pao:Pao;
    pao = new Pao('Brotinho Gold-manha','lorem ipsum', percentualTotal,percentualInTotal);

    let quantidadeAProduzir = parseFloat(prompt("quantidade a produzir"))
    let pesoUnitario = parseFloat(prompt("peso unitario"))
    let percentualAguaeGelo = parseFloat(prompt("percentualAguaeGelo"))

    let service = new CalculadoraIngredientesService()
    let resultado =service.calcular(pao,quantidadeAProduzir,pesoUnitario, percentualAguaeGelo)  
    console.log(resultado)
}


teste();
