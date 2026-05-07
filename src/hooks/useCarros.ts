import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { carrosService } from '../api/carros.service'

const KEY = ['carros']

export function useCarro(){
    return useQuery({
        queryKey: ['carros'],
        queryFn: ()=> {
            console.log('Get ejecutado')
            return carrosService.getAll()
        },
        staleTime: 1000*60*5 // cache valido de 5min
    })
}

export function useAgregarCarro(){
    const qc = useQueryClient()
    return useMutation({
        mutationFn: (marca:string) => carrosService.add(marca),
        onSuccess: () => qc.invalidateQueries({queryKey: KEY})
    })
}
