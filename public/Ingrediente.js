var Ingrediente = /** @class */ (function () {
    function Ingrediente(Nome) {
        this.Nome = Nome;
    }
    Ingrediente.prototype.getNome = function () {
        return this.Nome;
    };
    return Ingrediente;
}());
export { Ingrediente };
