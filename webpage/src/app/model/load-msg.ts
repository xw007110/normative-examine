export class LoadMsg {
    public loaded = false;
    public message: string;

    constructor(loaded: boolean , message: string) {
        this.loaded = loaded;
        this.message = message;
    }
}
