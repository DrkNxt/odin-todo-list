function getLabel(htmlFor, textContent) {
    const label = document.createElement("label");
    label.htmlFor = htmlFor;
    label.textContent = textContent;
    return label;
}

function getInput(type, id, name, placeholder, autocomplete = "off") {
    const input = document.createElement("input");
    input.type = type;
    input.id = id;
    input.name = name;
    input.autocomplete = autocomplete;
    input.placeholder = placeholder;
    return input;
}

function getOption(value, text, selected = false) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = text;
    option.selected = selected;
    return option;
}

function getTextArea(id, name, rows, placeholder) {
    const textArea = document.createElement("textarea");
    textArea.id = id;
    textArea.name = name;
    textArea.rows = rows;
    textArea.placeholder = placeholder;
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
    select.appendChild(getOption("very-low", "Very Low"));
    select.appendChild(getOption("low", "Low"));
    select.appendChild(getOption("normal", "Normal", true));
    select.appendChild(getOption("high", "High"));
    select.appendChild(getOption("very-high", "Very High"));
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

export { getLabel, getInput, getOption, getTextArea, getButton, getSelect, getPrioritySelect, getElement, getIcon };