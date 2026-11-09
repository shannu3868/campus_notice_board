// Sample Notices

let notices = JSON.parse(localStorage.getItem("notices")) || [

    {
        title: "Internal Examination",
        department: "CSE",
        date: "2026-11-05",
        description: "All CSE students are informed that internal examinations will begin shortly."
    },

    {
        title: "Technical Symposium",
        department: "General",
        date: "2026-11-10",
        description: "Our college is organizing a technical symposium. Interested students can register."
    },

    {
        title: "Workshop Announcement",
        department: "ECE",
        date: "2026-11-08",
        description: "A technical workshop will be conducted for ECE students."
    }

];


// Display Notices

function displayNotices(department = "All") {

    const noticeList = document.getElementById("noticeList");

    noticeList.innerHTML = "";

    const filteredNotices = notices.filter(notice => {

        return department === "All" ||
               notice.department === department;

    });

    filteredNotices.forEach((notice, index) => {

        const card = document.createElement("div");

        card.className = "notice-card";

        const title = document.createElement("h3");
        title.textContent = notice.title;

        const dept = document.createElement("p");
        dept.textContent = "Department: " + notice.department;

        const date = document.createElement("p");
        date.textContent = "Date: " + notice.date;

        const description = document.createElement("p");
        description.textContent =
            notice.description.length > 65
            ? notice.description.substring(0, 65) + "..."
            : notice.description;

        const button = document.createElement("button");

        button.textContent = "View Details";

       button.addEventListener("click", function () {

    document.getElementById("detailTitle").textContent =
        notice.title;

    document.getElementById("detailDepartment").textContent =
        "Department: " + notice.department;

    document.getElementById("detailDate").textContent =
        "Date: " + notice.date;

    document.getElementById("detailDescription").textContent =
        notice.description;

    document.getElementById("noticeModal").style.display =
        "flex";

});

        card.appendChild(title);
        card.appendChild(dept);
        card.appendChild(date);
        card.appendChild(description);
        card.appendChild(button);

        noticeList.appendChild(card);

    });

}


// Department Filter

document.getElementById("departmentFilter")
.addEventListener("change", function () {

    displayNotices(this.value);

});


// Add New Notice

document.getElementById("noticeForm")
.addEventListener("submit", function (event) {

    event.preventDefault();

    const title = document.getElementById("title").value.trim();

    const department = document.getElementById("department").value;

    const date = document.getElementById("date").value;

    const description =
        document.getElementById("description").value.trim();

    if (!title || !department || !date || !description) {

        alert("Please fill in all fields.");

        return;

    }

    const newNotice = {

        title: title,
        department: department,
        date: date,
        description: description

    };

    notices.unshift(newNotice);

    // Save data in Local Storage

    localStorage.setItem("notices", JSON.stringify(notices));

    alert("Notice published successfully!");

    document.getElementById("noticeForm").reset();

    displayNotices(
        document.getElementById("departmentFilter").value
    );

});


// Initial Display

displayNotices();
// Close Modal

document.getElementById("closeModal")
.addEventListener("click", function () {

    document.getElementById("noticeModal").style.display =
        "none";

});

document.getElementById("closeButton")
.addEventListener("click", function () {

    document.getElementById("noticeModal").style.display =
        "none";

});

document.getElementById("noticeModal")
.addEventListener("click", function (event) {

    if (event.target === this) {
        this.style.display = "none";
    }

});