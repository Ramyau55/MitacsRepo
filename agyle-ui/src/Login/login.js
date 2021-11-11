import React from 'react';
import { useHistory } from 'react-router-dom';
import './login.css';

const Login = () => {

  const [username, setUserName] = React.useState();
  const [password, setPassword] = React.useState();
  let history = useHistory();

  const loadHomePage = (e) => {
      debugger;
    if(username=='admin' && password == 'agyle') {
        history.push({
            pathname: '/Home'
        });
    }
}

    return(
        <div className=" login-wrapper list_view_component">
          <h1>Please Log In</h1>
          <form>
            <label>
              <p>Username</p>
              <input type="text" onChange={e => setUserName(e.target.value)}/>
            </label>
            <br />
            <label>
              <p>Password</p>
              <input type="password" onChange={e => setPassword(e.target.value)}/>
            </label>
            <br />
            <div style={{paddingTop:'30px',paddingBottom:'30px'}}>
              <button onClick={e => loadHomePage(e)} type="submit">Submit</button>
            </div>
          </form>
        </div>
      )

}
export default Login;