import {
  addEmployee,
  onGetEmployees,
  deleteEmployee,
  getEmployee,
  editEmployee,
} from "./firebase.js";

const eList = document.getElementById("employee-table");
const eForm = document.getElementById("employee-form");

let editFlag = false;
let editId = "";

window.addEventListener("DOMContentLoaded", async () => {
  onGetEmployees((snapshot) => {
    let html = `<th>Name</th>
      <th>Salary</th>
      <th>Date of Birth</th>
      <th>ID</th>
      <th>Actions</th>`;
    if (snapshot) {
      snapshot.forEach((doc) => {
        html += `<tr>
      <td>${doc.data().name}</td>
      <td>${doc.data().salary}</td>
      <td>${doc.data().birth}</td>
      <td>${doc.id}</td>
      <td>
        <button class='delete-btn btn' data-id='${doc.id}'>Delete</button>
        <button class='edit-btn btn' data-id='${doc.id}'>Edit</button>
      </td>
      </tr>`;
        eList.innerHTML = html;
      });
    }

    const deleteBtns = document.getElementsByClassName("delete-btn");

    Array.from(deleteBtns).forEach((button) => {
      button.addEventListener("click", (e) => {
        deleteEmployee(e.target.dataset.id);
      });
    });

    const editBtns = document.getElementsByClassName("edit-btn");

    Array.from(editBtns).forEach((button) => {
      button.addEventListener("click", async (e) => {
        const employee = await getEmployee(e.target.dataset.id);

        eForm["eName"].value = employee.data().name;
        eForm["eSalary"].value = employee.data().salary;
        eForm["eBirth"].value = employee.data().birth;

        editFlag = true;
        editId = employee.id;

        eForm.getElementsByTagName("button")[0].innerText = "Update";
      });
    });
  });
});

eForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const eName = eForm["eName"].value;
  const eSalary = eForm["eSalary"].value;
  const eBirth = eForm["eBirth"].value;

  if (!eName || !eSalary || !eBirth) {
    return;
  }

  if (!editFlag) {
    addEmployee(eName, eSalary, eBirth);
  } else {
    editEmployee(editId, { name: eName, salary: eSalary, birth: eBirth });
    eForm.getElementsByTagName("button")[0].innerText = "Save";
    editFlag = false;
  }

  eForm.reset();
});
