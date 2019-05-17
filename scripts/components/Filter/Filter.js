


//<a class="waves-effect waves-teal btn-flat">Button</a>



export class Filter {
    constructor( {
        element
    }) {
        this._el = element;

        this._render();


    }

    _render() {
        this._el.innerHTML = `<a class="waves-effect waves-teal btn-flat">Filter</a>`
    }
}