import axios from "axios";



export default class PostService {
    static async getAll(limit = 3, page = 2) {
        const response = await axios.get('https://dummyjson.com/posts', {
            params: {
                limit: limit,
                page: page
            }
        })
            return response
    }
}