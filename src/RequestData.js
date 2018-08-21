const ROOT_URL = process.env.PUBLIC_URL;

async function requestData() {
  try {
    const response = await fetch(`${ROOT_URL}/data`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  } catch (err) {
    console.log(err);
    alert(err);
  }
}

export default requestData;
