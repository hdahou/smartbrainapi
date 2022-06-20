const signin = (req, res, db, bcrypt) => {
    // destructuring. where we have email or password this is just req.body.email or req.body.password
    const { email, password} = req.body; 
    if (!email || !password) {
        return res.status(400).json('Please fill all fields')
    }
    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if (isValid) {
            return db.select('*').from('users')
            .where('email', '=', email)
            .then(user => {
                res.json(user[0])
            })
            // .catch(err => {
            //     res.status(400).json('unable to get user')
            // })
        } else {
            res.status(400).json('wrong credentials')
        }
    })
    .catch(err => {
        res.json('wrong credentials')
    })
}

export default signin;