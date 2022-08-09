import bcryptjs from 'bcryptjs';

class BcryptHelper {
    public encrypt(string: string): Promise<string> {
        return bcryptjs.hash(string, 10);
    }

    public compare(string: string, hash: string): Promise<boolean> {
        return bcryptjs.compare(string, hash);
    }
}

export default new BcryptHelper();
