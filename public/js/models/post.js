export default class Post extends Element {
    constructor(author, content, likes, title, category) {
        super(author, content, likes);
        this.title = title;
        this.category = category;
    }

    get title() {
        return this._title;
    }

    set title(val) {
        // validate
        this._title = val;
    }

    get category() {
        return this._category;
    }

    set category(val) {
        // validate
        this._category = val;
    }
}