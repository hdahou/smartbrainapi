const register = (req, res, db, bcrypt) => {
    const {email, name, password} = req.body;
    if (!email || !name || !password) {
        return res.status(400).json("Please fill all fields")
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
            trx('login')
            .insert({
                hash: hash,
                email: email
        })
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .insert({
                name: name,
                email: loginEmail[0].email,
                joined: new Date()
        })
        .returning('*')
        .then(user => {
            res.json(user[0])
        })
    })
        .then(trx.commit)
        .catch(trx.rollback)
        })
        .catch(err => {
            res.status(400).json('unable to register')
        })
}

export default register;

