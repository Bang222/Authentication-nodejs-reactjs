const Users = require("../Model/User")

const UserList  = {
    getAllUsers : async(req, res) =>{
        try{
            const getUser = await Users.find()
            return  res.status(200).json(getUser)
        }catch(err){
            return res.status(500).json(500)
        }
    },
    deleteUser: async (req, res) =>{
        try{
            // findByDId find id of users
            const findUser = await Users.findById(req.params.id);
            return res.status(200).json("delete success")

        }catch(err){
            return res.status(500).json(500)
        }

    }
}
module.exports = UserList