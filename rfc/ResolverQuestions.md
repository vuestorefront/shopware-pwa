1. How will CMS pages behave? In exactly the same way as category pages? Will CMS pages get exactly the same route name, which is "frontend.navigation.page"?

2. Will this behavior of CMS pages change in the future?

3. How would /cms-page endpoint work in comparission with /category endpoint?

4. What kind of Media do you include in Category entity as Category.Media field? Is it some thumbnail of a category?

5. In Category entity there is a cmsPage field? How shall we use that? We are not 100% about its structure. Shall Category contain a CmsPage or CmsPage should contain a Category?

6. Would it be possible to get only active / visible categories and products? Only the data that the storefront needs to display.

7. Right now breadcrumbs are 

```
    "breadcrumb": ["Catalogue #1", "Clothing"]
```

would it be possible to get the breadcrumbs objects with links included? Like below:

```
[
  {
    name: "Man",
    path: "/man"        
  },  
  {
    name: "Shirts",
    path: "/shirts"
  }
]
```

8.In terms of getting the Product data in Category Page response, which is `ProductForCategoryPageHeadless.ts`. Could we get ListingPrices for currencyId and ruleId, which apply to the current `sw-context-token` only? If prices from-to would be exactly the same then we can display exact price instead of a range in Category Page. All the price objects are pretty complex in Product entities but we are not sure if we need all of these. Example of the prices returned with Product objects to Category Page below:

```
    "listingPricesForHeadless": 
        {
            "from": {                 
                "net": 59.03,
                "gross": 70.25,
            },
            "to": {
                "net": 670.04,
                "gross": 797.35,
            },
        }
```

9. What are the differences between prices, calculatedPrice, calculatedPrices, listingPrices within' a product entity?

10. What are the placeholder types which can be used in "Product Page" layout? Some kind of data mapping (SW admin panel naming convention).

11. When resolving a Product Page for not-active products can we return an error code instead of returning a product? From headless perspective we should not be able to access this product as it is not active.

12. In terms of stock we left only `Product.available` field. We are not sure if we need exact stocks and available stock in the frontend layer within' the Product Page. That would be useful to create a separate endpoint for /checkProductStock?quantity=5 and in result we would get a response saying "yes, you can buy that quantity of that product". Does it sound ok?

13. When receivina a cmsPage, will we get a mustache placeholders or will we get a final content filled with exact values just to display?

14. How shall we use `Product.children`, `Product.options`, `Product.properties` in the Product Page? Which array to use for displaying the links to other variants of the product? Shall we use product.properties to display some table of the properties or we will get such table as CMS content? We came up with an idea in `ProductForProductPageHeadless.ts` interface, that we might get `options []` with all the variants, that end-user can go to and "available" boolean to mark if that variant is available right now. This way even when entering a Simple Product Page (Option in Shopware terminology) we would get all the required data to display the other variants of that product without the need of calling additional endpoint of a parent product to get all the variants. 

15. What is `Product.sortedProperties` field? We found only nulls in that field. Is it something important for us?

16. What is `product.displayGroup` field? Is it something important for us?

17. Can we get /navigation endpoint?
