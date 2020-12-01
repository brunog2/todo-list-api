const User = require('../models/User');

module.exports = {
    async index(req, res) {
        console.log("Listing users...");
        const users = await User.find({}).then(response => {
            return res.json(response);
        });
    },

    async auth(req, res) {
        const { email } = req.body;
        const { password } = req.body;
        const validationUser = await User.find({ password: password, email: email });
        if (validationUser != 0) {
            return res.json({ auth: "true" });
        }
        return res.json({ auth: "false" });
    },
    
    async findWithId(req, res) {
        const { id } = req.query;
        console.log("Searching for user with id " + id)
        await User.findById(id).then(response => {
            return res.json(response);
        });
    },

    async search(req, res) {
        const { q } = req.query;
        console.log(`Searching for users with keyword: ${q}`)
        await User.find({ $or: [{ name: { $regex: new RegExp(q, "i") } }, { email: { $regex: new RegExp(q, "i") } }] }).then(response => {
            return res.json(response);
        });
    },

    async store(req, res) {
        const userAlreadyExists = await User.find({ email: req.body.email });
        if (userAlreadyExists.length != 0) {
            return res.json({ register: "err_email" })
        }
        else if (req.body.email.length <= 1) {
            return res.json({ register: "err_email" })
        }
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        return res.json({ register: "success" });
    }
};