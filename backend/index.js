const express = require("express");
const cors = require("cors");
const connectDB = require('./db')

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use('/api',require("./routes/auth/signup"));
app.use('/api',require("./routes/auth/signin"));
app.use('/api',require("./routes/notes/addnote"));
app.use('/api',require("./routes/notes/updatenote"));
app.use('/api',require("./routes/notes/deletenote"));
app.use('/api',require("./routes/notes/getSinglenote"));
app.use('/api',require("./routes/admin/adminLogin"));
app.use('/api',require("./routes/admin/getAllusersNotes"));

app.listen('5000',()=>{
    console.log(`Server is running on port 5000`);
})