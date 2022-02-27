function checkEmail(email) {
    // check valid email with regex
    const regex = new RegExp("[A-Z0-9a-z.]+@[A-Za-z0-9]+.[A-Za-z]{2,64}");

    if (regex.test(email)) {
        return true;
    } else {
        return false;
    }
}

function checkSourceControl(sourceControl) {
    if (
        sourceControl == "Github" ||
        sourceControl == "Gitlab" ||
        sourceControl == "BitBucket" ||
        sourceControl == "TFS" ||
        sourceControl == "Other"
    ) {
        return true;
    } else {
        return false;
    }
}

function checkPeople(numPeople) {
    if (Number.isInteger(numPeople) && numPeople >= 0) {
        return true;
    } else {
        return false;
    }
}

module.exports = { checkEmail, checkSourceControl, checkPeople };
