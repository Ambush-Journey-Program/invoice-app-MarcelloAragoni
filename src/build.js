import { sortParams, BASE_URL } from "./constants.js";
import { handleRemoveClass, handleAddClass } from "./utilities.js";
import {
  handleFetchGet,
  handleFetchPatch,
  handleFetchDelete,
} from "./service.js";

export let urlParams = new URLSearchParams({
  ...sortParams,
});

let idInvoice;
let statusInvoice;

export function formatInvoiceListHtml(invoices) {
  return invoices.map((invoice) => {
    return `
        <li class="invoice">
          <p class="invoice--id">#${invoice.id}</p>
          <p class="invoice--date">Due ${invoice.paymentDue}</p>
          <p class="invoice--name" >${invoice.clientName}</p>
          <p class="invoice--total" >R$ ${invoice.total}</p>
          <form id="patchForm">
          <div class="invoice--status--box invoice--status--box--${invoice.status}">
            <button value=${invoice.id} class="invoice--status invoice--status--${invoice.status}" >${invoice.status}</button>
          </div>
          </form>
          <form id="deleteForm">
            <button value="${invoice.id}" class="button button--trash"></button>
          </form>
        </li>
        `;
  });
}

export async function handleDelete(event) {
  event.preventDefault();
  idInvoice = event.target.value;

  handleRemoveClass("delete--screen", "delete--screen--disable"); //open delete window
}

export async function handlePatch(event) {
  event.preventDefault();
  idInvoice = event.target.value;
  statusInvoice = event.target.textContent;

  handleRemoveClass("patch--screen", "patch--screen--disable"); //open update window
}

export function buildInvoiceList(invoices) {
  const el = document.querySelector('[data-invoices="1"]');
  el.innerHTML = invoices.join("");

  const deleteElements = document.querySelectorAll("#deleteForm");
  const patchElements = document.querySelectorAll("#patchForm");

  deleteElements.forEach((deleteEl) => {
    deleteEl.addEventListener("click", handleDelete);
  });

  patchElements.forEach((patchEl) => {
    patchEl.addEventListener("click", handlePatch);
  });
}

export async function handleResponse() {
  const response = await handleFetchGet(`${BASE_URL}?${urlParams}`);

  if (response.length === 0) {
    handleAddClass("errorimage", "notfound");
    handleAddClass("teste", "ul--empty");

    return;
  }

  handleRemoveClass("errorimage", "notfound");
  handleRemoveClass("teste", "ul--empty");
  const invoiceHtml = formatInvoiceListHtml(response);

  buildInvoiceList(invoiceHtml);

  return response;
}

export async function handleConfirmPatch() {
  const newStatus = statusInvoice === 'pending' ? 'paid' : 'pending';

  await handleFetchPatch(idInvoice, { status: newStatus });

  await handleResponse();

  handleAddClass("patch--screen", "patch--screen--disable");
}

export async function handleConfirmDelete() {
  await handleFetchDelete(idInvoice);

  await handleResponse();

  handleAddClass("delete--screen", "delete--screen--disable");
}
