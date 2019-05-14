export class Portfolio {
  constructor({ element, balance, portfolioWorth }) {
      this._el = element;
      this._portfolioWorth = portfolioWorth;
      this._balance = balance;
      this._render();
  }

  _render() {
      this._el.innerHTML = `
          <div class="card-panel hoverable center-align">
              <p>
                  Current balance: ${this._balance}
                  <br />
                  Portfolio Worth: ${this._portfolioWorth}
              </p>
          </div>
      `
  }
}
