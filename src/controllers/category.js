
const { category } = require('../../models')

exports.addCategory = async (req, res) => {
    try {
        const data = req.body

        //send data to database
        await category.create(data)

        res.send({
            status: 'success',
            data
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'failed',
            message: 'Server Error',
        });

    }
}

exports.getCategoris = async (req, res) => {
    try {
        const data = await category.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        res.send({
            status: 'success',
            data
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'failed',
            message: 'Server Error',
        });
    }

}

exports.getCategoryById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await category.findAll({
            where: {
                id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        res.send({
            status: 'success',
            data
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'failed',
            message: 'Server Error',
        });
    }

}

exports.updateCategory = async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        await category.update(data, {
            where: {
                id
            }
        })
        res.send({
            status: 'update finished ',

        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'failed',
            message: 'Server Error',
        });
    }

}

exports.deleteCategory = async (req, res) => {
    try {
        const id = req.params.id
        await category.destroy({
            where: {
                id
            }
        })
        res.send({
            status: 'Delete finished ',

        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'failed',
            message: 'Server Error',
        });
    }

}