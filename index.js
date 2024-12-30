
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

function render(rootContainer, elements) {
   elements.forEach((element) => {
      const el = document.createElement(element.type);
      el.id = element.props && element.props.id;
      el.innerHTML = element.children && element.children;

      rootContainer.appendChild(el);
   });
};

function createElement(type, props, children) {
   return { type, props, children };
};

const elements = [];

const div1 = createElement("div", null, "div 1");
const p1 = createElement("p", { id: "paragraph" }, "paragraph");
const p2 = createElement("p", { id: "p2" }, null);

elements.push(div1, p1, p2);

const rootContainer = document.getElementById("root");
render(rootContainer, elements);