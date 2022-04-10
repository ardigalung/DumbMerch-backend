const req = require('express/lib/request')
const res = require('express/lib/response')
const { user, product, transaction, admin } = require('../../models')

exports.getAdmin = async (req, res) => {
    try {
        const data = await admin.findAll({
            include: [
                {
                    model: user,
                    as: 'user',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                },
                {
                    model: product,
                    as: 'product',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }

                },
                {
                    model: transaction,
                    as: 'transaction',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }

                },

            ],
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt', 'idUser']
            }

        })
        res.send({
            status: 'success',
            data
        })

    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}