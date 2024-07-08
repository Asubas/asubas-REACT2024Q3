const headers = new Headers({
  'Content-Type': 'application/json',
  'x-api-key': 'live_5bmhXFI4Dr7CcadRA1NeYsdSgZpiGshkaDYlsQhjrnNnA2q2UfGDUdTOEI02WCHC',
});

const requestOptions: RequestInit = {
  method: 'GET',
  headers: headers,
  redirect: 'follow',
};

async function fetchDataBreeds() {
  return fetch('https://api.thedogapi.com/v1/breeds', requestOptions)
    .then((result) => result.json())
    .catch((error) => {
      throw new Error(error);
    });
}

export { fetchDataBreeds };
