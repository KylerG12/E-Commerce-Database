const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{model: Product}],
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findOne({
      where: {id: req.params.id},
      include: [{model: Product}],
    });
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
  }) .then((newTag) => {
    res.json(newTag);
  }) .catch ((err) => {
    res.json(err);
  });
});
router.put('/:id', (req, res) => {
  Tag.update({
    tag_name: req.body.tag_name,
  },
  {
    where: {id: req.params.id}
  },
) .then((upTag) => {
    res.json(upTag);
  }) .catch ((err) => {
    res.json(err);
  });
});


router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id:req.params.id,
    },
  })  .then((delTag) => {
    res.json(delTag);
  }) .catch ((err) => {
    res.json(err);
  });
});
module.exports = router;
