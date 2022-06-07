export default class  RepositoryException404 {
    response: string;
    message = "Error on request";
    error = "RepositoryException404";
    
    constructor(response: string) {
        this.response = response;
    }

    public get name() {
        return this.error;
    }
}
