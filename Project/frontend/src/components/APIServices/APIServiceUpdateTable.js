export default class APIServiceUpdateTable {
    static UpdateTable(id){
        return fetch(`http://127.0.0.1:5002/table/update/${id}/`,{
          'method': 'POST',
          headers: {
            'Content-Type':'application/json'
          }
        })
        .then(resp => resp.json())
    }
}