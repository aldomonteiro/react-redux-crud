import Category from '../models/category';

/**
 * Add a category
 */
export const addCategory = (req, res, next) => {
  const { description } = req.body;

  if (!description) {
    return res.status(422).send({ error: "the description is required" });
  }

  Category.findOne({ description }, (err, existingCategory) => {
    if (err) { return next(err); }

    if (existingCategory) {
      return res.status(422).send({ error: "Category is in use" });
    }

    const category = new Category({ description: description });

    category.save((err) => {
      if (err) { return next(err); }
      res.json({ description });
    });
  });
};

/**
 * Fetch the categories.
 */
export const fetchCategories = function(req, res, next) {
  Category
    .find({})
    .select({
      description: 0,
      updatedAt: 0,
      createdAt: 0
    })
    .limit(100)
    .sort({
      createdAt: -1
    })
    .exec(function(err, categories) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: 'Could not retrieve categories'
        });
      }
      res.json(categories);
    });
};

/**
 * Get a category by its id.
 */
export const getCategory = function(req, res, next) {
  Category.findById({
    '_id': req.params.id
  }, function(err, category) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Could not retrieve category w/ that id'
      });
    }
    if (!category) {
      return res.status(404).json({
        message: 'Category not found'
      })
    }
    res.json(category);
  });
};

export const deleteCategory = function(req, res, next) {
  var id = req.params.id;
  if (id.length != 24) {
    return res.json({
      message: 'id must be a valid 24 char hex string'
    });
  }
  var id = mongoose.Types.ObjectId(req.params.id); //convert to objectid
  Category.findByIdAndRemove(id, function(err, category) {
    if (err)
      throw err;

    if (!category) {
      return res.status(404).json({
        message: 'Could not delete category'
      });
    }

    res.json({
      result: 'Category was deleted'
    });

  });
};

