import config from "../config";
import RepositoryException404 from "../exceptions/RepositoryResponse404";
import RepositoryException422 from "../exceptions/RepositoryResponse422";
import RepositoryException500 from "../exceptions/RepositoryResponse500";

class Repository {
    private root: string;

    constructor() {
        this.root = config.api
    }

    async get(path: string, data = {}) {
        return await this.request('GET', path, data);
    }

    async post(path: string, data = {}) {
        return await this.request('POST', path, data);
    }

    async put(path: string, data = {}) {
        return await this.request('PUT', path, data);
    }

    async delete(path: string, data = {}) {
        return await this.request('DELETE', path, data);
    }

    async request(method: string, path: string, data = {}) {
        let params: any = {
            method: method,
            cache: 'no-cache',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + window.$token
            }
        }

        if (method !== 'GET' && method !== 'HEAD') {
            params.body = JSON.stringify(data);
        }

        try {
            let response = await fetch(this.root + path, params);
            return await this.treatResponse(response);
        } catch (error: any) {
            if (
                error.constructor.name === RepositoryException422.name || 
                error.constructor.name === RepositoryException404.name
            ) {
                throw error;
            }

            // window.$toast("#011 - Tivemos um problema com sua requisição. Entre em contato com o suporte!", {
            //     type: window.$toast.TYPE.ERROR
            // });
            throw error;
        }
    }

    async treatResponse(response: any) {
        switch (response.status) {
            case 200:

            case 201:
                let responseJson = '';

                try {
                    responseJson = await response.json();
                } catch(error) {
                    console.log(error);
                }
                
                return responseJson;

            case 401:
                console.error(response);
                // window.$toast.error("Sessão encerrada", {
                //     type: window.$toast.TYPE.ERROR
                // });
                window.location.href = '/login';
                break;

            case 404:
                console.error(response);
                // window.$toast("#404 - Tivemos um problema com sua requisição. O relatório deste erro já foi enviado ao suporte e estamos verificando!", {
                //     type: window.$toast.TYPE.ERROR
                // });
                throw new RepositoryException404(response);

            case 405:
                console.error(response);
                // window.$toast("#500 - Tivemos um problema com sua requisição. O relatório deste erro já foi enviado ao suporte e estamos verificando!", {
                //     type: window.$toast.TYPE.ERROR
                // });
                throw new RepositoryException500(response);

            case 422:
                console.warn(response);
                // window.$toast("#422 - Tivemos um problema com sua requisição. O relatório deste erro já foi enviado ao suporte e estamos verificando!", {
                //     type: window.$toast.TYPE.ERROR
                // });
                throw new RepositoryException422(response);
                
            case 500:
                console.error(response);
                break;

            default:
                console.error(response);
                // window.$toast("#022 - Tivemos um problema com sua requisição. O relatório deste erro já foi enviado ao suporte e estamos verificando!", {
                //     type: window.$toast.TYPE.ERROR
                // });
                break;
        }
    }
}

export default Repository;
