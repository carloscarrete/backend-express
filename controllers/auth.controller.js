

const login = ('/login', (req, res) => {
    console.log(req.body);
    res.status(200).json({
        ok: true,
        message: 'Login Successful',
        name: req.body.name,
    })
});

const register = ('/register', (req, res) =>{

    res.status(200).json({
        ok: true,
    })
})


module.exports = {login, register};