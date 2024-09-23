import jwt from 'jsonwebtoken';

interface Request {
    headers: {
        authorization?: string;
    };
    user?: any;
}

interface Response {
    status: (code: number) => Response;
    json: (data: object) => void;
}

function authenticateToken(req: Request, res: Response, next: () => void) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido' });
        }

        req.user = user;
        next();
    });
}

export default authenticateToken;
