export default class APIServiceSignFrom {
    static SignIn(body){
        return fetch(`http://127.0.0.1:5002/sign/in`,{
          'method': 'PUT',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify(body)
        })
        .then(resp => resp.json())
    }

    static SignUp(body){
        return fetch(`http://127.0.0.1:5000/add`,{
          'method': 'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify(body)
        })
        .then(resp => resp.json())
    }
}