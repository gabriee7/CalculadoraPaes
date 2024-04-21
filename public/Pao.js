var Pao = /** @class */ (function () {
    // private percentual:number[];
    // private ingredientes:Ingrediente[];
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
    // getIngredientes():[Ingrediente, number]{
    //     return this.ingredientes;
    // }
    Pao.prototype.compararStrings = function (string1, string2) {
        var regex = new RegExp(string1.normalize("NFD").replace(/[\u0300-\u036f]/g, ""), 'i');
        return regex.test(string2.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
    };
    // calcular(quantidade:number){
    //     let pesoMassaPronta = quantidade * this.pesoUnitario
    //     let pesoTrigo = pesoMassaPronta * this.percentualTrigoMistura
    //     let receitaPronta: [string, number][]=[];
    //     let aguaGelo:number;
    //     for(let i=0; i < this.ingredientes.length; i++){
    //         if(this.compararStrings(String(this.ingredientes[i][0]), 'agua e gelo')){
    //             aguaGelo = this.ingredientes[i][1];
    //             receitaPronta.push([String(this.ingredientes[i][0]),this.ingredientes[i][1] * pesoTrigo]);
    //         }else if(this.compararStrings(String(this.ingredientes[i][0]), 'agua')){
    //             receitaPronta.push([String(this.ingredientes[i][0]),this.ingredientes[i][1] * aguaGelo]);
    //         }else if(this.compararStrings(String(this.ingredientes[i][0]), 'gelo')){
    //             receitaPronta.push([String(this.ingredientes[i][0]),this.ingredientes[i][1] * aguaGelo]);
    //         }else{
    //             receitaPronta.push([String(this.ingredientes[i][0]),this.ingredientes[i][1] * pesoTrigo]);
    //         }
    //     }
    //     return receitaPronta;
    // }
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
// function calcularIngredientes() {
//     // Obter a quantidade a ser produzida e o peso por unidade
//     let quantidade = parseFloat(prompt("Quantidade a ser produzida:"));
//     let pesoUnitario = parseFloat(prompt("Peso por unidade (em gramas):"));
//     // Calcular o peso total da farinha de trigo
//     let pesoFarinhaDeTrigo = 20559.67 * (quantidade * pesoUnitario / (570 * 56));
//     // Calcular o peso dos demais ingredientes com base na proporção em relação à farinha de trigo
//     let pesoAguaEGelo = 0.51 * pesoFarinhaDeTrigo;
//     let pesoAgua = 0.375 * pesoAguaEGelo;
//     let pesoGelo = 0.625 * pesoAguaEGelo;
//     let pesoSal = 0.02 * pesoFarinhaDeTrigo;
//     let pesoAcucar = 0.01 * pesoFarinhaDeTrigo;
//     let pesoFermentoSeco = 0.001 * pesoFarinhaDeTrigo;
//     let pesoMargarina = 0; // Margarina não é usada, então 0g
//     let pesoMelhorador = 0.01 * pesoFarinhaDeTrigo;
//     let pesoBisnaga = 0.002 * pesoFarinhaDeTrigo;
//     // Exibir os resultados
//     console.log("Quantidade de Farinha de Trigo: " + pesoFarinhaDeTrigo.toFixed(2) + "g");
//     console.log("Quantidade de Água e Gelo: " + pesoAguaEGelo.toFixed(2) + "g");
//     console.log("Quantidade de Água: " + pesoAgua.toFixed(2) + "g");
//     console.log("Quantidade de Gelo: " + pesoGelo.toFixed(2) + "g");
//     console.log("Quantidade de Sal: " + pesoSal.toFixed(2) + "g");
//     console.log("Quantidade de Açúcar: " + pesoAcucar.toFixed(2) + "g");
//     console.log("Quantidade de Fermento Seco: " + pesoFermentoSeco.toFixed(2) + "g");
//     console.log("Quantidade de Margarina: " + pesoMargarina.toFixed(2) + "g");
//     console.log("Quantidade de Melhorador: " + pesoMelhorador.toFixed(2) + "g");
//     console.log("Quantidade de Bisnaga: " + pesoBisnaga.toFixed(2) + "g");
// }
// // Chamar a função para calcular os ingredientes
// calcularIngredientes();
// function calcularIngredientes() {
//     // Obter a quantidade a ser produzida, o peso por unidade e o percentual de Água e Gelo
//     let quantidade = parseFloat(prompt("Quantidade a ser produzida:"));
//     let pesoUnitario = parseFloat(prompt("Peso por unidade (em gramas):"));
//     let percentualAguaEGelo = parseFloat(prompt("Percentual de Água e Gelo:"));
//     // Calcular o peso total da farinha de trigo
//     let pesoFarinhaDeTrigo = 20559.67 * (quantidade * pesoUnitario / (570 * 56));
//     // Calcular o peso dos demais ingredientes com base na proporção em relação à farinha de trigo
//     let proporcaoAguaEGelo = percentualAguaEGelo / 100;
//     let pesoAguaEGelo = proporcaoAguaEGelo * pesoFarinhaDeTrigo;
//     let proporcaoAgua = 0.375 / 0.51;
//     let proporcaoGelo = 0.625 / 0.51;
//     let pesoAgua = 0.375 * pesoAguaEGelo;
//     let pesoGelo = 0.625 * pesoAguaEGelo;
//     let pesoSal = (2 / 100) * pesoFarinhaDeTrigo;
//     let pesoAcucar = (1 / 100) * pesoFarinhaDeTrigo;
//     let pesoFermentoSeco = (0.1 / 100) * pesoFarinhaDeTrigo;
//     let pesoMargarina = 0; // Margarina não é usada, então 0g
//     let pesoMelhorador = (1 / 100) * pesoFarinhaDeTrigo;
//     let pesoBisnaga = (0.2 / 100) * pesoFarinhaDeTrigo;
//     // Exibir os resultados
//     console.log("Quantidade de Farinha de Trigo: " + pesoFarinhaDeTrigo.toFixed(2) + "g");
//     console.log("Quantidade de Água e Gelo: " + pesoAguaEGelo.toFixed(2) + "g");
//     console.log("Quantidade de Água: " + pesoAgua.toFixed(2) + "g");
//     console.log("Quantidade de Gelo: " + pesoGelo.toFixed(2) + "g");
//     console.log("Quantidade de Sal: " + pesoSal.toFixed(2) + "g");
//     console.log("Quantidade de Açúcar: " + pesoAcucar.toFixed(2) + "g");
//     console.log("Quantidade de Fermento Seco: " + pesoFermentoSeco.toFixed(2) + "g");
//     console.log("Quantidade de Margarina: " + pesoMargarina.toFixed(2) + "g");
//     console.log("Quantidade de Melhorador: " + pesoMelhorador.toFixed(2) + "g");
//     console.log("Quantidade de Bisnaga: " + pesoBisnaga.toFixed(2) + "g");
// }
// // Chamar a função para calcular os ingredientes
// calcularIngredientes();
// function calcularIngredientes2() {
//     // Obter a quantidade a ser produzida, o peso por unidade e o percentual de Água e Gelo
//     let quantidade = parseFloat(prompt("Quantidade a ser produzida:"));
//     let pesoUnitario = parseFloat(prompt("Peso por unidade (em gramas):"));
//     let percentualAguaEGelo = parseFloat(prompt("Percentual de Água e Gelo:"));
//     // Calcular o peso total da farinha de trigo
//     let pesoFarinhaDeTrigo = 20559.67 * (quantidade * pesoUnitario / (570 * 56));
//     // Calcular o peso dos demais ingredientes com base na proporção em relação à farinha de trigo
//     let proporcaoAguaEGelo = percentualAguaEGelo / 100;
//     let pesoAguaEGelo = proporcaoAguaEGelo * pesoFarinhaDeTrigo;
//     let proporcaoAgua = 0.375 / 0.51;
//     let proporcaoGelo = 0.625 / 0.51;
//     let pesoAgua = 0.35 * pesoAguaEGelo;
//     let pesoGelo = 0.65 * pesoAguaEGelo;
//     let pesoSal = (2 / 100) * pesoFarinhaDeTrigo;
//     let pesoAcucar = (1 / 100) * pesoFarinhaDeTrigo;
//     let pesoFermentoSeco = (0.8 / 100) * pesoFarinhaDeTrigo;
//     let pesoMargarina = 0; // Margarina não é usada, então 0g
//     let pesoMelhorador = (1 / 100) * pesoFarinhaDeTrigo;
//     let pesoBisnaga = (0.2 / 100) * pesoFarinhaDeTrigo;
//     // Exibir os resultados
//     console.log("Quantidade de Farinha de Trigo: " + pesoFarinhaDeTrigo.toFixed(2) + "g");
//     console.log("Quantidade de Água e Gelo: " + pesoAguaEGelo.toFixed(2) + "g");
//     console.log("Quantidade de Água: " + pesoAgua.toFixed(2) + "g");
//     console.log("Quantidade de Gelo: " + pesoGelo.toFixed(2) + "g");
//     console.log("Quantidade de Sal: " + pesoSal.toFixed(2) + "g");
//     console.log("Quantidade de Açúcar: " + pesoAcucar.toFixed(2) + "g");
//     console.log("Quantidade de Fermento Seco: " + pesoFermentoSeco.toFixed(2) + "g");
//     console.log("Quantidade de Margarina: " + pesoMargarina.toFixed(2) + "g");
//     console.log("Quantidade de Melhorador: " + pesoMelhorador.toFixed(2) + "g");
//     console.log("Quantidade de Bisnaga: " + pesoBisnaga.toFixed(2) + "g");
// }
// // Chamar a função para calcular os ingredientes
// calcularIngredientes2();
