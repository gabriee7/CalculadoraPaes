import {Ingrediente} from "./Ingrediente";

export class Pao {
    private nome:string;
    private descricao:string;
    private ingredientes:[Ingrediente, number][];

    constructor(nome:string, descricao:string, percentual:number[], ingredientes:Ingrediente[]){
        this.nome = nome;
        this.descricao = descricao;
        this.ingredientes = [];
        for(let i=0; i < ingredientes.length; i++){
            this.ingredientes.push([ingredientes[i], percentual[i] / 100]);
        }
    }
    
    getNome():string{
        return this.nome
    }

    getDescricao():string{
        return this.descricao;
    }

    private compararStrings(string1: string, string2: string): boolean {
        const regex = new RegExp((string1 as any).normalize("NFD").replace(/[\u0300-\u036f]/g, ""), 'i');
        return regex.test((string2 as any).normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
    }

    calcular(quantidade:number, pesoUnitario:number, percentualAguaEGelo:number):[Ingrediente, number][]{

        let pesoFarinhaDeTrigo = 20559.67 * (quantidade * pesoUnitario / (570 * 56));

        let proporcaoAguaEGelo = percentualAguaEGelo / 100;
        let pesoAguaEGelo = proporcaoAguaEGelo * pesoFarinhaDeTrigo;
        let resultado:[Ingrediente, number][] = [];

        this.ingredientes.forEach(elem => {
            if(this.compararStrings(elem[0].getNome(), 'agua')){
                resultado.push([elem[0], elem[1] * pesoAguaEGelo]);
            }else if(this.compararStrings(elem[0].getNome(), 'gelo')){
                resultado.push([elem[0], elem[1] * pesoAguaEGelo]);
            }else{
                resultado.push([elem[0], elem[1] * pesoFarinhaDeTrigo]);
            }
        })        
        resultado.forEach(elem => console.log(elem[0].getNome(), elem[1].toFixed(2)));
        return resultado;
    }
}
