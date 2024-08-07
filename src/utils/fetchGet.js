export default async function fetchGet(data) {
  const responce = await fetch(`http://localhost:3000/${data.destination}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  })

  return responce.json()
}
