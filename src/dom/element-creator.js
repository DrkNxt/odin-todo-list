function getLabel(htmlFor, textContent) {
    const label = document.createElement("label");
    label.htmlFor = htmlFor;
    label.textContent = textContent;
    return label;
}

function getInput(type, id, name, placeholder, autocomplete = "off", value = null) {
    const input = document.createElement("input");
    input.type = type;
    if (id !== null){
        input.id = id;
    }
    input.name = name;
    input.autocomplete = autocomplete;
    if (value !== null){
        input.value = value;
    }
    input.placeholder = placeholder;
    return input;
}

function getOption(value, text, classes = null, selected = false) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = text;
    if (classes !== null){
        option.classList.add(classes);
    }
    option.selected = selected;
    return option;
}

function getTextArea(id, name, rows, placeholder, value = null) {
    const textArea = document.createElement("textarea");
    textArea.id = id;
    textArea.name = name;
    textArea.rows = rows;
    textArea.placeholder = placeholder;
    if (value !== null){
        textArea.value = value;
    }
    textArea.autocomplete = "off";
    return textArea;
}

function getButton(id, textContent, type = "button", classes = null) {
    const button = document.createElement("button");
    if (id !== null){
        button.id = id;
    }
    button.textContent = textContent;
    button.type = type;
    if (classes !== null){
        button.classList.add(classes);
    }
    return button;
}

function getSelect(id, name) {
    const select = document.createElement("select");
    select.id = id;
    select.name = name;
    return select;
}

function getPrioritySelect(id, name) {
    const select = document.createElement("select");
    select.id = id;
    select.name = name;
    select.appendChild(getOption("very-low", "Very Low", "very-low"));
    select.appendChild(getOption("low", "Low", "low"));
    select.appendChild(getOption("normal", "Normal", "normal", true));
    select.appendChild(getOption("high", "High", "high"));
    select.appendChild(getOption("very-high", "Very High", "very-high"));
    return select;
}

function getElement(elementName, textContent, classes = null, id = null) {
    const element = document.createElement(elementName);
    if (id !== null){
        element.id = id;
    }
    if (classes !== null){
        element.classList.add(classes);
    }
    element.innerHTML = textContent;
    return element;
}

function getIcon(iconName, classes = null) {
    const icon = document.createElement("span");
    icon.classList.add("iconify");
    if (classes !== null){
        icon.classList.add(classes);
    }
    icon.dataset.icon = "mdi-" + iconName;
    return icon;
}

function getIconPencil(classes = null) {
    const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    iconSvg.classList.add("iconify");
    if (classes !== null){
        iconSvg.classList.add(classes);
    }

    iconSvg.setAttribute('viewBox', '0 0 24 24');

    iconPath.setAttribute('fill', 'currentColor');
    iconPath.setAttribute(
    'd',
    'm14.06 9l.94.94L5.92 19H5v-.92zm3.6-6c-.25 0-.51.1-.7.29l-1.83 1.83l3.75 3.75l1.83-1.83c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94z'
    );

    iconSvg.appendChild(iconPath);
    return iconSvg;
}

function getIconTrash(classes = null) {
    const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    iconSvg.classList.add("iconify");
    if (classes !== null){
        iconSvg.classList.add(classes);
    }

    iconSvg.setAttribute('viewBox', '0 0 24 24');

    iconPath.setAttribute('fill', 'currentColor');
    iconPath.setAttribute(
    'd',
    'M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3zM7 6h10v13H7zm2 2v9h2V8zm4 0v9h2V8z'
    );

    iconSvg.appendChild(iconPath);
    return iconSvg;
}

// !!!!!!!!!!!!!TRASH CAN SYMBOL!!!!!!!!!!

export { getLabel, getInput, getOption, getTextArea, getButton, getSelect, getPrioritySelect, getElement, getIcon, getIconPencil, getIconTrash };