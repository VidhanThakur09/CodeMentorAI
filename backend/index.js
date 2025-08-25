import express from "express";
import chat from "./tools/retriver.js";
import loadFiles from "./tools/subtitleLoader.js";
import multer from "multer";
import cors from "cors";

const app = express();
const upload = multer({ dest: 'uploads/'});
const port = 3000 || process.env.PORT;


// cors

app.use(cors({
    origin: ["https://codementorai-1.onrender.com","https://codementorai-9cyd.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));


// Middleware to parse JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Example route
app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

app.post ('/chat',async(req,res)=>{
    let {userQuery,courseName,history} = req.body;

    try{
        if(userQuery.length === 0){
            throw new Error("Empty query");
        }
        let response = await chat(userQuery,courseName,history);
        res.status(200).json(response);
    } catch (error) {
        console.error("Error processing chat:", error);
        res.status(500).send("Internal Server Error");
    }
})

app.post('/upload', upload.single('file'),async(req,res)=>{
    try {
        if (!req.file) {
            return res.status(400).send("No file uploaded");
        }
        await loadFiles(req.file.path, req.body.courseName);
        res.status(200).send("File processed successfully.");
    } catch (error) {
        console.error("Error processing file:", error);
        res.status(500).send("Internal Server Error");
    }
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});