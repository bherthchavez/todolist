
const express = require("express");
const https = require("https")
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemsSchema = {
name: String
};

const Item = mongoose.model("item", itemsSchema);

const item1 = new Item({
name: "Welcome to your todolist!",
});

const item2 = new Item({
  name: "Hit the + button to add a new item",
  });

  const item3 = new Item({
    name: "<--Hit this to delete an item.>!",
    });
    
const defaultItems = [item1, item2, item3];


 app.get("/", function(req, res){
  //  const day = date.getDate();

  Item.find({},function(err, foundItems){
    if (foundItems.length === 0 ){
        Item.insertMany(defaultItems, function(err){
          if (err) {
            console.log(err);
          }else{
            console.log("Successfully saved default item to DB.");
          }
        });
        res.redirect("/");
    }else{
      res.render("list", {listTitle: "Today", newListItems: foundItems});
    }
    
  });
  });
    
 
 app.post("/", function(req, res){
   const newItem = req.body.newItem;

    if(req.body.list === "Work"){
      const item = new Item({
        name: newItem
        });
        item.save();
      res.redirect("/work");
    }else{
      const item = new Item({
        name: newItem
        });
        item.save();
      res.redirect("/");
    }
    
 });


app.post("/delete", function(req, res){
const checkedItemId = req.body.checkbox;
Item.findByIdAndRemove(checkedItemId, function(err){
  if (!err){
    console.log("Successfully deleted checked item.");
    res.redirect("/");
  }
});

});


 app.get("/work", function(req, res){
   res.render("list", { listTitle: "Work List", newListItem: workItems});
   });
   

 app.post("/work", function(req, res){
   const item = req.body.newItem;
   workItems.push(item);
   res.render("/work");
 });  


 // Serrver setup -------------------------//
app.listen(process.env.PORT ||3000, function(){
console.log("Server started on port 300");
});