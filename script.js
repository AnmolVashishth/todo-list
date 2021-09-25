const inputBox = document.querySelector(".inputField input");
const addBtn= document.querySelector(".inputField button");
const todolist= document.querySelector(".todolist");
const clear= document.querySelector(".footer button");


inputBox.onkeyup = ()=> {
let userData = inputBox.value;
if(userData.trim()!=0) {
	addBtn.classList.add("active");
}
else {
	addBtn.classList.remove("active");
}
}

showTasks();

addBtn.onclick = ()=> {
	let userData = inputBox.value;
	let getLocalStorage = localStorage.getItem("New Todo");
	if(getLocalStorage == null) {
		listArr = [];
	}
	else {
		listArr = JSON.parse(getLocalStorage);
	}
	listArr.push(userData);
	localStorage.setItem("New Todo", JSON.stringify(listArr));
	showTasks();
	addBtn.classList.remove("active");
}

function showTasks() {
	let getLocalStorage= localStorage.getItem("New Todo");
	if(getLocalStorage == null) {
		listArr = [];
	}
	else {
		listArr = JSON.parse(getLocalStorage);
	}
	const pending = document.querySelector(".pending");
	pending.textContent = listArr.length;
	if(listArr.length > 0) {
		clear.classList.add("active");
	}
	else {
		clear.classList.remove("active"); 
	}
	let newLiTag = '';
	listArr.forEach((element, index) => {
			newLiTag += `<li> ${element} <span onclick="deleteTask(${index})";><i class = "fas fa-trash"></i></span></li>`;
		});
	todolist.innerHTML = newLiTag;
	inputBox.value = "";
}

function deleteTask(index) {
	let getLocalStorage= localStorage.getItem("New Todo");
	listArr = JSON.parse(getLocalStorage);
	listArr.splice(index,1);
	localStorage.setItem("New Todo", JSON.stringify(listArr));
	showTasks();
}

clear.onclick= ()=> {
	listArr=[];
	localStorage.setItem("New Todo", JSON.stringify(listArr));
	showTasks();
}