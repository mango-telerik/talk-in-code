import * as validator from "validator";
import{
    TITLE_CHARS,
    TITLE_MIN_LENGTH,
    TITLE_MAX_LENGTH,
} from "constants";
export default class Post {
    constructor(author, text, likes, title, category) {
       // super(author, text, likes);
        this.title = title;
        this.author = author;
        this.text = text;
        this.likes = likes;
       // this.id=0;
        this.category = category;
       // this.comments = 0;
    }


    get title() {
        return this._title;
    }

    set title(val) {
        console.log(val);
        const wrong = validator.validateString(val, TITLE_MIN_LENGTH, TITLE_MAX_LENGTH, TITLE_CHARS);
        if (wrong) {
            this.addError(wrong.message);
        } else {
            this._title = val;
        }
    }

    get category() {
        return this._category;
    }

    set category(val) {
        // validate
        this._category = val;
    }
    get author() {
        return this._author;
    }

    set author(val) {
        // validate
        this._author = val;
    }

    get text() {

        return this._text;
    }

    set text(val) {
        // validate
        console.log(val);
        this._text = val;
    }

    get likes() {
        return this._likes;
    }

    set likes(val) {
        // validate
        this._likes = val;
    }
}