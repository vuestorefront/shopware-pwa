# QA checklist

This section is created to help you with efficient testing and to enssure that you don't miss any potential issues.

- **1. Home Page**

  - Page is correctly loaded with banners, pictures and buttons
  - All products are correctly displayed in Home Page
  - All links from the main page are functional
  - Header contains mega menu, my account icon, cart icon, logo and search icon.
    - Header links leading to the correct page
  - Page can be opened from URL and refreshed correctly
  - The categories are well organized

- **2. Sidebar menu**

  - Sidebar menu is on the left side
  - User can correctly navigate between menu parts
  - Subcategories are linked to correct pages

- **3. Category page**

  - Category pages are correctly loaded
  - Pagination works correctly: it is possible to change the page by clicking on the number or the arrow at the bottom of the page
  - All the products are displayed correctly:
    - pictures have the same sizes
    - description under picture is clear and correct
    - there is price shown under each picture
  - Sorting by: price, name low to high, price, name high to low - returns correct
  - Filtering by manufacturer, size, price, color, textil, length, width, content returns correct results
  - Filtering: by clicking button ‘Clear all’ all previously selected options are not selected anymore
  - Check whether breadcrumb navigation is functional.
  - Category page can be opened from URL
  - Category page can be refreshed

- **4. Product page**

  - Product page is correctly displayed with pictures, details etc.
  - After opening product page always the top of it is displayed with the product description and pictures
  - Product details (color, size) can be correctly adjusted
  - Quantity of products can be adjusted by keyboard input
  - Quantity field accepts only integers > 0
  - ‘Description’, ‘Properties’, ‘Read reviews’ are correctly displayed by clicking on the appropriate tab
  - Section ‘You may also like’ is displayed correctly:
    - all the pictures in carousel are displayed and have the same sizes
    - description under picture is clear and correct
    - there is price shown under each picture
    - it is possible to go to the next set of products by clicking arrows next to the pictures
  - Product page can be opened from URL
  - Product page can be and refreshed

- **5. Registration**

  - Register new account with correct data
  - Attempt to register new account with incorrect data - check validation messages as well
  - Attempt to register new account without required information - check validation messages as well
  - Attempt to register new account with email that is already used - check validation message as well

- **6. Login**

  - Login with correct credentials
  - Login attempt with incorrect credentials - check validation messages as well
  - Login attempt with no credentials - check validation messages as well
  - Logout
  - There is red dot above my account icon that indicates user is logged

- **7.Cart**

  - Add single product to cart
  - Add multiple products to cart
  - Attempt to add out-of-stock products to cart
  - Change quantity of products in cart
  - Prices are correctly recalculated after every change in cart
  - Remove products from cart by clicking ‘X’ sign next to them
  - If guest user has products in cart, then after logging in, those products are still in cart.
  - If logged in user has products in cart, then after logging out, cart should be empty
  - After logging in again for the same account, items should appear in cart again
  - There is ‘Go to checkout’ button at the bottom of the cart and it works correctly
  - There is number of items placed in the cart displayed in a circle above ‘cart icon’ in the header

- **8. Placing Order (implementation in progress)**

  - With products in cart, user can proceed to checkout page
  - Proceeding through checkout steps works correctly
  - All fields marked with\* are required during checkout - check validation messages as well
  - Order is correctly placed: saved in shopware, appeared in 'my orders' page,
  - Order can be placed by both logged-in and logged-out user
  - If user is not logged in, he can login during checkout
  - If user is not logged in, he can create account during checkout - check if account is correctly created
  - Success page is correctly displayed
  - Check if invoice for company is correctly created (if requested)

- **9. My Account page (for logged-in user)**

  - My account page is opened correctly
  - Content of its sub-pages is displayed correctly
  - User can edit his data in ‘My profile’ in ‘Personal details’, ‘Password change’ and ‘Email change’ tabs, and his changes are saved
  - User can edit existed addresses and add new ones in ‘My addresses’ tab
  - Orders made by user are correctly displayed

- **10. Offline mode (implementation in progress)**

  - Application works (i.e. can be refreshed) in offline mode
  - Notification bar about being offline is displayed when in offline mode
    - Notification is displayed at the bottom of the page
  - If only homepage was loaded before going offline, only main page and products/links shown on a homepage will be available in offline mode
  - If category page was loaded before going offline, this category and all its product/links pages will be available in offline mode

- **11. Search (implementation in progress)**
  - User can start to search by clicking on the search bar in the header
  - If user types at least 3 characters in search input, categories list and matched products are displayed (picture, name, price).
  - If no products match typed phrase, message "No results were found" is displayed.
  - Search sidebar can be closed by clicking 'X' button.
