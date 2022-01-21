export default class APIServiceUpdateBalance {
    static UpdateBalance(id){
        return fetch(`http://127.0.0.1:5002/bank/update/balance/${id}/`,{
          'method': 'POST',
          headers: {
            'Content-Type':'application/json'
          }
        })
        .then(resp => resp.json())
    }
}