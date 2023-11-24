//            Assignment # 49-52 JAVASCRIPT

// Q # 01: Create a signup form and display form data in your web page on submission.

// ANS # 01:
function submitForm() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var formDataDisplay = document.getElementById("formDataDisplay");
    formDataDisplay.innerHTML = `
        <h2>Form Data:</h2>
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Password:</strong> ${password}</p>
    `;
}

function togglePasswordVisibility() {
    var passwordInput = document.getElementById("password");
    var toggleButton = document.querySelector(".toggle-password");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleButton.textContent = "Hide";
    } else {
        passwordInput.type = "password";
        toggleButton.textContent = "Show";
    }
}

// Q # 02: Suppose in your webpage there is content area in which you have entered your item details, but user can only see some details on first look. When user clicks on “Read more” button, full detail of that particular item will be displayed. 

//ANS # 02:
function showDetails() {
    var initialDetails = document.querySelector('.initial-details');
    var fullDetails = document.querySelector('.full-details');
    var readMoreButton = document.querySelector('button1');

    initialDetails.style.display = (initialDetails.style.display === 'none') ? 'block' : 'none';
    fullDetails.style.display = (fullDetails.style.display === 'none') ? 'block' : 'none';

    readMoreButton.textContent = (initialDetails.style.display === 'none') ? 'Read less' : 'Read more';
}
//Q # 03: In previous assignment you have created a tabular data 
//using javascript. Let’s modify that. Create a form which 
//takes student’s details and show each student detail in 
//table. Each row of table must contain a delete button and 
//an edit button. On click on delete button entire row should 
//be deleted. On click on edit button, a hidden form will 
//appear with the values of that row.

//ANS # 03:
document.addEventListener("DOMContentLoaded", function () {
    var students = [];

    var studentForm = document.getElementById("studentForm");
    var studentTable = document.getElementById("studentTable");
    var editForm = document.getElementById("editForm");

    studentForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addStudent();
    });

    window.addStudent = function () {
        var name = document.getElementById("name").value;
        var age = document.getElementById("age").value;
        var grade = document.getElementById("grade").value;

        if (name && age && grade) {
            var student = {
                name: name,
                age: age,
                grade: grade
            };

            students.push(student);
            displayStudents();
            clearForm();
        }
    };

    function displayStudents() {
        studentTable.innerHTML = "<tr><th>Name</th><th>Age</th><th>Grade</th><th>Action</th></tr>";

        students.forEach(function (student, index) {
            var row = studentTable.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);

            cell1.innerHTML = student.name;
            cell2.innerHTML = student.age;
            cell3.innerHTML = student.grade;

            var deleteButton = document.createElement("button");
            deleteButton.innerHTML = "Delete";
            deleteButton.onclick = function () {
                deleteStudent(index);
            };

            var editButton = document.createElement("button");
            editButton.innerHTML = "Edit";
            editButton.onclick = function () {
                editStudent(index);
            };

            cell4.appendChild(deleteButton);
            cell4.appendChild(editButton);
        });
    }

    window.deleteStudent = function (index) {
        students.splice(index, 1);
        displayStudents();
    };

    window.editStudent = function (index) {
        var student = students[index];

        document.getElementById("editName").value = student.name;
        document.getElementById("editAge").value = student.age;
        document.getElementById("editGrade").value = student.grade;

        editForm.classList.remove("hidden");

        document.getElementById("editForm").addEventListener("submit", function (event) {
            event.preventDefault();
            updateStudent(index);
        });
    };

    window.updateStudent = function (index) {
        var name = document.getElementById("editName").value;
        var age = document.getElementById("editAge").value;
        var grade = document.getElementById("editGrade").value;

        if (name && age && grade) {
            students[index] = {
                name: name,
                age: age,
                grade: grade
            };

            editForm.classList.add("hidden");

            displayStudents();
        }
    };

    window.cancelEdit = function () {
        editForm.classList.add("hidden");
    };

    function clearForm() {
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("grade").value = "";
    }
});
