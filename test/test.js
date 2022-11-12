var app = require("../app.js");
var chai = require("chai");
var chaiHttp = require("chai-http");
let Contact = require("../routes/contactModel");
chai.use(chaiHttp);
chai.should();

describe("Array", function () {
  describe("Get ALL", function () {
    it("Get all contacts", function (done) {
      chai
        .request(app)
        .get("/api/contacts")
        .end((err, res) => {
          //   console.log(res.body);
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    }).timeout(10000);
  });
  describe("Get Singular", function () {
    it("Get one with id", function (done) {
      const contact = new Contact({
        name: "name2",
        email: "mail2",
        phone: "phone2",
        gender: "gender2",
      });
      contact.save((err, contact) => {
        // console.log(contact);
        chai
          .request(app)
          .get("/api/contacts/" + contact._id)
          .end((err, res) => {
            // console.log(res.body);
            res.should.have.status(200);
            res.body.should.be.a("object");
            done();
          });
      });
    }).timeout(10000);
  });
  describe("Create one", function () {
    it("Get one with id", function (done) {
      const contact = new Contact({
        name: "name",
        email: "mail@mail.com",
        phone: "12345",
        gender: "male",
      });
      chai
        .request(app)
        .post("/api/contacts/")
        .send(contact)
        .end((err, res) => {
          //   console.log(res.body);
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    }).timeout(10000);
  });
  describe("Delete one", function () {
    it("Delete one with id", function (done) {
      const contact = new Contact({
        name: "name",
        email: "mail@mail.com",
        phone: "12345",
        gender: "male",
      });
      contact.save((err, contact) => {
        // console.log(contact);
        chai
          .request(app)
          .del("/api/contacts/" + contact._id)
          .end((err, res) => {
            // console.log(res.body);
            res.should.have.status(200);
            res.body.should.be.a("object");
            done();
          });
      });
    }).timeout(10000);
  }).timeout(10000);
  describe("Update one", function () {
    it("Update one with id", function (done) {
      const contact = new Contact({
        name: "nameaaaa",
        email: "mail@mail.com",
        phone: "12345213314213",
        gender: "female",
      });
      const contact1 = new Contact({
        name: "namesdfds",
        email: "mail@mail.com",
        phone: "12345123431",
        gender: "male",
      });

      contact.save((err, contact) => {
        // console.log(contact);
        chai
          .request(app)
          .put("/api/contacts/" + contact._id)
          .send(contact1)
          .end((err, res) => {
            // console.log(res.body);
            res.should.have.status(200);
            res.body.should.be.a("object");
            done();
          });
      });
    }).timeout(10000);
  });
});
