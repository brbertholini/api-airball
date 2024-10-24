import { Request, Response } from 'express';
import * as geolocationService from '../services/geolocationService';

export const getGeolocation = async (req: Request, res: Response): Promise<void> => {
    try {
        const query= req.params.query;
        
        if (!query || query.trim().length === 0) {
            res.status(400).json({ error: 'Query inválida' });
            return;
        }

        const data = await geolocationService.getGeolocation(query);
        
        const formattedData = {
            name: data.features[0]?.properties.name,
            latitude: data.features[0]?.properties.coordinates.latitude,
            longitude: data.features[0]?.properties.coordinates.longitude,
        };

        res.status(200).json(formattedData);
    } catch (error) {
        console.error('Erro na geolocalização:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
