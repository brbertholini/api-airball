import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export interface GeolocationResponse {
    results: any[];
}

const OPENCAGE_API_KEY = process.env.OPENCAGE_API_KEY;

if (!OPENCAGE_API_KEY) {
    console.error('OPENCAGE_API_KEY não está definida. Verifique o arquivo .env');
    process.exit(1);
}

export const getGeolocation = async (query: string): Promise<GeolocationResponse> => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${OPENCAGE_API_KEY}`;
    try {
        const response = await axios.get<GeolocationResponse>(url);

        if (response.data.results.length === 0) {
            throw new Error('Nenhum resultado encontrado');
        }

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Erro detalhado:', error.response?.data);
            throw new Error(`Erro na API de geolocalização: ${error.response?.data?.message || error.message}`);
        }
        throw error;
    }
};
