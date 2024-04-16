class Pao {
    private nome:string;
    private descricao:string;
    private pesoUnitario:number;
    private percentualH2OTotal: number;
    private percentualGelo: number;
    private percentual:number[];
    private ingredientes:Ingrediente[]

    constructor(nome:string, descricao:string, pesoUnitario:number, percentualH2OTotal:number, percentualGelo:number, percentual:number[], ingredientes:Ingrediente[]){
        this.nome = nome;
        this.descricao = descricao;
        this.pesoUnitario = pesoUnitario;
        this.percentualH2OTotal = percentualH2OTotal;
        this.percentualH2OTotal = this.percentualGelo;
        this.percentualH2OTotal = this.percentualGelo;
        this.percentual = percentual;
        this.ingredientes = ingredientes;
    }

    getIngredientes(){
        return this.ingredientes;
    }

    getPercentual(){
        return this.percentual;
    }

    getPesoUnitario(){
        return this.pesoUnitario;
    }

    // getIngredientesPercentual() {
    //     let ingredientesPercentualArray: [string, number][]=[];
    //     for(let i = 0; i < this.ingredientes.length; i++) {
    //         ingredientesPercentualArray.push([String(this.ingredientes[i]), this.percentual[i]]);
    //     }
    //     return ingredientesPercentualArray;
    // }

    calcular(quantidade:number){
        let pesoMassaPronta = quantidade * this.pesoUnitario
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