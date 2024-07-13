export default async function fetchPost(data) {
  console.log(data)
  const responce = await fetch(`http://localhost:3000/${data.destination}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return responce.json()
}
