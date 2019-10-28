1.How will CMS pages behave? In exactly the same way as category pages? Will CMS pages get exactly the same route name, which is "frontend.navigation.page"?
2.Will this behavior of CMS pages change in the future?
3.How will /cms-page endpoint work in comparission with /category endpoint?

4.What kind of Media do you include in Category entity?

5.How to use cmsPage in Category entity? Shall Category contain a CmsPage or CmsPage should contain a Category?

6.Can we get only active / visible / etc. categories and products? All the data that we need to display.

7.Rights now breadcrumbs are 
    "breadcrumb": ["Catalogue #1", "Clothing"]
can we get breadcrumbs objects with links included?
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

8.What is displayNestedProducts in a category?

9.In terms of of Category Page can we get ListingPrices for currencyId and ruleId, which applies to current sw-context-token only? If prices from-to are exactly the same then we display exact price instead of a range in Category Page.

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

10. What are the differences between prices, calculatedPrice, calculatedPrices, listingPrices within a product entity?

11. What are the placeholder types which can be used in "product page" layout? Some kind of data mapping (SW admin panel naming convention)

12. What are product.sortedProperties?

13. When calling /product endpoint can we return an error instead of returning not-active products? From headless perspective we should not be able to access this product.

14. What is product.displayGroup?

15. In terms of stock we left only product.available field. We do not really need exact stocks and available stock in the frontend layer within' the product page. That would be get to create separate endpoint for /checkProductStock?quantity=5 and in result we would get a response saying "yes you can add that quantity of that product to the cart".

16. Can product.unit and product.purchaseUnit be different? When? How shall we handle that?

17. When getting a cmsPage will we get a mustache with variables or final content filled with exact values just to display?

18. How shall we use product.children, product.options, product.properties in the product page? Which array to use for displaying the links to other variants of the product? Shall we use product.properties to display some table of the properties or we will get such table as CMS content?