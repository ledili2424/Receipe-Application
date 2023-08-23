import icons from "url:../../img/icons.svg"; //parcel 2.version
export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.rendorError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.rendorError();

    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));
      //update changed text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() != ""
      ) {
        // console.log("@@@@", newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      //update changed attributes
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
        // console.log(newEl.attributes);

        // console.log(Array.from(newEl.attributes));
      }
    });
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div>
      `;
    this._clear;
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  //render error message
  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
      <div>
        <svg>
          <use href="src/img/${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clear;
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  //render success message
  renderMessage(message = this._message) {
    const markup = `<div class="message">
      <div>
        <svg>
          <use href="src/img/${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clear;
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
