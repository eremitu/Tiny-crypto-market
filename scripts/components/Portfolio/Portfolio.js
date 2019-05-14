export class Portfolio {
    constructor({
        element,
        balance,
        portfolioWorth,
        data,
    }) {
        this._el = element;
        this._portfolioWorth = portfolioWorth;
        this._balance = balance;
        this._render();
        if (data) {
            let referenceNode = document.getElementById('portfolio-added-items');
            referenceNode.innerHTML += this._addItem(data)
        }


    }

    _addItem(data) {
        let itemToAdd = ''
        return itemToAdd = `
        <table class="striped highlight"> 
        <thead>
          <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
          </tr>
        </thead>

        <tbody>
              <tr>
                  <td>${data.name}</td>                
                  <td>${data.price + "$"}</td>
                  <td>${data.qty}</td>
                  <td>${data.totalPrice + "$"}</td>
              </tr>
        </tbody>
      </table>
        `
    }


    _render() {
        this._el.innerHTML = `
          <div class="card-panel hoverable center-align">
              <p>
                  Current balance: ${this._balance}
                  <br />
                  Portfolio Worth: ${this._portfolioWorth}                  
              </p>
            <div id="portfolio-added-items"></div>
          </div>
      `
    }
}