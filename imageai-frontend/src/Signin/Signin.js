import React from "react";
import './sign.css'

class Signin extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            signInEmail :'',
            signInPassword : ''
        }
    }

    onEmailChange = (event)=>{
        this.setState({signInEmail : event.target.value});
    }
    onPasswordChange = (event) => {
        this.setState({signInPassword : event.target.value});
    }
    onSubmitSignin = () =>{
        // console.log(this.state);
        fetch('http://localhost:3000/signin', {
            method : 'post',
            headers :{'Content-Type': 'application/json'},
            body : JSON.stringify({
                email : this.state.signInEmail,
                password : this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if(user.id){
                    this.props.loadUser(user)
                    this.props.onRouteChange('home');
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
                Sign In
                </legend>
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
                    className="btn btn-6 boxsz center"
                    type="submit"
                    onClick={this.onSubmitSignin}
                    >
                    Sign In
                    </p>
                </div>
                </section>
                <div className="lh-copy mt3">
                    <p
                    onClick={() => onRouteChange('register')}
                    href="#0"
                    className="f6 link dim black db pointer"
                    >
                    Register
                    </p>
                </div>
            </form>
            </main>
            </article>
        );
    }
    
}

export default Signin;