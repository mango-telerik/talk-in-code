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

const RESULT = [];


const BASE = {
    LOGIN: "https://baas.kinvey.com/user/kid_HyNeqo4kZ/login/",
    REGISTER: "https://baas.kinvey.com/user/kid_HyNeqo4kZ",
    POSTS: "https://baas.kinvey.com/appdata/kid_HyNeqo4kZ/posts/",
    COMMENTS: "https://baas.kinvey.com/appdata/kid_HyNeqo4kZ/comments"
};

const URL = {
    GET_POST_BY_AUTHOR: BASE.POSTS + `?query={"author.username":"${author}"}`,
    GET_POST_BY_CATEGORY: BASE.POSTS + `?query={"category":"${category}"}`,
    EDIT_POST: BASE.POSTS + id,
    GET_POST_COMMENTS: BASE.COMMENTS + `?query={"postid":"${id}"}`,
    GET_POST_BY_ID: BASE.POSTS + `?query={"_id":"${id}"}`,
    GET_COMMENT_BY_ID: BASE.COMMENTS + `?query={"_id":"${id}"}`,
    DELETE_COMMENTS_OF_POST: BASE.COMMENTS + `?query={"postid":"${id}"}`,
    DELETE_POST: BASE.POSTS + `?query={"_id":"${id}"}`,
    DELETE_COMMENT: BASE.COMMENTS + `?query={"_id":"${id}"}`
};

describe("User tests", function() {
    describe("data.users.register() tests", function() {
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
                    expect(jsonRequester.post.firstCall.args[0]).to.equal(BASE.REGISTER);
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
                    const actual = jsonRequester.post.firstCall.args[1].data;
                    const props = Object.keys(actual).sort();

                    expect(props.length).to.equal(6);
                    expect(props[0]).to.equal('comments');
                    expect(props[1]).to.equal('credential');
                    expect(props[2]).to.equal('email');
                    expect(props[3]).to.equal('password');
                    expect(props[4]).to.equal('posts');
                    expect(props[5]).to.equal('username');
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
                    expect(jsonRequester.post.firstCall.args[0]).to.equal(BASE.LOGIN);
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
                    const actual = jsonRequester.post.firstCall.args[1].data;
                    const props = Object.keys(actual).sort();

                    expect(props.length).to.equal(2);
                    expect(props[0]).to.equal('password');
                    expect(props[1]).to.equal('username');
                })
                .then(done, done);
        });
    });
});

describe("Forum posts tests", function() {
    describe("data.posts.getPosts() tests", function() {
        beforeEach(() => {
            sinon.stub(jsonRequester, "get", user => {
                return new Promise(function(resolve, reject) {
                    resolve(RESULT);
                });
            });
        });

        afterEach(function() {
            jsonRequester.get.restore();
        });

        it('(1) Expect: data.posts.getPosts() to make correct GET call', function(done) {
            data.posts.getPosts()
                .then(() => {
                    expect(jsonRequester.get.firstCall.args[0]).to.equal(BASE.POSTS);
                })
                .then(done, done);
        });

        it('(2) Expect: data.posts.getPosts() to make exactly one GET call', function(done) {
            data.posts.getPosts()
                .then((res) => {
                    expect(jsonRequester.get.calledOnce).to.be.true;
                })
                .then(done, done);
        });

        it('(3) expect data.posts.getPosts() to return correct result', function(done) {
            data.posts.getPosts()
                .then(obj => {
                    expect(obj).to.eql(RESULT);
                })
                .then(done, done);
        });
    });

    describe("data.posts.getPosts(author) tests", function() {
        beforeEach(() => {
            sinon.stub(jsonRequester, "get", user => {
                return new Promise(function(resolve, reject) {
                    resolve(RESULT);
                });
            });
        });

        afterEach(function() {
            jsonRequester.get.restore();
        });

        it('(1) Expect: data.posts.getPosts(author) to make correct GET call', function(done) {
            data.posts.getPosts(null, author)
                .then(() => {
                    expect(jsonRequester.get.firstCall.args[0]).to.equal(URL.GET_POST_BY_AUTHOR);
                })
                .then(done, done);
        });

        it('(2) Expect: data.posts.getPosts(author) to make exactly one GET call', function(done) {
            data.posts.getPosts(null, author)
                .then((res) => {
                    expect(jsonRequester.get.calledOnce).to.be.true;
                })
                .then(done, done);
        });

        it('(3) expect data.posts.getPosts(author) to return correct result', function(done) {
            data.posts.getPosts(null, author)
                .then(obj => {
                    expect(obj).to.eql(RESULT);
                })
                .then(done, done);
        });
    });

    describe("data.posts.getPosts(category) tests", function() {
        beforeEach(() => {
            sinon.stub(jsonRequester, "get", user => {
                return new Promise(function(resolve, reject) {
                    resolve(RESULT);
                });
            });
        });

        afterEach(function() {
            jsonRequester.get.restore();
        });

        it('(1) Expect: data.posts.getPosts(category) to make correct GET call', function(done) {
            data.posts.getPosts(category, null)
                .then(() => {
                    expect(jsonRequester.get.firstCall.args[0]).to.equal(URL.GET_POST_BY_CATEGORY);
                })
                .then(done, done);
        });

        it('(2) Expect: data.posts.getPosts(category) to make exactly one GET call', function(done) {
            data.posts.getPosts(category, null)
                .then((res) => {
                    expect(jsonRequester.get.calledOnce).to.be.true;
                })
                .then(done, done);
        });

        it('(3) expect data.posts.getPosts(category) to return correct result', function(done) {
            data.posts.getPosts(category, null)
                .then(obj => {
                    expect(obj).to.eql(RESULT);
                })
                .then(done, done);
        });
    });
});

describe("Forum post comments tests", function() {

});

mocha.run();