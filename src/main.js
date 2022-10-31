fetch(`https://ambushs-invoice-app.herokuapp.com/invoices?_order=DESC`)
  .then((response) => response.json())
  .then((data) => {
    const invoicesApi = buildInvoices(data)
    invoicesList(invoicesApi)
  });

function buildInvoices(invoices) {
  return invoices.map(invoice => {
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
      `
  })
}

function invoicesList(invoicesAPI){
  const el = document.querySelector('[data-invoices="1"]');
  el.innerHTML=invoicesAPI.join('');
}
