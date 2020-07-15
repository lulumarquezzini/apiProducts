const models = require('../db/models');

const list = async (req, res) => {
    try {
        const products = await models.Product.findAll();
        return res.status(200).json({ products });
      } catch (error) {
        return res.status(500).send(error.message);
      }
}
const create = async (req, res) => {
    try {
        const product = await models.Product.create(req.body);
        return res.status(201).json({
            product,
        });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const update = async (req, res) => {
    try {
        const productId  = req.params.id;
        const [ updated ] = await models.Product.update(req.body, {
          where: { id: productId }
        });
        if (updated) {
          const updatedProduct = await models.Product.findOne({ where: { id: productId } });
          return res.status(200).json({ product: updatedProduct });
        }
        throw new Error('Product not found');
      } catch (error) {
        return res.status(500).send(error.message);
      }
}

const destroy = async (request, response) => {

}


module.exports = {
    list,
    create,
    update,
    destroy
};