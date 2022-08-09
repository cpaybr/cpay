import EnumMessageInterface from "../../interfaces/EnumMessageInterface";

class Enum {
    public MESSAGE: EnumMessageInterface;

    constructor() {
        this.MESSAGE = {
            EMPTY_ID: 'Empty ID',
            EMPTY_DATA: 'Empty Data',
            ALREADY_EXISTS: 'Already exists',
            NOT_FOUND: 'Not found'
        }
    }
}

export default new Enum();
