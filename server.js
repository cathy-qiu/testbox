const express = require("express");
const cors = require("cors");
const Customer = require("./database");
const { checkEmail, checkSourceControl, checkPeople } = require("./validate");
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    if (req.method !== "GET") {
        return res.status(401).json({
            message: "Not allowed",
        });
    }

    res.json({ message: "Welcome to CodeBox!" });
});

app.get("/users", function (req, res) {
    if (req.method !== "GET") {
        return res.status(401).json({
            message: "Not allowed",
        });
    }

    res.send({ type: "GET" });
});

app.post("/users", async function (req, res) {
    if (
        !req.body.name ||
        !req.body.email ||
        !req.body.sourceControl ||
        !req.body.numPeople
    ) {
        return res.status(400).json({
            status_code: 0,
            error_msg: "Missing required parameters",
        });
    }

    const data = req.body;

    // check for valid input
    if (
        checkEmail(req.body.email) &&
        checkSourceControl(req.body.sourceControl) &&
        checkPeople(req.body.numPeople)
    ) {
        // store user data into database
        await Customer.doc(req.body.email)
            .set(data)
            .then(function () {
                console.log("Document successfully written!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    } else {
        console.log(new Error("Invalid input!"));
    }

    res.send({
        type: "POST",
        name: req.body.name,
        email: req.body.email,
        sourceControl: req.body.sourceControl,
        numPeople: req.body.numPeople,
    });

    console.log(data);
});

// listen for requests
app.listen(process.env.port || 4000, function () {
    console.log("Ready to Go!");
});
