import BaseComponent from '../BaseComponent/BaseComponent.js';

export class Table extends BaseComponent {
  constructor({
    data,
    element
  }) {
    super();
    this._el = element;
    this._render(data);
  
    this._el.addEventListener('click', e => {
      this._onRowClick(e);
    })


    let tableGrid = document.getElementById('table-grid');
    this.tableGrid = tableGrid
    tableGrid.addEventListener('dblclick', (e) => e.preventDefault())
    tableGrid.onclick = (e) => {
      e.preventDefault;
      if (e.target.tagName != 'TH') return;

      this._sortGrid(e.target.cellIndex, e.target.getAttribute('data-type'));
    };
    let asc = true;
    let desc = false;
    this.asc = asc;
    this.desc = desc;
  }


  _sortGrid(colNum, type) {
    let tbody = this.tableGrid.getElementsByTagName('tbody')[0];
    let rowsArray = [].slice.call(tbody.rows);
    let compare;

    if (this.asc) {
      this.asc = false;
      this.desc = true;
      switch (type) {
        case 'number':
          compare = (rowA, rowB) => {
            return rowA.cells[colNum].innerHTML - rowB.cells[colNum].innerHTML;
          };
          break;
        case 'string':
          compare = (rowA, rowB) => {
            return rowA.cells[colNum].innerHTML.localeCompare(rowB.cells[colNum].innerHTML);
          };
          break;
      }
    } else if (this.desc) {
      this.asc = true;
      this.desc = false;
      switch (type) {
        case 'number':
          compare = (rowA, rowB) => {
            return rowB.cells[colNum].innerHTML - rowA.cells[colNum].innerHTML
          };
          break;
        case 'string':
          compare = (rowA, rowB) => {
            return rowB.cells[colNum].innerHTML.localeCompare(rowA.cells[colNum].innerHTML);
          };
          break;
      }
    }
    rowsArray.sort(compare);
    for (let i = 0; i < rowsArray.length; i++) {
      tbody.appendChild(rowsArray[i]);
    }
    this.tableGrid.appendChild(tbody);
  }

  _onRowClick(e) {
    const target = e.target.closest('tbody tr');
    if (!target) return;

    const id = target.dataset.id;
    if (id) {
      let rowClickEvent = new CustomEvent('rowClick', {
        detail: {
          id
        },
      });
      this._el.dispatchEvent(rowClickEvent);
    }
  }

  _render(data) {
    this._el.innerHTML = `
        <table id="table-grid" class="data-table highlight"> 
          <thead>
            <tr>
                <th data-type="string">Name</th>
                <th data-type="string">Symbol</th>
                <th data-type="number">Rank</th>
                <th data-type="number">Price</th>
            </tr>
          </thead>
          <tbody>
            ${
              data.map(coin => `
                <tr data-id="${coin.id}">
                    <td>${coin.name}</td>
                    <td>${coin.symbol}</td>
                    <td>${coin.rank}</td>
                    <td>${coin.price}</td>
                </tr>
              `).join('')
            }
          </tbody>
        </table>
        `;
  }
}