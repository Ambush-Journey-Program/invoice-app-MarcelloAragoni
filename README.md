
# Invoice App

## Description

- Author: @guilhermekuni
- Repository name: `challenge-invoice-app`
- Tags: `HTML`, `CSS`, `JavaScript`, `REST`
- Achievements:
  - HTML
  - CSS - RWD
  - JavaScript
  - REST Requests

---

## The Challenge

### Briefing
Your challenge is to build out this invoicing application and get it looking as close to the design as possible.

You should use raw HTML, CSS and JavaScript to implement this challenge, and in order to fill the information you'll fetch the data from an external API.


### External API
You will be using the [Invoices API](https://ambushs-invoice-app.herokuapp.com/) to get the invoices.

This API accepts query params, so you can use them to apply the filters.

Examples:
-   GET all invoices → [](https://ambushs-invoice-app.herokuapp.com/invoices)[https://ambushs-invoice-app.herokuapp.com/invoices](https://ambushs-invoice-app.herokuapp.com/invoices)
-   GET invoice by id → [](https://ambushs-invoice-app.herokuapp.com/invoices/RT3080)[https://ambushs-invoice-app.herokuapp.com/invoices/RT3080](https://ambushs-invoice-app.herokuapp.com/invoices/RT3080)
-   GET invoice by status → [](https://ambushs-invoice-app.herokuapp.com/invoices?status=paid)[https://ambushs-invoice-app.herokuapp.com/invoices?status=paid](https://ambushs-invoice-app.herokuapp.com/invoices?status=paid)

You can also apply sorting by using the `_sort` and `_order` props.

Example:

-   GET invoices sorted by `clientName` in `asc` order → [](https://ambushs-invoice-app.herokuapp.com/invoices?_sort=clientName&_order=asc)[https://ambushs-invoice-app.herokuapp.com/invoices?_sort=clientName&_order=asc](https://ambushs-invoice-app.herokuapp.com/invoices?_sort=clientName&_order=asc)


### Running the API locally
You can use the “production” API to implement most of the challenge, but if you need to run the server locally you can follow the below steps:

1.  Go to [](https://github.com/guilhermekuni/invoice-app-api)[https://github.com/guilhermekuni/invoice-app-api](https://github.com/guilhermekuni/invoice-app-api)
2.  Clone the repository
3.  Run `yarn`
4.  Run `yarn start`
5.  Now you should be able to use the local server to test, you just need to replace the [`https://ambushs-invoice-app.herokuapp.com`](https://ambushs-invoice-app.herokuapp.com/invoices) with `http://localhost:8000`

## Acceptance Criteria

- [ ] Built the invoice list interface following the Figma file. The other screens are not required for this challenge.
- [ ] Implements list of invoices by fetching the data from Invoices API.
- [ ] User should be able to filter the invoices by `status`.
- [ ] Invoices should be sorted by `paymentDue` in `desc` order.
- [ ] The App should show a friendly message if there's no invoices to show related to user's filters (check Figma design for this screen).

### BONUS 1: Implement an additional filter:
- [ ] Filter by client name.
- [ ] Should be a new input, next to the “Filter by status” field.
- [ ] This input should allow the user to search for the invoices related to a specific client name.


### BONUS 2: Add delete feature:
- [ ] Add a delete icon in the end of each invoice row.
- [ ] This button should open a delete confirmation modal.
- [ ] Confirming the delete action should delete the selected invoice.
- **TIP:** the action should send a `DELETE` request with the invoice id.
- **IMPORTANT:** in order to develop this, you'll have to run the API locally to don't mess with “production” data. Refer to the “_Running the API locally”_ section to learn the steps for that.


### BONUS 3: Add “mark as paid” feature:
- [ ] User should be able to click the invoice row.
- [ ] The click action should open a confirmation modal confirming if the user wants to mark the invoice as “paid”.
- [ ] Confirming the action should mark the selected invoice as “paid”.
-  **TIP:** The action should send a `PATCH` request with the invoice id and the `status=“paid"`.
-  **IMPORTANT:** in order to develop this, you'll have to run the API locally to don't mess with “production” data. Refer to the “_Running the API locally”_

--- 
## Resources
-   [Frontend Mentor Assets](https://www.frontendmentor.io/challenges/invoice-app-i7KaLTQjl)
-   [JSON Server - Sorting](https://github.com/typicode/json-server#sort)
-   [JSON Server - Filter](https://github.com/typicode/json-server#filter)
-   [HTML](https://www.notion.so/HTML-bb4adb5992914407abcb31442fa8e6f1)
-   [JavaScript](https://www.notion.so/JavaScript-82853e990c65478a9792e9f733b539fe)
-   [CSS](https://www.notion.so/CSS-ed673e98698e451491b47e1349a5ecba)
