var notSure = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
function warnUser() {
    alert("This is my warning message");
    throw new Error();
}

(department as AccountingDepartment).generateReports(); 