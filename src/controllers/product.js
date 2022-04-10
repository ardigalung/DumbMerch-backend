
const { user, product, category, categoryProduct } = require('../../models')

exports.getProducts = async (req, res) => {
    try {
        const data = await product.findAll({
            include: [
                {
                    model: user,
                    as: 'user',
                    attributes: {
                        exclude: ['password', 'createdAt', 'updatedAt']
                    }
                },
                {
                    model: category,
                    as: 'categories',
                    through: {
                        model: categoryProduct,
                        as: 'bridge'
                    },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }

                }

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
            status: 'Failed',
            message: 'Server Error'
        })

    }
}

exports.addProduct = async (req, res) => {
    try {
        const data = req.body;

        data.image = req.file.filename;
        data.idUser = req.user.id;

        // return res.send(data)

        const newProduct = await product.create(data);

        // code here
        // const categoryData = await category.findOne({
        //   where: {
        //     name: categoryName,
        //   },
        // });

        // if (categoryData) {
        //   await productCategory.create({
        //     idCategory: categoryData.id,
        //     idProduct: newProduct.id,
        //   });
        // } else {
        //   const newCategory = await category.create({ name: categoryName });
        //   await productCategory.create({
        //     idCategory: newCategory.id,
        //     idProduct: newProduct.id,
        //   });
        // }

        let productData = await product.findOne({
            where: {
                id: newProduct.id,
            },
            include: [
                {
                    model: user,
                    as: 'user',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password'],
                    },
                },
                {
                    model: category,
                    as: 'categories',
                    through: {
                        model: categoryProduct,
                        as: 'bridge',
                        attributes: [],
                    },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt'],
                    },
                },
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'idUser'],
            },
        });

        res.send({
            status: 'success',
            data: {
                productData,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'failed',
            message: 'Server Error',
        });
    }
};

exports.getProduct = async (req, res) => {
    try {
        const id = req.params.id
        const data = await product.findAll({
            where: {
                id
            },
            include: [
                {
                    model: user,
                    as: 'user',
                    attributes: {
                        exclude: ['password', 'createdAt', 'updatedAt']
                    }
                },
                {
                    model: category,
                    as: 'categories',
                    through: {
                        model: categoryProduct,
                        as: 'bridge'
                    },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }

                }

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
            status: 'Failed',
            message: 'Server Error'
        })

    }
}

exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.id
        const newData = req.body

        await product.update(newData, {
            where: {
                id
            }
        })
        res.send({
            status: 'success update date',
        })

    } catch (error) {
        console.log(error)
        res.send({
            status: 'Failed',
            message: 'Server Error'
        })

    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        await product.destroy({
            where: {
                id
            }
        })
        res.send({
            status: 'success delete data',
        })

    } catch (error) {
        console.log(error)
        res.send({
            status: 'Failed',
            message: 'Server Error'
        })

    }
}