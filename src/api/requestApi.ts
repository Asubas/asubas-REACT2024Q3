const headers = new Headers({
  'Content-Type': 'application/json',
  'x-api-key': 'live_5bmhXFI4Dr7CcadRA1NeYsdSgZpiGshkaDYlsQhjrnNnA2q2UfGDUdTOEI02WCHC',
});

const requestOptions: RequestInit = {
  method: 'GET',
  headers: headers,
  redirect: 'follow',
};

async function fetchData(searchRequest: number = 0, page: number = 0) {
  let url = `https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=ASC&page=${page}&limit=10`;
  if (searchRequest !== 0) {
    url += `&breed_ids=${searchRequest}`;
  }

  return fetch(url, requestOptions)
    .then((result) => result.json())
    .catch((error) => {
      throw new Error(error);
    });
}

export { fetchData };
