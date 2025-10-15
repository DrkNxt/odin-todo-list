import * as elementCreator from "./element-creator.js";

function showDeleteForm(text, action) {
    const deleteDialog = document.querySelector("#confirm-delete-dialog");
    const deleteForm = document.querySelector("#confirm-delete-form");
    deleteForm.innerHTML = "";

    deleteForm.appendChild(elementCreator.getElement("h2", "Confirm deletion"));
    deleteForm.appendChild(elementCreator.getElement("p", text));
    const menu = elementCreator.getElement("menu", "");
    const confirmButton = elementCreator.getButton("confirm-delete-btn", "Confirm", "submit");
    const cancelButton = elementCreator.getButton("cancel-delete-btn", "Cancel")
    menu.appendChild(confirmButton);
    menu.appendChild(cancelButton);
    deleteForm.appendChild(menu);

    confirmButton.addEventListener("click", (e) => {
        e.preventDefault();
        action();
        deleteDialog.close();
    })

    cancelButton.addEventListener("click", () => {
        deleteDialog.close();
    })

    deleteDialog.showModal();
}

export { showDeleteForm };