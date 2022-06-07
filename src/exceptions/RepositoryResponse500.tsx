export default class RepositoryException500 {
    response: string;
    message = "Error on request";
    error = "RepositoryException500";

    constructor(response: string) {
        this.response = response;
    }

    public get name() {
        return this.error;
    }
}
