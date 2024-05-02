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
        .then(res => console.log(res.data.message))
        .catch(err => {
            if(err.response.status===404){
                alert("User not found: please sign up if you are new here");
            }
            else if(err.response.status === 401){
                alert("Please enter correct password");
            }
            else{
                console.log(err);
            }
        })

    document.querySelector("form").reset();
}