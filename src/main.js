import { BASE_URL, DEFAULT_SORT, DEFAULT_SORT_ORDER } from "./constants.js";
import { handleAddClass,handleRemoveClass} from "./utilities.js";

const submitEl = document.querySelector("#searchForm");
submitEl.addEventListener("submit", handleSubmit);

const sortParams = {
  _sort: DEFAULT_SORT,
  _order: DEFAULT_SORT_ORDER,
}

let urlParams = new URLSearchParams({
  ...sortParams,
});

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
        <form id="deleteForm">
          <button value="${invoice.id}" class="button button--trash"></button>
        </form>
      </li>
      `;
  });
}

async function handleDelete(event) {
  event.preventDefault();
  idInvoice = event.target.value;

  handleRemoveClass("delete--screen", "delete--screen--disable");//abre tela
}

function buildInvoiceList(invoices) {
  const el = document.querySelector('[data-invoices="1"]');
  el.innerHTML = invoices.join("");

  const deleteElements = document.querySelectorAll("#deleteForm");

  deleteElements.forEach((deleteEl)=>{
    deleteEl.addEventListener("click", handleDelete);
  });
}

async function handleResponse() {
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

//---Monta a lista---//

async function handleSubmit(event) {
  event.preventDefault();

  const [clientNameEl, statusEl] = event.target;

  const filterParams = [
    { name: 'clientName', value: clientNameEl.value },
    { name: 'status', value: statusEl.value },
  ]

  filterParams.forEach(filter => {
    if (filter.value) {
      urlParams.set(filter.name, filter.value)
    }
  });

  await handleResponse();
}

//---Faz o Delete---//

let idInvoice;

const confirmButton = document.querySelector("#formConfirm");
confirmButton.addEventListener("click" , handleConfirmDelete)

async function handleFetchDelete(id){
  fetch(`${BASE_URL}/${id}`, {method:"DELETE"});

  await handleResponse();

  handleAddClass("delete--screen", "delete--screen--disable");

}

function handleConfirmDelete(event) {
  event.preventDefault();
  const button = event.srcElement.value;

  if (button == "nao") {

    handleAddClass("delete--screen", "delete--screen--disable");

    return;
  }
  handleFetchDelete(idInvoice)
}



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
