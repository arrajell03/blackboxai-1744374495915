// Mock user credentials
const validCredentials = {
    username: 'admin','alpha','bravo',
    password: 'admin123'
};
s
// Mock student data
let students = [
    {
        idno: '1000',
        lastname: 'ALPHA',
        firstname: 'BRAVO',
        course: 'BSIT',
        level: 3,
        image: 'placeholder.png'
    }
];

// DOM Elements
const loginPage = document.getElementById('loginPage');
const dashboard = document.getElementById('dashboard');
const loginForm = document.getElementById('loginForm');
const studentForm = document.getElementById('studentForm');
const studentTableBody = document.getElementById('studentTableBody');
const imageUpload = document.getElementById('imageUpload');
const studentImage = document.getElementById('studentImage');

let currentStudentId = null;

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loginForm.addEventListener('submit', handleLogin);
    studentForm.addEventListener('submit', handleStudentSubmit);
    imageUpload.addEventListener('change', handleImageUpload);
    renderStudentTable();
});

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === validCredentials.username && password === validCredentials.password) {
        loginPage.classList.add('hidden');
        dashboard.classList.remove('hidden');
    } else {
        alert('Invalid credentials!');
    }
}

function logout() {
    loginPage.classList.remove('hidden');
    dashboard.classList.add('hidden');
    loginForm.reset();
}

function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            studentImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function renderStudentTable() {
    studentTableBody.innerHTML = students.map(student => `
        <tr class="border-b">
            <td class="py-2">${student.idno}</td>
            <td class="py-2">${student.lastname}</td>
            <td class="py-2">${student.firstname}</td>
            <td class="py-2">${student.course}</td>
            <td class="py-2">${student.level}</td>
            <td class="py-2">
                <button onclick="editStudent('${student.idno}')" class="bg-green-500 text-white px-3 py-1 rounded mr-2">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteStudent('${student.idno}')" class="bg-red-500 text-white px-3 py-1 rounded">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function handleStudentSubmit(e) {
    e.preventDefault();
    const studentData = {
        idno: document.getElementById('idno').value,
        lastname: document.getElementById('lastname').value,
        firstname: document.getElementById('firstname').value,
        course: document.getElementById('course').value,
        level: document.getElementById('level').value,
        image: studentImage.src
    };

    if (currentStudentId) {
        // Update existing student
        const index = students.findIndex(s => s.idno === currentStudentId);
        if (index !== -1) {
            students[index] = studentData;
        }
    } else {
        // Add new student
        students.push(studentData);
    }

    renderStudentTable();
    resetForm();
}

function editStudent(idno) {
    const student = students.find(s => s.idno === idno);
    if (student) {
        currentStudentId = idno;
        document.getElementById('idno').value = student.idno;
        document.getElementById('lastname').value = student.lastname;
        document.getElementById('firstname').value = student.firstname;
        document.getElementById('course').value = student.course;
        document.getElementById('level').value = student.level;
        studentImage.src = student.image;
    }
}

function deleteStudent(idno) {
    if (confirm('Are you sure you want to delete this student?')) {
        students = students.filter(s => s.idno !== idno);
        renderStudentTable();
    }
}

function resetForm() {
    currentStudentId = null;
    studentForm.reset();
    studentImage.src = 'placeholder.png';
}
