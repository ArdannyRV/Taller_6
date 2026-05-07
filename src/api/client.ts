import axios from 'axios'

// Creamos un cliente (url de la api de env, headers de contenido en json)
export const client = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {'Content-Type': 'application/json'}
})

