// a valid name should contain only letters in the alphabet
function checkName(name) {
    const regex = /^[a-zA-Z ]+$/;

    if (regex.test(name)) {
        return true;
    } else {
        console.log("Invalid value: " + name + ", for name");
        return false;
    }
}

// a valid email should only contain letters and numbers before '.' and only letters after '.'
function checkEmail(email) {
    const regex = /^[A-Z0-9a-z.]+@[A-Za-z0-9]+.[A-Za-z]{2,64}/;

    if (regex.test(email)) {
        return true;
    } else {
        console.log("Invalid value: " + email + ", for email");
        return false;
    }
}

// a valid source control tool should only be one of the options specified in the task
function checkSourceControl(sourceControl) {
    // convert input string to lowercase so it can be matched with variables in set
    const tool = sourceControl.toLowerCase();
    const tools = new Set(["github", "gitlab", "bitbucket", "tfs", "other"]);

    if (tools.has(tool)) {
        return true;
    } else {
        console.log("Invalid value: " + tool + ", for source control tool");
        return false;
    }
}

// a valid number of people should be a positive non-decimal number
function checkPeople(numPeople) {
    const regex = /^[1-9]+[0-9]*$/;

    if (regex.test(numPeople)) {
        return true;
    } else {
        console.log("Invalid value: " + numPeople + ", for number of people");
        return false;
    }
}

module.exports = { checkName, checkEmail, checkSourceControl, checkPeople };
