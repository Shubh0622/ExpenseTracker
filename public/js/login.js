function handleLogin(event){
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    const obj = {
        email,
        password
    }

    axios
        .post("http://localhost:3000/user/login",obj)
        .then(res => console.log(res))
        .catch(err => console.log(err))
}