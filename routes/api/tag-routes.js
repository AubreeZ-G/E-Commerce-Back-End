const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/tag', async (req, res) => {
  try {
    const tagsData = await Tag.findAll({
      include: [
        {
          model: Product
        }
      ],
    })

    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }

  // find all tags
  // be sure to include its associated Product data
});

router.get('/tag/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product
        },
      ],

    });
    res.status(200).json(tagData);
  }
  catch (err) {

    res.status(500).json(err);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/tag', async (req, res) => {
  try {
    Tag.create({
      tag_name: req.body.tag_name,
    })
      .then((newTag) => {
        // Send the newly created row as a JSON object
        res.json(newTag);
      })


  //   res.status(200).json(tagData);
   }
  catch (err) {
      res.json(err);
    }
    // create a new tag
  });

router.put('/tag/:id', async (req, res) => {
  Tag.update(
    {
    tag_name: req.body.tag_name,
    id: req.body.id
  },
  {
    // Gets the books based on the isbn given in the request parameters
    where: {
      id: req.params.id,
    },
  }
)
  .then((updatedTag) => {
    // Sends the updated book as a json response
    res.json(updatedTag);
  })
  .catch((err) => res.json(err));
  // update a tag's name by its `id` value
});

router.delete('/tag/:id', async (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
