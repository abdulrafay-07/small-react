
// a function to create an element
// a function to render the element
// diffing algorithm
// components to implement

/**
   return (
      <div id="child">
         Hi
      </div>
   )

   -----> type = div, props = { id: "child" }, children: "Hi"

   const reactElement = {
      type: "div",
      props: {
         id: "red-color",
      },
      children: "Red color",
   };
*/

// valid types of element (limited for now)
const validHtmlElements = [
   "div",
   "span",
   "p",
   "h1",
   "h2",
   "h3",
   "h4",
   "h5",
   "h6",
   "ul",
   "ol",
   "li",
   "a",
   "button",
   "input",
   "textarea",
   "form",
   "label",
   "select",
   "option",
   "img",
   "nav",
   "header",
   "footer",
   "main",
   "section",
   "article",
];

const validProps = [
   "id",                // Identifier for the element
   "className",         // CSS class (use "className" instead of "class" in JS)
   "style",             // Inline CSS styles (as an object)
   "title",             // Tooltip text
   "alt",               // Alternative text for images
   "src",               // Source URL for images, scripts, etc.
   "href",              // Hyperlink reference (used with <a>)
   "type",              // Type for inputs, buttons, etc.
   "name",              // Name attribute for inputs, forms, etc.
   "value",             // Value for inputs, selects, etc.
   "placeholder",       // Placeholder text for inputs
   "disabled",          // Disable interaction for inputs, buttons, etc.
   "readOnly",          // Make inputs read-only
   "checked",           // Checkbox/radio button checked state
   "onClick",           // Click event handler
   "onChange",          // Change event handler
   "onSubmit",          // Submit event handler for forms
   "onMouseEnter",      // Mouse enter event handler
   "onMouseLeave",      // Mouse leave event handler
   "onFocus",           // Focus event handler
   "onBlur",            // Blur (lose focus) event handler
];

function isValidHTMLElement(tag) {
   return validHtmlElements.includes(tag.toLowerCase());
};

function isValidHTMLProp(prop) {
   return validProps.includes(prop);
};

function render(element, rootContainer) {
   // check if the element is valid
   const isValid = isValidHTMLElement(element.type);
   if (!isValid) {
      console.error("Invalid HTML element:", element.type, "\nElement:", element);
      return;
   };

   // create element
   const el = document.createElement(element.type);

   // add props if any
   if (element.props) {
      for (const [key, value] of Object.entries(element.props)) {
         if (!isValidHTMLProp(key)) continue;

         el[key] = value;
      };
   };

   // add children
   if (Array.isArray(element.children)) {
      element.children.forEach((child) => {
         const childElement = typeof child === "object"
            ? render(child)
            : document.createTextNode(child);

         el.appendChild(childElement);
      });
   } else {
      const childElement = typeof element.children === "object" 
         ? render(element.children)
         : document.createTextNode(element.children);
         
      el.appendChild(childElement);
   };

   return el;
};

function createElement(type, props, ...children) {
   return { type, props, children };
};

const element = createElement(
   "div",
   { className: "main" },
   createElement("div", null, "First div"),
   createElement(
      "div",
      { className: "border" },
      createElement("p", { className: "para" }, "Hi from inside")
   ),
);

const rootContainer = document.getElementById("root");
const renderedElement = render(element, rootContainer);
rootContainer.appendChild(renderedElement);