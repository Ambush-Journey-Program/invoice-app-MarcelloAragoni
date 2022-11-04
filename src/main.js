import { BASE_URL, DEFAULT_SORT, DEFAULT_SORT_ORDER } from "./constants.js";
import { handleAddClass,handleRemoveClass } from "./utilities.js";

const submitEl = document.querySelector("#searchForm");


async function handleSubmit(event) {
  event.preventDefault();

  const [clientNameEl, statusEl] = event.target;

  const sortParams = {
    _sort: DEFAULT_SORT,
    _order: DEFAULT_SORT_ORDER,
  }

  const urlParams = new URLSearchParams({
    ...sortParams,
  });

  const filterParams = [
    { name: 'clientName', value: clientNameEl.value },
    { name: 'status', value: statusEl.value },
  ]

  filterParams.forEach(filter => {
    if (filter.value) {
      urlParams.set(filter.name, filter.value)
    }
  });

  const response = await handleFetchUrl(`${BASE_URL}?${urlParams}`);

  if (response.length === 0){
    handleAddClass('errorimage','notfound')
    handleAddClass('teste', 'ul--empty')

    return;
  }

  handleRemoveClass('errorimage', 'notfound')
  handleRemoveClass('teste', 'ul--empty')
  const invoiceHtml = formatInvoiceListHtml(response);

  buildInvoiceList(invoiceHtml);
}


async function handleFetchUrl(url) {
  const response = await fetch(url);
  return await response.json();

}

function formatInvoiceListHtml(invoices) {
  return invoices.map((invoice) => {
    return `
      <li class="invoice">
        <p class="invoice--id">#${invoice.id}</p>
        <p class="invoice--date">Due ${invoice.paymentDue}</p>
        <p class="invoice--name" >${invoice.clientName}</p>
        <p class="invoice--total" >R$ ${invoice.total}</p>
        <div class="invoice--status--box invoice--status--${invoice.status}">
          <p class="invoice--status" >${invoice.status}</p>
        </div>
      </li>
      `;
  });
}

function buildInvoiceList(invoices) {
  const el = document.querySelector('[data-invoices="1"]');
  el.innerHTML = invoices.join("");
}

submitEl.addEventListener("submit", handleSubmit);


// async function handleSubmit(event) {
//   event.preventDefault();

//   const fields = [...event.target];

//   let filters = ''

//   fields.forEach(field => {
//     if (!!field.value) {
//       filters += `${field.id}=${field.value}&`
//     }
//   });

//   const response = await handleFetchUrl(`${BASE_URL}?${filters}&_sort=${DEFAULT_SORT}&_order=${DEFAULT_SORT_ORDER}`);
//   const invoiceHtml = formatInvoiceListHtml(response);

//   buildInvoiceList(invoiceHtml);
// }
  // if (clientNameEl.value) {
  //   urlParams.set('clientName', clientNameEl.value)
  // }

  // if (statusEl.value) {
  //   urlParams.set('status', statusEl.value)
  // }

//   if (event.target[1].value != `--`) {
//     const statusFilter = `?status=${event.target[1].value}&`;
//     const response = await handleFetchUrl(`${BASE_URL}${statusFilter}`)
//     const invoiceHtml = formatInvoiceListHtml(response);
//     buildInvoiceList(invoiceHtml);

//     return;
//   }
//     const response = await handleFetchUrl(`${BASE_URL}?`)
//     const invoiceHtml = formatInvoiceListHtml(response);
//     buildInvoiceList(invoiceHtml);


// async function handleInputFilter(event) {
//   event.preventDefault();
//   if (event.target[0].value != ``) {
//     const inputFilter = `?clientName=${event.target[0].value}&`;
//     const response = await handleFetchUrl(`${BASE_URL}${inputFilter}`)
//     const invoiceHtml = formatInvoiceListHtml(response);
//     buildInvoiceList(invoiceHtml);

//     return;
//   }
//     const response = await handleFetchUrl(`${BASE_URL}?`)
//     const invoiceHtml = formatInvoiceListHtml(response);
//     buildInvoiceList(invoiceHtml);
// }
