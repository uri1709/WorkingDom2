/* 
<div class="select-dropdown select-dropdown--123">
   <button class="select-dropdown__button select-dropdown__button--123"> 
      <span class="select-dropdown__text select-dropdown__text--123">Выберите элемент</span>
   </button>
  <ul class="select-dropdown__list select-dropdown__list--123"> 
     <li class="select-dropdown__list-item" data-value="1">JavaScript</li>
     <li class="select-dropdown__list-item" data-value="2">NodeJS</li>
     <li class="select-dropdown__list-item" data-value="3">ReactJS</li>
     <li class="select-dropdown__list-item" data-value="4">HTML</li>
     <li class="select-dropdown__list-item" data-value="5">CSS</li> 
  </ul> 
</div>  
*/

class CustomSelect {

    #select;
    #currentSelectedOption;

    constructor(id, options) {
        const select = document.createElement("div");
        select.classList.add(`select-dropdown`, `select-dropdown--${id}`);

        const button = document.createElement("button");
        button.classList.add(
            `select-dropdown__button`,
            `select-dropdown__button--${id}}`
        );
        const buttonText = document.createElement("span");
        buttonText.classList.add(
            `select-dropdown__text`,
            `select-dropdown__text--${id}}`
        );
        buttonText.textContent = `Выберите элемент`;
        button.appendChild(buttonText);

        const list = document.createElement("ul");
        list.classList.add(
            `select-dropdown__list`,
            `select-dropdown__list--${id}}`
        ); // `active` - разворачивает и сворачивает список

        options.forEach(({ value, text }) => {
            const listItem = document.createElement("li");
            listItem.classList.add("select-dropdown__list-item");
            listItem.setAttribute("data-value", value);
            listItem.textContent = text;
            list.appendChild(listItem);
        });

        // Добавляем элементы на страницу
        select.appendChild(button);
        select.appendChild(list);

        //событие на кнопку разворачивает и сворачивает список ul
        button.addEventListener("click", () => {
            list.classList.toggle("active"); 
        });

        //Из списка list для каждого li удаляем класс selected и добавляем по целевому элементу класс selected
        const listItems = list.querySelectorAll(`.select-dropdown__list-item`);
        list.addEventListener("click", (event) => {
            if (event.target.classList.contains("select-dropdown__list-item")) {
                listItems.forEach((listItem) => {
                    listItem.classList.remove("selected");
                });
                event.target.classList.add("selected");
                this.#currentSelectedOption = event.target.getAttribute("data-value");
                console.log("текущий элемент: ", this.#currentSelectedOption);
            }
        });

        this.#select = select;
    }


    selectedValue() { 
        return this.#currentSelectedOption;
    }

    render(container) {
        container.appendChild(this.#select);
        // console.log("container=", container);
    }
}

//проверка
const options = [
    { value: 1, text: "JavaScript" },
    { value: 2, text: "NodeJS" },
    { value: 3, text: "ReactJS" },
    { value: 4, text: "HTML" },
    { value: 5, text: "CSS" },
];

const customSelect = new CustomSelect("123", options);
const mainContainer = document.querySelector("#container");
customSelect.render(mainContainer);

