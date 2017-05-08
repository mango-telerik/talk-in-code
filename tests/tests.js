import * as data from "data";
import * as validator from "validator";
import { User } from "userModel";
import { Post } from "postModel";
import {
    USERNAME_CHARS,
    USERNAME_MIN_LENGTH,
    USERNAME_MAX_LENGTH,
    USERNAME_LOCAL_STORAGE,
    AUTH_KEY_LOCAL_STORAGE,
    ID_LOCAL_STORAGE,
    CURRENT_POST
} from "constants";
import { KINVEY } from "kinvey";
import * as jsonRequester from "requester";

mocha.setup('bdd');
let expect = chai.expect;


const author = "admin",
    bad_author = "a",
    category = "JavaScript",
    bad_category = "boza",
    id = "123456789",
    title = "new post",
    bad_title = "t",
    ontent = "some content",
    bad_content = "c",
    likes = 5,
    _kmd = {},
    _id = "123456789";

const user = {
    username: author,
    password: "1234",
    email: "email@email.com",
    posts: 0,
    comments: 0,
    credential: "admin",
    _kmd: { authtoken: "987654321" }
};

const URL = {
    LOGIN: "https://baas.kinvey.com/user/kid_HyNeqo4kZ/login/",
    REGISTER: "https://baas.kinvey.com/user/kid_HyNeqo4kZ",
    CREATE_POST: "https://baas.kinvey.com/posts/kid_HyNeqo4kZ",
    CREATE_COMMENT: "https://baas.kinvey.com/comments/kid_HyNeqo4kZ",
    GET_POST_BY_AUTHOR: KINVEY.URLS.postsUrl + `?query={"author.username":"${author}"}`,
    GET_POST_BY_CATEGORY: KINVEY.URLS.postsUrl + `?query={"category":"${category}"}`,
    EDIT_POST: KINVEY.URLS.commentsURL + id,
    GET_POST_COMMENTS: KINVEY.URLS.commentsURL + `?query={"postid":"${id}"}`,
    GET_POST_BY_ID: KINVEY.URLS.postsUrl + `?query={"_id":"${id}"}`,
    GET_COMMENT_BY_ID: KINVEY.URLS.commentsURL + `?query={"_id":"${id}"}`,
    DELETE_COMMENTS_OF_POST: KINVEY.URLS.commentsUrl + `?query={"postid":"${id}"}`,
    DELETE_POST: KINVEY.URLS.postsUrl + `?query={"_id":"${id}"}`,
    DELETE_COMMENT: KINVEY.URLS.commentsURL + `?query={"_id":"${id}"}`
};

describe("User tests", function() {
    describe("data.register() tests", function() {
        beforeEach(() => {
            sinon.stub(jsonRequester, 'post', user => {
                return new Promise(function(resolve, reject) {
                    resolve(user);
                });
            });
        });

        afterEach(() => {
            jsonRequester.post.restore();
        });

        it('(1) Expect: data.users.register() to make correct POST call', function(done) {
            data.users.register(user)
                .then(() => {
                    expect(jsonRequester.post.firstCall.args[0]).to.equal(URL.REGISTER);
                })
                .then(done, done);
        });

        it('(2) Expect: data.users.register() to make exactly one POST call', function(done) {
            data.users.register(user)
                .then((res) => {
                    expect(jsonRequester.post.calledOnce).to.be.true;
                })
                .then(done, done);
        });

        it('(3) Expect: data.users.register() to put correct user data', function(done) {
            data.users.register(user)
                .then(() => {
                    const actual = jsonRequester.post.firstCall.args[1];
                    const props = Object.keys(actual).sort();

                    expect(props.length).to.equal(2);
                    expect(props[0]).to.equal('data');
                    expect(props[1]).to.equal('headers');
                })
                .then(done, done);
        });
    });

    describe("data.users.signIn() tests", function() {
        beforeEach(() => {
            sinon.stub(jsonRequester, 'post', user => {
                return new Promise(function(resolve, reject) {
                    resolve(user);
                });
            });
            localStorage.clear();
        });

        afterEach(() => {
            jsonRequester.post.restore();
            localStorage.clear();
        });

        it('(1) Expect: data.users.signIn() to make correct POST call', function(done) {
            data.users.signIn(user)
                .then(() => {
                    expect(jsonRequester.post.firstCall.args[0]).to.equal(URL.LOGIN);
                })
                .then(done, done);
        });

        it('(2) Expect: data.users.signIn() to make exactly one POST call', function(done) {
            data.users.signIn(user)
                .then((res) => {
                    expect(jsonRequester.post.calledOnce).to.be.true;
                })
                .then(done, done);
        });

        it('(3) Expect: data.users.signIn() to put correct user data', function(done) {
            data.users.signIn(user)
                .then(() => {
                    const actual = jsonRequester.post.firstCall.args[1];
                    const props = Object.keys(actual).sort();

                    expect(props.length).to.equal(2);
                    expect(props[0]).to.equal('data');
                    expect(props[1]).to.equal('headers');
                })
                .then(done, done);
        });
    });
});

mocha.run();