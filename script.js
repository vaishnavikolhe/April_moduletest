const url = `https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json`;
const sorta2z = document.getElementById("sorta2z");
const sortz2a = document.getElementById("sortz2a");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const sortByMarks = document.getElementById("sortByMarks");
const sortByPassingBtn = document.getElementById("sortByPassing");
const sortByClassBtn = document.getElementById("sortByClass");
const sortBygenderBtn = document.getElementById("sortByGender");
var inpValue = "";
let data = []

async function loadData() {
    const response = await fetch(url);
    data = await response.json();
    renderStudents(data)
}
loadData()

function renderStudents(students) {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";
    students.forEach(element => {
        let id = element.id
        let imgSrc = element.img_src;
        let firstname = element.first_name;
        let lastname = element.last_name;
        let gender = element.gender;
        let classs = element.class;
        let marks = element.marks;
        let passing = undefined;
        if (element.passing == true) passing = "passed";
        else passing = "failed";
        let email = element.email;
        const tr = document.createElement("tr");
        const idtd = document.createElement("td");
        let imageTag = document.createElement("img");
        let imageSpan = document.createElement("span");
        let nameSpan = document.createElement("span");
        const nametd = document.createElement("td");
        const gendertd = document.createElement("td");
        const genderSpan = document.createElement("span");
        const classtd = document.createElement("td");
        const classSpan = document.createElement("span");
        const markstd = document.createElement("td");
        const markSpan = document.createElement("span");
        const passingtd = document.createElement("td");
        const passingSpan = document.createElement("span");
        const emailtd = document.createElement("td");
        const emailSpan = document.createElement("span");
        idtd.innerText = id;
        tr.appendChild(idtd)
        imageTag.src = imgSrc;
        imageSpan.appendChild(imageTag);
        imageSpan.className = "name-img";
        nametd.appendChild(imageSpan)
        nametd.className = "nametd";
        nameSpan.innerText = firstname + " " + lastname;
        nametd.appendChild(nameSpan)
        tr.appendChild(nametd)
        genderSpan.innerText = gender;
        gendertd.className = "gendertd";
        gendertd.appendChild(genderSpan)
        tr.appendChild(gendertd)
        classSpan.innerText = classs;
        classtd.appendChild(classSpan)
        tr.appendChild(classtd)
        markSpan.innerText = marks;
        markstd.appendChild(markSpan)
        tr.appendChild(markstd)
        passingSpan.innerText = passing;
        passingtd.appendChild(passingSpan)
        tr.appendChild(passingtd)
        emailSpan.innerText = email;
        emailtd.appendChild(emailSpan)
        tr.appendChild(emailtd)
        tableBody.appendChild(tr);
    });
}

function sortDataAtoZ(data) {
    data.sort((a, b) => {
        const nameA = `${a.first_name}`.toLowerCase();
        const nameB = `${b.first_name} `.toLowerCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    renderStudents(data)
}

function sortDataZtoA(data) {
    data.sort((a, b) => {
        const nameA = `${a.first_name}`.toLowerCase();
        const nameB = `${b.first_name}`.toLowerCase();
        if (nameA > nameB) {
            return -1;
        }
        if (nameA < nameB) {
            return 1;
        }
        return 0;
    });
    renderStudents(data);
}

function sortDataByMarks(data) {
    data.sort((a, b) => {
        const nameA = a.marks;
        const nameB = b.marks
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    renderStudents(data);
}

function sortDataByClass(data) {
    data.sort((a, b) => {
        const nameA = a.class;
        const nameB = b.class;
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    renderStudents(data);
}

sorta2z.addEventListener("click", () => {
    sortDataAtoZ(data)
})

sortz2a.addEventListener("click", () => {
    sortDataZtoA(data)
})

searchInput.addEventListener("click", () => {
    event.target.value = "";
})

searchInput.addEventListener("keyup", () => {
    inpValue = event.target.value
})

searchBtn.addEventListener("click", () => {
    let inpV = inpValue.toLowerCase()
    const results = data.filter((item) => {
        let fname = item.first_name.toLowerCase()
        let lname = item.last_name.toLowerCase();
        let eMail = item.email.toLowerCase();
        if (inpV == "") {
            return item;
        } else if (fname.includes(inpV) || lname.includes(inpV) || eMail.includes(inpV)) {
            return item;
        }
    })
    renderStudents(results);
})

sortByMarks.addEventListener("click", () => {
    sortDataByMarks(data);
})

sortByPassingBtn.addEventListener("click", () => {
    let sortedBypassingArray = data.filter((element) => {
        if (element.passing == true)
            return element;
    })
    renderStudents(sortedBypassingArray);
})

sortByClassBtn.addEventListener("click", () => {
    sortDataByClass(data);
})

sortBygenderBtn.addEventListener("click", () => {
    let sortedArray = data.filter((element) => {
        if (element.gender == "Male")
            return element;
    })
    let sortedArray2 = data.filter((element) => {
        if (element.gender == "Female")
            return element;
    })
    let finalArray = [...sortedArray, ...sortedArray2];
    renderStudents(finalArray);
})