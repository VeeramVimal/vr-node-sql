const {User} = require("../model");
const CreateUser = async (req, res) => {
    try {
        const userData = await User.create(req.body);
        if(userData) {
            return res.send({ user: userData});
        }
    } catch (error) {
        return res.send({ error });
    }
};

module.exports = {
    CreateUser
}