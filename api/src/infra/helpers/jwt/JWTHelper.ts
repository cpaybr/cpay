import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

class JWTHelper {
    private secret: string = '';

    public constructor() {
        dotenv.config();
        this.secret = process.env.JWT_SECRET || '';
    }

    public generateToken(id: string, businessUnitId: string, isAdmin: boolean): string {
        return jsonwebtoken.sign({ id: id, businessUnitId: businessUnitId, isAdmin: isAdmin }, this.secret, {
            expiresIn: 86400 * 7
        });
    }

    public verify(token: string): any {
        let isVerified: boolean = true;
        let decoded: string = '';
        
        jsonwebtoken.verify(token, this.secret, (err, decoded) => {
            if (err) isVerified = false;
        });

        return { success: isVerified, decoded: decoded };
    }
}

export default new JWTHelper();
