export default class  RepositoryException422 {
    response: string;
    message = "Error on request";
    error = "RepositoryException422";

    constructor(response: string) {
        this.response = response;
    }

    public get name() {
        return this.error;
    }
}
