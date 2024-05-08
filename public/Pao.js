var Pao = /** @class */ (function () {
    function Pao(nome, descricao, percentual, ingredientes) {
        this.nome = nome;
        this.descricao = descricao;
        this.ingredientes = [];
        for (var i = 0; i < ingredientes.length; i++) {
            this.ingredientes.push([ingredientes[i], percentual[i] / 100]);
        }
    }
    Pao.prototype.getNome = function () {
        return this.nome;
    };
    Pao.prototype.getDescricao = function () {
        return this.descricao;
    };
    Pao.prototype.compararStrings = function (string1, string2) {
        var regex = new RegExp(string1.normalize("NFD").replace(/[\u0300-\u036f]/g, ""), 'i');
        return regex.test(string2.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
    };
    Pao.prototype.calcular = function (quantidade, pesoUnitario, percentualAguaEGelo) {
        var _this = this;
        var pesoFarinhaDeTrigo = 20559.67 * (quantidade * pesoUnitario / (570 * 56));
        var proporcaoAguaEGelo = percentualAguaEGelo / 100;
        var pesoAguaEGelo = proporcaoAguaEGelo * pesoFarinhaDeTrigo;
        var resultado = [];
        this.ingredientes.forEach(function (elem) {
            if (_this.compararStrings(elem[0].getNome(), 'agua')) {
                resultado.push([elem[0], elem[1] * pesoAguaEGelo]);
            }
            else if (_this.compararStrings(elem[0].getNome(), 'gelo')) {
                resultado.push([elem[0], elem[1] * pesoAguaEGelo]);
            }
            else {
                resultado.push([elem[0], elem[1] * pesoFarinhaDeTrigo]);
            }
        });
        resultado.forEach(function (elem) { return console.log(elem[0].getNome(), elem[1].toFixed(2)); });
        return resultado;
    };
    return Pao;
}());
export { Pao };
