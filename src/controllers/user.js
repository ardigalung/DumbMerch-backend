//import model user

const { user, profile, product } = require('../../models')

//add users to database
exports.addUsers = async (req, res) => {

    try {
        //take data input user for add data
        //{email,pasword,name,status}
        const data = req.body

        //send data to database
        await user.create(data)

        res.send({
            status: 'success',
            data
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'Failed',
            message: 'Server Error'
        })

    }

}

//show data all users from database
exports.getUsers = async (req, res) => {

    try {
        //Menampilkan data user yang berisikan data profile
        const users = await user.findAll({
            include: {
                model: profile,
                as: 'profile',
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt']
                }
            },
            //untuk tidak menampilkan beberapa properti
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            }
        })

        // const data = await user.findAll({
        //     //untuk tidak menampilkan beberapa properti
        //     attributes: {
        //         exclude: ['password', 'createdAt', 'updatedAt']
        //     }
        // })

        res.send({
            status: 'success',
            //data
            users
        })

    } catch (error) {
        console.log(error)
        res.send({
            status: 'Failed',
            message: 'Server Error'
        })
    }
}

//show data one user from database by Id
exports.getUser = async (req, res) => {

    try {
        const id = req.params.id

        // const user = await user.findAll({
        //     where: {
        //         id
        //     },
        //     include: {
        //         model: profile,
        //         as: 'profile',
        //         attributes: {
        //             exclude: ['password', 'createdAt', 'updatedAt']
        //         }
        //     },
        //     //untuk tidak menampilkan beberapa properti
        //     attributes: {
        //         exclude: ['password', 'createdAt', 'updatedAt']
        //     }
        // })

        const data = await user.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            }

        })

        //validasi data null
        if (!data) {
            res.send({
                error: {
                    message: `data not with ${id} not Found!`
                }
            })
        }
        res.send({
            status: 'Success',
            data
        })

    } catch (error) {
        console.log(error)
        res.send({
            status: 'Failed',
            message: 'Server Error'
        })
    }
}

//Update data By id
exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id //take id
        const newData = req.body //take data 

        await user.update(newData, {
            where: {
                id
            }
        })
        res.send({
            status: 'Success',
            message: `Update user data with Id: ${id} finished!`
        })

    } catch (error) {
        console.log(error)
        res.send({
            status: 'Failed',
            message: 'Server Error'
        })
    }
}

//delete data
exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id

        await user.destroy({
            where: {
                id
            }
        })

        res.send({
            status: 'Success',
            message: `Delete user data with Id: ${id} finished!`
        })

    } catch (error) {
        console.log(error)
        res.send({
            status: 'Failed',
            message: 'Server Error'
        })
    }
}

//show data user and profil
exports.getProfile = async (req, res) => {

    try {
        const profiles = await profile.findAll({
            include: {
                as: 'user',
                model: user,
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt']
                }
            },
            //untuk tidak menampilkan beberapa properti
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            }
        })

        res.send({
            status: 'success',
            profiles
        })

    } catch (error) {
        console.log(error)
        res.send({
            status: 'Failed',
            message: 'Server Error'
        })
    }
}

exports.getUserProducts = async (req, res) => {

    try {
        //Menampilkan data user yang berisikan data profile
        const users = await user.findAll({
            //hanya menampilkan hanya admin saja 
            // where:{
            //     status:'admin'
            // },
            include: {
                model: product,
                as: 'products',
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt']
                }
            },
            //untuk tidak menampilkan beberapa properti
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            }
        })
        res.send({
            status: 'success',
            users
        })

    } catch (error) {
        console.log(error)
        res.send({
            status: 'Failed',
            message: 'Server Error'
        })
    }
}

