## Module 05: Integration with S3
* [GET `/import?name=test.csv` - get signed URL for S3 uploading](https://jkrxmfyj25.execute-api.us-east-1.amazonaws.com/dev/import?name=test.csv)
* File parsing results:

  `test.csv`
  ```cvs
    foo,bar
    1,One
    2,Two
    3,Hello, World!
  ```
  ![CloudWatch log for CSV parsing result](./task-05.png)


### Cloudfront
* [Website on Cloudfront](https://d2oxj55y64zodz.cloudfront.net/)


## Module 04: Integration with Database

### API Gateway
* [GET `/products` endpoint to fetch a product list](https://jdpcg4ienj.execute-api.us-east-1.amazonaws.com/dev/products)
* [POST `/products` endpoint to add a new product](https://jdpcg4ienj.execute-api.us-east-1.amazonaws.com/dev/products)
* [GET `/products/{id}` endpoint to fetch an individual product](https://jdpcg4ienj.execute-api.us-east-1.amazonaws.com/dev/products/12f39fc4-e5fe-4785-8152-493dde93ee5f)

### Cloudfront
* [Website on Cloudfront](https://d2oxj55y64zodz.cloudfront.net/)


## Module 03: Serverless API

### API Gateway
* [`/products` endpoint to fetch a product list](https://jdpcg4ienj.execute-api.us-east-1.amazonaws.com/dev/products)
* [`/products/{id}` endpoint to fetch an individual product](https://jdpcg4ienj.execute-api.us-east-1.amazonaws.com/dev/products/28a50b67-3388-4512-bcea-10faf6d7bbfa)

### Cloudfront
* [PR to the my `shop-react-redux-cloudfront` repo](https://github.com/nodm/shop-react-redux-cloudfront/pull/2)
* [Page that uses `/products` endpoint](https://d2oxj55y64zodz.cloudfront.net/)
* [Page that uses `/products/{id}` endpoint](https://d2oxj55y64zodz.cloudfront.net/admin/product-form/28a50b67-3388-4512-bcea-10faf6d7bbfa)
