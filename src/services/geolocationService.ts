import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export interface GeolocationResponse {
    features: any[];
}

const MAPBOX_API_KEY = process.env.MAPBOX_API_KEY;

if (!MAPBOX_API_KEY) {
    console.error('MAPBOX_API_KEY não está definida. Verifique o arquivo .env');
    process.exit(1);
}

export const getGeolocation = async (query: string): Promise<GeolocationResponse> => {
    const url = `https://api.mapbox.com/search/geocode/v6/forward?country=br&q=${encodeURIComponent(query)}&access_token=${MAPBOX_API_KEY}&language=pt`;
    try {
        const response = await axios.get<GeolocationResponse>(url);

        if (response.data.features.length === 0) {
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
