import * as elementCreator from "./element-creator.js";

function showDeleteForm(text, action) {
    const dialog = document.querySelector("#dialog");
    const form = document.querySelector("#dialog-form");
    form.innerHTML = "";

    form.appendChild(elementCreator.getElement("h2", "Confirm deletion"));
    form.appendChild(elementCreator.getElement("p", text));
    const menu = elementCreator.getElement("menu", "");
    const confirmButton = elementCreator.getButton("confirm-delete-btn", "Delete", "submit");
    const cancelButton = elementCreator.getButton("cancel-delete-btn", "Cancel")
    menu.appendChild(confirmButton);
    menu.appendChild(cancelButton);
    form.appendChild(menu);

    confirmButton.addEventListener("click", (e) => {
        e.preventDefault();
        action();
        dialog.close();
    })

    cancelButton.addEventListener("click", () => {
        dialog.close();
    })

    dialog.showModal();
}

export { showDeleteForm };