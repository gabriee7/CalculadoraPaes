export abstract class Ingrediente {
    private Nome: string;
    
    constructor(Nome: string) {
        this.Nome = Nome;
    }

    getNome(){
        return this.Nome;
    }
}
