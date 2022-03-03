const express = require("express");
const cors = require("cors");
const Customer = require("./database");
const {
    checkName,
    checkEmail,
    checkSourceControl,
    checkPeople,
} = require("./validate");
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    if (req.method !== "GET") {
        return res.status(401).json({
            message: "Not allowed",
        });
    }

    res.send({ type: "GET" });

    res.json({ message: "Welcome to CodeBox!" });
});

app.get("/users", (req, res) => {
    if (req.method !== "GET") {
        return res.status(401).json({
            message: "Not allowed",
        });
    }

    res.send({ type: "GET" });
});

app.post("/users", async (req, res) => {
    const data = req.body;

    // checks for missing inputs
    if (!data.name || !data.email || !data.sourceControl || !data.numPeople) {
        return res.status(400).json({
            status_code: 0,
            error_msg: "Missing required parameters",
        });
    }

    // check for valid inputs
    if (
        checkName(data.name) &&
        checkEmail(data.email) &&
        checkSourceControl(data.sourceControl) &&
        checkPeople(data.numPeople)
    ) {
        // store user data into database with customer email as document ID
        await Customer.doc(data.email)
            .set(data)
            .then(() => {
                console.log("Document successfully written!");

                // sendEmail() - thank customer for their interest
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    } else {
        console.log(new Error("Invalid input!"));
    }

    res.send({
        type: "POST",
        name: data.name,
        email: data.email,
        sourceControl: data.sourceControl,
        numPeople: data.numPeople,
    });

    console.log(data);
});

// listen for requests
app.listen(process.env.PORT || 4000, () => {
    console.log("Ready to Go!");
});
