const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const productSchema = require('../apiSchema/productSchema');
const tokenValidation = require('../middleware/tokenValidation');

router.post('/',
  tokenValidation.validationToken,
  joiSchemaValidation.validateBody(productSchema.createProductSchema),
  productController.createProduct
);

router.get('/',
  tokenValidation.validationToken,
  joiSchemaValidation.validateQueryParams(productSchema.getAllProductsSchema),
  productController.getAllProducts
);

router.get('/:id',
  tokenValidation.validationToken,
  productController.getProductById
);

router.put('/:id',
  tokenValidation.validationToken,
  joiSchemaValidation.validateBody(productSchema.updateProductScheme),
  productController.updateProduct
);

router.delete('/:id',
  tokenValidation.validationToken,
  productController.deleteProduct
);

module.exports = router;
