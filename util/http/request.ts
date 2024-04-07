export const request =  async <T> (method: "get" | "post", url: string, body?: BodyInit, headers?: HeadersInit, timeout: number = 10_000, prop = {}):Promise<T> => {
    const _headers = {
        'Content-Type': 'application/json',
        ...headers
    }
    let controller = new AbortController()
    let id = setTimeout(() => controller.abort(), timeout)
    let r: Response = await fetch(url, {method: method, headers: _headers, body, signal: controller.signal, ...prop})
    clearTimeout(id)
    if (r.status != 200) {
        throw new Error(`request error status ${ r.status }`)
    }
    const json = await r.json();
    if (json?.code != 200) {
        throw new Error(`service error msg ${ json?.code }`);
    }
    return json["data"]
}

export const get = <T>(url: string, body?: BodyInit, header?: HeadersInit, timeout?: number, prop = {}): Promise<T> => {
    return request('get', url, body, header, timeout, prop)
}
export const post = <T>(url: string, body?: BodyInit, header?: HeadersInit, timeout?: number, prop = {}): Promise<T> => {
    return request('post', url, body, header, timeout, prop)
}
