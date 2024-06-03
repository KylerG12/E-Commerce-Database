const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
    try {
    const cats = await Category.findAll({
      include: [{model: Product}],
    });
    res.status(200).json(cats);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {

  try {
    const cat = await Category.findOne({
      where: {id: req.params.id},
      include: [{model: Product}],
    });
    res.status(200).json(cat);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  }) .then((newCat) => {
    res.json(newCat);
  }) .catch ((err) => {
    res.json(err);
  });
});

router.put('/:id', (req, res) => {
  Category.update({
    category_name: req.body.category_name,
  },
  {
    where: {id: req.params.id}
  },
) .then((upCat) => {
    res.json(upCat);
  }) .catch ((err) => {
    res.json(err);
  });
});


router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id:req.params.id,
    },
  })  .then((delCat) => {
    res.json(delCat);
  }) .catch ((err) => {
    res.json(err);
  });
});

module.exports = router;
