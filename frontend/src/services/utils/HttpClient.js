//@ts-ignore
import { APIError } from '../../errors/APIError';
import delay from '../../utils/delay';

class HttpClient  {
	constructor(baseURL) {
		this.baseURL = baseURL
	}
	async get(path) {
		await delay(500);
    const response = await fetch(`${this.baseURL}${path}`);
    const contentType = response.headers.get('content-type');
    let body = null;

    if (contentType.includes('application/json')) {
      body = await response.json();
    }

    if (!response.ok) {
      throw new APIError(body,
        response,
      );
    }
    return body;
	}
}
export default HttpClient;
