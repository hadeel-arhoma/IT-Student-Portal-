/* ===== Dark / Light Toggle ===== */
function toggleTheme() {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

window.addEventListener("load", () => {
    // Dark mode 
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
    }

   
    const activities = [
        { title: "Workshop", date: "2025-01-10", details: "Workshop details", read: false },
        { title: "Training For Students About To Graduates", date: "2025-06-12", details: "Training details", read: false },
        { title: "Seminar", date: "2025-03-05", details: "Seminar details", read: true }
    ];


    activities.sort((a, b) => new Date(b.date) - new Date(a.date));

    const grid = document.getElementById("activitiesGrid");
    if(grid) {
        activities.forEach((activity, index) => {
            const card = document.createElement("div");
          card.className = `card ${activity.read ? "read" : "unread"}`;
            card.innerHTML = `
                <h3>${activity.title}</h3>
                <p>${activity.date}</p>
                <div class="dots" onclick="toggleMenu(event,'menu${index}')">⋮</div>

                <div class="menu" id="menu${index}">
                    <button onclick="showDetails('${activity.details}')">Detail</button>
                    <button onclick="deleteCard(this)">Delete</button>
                    <button onclick="toggleRead(this)">
                        ${activity.read ? "Mark as Unread" : "Mark as Read"}
                    </button>
                </div>
            `;
            grid.appendChild(card);
        });
    }
});

/* ===== Toggle Menu لكل كارد ===== */
function toggleMenu(e, id) {
    e.stopPropagation();
    closeAllMenus();
    const m = document.getElementById(id);
    m.style.display = m.style.display === "block" ? "none" : "block";
}
/* ===== closeAllMenus ===== */
function closeAllMenus() {
    document.querySelectorAll(".menu").forEach(menu => {
        menu.style.display = "none";
    });
}
document.addEventListener("click", closeAllMenus);


/* ===== Show details / Delete Card ===== */
function showDetails(text) {
    alert(text);
}

function deleteCard(btn) {
    btn.closest(".card").remove();
}

/* ===== Toggle Read / Unread ===== */
function toggleRead(button) {
    const card = button.closest(".card");
    const isRead = card.classList.contains("read");

    card.classList.toggle("read", !isRead);
    card.classList.toggle("unread", isRead);

    button.innerText = !isRead ? "Mark as Unread" : "Mark as Read";
}

/* ===== Department ===== */
function saveDepartment() {
    let dep = {
        id: depId.value,
        enName: depEnName.value,
        arName: depArName.value,
        enHead: depEnHead.value,
        arHead: depArHead.value,
        credits: depCredits.value
    };
    localStorage.setItem("department", JSON.stringify(dep));
}

function loadDepartment() {
    let d = JSON.parse(localStorage.getItem("department"));
    if (!d) return;

    depId.value = d.id;
    depEnName.value = d.enName;
    depArName.value = d.arName;
    depEnHead.value = d.enHead;
    depArHead.value = d.arHead;
    depCredits.value = d.credits;
}

/* ===== Student ===== */
// دالة لإخفاء جميع رسائل الخطأ
function clearErrors() {
    const errors = document.querySelectorAll('.error');
    errors.forEach(error => error.classList.add('hidden'));
}

// دالة لعرض رسالة خطأ
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId + 'Error');
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
}

// دالة التحقق من النمط
function validateField(value, regex, errorId, errorMessage) {
    if (!regex.test(value)) {
        showError(errorId, errorMessage);
        return false;
    }
    return true;
}

function registerStudent() {
    clearErrors(); // مسح رسائل الخطأ السابقة

    // الحصول على قيم الحقول
    const sId = document.getElementById('sId').value.trim();
    const sNameEn = document.getElementById('sNameEn').value.trim();
    const sNameAr = document.getElementById('sNameAr').value.trim();
    const sEmail = document.getElementById('sEmail').value.trim();
    const sPhone = document.getElementById('sPhone').value.trim();
    const sDepartment = document.getElementById('sDepartment').value;
    const sDepartmentid = document.getElementById('sDepartmentid').value;
    const sGender = document.getElementById('sGender').value;
    const sDOB = document.getElementById('sDOB').value;
    const sPass = document.getElementById('sPass').value;

    // التحقق من الحقول المطلوبة
    let isValid = true;
    if (!sId) { showError('sId', 'Student ID is required.'); isValid = false; }
    if (!sNameEn) { showError('sNameEn', 'English name is required.'); isValid = false; }
    if (!sNameAr) { showError('sNameAr', 'Arabic name is required.'); isValid = false; }
    if (!sEmail) { showError('sEmail', 'Email is required.'); isValid = false; }
    if (!sPhone) { showError('sPhone', 'Phone number is required.'); isValid = false; }
    if (!sDepartment) { showError('sDepartment', 'Department is required.'); isValid = false; }
    if (!sDepartmentid) { showError('sDepartmentid', 'Department ID is required.'); isValid = false; }
    if (!sGender) { showError('sGender', 'Gender is required.'); isValid = false; }
    if (!sDOB) { showError('sDOB', 'Date of Birth is required.'); isValid = false; }
    if (!sPass) { showError('sPass', 'Password is required.'); isValid = false; }

    // التحقق من النمط (patterns)
    if (sId && !/^[0-9]{5}$/.test(sId)) {
        showError('sId', 'Student ID must be exactly 5 digits.');
        isValid = false;
    }
    if (sNameEn && !validateField(sNameEn, /^[A-Za-z\s'-]{1,25}$/, 'sNameEn', 'English name must contain only English letters, spaces, hyphens, or apostrophes (max 25 characters).')) {
        isValid = false;
    }
    if (sNameAr && !validateField(sNameAr, /^[\u0600-\u06FF\s'-]{1,25}$/, 'sNameAr', 'Arabic name must contain only Arabic letters, spaces, hyphens, or apostrophes (max 25 characters).')) {
        isValid = false;
    }
    if (sEmail && !validateField(sEmail, /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, 'sEmail', 'Please enter a valid email address.')) {
        isValid = false;
    }
    if (sPhone && !/^[0-9]{10}$/.test(sPhone)) {
        showError('sPhone', 'Phone number must be exactly 10 digits.');
        isValid = false;
    }
    if (sPass && sPass.length < 8) {
        showError('sPass', 'Password must be at least 8 characters.');
        isValid = false;
    }

    // إذا كان هناك خطأ، لا تكمل التسجيل
    if (!isValid) {
        alert('Registration failed due to validation errors. Please check the highlighted fields.');
        return;
    }

    // التحقق من وجود الطالب مسبقًا
    if (localStorage.getItem(sId)) {
        alert('Student with this ID already exists. Registration failed.');
        return;
    }

    // إنشاء كائن البيانات
    const studentData = {
        studentId: sId,
        nameEnglish: sNameEn,
        nameArabic: sNameAr,
        email: sEmail,
        phone: sPhone,
        department: sDepartment,
        departmentId: sDepartmentid,
        gender: sGender,
        dateOfBirth: sDOB,
        password: sPass
    };

    // تحويل إلى JSON
    const jsonData = JSON.stringify(studentData, null, 2);

    // تخزين في localStorage للاسترجاع لاحقًا
    localStorage.setItem(sId, jsonData);

    // إنشاء ملف JSON وتنزيله باسم معرف الطالب
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = sId + '.json';  // اسم الملف: معرف الطالب.json
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // رسالة تأكيد
    alert('Registration successful! JSON file downloaded as: ' + sId + '.json and data stored locally.');

    // مسح النموذج
    document.getElementById('registerForm').reset();
}

function retrieveStudent() {
    const searchId = document.getElementById('searchId').value.trim();
    const resultDiv = document.getElementById('retrieveResult');
    const dataP = document.getElementById('retrievedData');

    if (!searchId) {
        alert('Please enter a Student ID to search.');
        return;
    }

    const storedData = localStorage.getItem(searchId);
    if (!storedData) {
        dataP.textContent = 'No student found with this ID.';
        resultDiv.classList.remove('hidden');
        return;
    }

    const student = JSON.parse(storedData);
    dataP.innerHTML = `
        <strong>Student ID:</strong> ${student.studentId}<br>
        <strong>English Name:</strong> ${student.nameEnglish}<br>
        <strong>Arabic Name:</strong> ${student.nameArabic}<br>
        <strong>Email:</strong> ${student.email}<br>
        <strong>Phone:</strong> ${student.phone}<br>
        <strong>Department:</strong> ${student.department}<br>
        <strong>Department ID:</strong> ${student.departmentId}<br>
        <strong>Gender:</strong> ${student.gender}<br>
        <strong>Date of Birth:</strong> ${student.dateOfBirth}<br>
        <strong>Password:</strong> ${student.password} (Note: Passwords should not be displayed in real apps)
    `;
    resultDiv.classList.remove('hidden');
}

function fillForm() {
    const searchId = document.getElementById('searchId').value.trim();
    const storedData = localStorage.getItem(searchId);
    if (!storedData) {
        alert('No data to fill.');
        return;
    }

    const student = JSON.parse(storedData);
    document.getElementById('sId').value = student.studentId;
    document.getElementById('sNameEn').value = student.nameEnglish;
    document.getElementById('sNameAr').value = student.nameArabic;
    document.getElementById('sEmail').value = student.email;
    document.getElementById('sPhone').value = student.phone;
    document.getElementById('sDepartment').value = student.department;
    document.getElementById('sDepartmentid').value = student.departmentId;
    document.getElementById('sGender').value = student.gender;
    document.getElementById('sDOB').value = student.dateOfBirth;
    document.getElementById('sPass').value = student.password;

    alert('Form filled with retrieved data.');
}

function deleteStudent() {
    const deleteId = document.getElementById('deleteId').value.trim();
    const deleteResultDiv = document.getElementById('deleteResult');
    const deleteMessageP = document.getElementById('deleteMessage');

    if (!deleteId) {
        alert('Please enter a Student ID to delete.');
        return;
    }

    const storedData = localStorage.getItem(deleteId);
    if (!storedData) {
        deleteMessageP.textContent = 'No student found with this ID to delete.';
        deleteResultDiv.classList.remove('hidden');
        return;
    }

    // حذف البيانات من localStorage
    localStorage.removeItem(deleteId);

    // رسالة تأكيد
    deleteMessageP.innerHTML = `
        Student data for ID ${deleteId} has been deleted from localStorage.<br>
        <strong>Note:</strong> If you have a downloaded JSON file (${deleteId}.json), please delete it manually from your device.
    `;
    deleteResultDiv.classList.remove('hidden');

    alert('Student data deleted successfully from localStorage.');
}

// دالة لإظهار الإخطار
function sendMessage() {
    // إخفاء أي رسالة سابقة
    const notification = document.getElementById('notification');
    notification.classList.add('hidden');

    // الحصول على القيم
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('cemail').value.trim();
    const message = document.getElementById('message').value.trim();

    // تحقق من الحقول المطلوبة
    if (!name ||!email || !message) {
        alert('Please fill in all fields.');
        return;
    }

    // تحقق من صحة الايميل
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // إذا تم التحقق بنجاح، عرض رسالة الإرسال
    notification.classList.remove('hidden');

    // إعادة ضبط الحقول بعد الإرسال (اختياري)
    document.getElementById('contactForm').reset();
}
// بيانات الأقسام مع عدد الطلاب
const departments = [
    { 
        name: "Computer Science", 
        abbreviation: "CS", 
        description: "Study of algorithms, programming, and software fundamentals.",
        studentCount: 120
    },
    { 
        name: "Computer Networks", 
        abbreviation: "CN", 
        description: "Managing and securing networks, routers, and connections.",
        studentCount: 85
    },
    { 
        name: "Software Engineering", 
        abbreviation: "SE", 
        description: "Designing, developing, and maintaining software systems.",
        studentCount: 95
    },
    { 
        name: "Information Systems", 
        abbreviation: "IS", 
        description: "Using technology to manage data and support business processes.",
        studentCount: 70
    }
];

// إغلاق كل القوائم
function closeAllMenus() {
    document.querySelectorAll(".menu").forEach(m => m.style.display = "none");
}

// تعديل القسم: الانتقال لصفحة department.html
function editDepartment(depObj) {
    const depName = encodeURIComponent(depObj.name);
    window.location.href = `department.html?department=${depName}`;
}

// إنشاء بطاقة القسم
function createDepartmentCard(department) {
    const card = document.createElement("div");
    card.className = "card";

    const header = document.createElement("div");
    header.className = "card-header";

    const title = document.createElement("div");
    title.className = "card-title";
    title.textContent = department.name;

    const menuBtn = document.createElement("div");
    menuBtn.className = "menu-btn";
    menuBtn.textContent = "⋮";

    const menu = document.createElement("div");
    menu.className = "menu";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => editDepartment(department);

    const teachersBtn = document.createElement("button");
    teachersBtn.textContent = "Teachers";
    teachersBtn.onclick = () => {
        window.location.href = "teachers.html?department=" + encodeURIComponent(department.name);
    };

    const coursesBtn = document.createElement("button");
    coursesBtn.textContent = "Courses";
    coursesBtn.onclick = () => {
        window.location.href = "courses.html?department=" + encodeURIComponent(department.name);
    };

    menu.append(editBtn, teachersBtn, coursesBtn);

    menuBtn.onclick = e => {
        e.stopPropagation();
        closeAllMenus();
        menu.style.display = "block";
    };

    header.append(title, menuBtn);

    const content = document.createElement("div");
    content.className = "card-content";

    const desc = document.createElement("p");
    desc.textContent = department.description;

    const count = document.createElement("p");
    count.textContent = "Students: " + department.studentCount;

    content.append(desc, count);

    const footer = document.createElement("div");
    footer.className = "card-footer";
    footer.textContent = department.abbreviation;

    card.append(header, menu, content, footer);
    return card;
}

// تحميل الأقسام
function loadDepartments() {
    const grid = document.getElementById("departmentsGrid");
    if (!grid) return;
    grid.innerHTML = "";
    departments.forEach(dep => grid.appendChild(createDepartmentCard(dep)));
}

// أحداث الصفحة
document.addEventListener("DOMContentLoaded", loadDepartments);
document.addEventListener("click", closeAllMenus);

// استرجاع اسم القسم من URL
function getDepartmentFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("department") || "";
}

const departmentName = getDepartmentFromURL();
const depNameEl = document.getElementById("departmentName");
if (depNameEl) {
    depNameEl.textContent = departmentName;
}
// بيانات الأقسام ثابتة (يمكن تعديلها لاحقاً)
let department = [
    { id: 1, enName: "Computer Science", arName: "علوم الحاسوب", enHead: "Dr. Adel", arHead: "د.عادل ", totalCredits: 120 },
    { id: 2, enName: "Computer Networks", arName: "شبكات الحاسوب", enHead: "Dr. Fatmah", arHead: "د.فاطمة", totalCredits: 85 },
    { id: 3, enName: "Software Engineering", arName: "هندسة البرمجيات", enHead: "Dr. Aisha", arHead: "د.عائشة", totalCredits: 95 },
    { id: 4, enName: "Information Systems", arName: "نظم المعلومات", enHead: "Dr. Ali", arHead: "د.علي", totalCredits: 70 }
];

// البحث عن القسم الحالي
let currentDept = department.find(d => d.enName === departmentName || d.arName === departmentName);
if (!currentDept) currentDept = department[0]; // fallback

const tbody = document.querySelector("#departmentTable tbody");

// وظيفة عرض بيانات القسم في الجدول
function loadDepartmentTable() {
    if(!tbody)return;
    tbody.innerHTML = "";
    const row = document.createElement("tr");

    row.innerHTML = `
        <td contenteditable="true">${currentDept.id}</td>
        <td contenteditable="true">${currentDept.enName}</td>
        <td contenteditable="true">${currentDept.arName}</td>
        <td contenteditable="true">${currentDept.enHead}</td>
        <td contenteditable="true">${currentDept.arHead}</td>
        <td contenteditable="true">${currentDept.totalCredits}</td>
    `;
    tbody.appendChild(row);
}

// حفظ التعديلات من الجدول إلى المتغير
function saveChanges() {
    const cells = tbody.querySelectorAll("tr td");
    currentDept.id = cells[0].textContent;
    currentDept.enName = cells[1].textContent;
    currentDept.arName = cells[2].textContent;
    currentDept.enHead = cells[3].textContent;
    currentDept.arHead = cells[4].textContent;
    currentDept.totalCredits = cells[5].textContent;

    alert("Changes saved for department: " + currentDept.enName);
}

// إضافة صف جديد (في حال أردنا إدخال قسم جديد)
const addRowBtn = document.getElementById("addRowBtn");
if (addRowBtn) {
    addRowBtn.addEventListener("click", () => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
        `;
        tbody.appendChild(row);
    });
}
const saveBtn = document.getElementById("saveBtn");
if (saveBtn) {
    saveBtn.addEventListener("click", saveChanges);
}

// تحميل الجدول عند بدء الصفحة
loadDepartmentTable();
// =========================================
// بيانات الأساتذة لكل قسم
// =========================================

const teachersData = [
    {
        department: "Computer Science",
        professors: [
            { id: 1, En_Name: "Ahmed Ali", Arb_Name: "أحمد علي", prefix: "Dr.", degree: "PhD" },
            { id: 2, En_Name: "Sara Mohamed", Arb_Name: "سارة محمد", prefix: "Dr.", degree: "MSc" },
            { id: 3, En_Name: "Khaled Hassan", Arb_Name: "خالد حسن", prefix: "Dr.", degree: "PhD" }
        ]
    },
    {
        department: "Computer Networks",
        professors: [
            { id: 4, En_Name: "Mahmoud Khaled", Arb_Name: "محمود خالد", prefix: "Dr.", degree: "PhD" },
            { id: 5, En_Name: "Laila Sami", Arb_Name: "ليلى سامي", prefix: "Dr.", degree: "MSc" },
            { id: 6, En_Name: "Hesham Ibrahim", Arb_Name: "هشام إبراهيم", prefix: "Dr.", degree: "PhD" }
        ]
    },
    {
        department: "Software Engineering",
        professors: [
            { id: 7, En_Name: "Aisha Ahmed", Arb_Name: "عائشة أحمد", prefix: "Dr.", degree: "PhD" },
            { id: 8, En_Name: "Omar Saleh", Arb_Name: "عمر صالح", prefix: "Dr.", degree: "MSc" },
            { id: 9, En_Name: "Fatma Khalid", Arb_Name: "فاطمة خالد", prefix: "Dr.", degree: "PhD" }
        ]
    },
    {
        department: "Information Systems",
        professors: [
            { id: 10, En_Name: "Ali Mustafa", Arb_Name: "علي مصطفى", prefix: "Dr.", degree: "PhD" },
            { id: 11, En_Name: "Noura Sami", Arb_Name: "نورة سامي", prefix: "Dr.", degree: "MSc" },
            { id: 12, En_Name: "Hany Ibrahim", Arb_Name: "هاني إبراهيم", prefix: "Dr.", degree: "PhD" }
        ]
    }
];

// =========================================
// متغيرات مساعدة
// =========================================
let currentDepartment = null; // القسم الحالي عند الإضافة/التعديل
let editingProfessor = null;  // الأستاذ الجاري تعديله

// =========================================
// دالة عرض الأساتذة حسب القسم
// =========================================
function displayTeachers(departmentName) {
    const container = document.getElementById("departmentsContainer");
    if (!container) return;

    container.innerHTML = "";

    // البحث عن القسم
    const dep = teachersData.find(d => d.department.trim() === departmentName.trim());
    if (!dep) {
        container.textContent = "No teachers found for this department";
        return;
    }

    currentDepartment = dep;

    // عنوان القسم
    const h2 = document.createElement("h2");
    h2.textContent = departmentName;
    container.appendChild(h2);

    // زر إضافة أستاذ
    const addBtn = document.createElement("button");
    addBtn.textContent = "Add Teacher" ;
    addBtn.style.marginBottom = "10px";
    addBtn.onclick = () => openTeacherForm(dep);
    container.appendChild(addBtn);

    // إنشاء الجدول
    const table = document.createElement("table");
    table.border = "1";
    table.style.borderCollapse = "collapse";
    table.style.marginTop = "10px";

    table.innerHTML = `
        <tr>

            <th>Teacher_ID</th>
            <th>Teacher_Arb_Name</th>
            <th>Teacher_En_Name</th>
            <th>Teacher_Prefix</th>
            <th>Teacher_Degree</th>
            <th>Edit</th>
        </tr>
    `;

    dep.professors.forEach((prof, index) => {
        const row = table.insertRow();
        row.insertCell().textContent = prof.id;
        row.insertCell().textContent = prof.Arb_Name;
        row.insertCell().textContent = prof.En_Name;
        row.insertCell().textContent = prof.prefix;
        row.insertCell().textContent = prof.degree;

        const actionCell = row.insertCell();
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => openTeacherForm(dep, prof, index);
        actionCell.appendChild(editBtn);
    });

    container.appendChild(table);
}

// =========================================
// فتح نموذج إضافة/تعديل أستاذ
// =========================================
function openTeacherForm(department, prof = null, index = null) {
    currentDepartment = department;
    editingProfessor = { prof, index };

    const formContainer = document.getElementById("profFormContainer");
    if (!formContainer) return;

    formContainer.classList.remove("hidden");

    document.getElementById("formTitle").textContent = prof ? "Edit Teacher" : "Add New Teacher";
    document.getElementById("teacher_ID").value = prof ? prof.id : "";
    document.getElementById("teacher_En_Name").value = prof ? prof.En_Name : "";
    document.getElementById("teacher_Arb_Name").value = prof ? prof.Arb_Name : "";
    document.getElementById("teacher_prefix").value = prof ? prof.prefix : "";
    document.getElementById("teacher_degree").value = prof ? prof.degree : "";
}

// =========================================
// إغلاق النموذج
// =========================================
function closeTeacherForm() {
    const formContainer = document.getElementById("profFormContainer");
    if (formContainer) formContainer.classList.add("hidden");
    editingProfessor = null;
}

// =========================================
// حفظ البيانات من النموذج
// =========================================
const profForm = document.getElementById("profForm");
if (profForm) {
    profForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const id = parseInt(document.getElementById("teacher_ID").value);
        const En_Name = document.getElementById("teacher_En_Name").value;
        const Arb_Name = document.getElementById("teacher_Arb_Name").value;
        const prefix = document.getElementById("teacher_prefix").value;
        const degree = document.getElementById("teacher_degree").value;

        if (editingProfessor && editingProfessor.index != null) {
            // تعديل
            currentDepartment.professors[editingProfessor.index] = { id, En_Name, Arb_Name, prefix, degree };
        } else {
            // إضافة
            currentDepartment.professors.push({ id, En_Name, Arb_Name, prefix, degree });
        }

        closeTeacherForm();
        displayTeachers(currentDepartment.department);
    });
}

// =========================================
// تحميل البيانات عند فتح الصفحة
// =========================================
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const departmentName = params.get("department") || "Computer Science"; // قيمة افتراضية
    displayTeachers(departmentName);
});
// =========================================
// بيانات الكورسات لكل قسم 
// =========================================
const coursesData = [
    {
        department: "Computer Science",
        courses: [
            { id: 101, En_Name: "Algorithms", Arb_Name: "الخوارزميات", Credit: 3, Status: "Mandatory", isActive: true },
            { id: 102, En_Name: "Data Structures", Arb_Name: "هياكل البيانات", Credit: 3, Status: "Mandatory", isActive: true },
            { id: 103, En_Name: "Operating Systems", Arb_Name: "نظم التشغيل", Credit: 4, Status: "Mandatory", isActive: true }
        ]
    },
    {
        department: "Computer Networks",
        courses: [
            { id: 201, En_Name: "Network Security", Arb_Name: "أمن الشبكات", Credit: 3, Status: "Mandatory", isActive: true },
            { id: 202, En_Name: "Routing Protocols", Arb_Name: "بروتوكولات التوجيه", Credit: 3, Status: "Mandatory", isActive: true },
            { id: 203, En_Name: "Wireless Networks", Arb_Name: "الشبكات اللاسلكية", Credit: 3, Status: "Optional", isActive: true }
        ]
    },
    {
        department: "Software Engineering",
        courses: [
            { id: 301, En_Name: "Software Design", Arb_Name: "تصميم البرمجيات", Credit: 3, Status: "Mandatory", isActive: true },
            { id: 302, En_Name: "Software Testing", Arb_Name: "اختبار البرمجيات", Credit: 3, Status: "Mandatory", isActive: true },
            { id: 303, En_Name: "Software Maintenance", Arb_Name: "صيانة البرمجيات", Credit: 3, Status: "Optional", isActive: true }
        ]
    },
    {
        department: "Information Systems",
        courses: [
            { id: 401, En_Name: "Database Systems", Arb_Name: "أنظمة قواعد البيانات", Credit: 3, Status: "Mandatory", isActive: true },
            { id: 402, En_Name: "Information Management", Arb_Name: "إدارة المعلومات", Credit: 3, Status: "Mandatory", isActive: true },
            { id: 403, En_Name: "Decision Support Systems", Arb_Name: "أنظمة دعم القرار", Credit: 3, Status: "Optional", isActive: true }
        ]
    }
];


let currentDeptCourses = null;
let editingCourse = null;

function displayCourses(departmentName) {
    const container = document.getElementById("coursesContainer");
    if (!container) return;

    container.innerHTML = "";

    const dep = coursesData.find(d => d.department.trim() === departmentName.trim());
    if (!dep) {
        container.textContent = "No courses found for this department";
        return;
    }

    currentDeptCourses = dep;

    const h2 = document.createElement("h2");
    h2.textContent = departmentName;
    container.appendChild(h2);

    const addBtn = document.createElement("button");
    addBtn.textContent = "Add courses";
    addBtn.style.marginBottom = "10px";
    addBtn.onclick = () => openCourseForm(dep);
    container.appendChild(addBtn);

    const table = document.createElement("table");
    table.border = "1";
    table.style.borderCollapse = "collapse";
    table.style.marginTop = "10px";

    table.innerHTML = `
        <tr>
            
            <th>course_ID</th>
            <th>course_Arb_Name</th>
            <th>course_En_Name</th>
            <th>course_Credit</th>
            <th>course_Status</th>
            <th>is_Active</th>
            <th>Edit</th>
        </tr>
    `;

    dep.courses.forEach((course, index) => {
        const row = table.insertRow();
        row.insertCell().textContent = course.id;
        row.insertCell().textContent = course.Arb_Name;
        row.insertCell().textContent = course.En_Name;
        row.insertCell().textContent = course.Credit;
        row.insertCell().textContent = course.Status;
        row.insertCell().textContent = course.isActive ? "yes" : "no";

        const actionCell = row.insertCell();
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => openCourseForm(dep, course, index);
        actionCell.appendChild(editBtn);
    });

    container.appendChild(table);
}
function openCourseForm(department, course = null, index = null) {
    currentDeptCourses = department;
    editingCourse = { course, index };

    const formContainer = document.getElementById("courseFormContainer");
    if (!formContainer) return;

    formContainer.classList.remove("hidden");
se
    document.getElementById("formTitleCourse").textContent = course ? "Edit" : "Add course";
se
    document.getElementById("course_ID").value = course ? course.id : "";
    document.getElementById("course_En_Name").value = course ? course.En_Name : "";
    document.getElementById("course_Arb_Name").value = course ? course.Arb_Name : "";
    document.getElementById("course_Credit").value = course ? course.Credit : "";
    document.getElementById("course_Status").value = course ? course.Status : "";
    document.getElementById("course_isActive").checked = course ? course.isActive : true;
}

function closeCourseForm() {
    const formContainer = document.getElementById("courseFormContainer");
    if (formContainer) formContainer.classList.add("hidden");
    editingCourse = null;
}

const courseForm = document.getElementById("courseForm");
if (courseForm) {
    courseForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const id = parseInt(document.getElementById("course_ID").value);
        const En_Name = document.getElementById("course_En_Name").value;
        const Arb_Name = document.getElementById("course_Arb_Name").value;
        const Credit = parseInt(document.getElementById("course_Credit").value);
        const Status = document.getElementById("course_Status").value;
        const isActive = document.getElementById("course_isActive").checked;

        if (editingCourse && editingCourse.index != null) {
            currentDeptCourses.courses[editingCourse.index] = { id, En_Name, Arb_Name, Credit, Status, isActive };
        } else {
            currentDeptCourses.courses.push({ id, En_Name, Arb_Name, Credit, Status, isActive });
        }

        closeCourseForm();
        displayCourses(currentDeptCourses.department);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const departmentName = params.get("department") || "Computer Science";
    displayCourses(departmentName);
});
// =========================================
// LOGIN PAGE 
// =========================================
(function initLoginPageSafe() {

    if (!window.location.pathname.endsWith("login.html")) return;

    const loginForm = document.getElementById("loginForm");
    if (!loginForm) return;

    const studentsData = [
        { id: "1001", password: "1234", name: "Ahmed Ali", department: "Computer Science", image: "images/student1.jpg" },
        { id: "1002", password: "abcd", name: "Sara Mohamed", department: "Computer Networks", image: "images/student2.jpg" },
        { id: "1003", password: "xyz", name: "Khaled Hassan", department: "Software Engineering", image: "images/student3.jpg" }
    ];

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const id = document.getElementById("student_ID").value.trim();
        const password = document.getElementById("student_password").value.trim();

        const student = studentsData.find(
            s => s.id === id && s.password === password
        );

        if (!student) {
            alert("Invalid ID or password");
            return;
        }

        localStorage.setItem("currentStudent", JSON.stringify(student));
        window.location.href = "profile.html";
    });

})();


// =========================================
// STUDENT PROFILE PAGE FUNCTIONS
// =========================================
(function initProfilePageSafe() {

    if (!window.location.pathname.endsWith("profile.html")) return;

    const profileBox = document.getElementById("studentProfile");
    if (!profileBox) return;

    const student = JSON.parse(localStorage.getItem("currentStudent"));

    if (!student) {
        window.location.replace("login.html"); // 👈 replace تمنع loop
        return;
    }

    document.getElementById("profileId").textContent = student.id;
    document.getElementById("profileFullName").textContent = student.name;
    document.getElementById("profileDept").textContent = student.department;
    document.getElementById("studentImage").src = student.image || "";

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.onclick = function () {
            localStorage.removeItem("currentStudent");
            window.location.replace("login.html");
        };
    }

})();

