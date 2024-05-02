function handleSignUp(event){
    event.preventDefault();
    const userName = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    const obj ={
        userName,
        email,
        password
    };

    axios
        .post("http://localhost:3000/user/signup",obj)
        .then(res => console.log(res))
        .catch(err => {
            const p = document.querySelector('p');
            p.innerHTML = `User Already Exist <a href="login.html">Login</a>`
            console.log(err);
        });
    
    document.querySelector("form").reset();
}