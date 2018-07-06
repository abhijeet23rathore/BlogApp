const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true},
    user_name:{ type: String, required: true},
    content:{ type: String, required: true},
    comments:[{
        comment: { type: String, required: true},
        user_id: { type: mongoose.Schema.Types.ObjectId, required: true},
        user_name: { type: String, required: true}
    }]
});

module.exports = mongoose.model('Blog',blogSchema);