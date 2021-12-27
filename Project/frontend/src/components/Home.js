function Home (props) {
    console.log(props.user)
    console.log(props.user[0]['account_id'])
    return (

      <div>HOME PAGE
        {props.user[0]['city']}
      </div>
    );
}

export default Home;