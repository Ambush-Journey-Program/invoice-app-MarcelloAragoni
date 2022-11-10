import { handleAddClass } from "./utilities.js";
import { handleResponse, handleConfirmPatch, handleConfirmDelete, urlParams } from "./build.js";

const submitEl = document.querySelector("#searchForm");
submitEl.addEventListener("submit", handleSubmit);

//---make the list of invoices---//

async function handleSubmit(event) {
  event.preventDefault();

  const [clientNameEl, statusEl] = event.target;

  console.log({ tst: clientNameEl.value })

  const filterParams = [
    { name: 'clientName', value: clientNameEl.value },
    { name: 'status', value: statusEl.value },
  ]

  filterParams.forEach(filter => {
    if (filter.value) {
      urlParams.set(filter.name, filter.value)
    } else {
      urlParams.delete(filter.name);
    }
  });

  await handleResponse();
}

//---responsable for the delete fetch---//

const confirmDeleteButton = document.querySelector("#confirmDeleteButton");
confirmDeleteButton.addEventListener("click" , handleConfirmDelete);

const cancelDeleteButton = document.querySelector("#cancelDeleteButton");
cancelDeleteButton.addEventListener("click" , () => handleAddClass("delete--screen", "delete--screen--disable"));

//--responsable for the patch fetch--//

const confirmPatchButton = document.querySelector("#confirmPatchButton");
confirmPatchButton.addEventListener("click" , handleConfirmPatch);

const cancelPatchButton = document.querySelector("#cancelPatchButton");
cancelPatchButton.addEventListener("click" , () => handleAddClass("patch--screen", "patch--screen--disable"));
