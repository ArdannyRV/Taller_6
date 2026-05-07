import { client } from '../api/client'
import { Carro } from '../types/carro.js'

// Def um servicio para centralizar las operaciones relacionadas con la entid carro con metodos asincronicos
export const carrosService = {
    // Metodo get que retorna una promesa con un arreglo de obj Carro
    getAll: async (): Promise<Carro[]> =>{
        const{data} = await client.get<Carro[]>('/carros')
        return data
    },

    // Metodo post para agreagr un carro evniadno una promesa con el obj carro creado
    add: async(marca:string): Promise<Carro> =>{
        const{data} = await client.post<Carro>('carros', {marca})
        return data
    },


}





