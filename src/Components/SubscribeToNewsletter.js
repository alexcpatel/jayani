const ROOT_URL = process.env.PUBLIC_URL;

async function sendRequest(path, options = {}) {
    const headers = {
        'Content-type': 'application/json; charset=UTF-8',
    };
    const response = await fetch(
        `${ROOT_URL}${path}`,
        Object.assign({ method: 'POST', credentials: 'include' }, { headers }, options),
    );
    const data = await response.json();
    if (data.error) {
        throw new Error(data.error);
    }
    await setTimeout(() => {;}, 1500)
    return data;
}

export const subscribeToNewsletter = ({ email }) =>
    sendRequest('/subscribe', {
        body: JSON.stringify({ email }),
    });