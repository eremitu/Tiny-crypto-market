export class Filter {
    constructor({
        element,
    }) {
        this._el = element;

        this._render();


        let filterInput = document.getElementById('autocomplete-input')
        filterInput.addEventListener('click', () => {
            let tableGrid = document.getElementById('table-grid');
            this.tableGrid = tableGrid
        });

        filterInput.addEventListener('input', () => {
            setTimeout(() => {
                this._filter();
            }, 250);
        })

    }


    _filter() {
        let input, filter, table, tr, td, td2, txtValue, txtValue2;
        input = document.getElementById("autocomplete-input");
        filter = input.value.toUpperCase();
        table = this.tableGrid;
        tr = table.getElementsByTagName("tr");
        for (let i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            td2 = tr[i].getElementsByTagName("td")[1];
            if (td || td2) {
                txtValue = td.textContent || td.innerText;
                txtValue2 = td2.textContent || td2.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else if (txtValue2.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    _render() {
        this._el.innerHTML = `
        <div class="row filter">
            <div class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <i class="material-icons prefix"></i>
                        <input type="text" id="autocomplete-input" class="autocomplete">
                        <label for="autocomplete-input">Filter</label>
                    </div>
                </div>
            </div>
        </div>`;
        document.addEventListener('DOMContentLoaded', function () {
            let elems = document.querySelectorAll('.autocomplete');
            let instances = M.Autocomplete.init(elems);
        });

    }
}