import React from "react";
import './reg.css'

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            regEmail :'',
            regPassword : '',
            regName: ''
        }
    }

    onEmailChange = (event)=>{
        this.setState({regEmail : event.target.value});
    }
    onPasswordChange = (event) => {
        this.setState({regPassword : event.target.value});
    }
    onNameChange = (event) =>{
        this.setState({regName : event.target.value});
    }

    onSubmitRegister = () =>{
        // console.log(this.state);
        fetch('http://localhost:3000/register', {
            method : 'post',
            headers :{'Content-Type': 'application/json'},
            body : JSON.stringify({
                email : this.state.regEmail,
                password : this.state.regPassword,
                name : this.state.regName
            })
        })
            .then(response => response.json())
            .then(user => {
                if(user){
                    // this.props.loadUser(user);
                    console.log("registered successfully UwU")
                    this.props.onRouteChange('signin');
                }
            })
    }

    render(){
        const {onRouteChange} = this.props;
        return (
            <article className="br4 ba b--black-10 mv4 w-50 w-40-m w-20-1 mw6 tl ph3 shadow-4">
            <main className="pa4 black-80">
            <form className="measure">
            <fieldset
            id="sign_up"
            className="ba b--transparent ph0 mh0"
            >
                <legend className="f1 fw6 ph0 mh0">
                Register
                </legend>
                <div className="mt3">
                    <label
                    className="db fw6 lh-copy f6"
                    htmlFor="name"
                    >
                    Name
                    </label>
                    <input
                    className="pa2 input-reset ba bg-transparent b--white hover-bg-black hover-white inp inpform"
                    type="text"
                    name="name"
                    id="name"
                    onChange={this.onNameChange}
                    />
                </div>
                <div className="mt3">
                    <label
                    className="db fw6 lh-copy f6"
                    htmlFor="email-address"
                    >
                    Email
                    </label>
                    <input
                    className="pa2 input-reset ba bg-transparent b--white hover-bg-black hover-white inp inpform"
                    type="email"
                    name="email-address"
                    id="email-address"
                    onChange={this.onEmailChange}
                    />
                </div>
                <div className="mv3">
                    <label
                    className="db fw6 lh-copy f6"
                    htmlFor="password"
                    >
                    Password
                    </label>
                    <input
                    className="b pa2 input-reset b--white ba bg-transparent hover-bg-black hover-white inp inpform"
                    type="password"
                    name="password"
                    id="password"
                    onChange={this.onPasswordChange}
                    />
                </div>
            </fieldset>
                <section className="buttons">
                <div className="container">
                    <p
                    onClick={this.onSubmitRegister}
                    className="btn btn-6 boxsz center"
                    type="submit"
                    >
                    Register
                    </p>
                </div>
                </section>
            </form>
            </main>
            </article>
        );
    }
    
}

export default Register;