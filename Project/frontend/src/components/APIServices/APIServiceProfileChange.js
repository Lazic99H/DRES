export default class APIServiceProfileChange {
    static ChangeProfile(id,body){
        return fetch(`http://127.0.0.1:5002/profile/update/${id}/`,{
          'method': 'PUT',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify(body)
        })
        .then(resp => resp.json())
    }
}