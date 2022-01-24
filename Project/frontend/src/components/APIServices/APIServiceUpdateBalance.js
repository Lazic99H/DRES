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

    static UpdateBalances(id){
        return fetch(`http://127.0.0.1:5002/bank/update/balances/${id}/`,{
          'method': 'POST',
          headers: {
            'Content-Type':'application/json'
          }
        })
        .then(resp => resp.json())
    }

    static UpdateBalanceConverter(id,body){
        return fetch(`http://127.0.0.1:5002/bank/update/converter/${id}/`,{
          'method': 'PUT',
          headers: {
            'Content-Type':'application/json'
          },
           body: JSON.stringify(body)
        })
        .then(resp => resp.json())
    }
}

