import Repository from "./Repository";

interface IFeedback {
    type: string,
    comment: string,
    screenshot: string | null,
}

class FeedbackRepository extends Repository {
    async list() {
        return await super.get('/feedback');
    }

    async create(data: IFeedback) {
        return await super.post('/feedback', data);
    }

    async update(data: IFeedback) {
        return await super.put('/feedback', data);
    }

    async find(feedback_id: string) {
        return await super.get('/feedback/' + feedback_id);
    }

    async delete(feedback_id: string) {
        return await super.delete('/feedback/' + feedback_id);
    }
}

export default FeedbackRepository;
