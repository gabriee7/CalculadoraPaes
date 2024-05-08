var CalculadoraIngredientesService = /** @class */ (function () {
    function CalculadoraIngredientesService() {
    }
    CalculadoraIngredientesService.prototype.calcular = function (pao, quantidade, pesoUnitario, percentualAguaEGelo) {
        return pao.calcular(quantidade, pesoUnitario, percentualAguaEGelo);
    };
    return CalculadoraIngredientesService;
}());
export { CalculadoraIngredientesService };
