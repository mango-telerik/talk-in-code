export default class Comment extends Element {
    constructor(author, content, likes, label) {
        super(author, content, likes);
        this.label = label;
    }

    get label() {
        return this._label;
    }

    set label(val) {
        // validate
        this._label = val;
    }
}