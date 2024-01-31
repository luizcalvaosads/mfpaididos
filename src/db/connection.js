import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://TESTBETA:TEST@testservermf.qlr5fzf.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("> Database Connected!"))
  .catch(error => console.log(error));