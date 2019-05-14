import {
  Portfolio
} from '../Portfolio/Portfolio.js';

export class TradeWidget {
  constructor({
    element,
    balance,
    portfolioWorth
  }) {
    this._el = element;
    this._portfolioWorth = portfolioWorth;
    this._balance = balance;
    this._el = element;
    let data = this.data
    this._el.addEventListener('input', e => {
      if (!e.target.closest('#amount')) return;

      const value = +e.target.value;
      this._updateDisplay(value);
    })
    this._el.addEventListener('click', e => {
      if (e.target === document.getElementById('modal-close')) {
        this.close()
      } else return;
    })
    this._el.addEventListener('click', e => {
      if (e.target === document.getElementById('modal-buy')) {
        this.onConfirm()
      } else return;
    })
  }

  onConfirm() {
    let price = parseFloat(document.getElementById('item-total').innerText)
    if (this._balance >= 0 && this._balance >= price) {
      let targetsTotal = this._el.querySelector('#item-total')
      this._balance -= price;
      this._portfolioWorth += price;

      let data = {
        name: this._currentItem.name,
        totalPrice: +targetsTotal.innerHTML,
        price: this._currentItem.price,
        qty: +targetsTotal.innerHTML/this._currentItem.price,
      }

      this._updatePortfolio(data);

    } else if (this._balance < price) {
      M.toast({
        html: 'Not enough funds to proceed.',
        classes: 'red'
      })
    }
  }

  trade(item) {
    this._currentItem = item;
    this._total = 0;
    this._render(item);
  }

  close() {
    this._el.querySelector('.modal').classList.remove('open')
  }

  _updatePortfolio(data) {
    this._portfolio = new Portfolio({
      element: document.querySelector('[data-element="portfolio"]'),
      balance: this._balance,
      portfolioWorth: this._portfolioWorth,
      data: data,
    });
  }

  _updateDisplay(value) {
    this._totalEl = /*this._totalEl ||*/ this._el.querySelector('#item-total')
    this._totalEl.textContent = this._currentItem.price * value;
  }

  _render(item) {
    this._el.innerHTML = `  
      <div id="modal" class="modal open">
        <div class="modal-content">
          <h4>Buying ${item.name}:</h4>
          <p>
            Current price: ${item.price}. 
            Total: <span id="item-total">${this._total}</span>
          </p>

          <div class="row">
            <form class="col s12">
                <div class="input-field col s4">
                    <input id="amount" type="text">
                    <label for="amount">Amount</label>
                </div>
            </form>
          </div>

          <div class="modal-footer">
            <a id="modal-buy" href="#!" class="modal-close waves-effect waves-teal btn-flat">Buy</a>
            <a id="modal-close" href="#!" class="modal-close waves-effect waves-teal btn-flat">Cancel</a>
          </div>
      </div>
      </div>
      `
  }
}