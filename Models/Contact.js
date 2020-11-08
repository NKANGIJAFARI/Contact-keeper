const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
        //ref stands for reference creating a relationship btn Contacts model and users collection.   
        //This users is in the server.js as app.use('/api/users', require('./Routes/users'));
    },
    name: {
        type: String, required: true
    },
    email: {
        type: String, required: true
    },
    phone: {
        type: String
    },
    type: {
        type: String,
        default : 'personal'
    },
    date: {
        type: Date, default: Date.now
    }
});

module.exports = mongoose.model('contacts', ContactSchema);