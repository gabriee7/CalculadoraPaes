class CalculadoraIngredientesService{
    calcular(quantidade:number, pao:Pao){
        let pesoUnitario = pao.getPesoUnitario()
        let pesoMassaPronta = quantidade * pesoUnitario
        let percentualTrigoMistura = pao.getPercentualTrigoMistura()
        let pesoTrigo = pesoMassaPronta * percentualTrigoMistura

        let ingredientesPercentual = pao.getIngredientesPercentual();
        let receitaPronta: [string, number][]=[];

        for(let i=0; i < ingredientesPercentual.length; i++){
            receitaPronta.push([String(ingredientesPercentual[i][0]),ingredientesPercentual[i][1] * pesoTrigo]);
        }
        return receitaPronta;
    }
}