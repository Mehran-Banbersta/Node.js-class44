const { json } = require("express");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const fs = require("fs");

// Middleware to parse JSON requests
app.use(express.json());
// YOUR CODE GOES IN HERE
app.get("/", function (req, res) {
  res.send("Hello World!!");
});

// create a new blog post
app.post("/blogs", (req, res) => {
  // How to get the title and content from the request??
  const { title, content } = req.body;
  if (!title || !content) {
     res.status(400).json({ error: "title and content are required!" });
  }

  // Create a new blog post object
  const newPost = {
    title,
    content,
  };
  // Convert the object to JSON format
  const jsonData = JSON.stringify(newPost);

  // Write the JSON data to a new file with the provided title
  fs.writeFileSync(`${title}.json`, jsonData);
  res.end("ok");

  // Send a response with the newPost object
  res.json(newPost);
});



// UPDATING THE NEWPOST
app.put("/blogs/:title", (req, res) => {
  const title = req.params.title;
  // How to get the title and content from the request?
  const content  = req.body.body;
  // What if the request does not have a title and/or content?
  if(!content || !content){
    res.status(400).json({ error: "title and content are required!" });
  }

  const isBlogExist = fs.existsSync(title, content)
  if(!isBlogExist){
    try {

    } catch (error) {
console.log(error)
    }

  }
  // if (updateNewPost && title && content) {
  //   fs.writeFileSync(
  //     `${updateNewPost}.json`,
  //     JSON.stringify({ title, content })
  //   );
  //   res.end("ok");
  // } else {
  //   res.status(400).json({ error: "title and content are required!" });
  // }
});

// Delete post
app.delete("/posts/:title", (req, res) => {
  const deletePost = req.params.title;

  if (deletePost) {
    fs.unlinkSync(`${deletePost}.json`);
    res.end("ok");
  } else {
    res.status(400).json({ error: "Title is required." });
  }
});

// Reading posts
app.get("/blogs/:title", (req, res) => {
  // How to get the title from the url parameters?
  const readPost = req.params.title;

  const filePath = `${readPost}.json`
  // check if post exists
  if (fs.existsSync(filePath)) {
    const post = fs.readFileSync(`${readPost}.json`, "utf8");
    const postContent = JSON.parse(post);
    res.json(postContent);
  } else {
    res.status(400).json({ error: "Blogs not found" });
  }
 
  // send response
});
// Server Port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
