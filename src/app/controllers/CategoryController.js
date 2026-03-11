import * as Yup from 'yup';
import Category from '../models/Category.js';

class CategoryController {
  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: err.errors });
    }

    const { name } = req.body;
    const { filename } = req.file;

    const existingCategory = await Category.findOne({
      where: {
        name,
      },
    });

    if (existingCategory) {
      return res.status(400).json({
        error: 'Category already exists',
      });
    }

    const newCategory = await Category.create({
      name,
      path: filename,
    });

    return res.status(201).json(newCategory);
  }

  async index(_req, res) {
    const category = await Category.findAll();

    return res.status(200).json(category);
  }
}

export default new CategoryController();
