const birthDate = document.getElementById("birth_date").value;
let parts = birthDate.split('-');
let mydate = new Date();
let age = 18;
mydate.setFullYear(parts[0], parts[1] - 1, parts[2]);

var currdate = new Date();
currdate.setFullYear(currdate.getFullYear() - age);
if ((currdate - mydate) < 0){
	alert("Sorry, only persons over the age of " + age + " may enter this site");
	return false;
}
return true;