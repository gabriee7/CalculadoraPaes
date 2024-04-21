import {Pao} from "./Pao";
export class CalculadoraIngredientesService{
    calcular(pao:Pao, quantidade:number, pesoUnitario:number, percentualAguaEGelo:number){
        return pao.calcular(quantidade, pesoUnitario, percentualAguaEGelo);
    }
}