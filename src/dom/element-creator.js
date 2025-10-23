import { changeSelectedPriority } from "./dom-manager";

function getLabel(htmlFor, textContent) {
  const label = document.createElement("label");
  label.htmlFor = htmlFor;
  label.textContent = textContent;
  return label;
}

function getInput(type, id, name, placeholder, autocomplete = "off", value = null) {
  const input = document.createElement("input");
  input.type = type;
  if (id !== null) {
    input.id = id;
  }
  input.name = name;
  input.autocomplete = autocomplete;
  if (value !== null) {
    input.value = value;
  }
  input.placeholder = placeholder;
  return input;
}

function getOption(value, text, classes = null, selected = false) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = text;
  if (classes !== null) {
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
  if (value !== null) {
    textArea.value = value;
  }
  textArea.autocomplete = "off";
  return textArea;
}

function getButton(id, textContent, type = "button", classes = null) {
  const button = document.createElement("button");
  if (id !== null) {
    button.id = id;
  }
  button.textContent = textContent;
  button.type = type;
  if (classes !== null) {
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
  const select = getElement("div", "", "priority-select");
  select.id = id;
  select.name = name;

  for (let i = 0; i < 5; i++) {
    const priority = getElement("span", "", `priority-${i + 1}`);
    priority.appendChild(getIcon("circle-outline"));
    select.appendChild(priority);
    priority.dataset.selected = "false";

    priority.addEventListener("click", () => {
      priority.innerHTML = "";
      changeSelectedPriority(select, `priority-${i + 1}`);
    });
  }

  return select;
}

function getElement(elementName, textContent, classes = null, id = null) {
  const element = document.createElement(elementName);
  if (id !== null) {
    element.id = id;
  }
  if (classes !== null) {
    element.classList.add(classes);
  }
  element.innerHTML = textContent;
  return element;
}

function getIcon(iconName, classes = null) {
  const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const iconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  iconSvg.classList.add("iconify");
  if (classes !== null) {
    iconSvg.classList.add(classes);
  }

  let d;
  switch (iconName) {
    case "edit":
      d =
        "m14.06 9l.94.94L5.92 19H5v-.92zm3.6-6c-.25 0-.51.1-.7.29l-1.83 1.83l3.75 3.75l1.83-1.83c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94z";
      break;
    case "delete":
      d =
        "M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3zM7 6h10v13H7zm2 2v9h2V8zm4 0v9h2V8z";
      break;
    case "new":
      d = "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z";
      break;
    case "list":
      d =
        "M11 15h6v2h-6zM9 7H7v2h2zm2 6h6v-2h-6zm0-4h6V7h-6zm-2 2H7v2h2zm12-6v14c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2m-2 0H5v14h14zM9 15H7v2h2z";
      break;
    case "circle-outline": {
      d =
        "M12 20a8 8 0 0 1-8-8a8 8 0 0 1 8-8a8 8 0 0 1 8 8a8 8 0 0 1-8 8m0-18A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2";
      iconPath.setAttribute("stroke-width", "1");
      iconPath.setAttribute("stroke", "currentColor");
      break;
    }
    case "circle":
      d = "M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2";
      break;
    case "folded":
      d = "M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6z";
      break;
    case "unfolded":
      d = "M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6z";
      break;
    default:
      d =
        "M11 15h2v2h-2zm0-8h2v6h-2zm1-5C6.47 2 2 6.5 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 18a8 8 0 0 1-8-8a8 8 0 0 1 8-8a8 8 0 0 1 8 8a8 8 0 0 1-8 8";
      iconSvg.classList.add("icon-error");
      break;
  }

  iconSvg.setAttribute("viewBox", "0 0 24 24");

  iconPath.setAttribute("fill", "currentColor");
  iconPath.setAttribute("d", d);

  iconSvg.appendChild(iconPath);
  return iconSvg;
}

export {
  getLabel,
  getInput,
  getOption,
  getTextArea,
  getButton,
  getSelect,
  getPrioritySelect,
  getElement,
  getIcon,
};
