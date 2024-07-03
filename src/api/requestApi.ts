const headers = new Headers({
  'Content-Type': 'application/json',
  'x-api-key': 'live_5bmhXFI4Dr7CcadRA1NeYsdSgZpiGshkaDYlsQhjrnNnA2q2UfGDUdTOEI02WCHC',
});

const requestOptions: RequestInit = {
  method: 'GET',
  headers: headers,
  redirect: 'follow',
};

async function fetchData() {
  return fetch(
    'https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=ASC&page=5&limit=9',
    requestOptions,
  )
    .then((result) => result.json())
    .catch((error) => console.log('error', error));
}

export { fetchData };
