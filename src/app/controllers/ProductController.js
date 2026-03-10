import * as Yup from 'yup';
import Category from '../models/Category.js';
import Product from '../models/Product.js';

class ProductController {
  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category_id: Yup.string().required(),
      offer: Yup.boolean(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: err.errors });
    }

    const { name, price, category_id, offer } = req.body;
    const { filename } = req.file;

    console.log(typeof req.body.price);
    console.log(req.body.price);

    const newProduct = await Product.create({
      name,
      price,
      category_id,
      path: filename,
      offer,
    });

    const productWithCategory = await Product.findByPk(newProduct.id, {
      include: {
        model: Category,
        as: 'category',
        attributes: ['id', 'name'],
      },
    });

    return res.status(201).json(productWithCategory);
  }

  async update(req, res) {
    console.log('BODY:', req.body);
    const schema = Yup.object({
      name: Yup.string(),
      price: Yup.number(),
      category_id: Yup.string(),
      offer: Yup.boolean(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: err.errors });
    }

    const { id } = req.params;

    let path;
    if (req.file) {
      const { filename } = req.file;
      path = filename;
    }

    const { name, category_id, offer } = req.body;
    const price = req.body.price ? Number(req.body.price) : undefined;

    //console.log('PRICE:', req.body.price);
    //console.log('TYPE:', typeof req.body.price);

    await Product.update(
      {
        name,
        price,
        category_id,
        path,
        offer,
      },
      {
        where: { id },
      },
    );

    //console.log('PRICE:', req.body.price);
    //console.log('TYPE:', typeof req.body.price);

    return res
      .status(200)
      .json({ message: 'Alteração realizada com sucesso!' });
  }

  async index(_req, res) {
    const products = await Product.findAll({
      include: {
        model: Category,
        as: 'category',
        attributes: ['id', 'name'],
      },
    });

    return res.status(200).json(products);
  }
}

export default new ProductController();
