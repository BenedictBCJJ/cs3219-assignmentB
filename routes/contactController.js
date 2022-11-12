// contactController.js// Import contact model
Contact = require("./contactModel"); // Handle index actions
exports.index = function (req, res) {
  Contact.get(function (err, contacts) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    } else {
      res.json({
        status: "success",
        message: "Contacts retrieved successfully",
        data: contacts,
      });
    }
  });
}; // Handle create contact actions
exports.new = function (req, res) {
  var contact = new Contact();
  contact.name = req.body.name ? req.body.name : contact.name;
  contact.gender = req.body.gender;
  contact.email = req.body.email;
  contact.phone = req.body.phone; // save the contact and check for errors
  var regexname = /^[a-zA-Z]*$/;
  var regexemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var num = 1;
  if (req.body.phone !== "") {
    num = Number(req.body.phone);
  }
  const verified =
    regexname.test(contact.name) &&
    regexemail.test(contact.email) &&
    Number.isInteger(num);

  contact.save(function (err) {
    if (err) {
      res.json(err);
    } else if (!verified) {
      res.json("Verification of name, email or number failed");
    } else {
      res.json({
        message: "New contact created!",
        data: contact,
      });
    }
  });
}; // Handle view contact info
exports.view = function (req, res) {
  Contact.findById(req.params.contact_id, function (err, contact) {
    if (err) {
      res.send(err);
    } else {
      res.json({
        message: "Contact details loading..",
        data: contact,
      });
    }
  });
}; // Handle update contact info
exports.update = function (req, res) {
  Contact.findById(req.params.contact_id, function (err, contact) {
    if (err) {
      res.send(err);
    } else {
      contact.name = req.body.name ? req.body.name : contact.name;
      contact.gender = req.body.gender;
      contact.email = req.body.email;
      contact.phone = req.body.phone;
      var regexname = /^[a-zA-Z]*$/;
      var regexemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      var num = 1;
      if (req.body.phone !== "") {
        num = Number(req.body.phone);
      }
      const verified =
        regexname.test(contact.name) &&
        regexemail.test(contact.email) &&
        Number.isInteger(num); // save the contact and check for errors
      contact.save(function (err) {
        if (err) {
          res.json(err);
        } else if (!verified) {
          res.json("Verification of name, email or number failed");
        } else {
          res.json({
            message: "Contact Info updated",
            data: contact,
          });
        }
      });
    }
  });
}; // Handle delete contact
exports.delete = function (req, res) {
  Contact.deleteOne(
    {
      _id: req.params.contact_id,
    },
    function (err, contact) {
      if (err) {
        res.send(err);
      } else {
        if (contact["deletedCount"] > 0) {
          res.json({
            status: "success",
            message: "Contact deleted",
          });
        } else {
          res.json({
            status: "Failure",
            message: "Contact not found",
          });
        }
      }
    }
  );
};
