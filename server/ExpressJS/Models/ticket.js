const mongoose = require('mongoose');

const ticketschema = new mongoose.Schema({
    user_id:String,
    issue_name:String,
issue_body:String,
})

module.exports = mongoose.model("Ticket",ticketschema);