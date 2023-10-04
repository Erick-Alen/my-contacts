//@ts-ignore
import { APIError } from '../../errors/APIError';
import delay from '../../utils/delay';

class HttpClient  {
	constructor(baseURL) {
		this.baseURL = baseURL
	}
	get(path, options) {
    return this.makeRequest(path, {
      method: 'GET',
      headers: options?.headers,
    })
  }

  post(path, options) {
    return this.makeRequest(path, {
      method: 'POST',
      body: options?.body,
      headers: options?.headers,
      })
  }

  makeRequest = async (path, options) => {
    const headers = new Headers();
    if (options.body) {
      headers.append(
        'Content-Type', 'application/json',
      )
    }

    if (options.headers) {
      console.log(options)
      Object.entries(options.headers).forEach(([name, value]) => {
        headers.append(name, value);
      });
    }

    await delay(500);
    const response = await fetch(`${this.baseURL}${path}`, {
      method: options.method,
      body: JSON.stringify(options.body),
      headers,
    });

    const contentType = response.headers.get('content-type');
    let body = null;

    if (contentType.includes('application/json')) {
      body = await response.json();
    }

    if (!response.ok) {console.log('api error')
      throw new APIError(body,
        response,
      );
    }
    return body;
  }

}
export default HttpClient;
