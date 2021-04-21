document.addEventListener("DOMContentLoaded",load);

function load()
{
	document.getElementById("contactForm").addEventListener("submit",validate);
	document.getElementById("contactForm").reset();
	document.getElementById("contactForm").addEventListener("reset", resetForm);
}

function resetForm(e)
{
	if(confirm('Reset?'))
	{
		hideAllErrors();
		document.getElementById("name").focus();
		return true;
	}
	e.preventDefault();
	return false;
}
function validate(e)
{
	hideAllErrors();

	if(formHasErrors())
	{
		e.preventDefault();
		return false;
	}

	return true;
}

function formHasErrors()
{
	let errorFlag = false;
	let inputNames = ["name", "phNum", "email"];
	for(let i = 0; i < inputNames.length; i ++)
	{
		let input = document.getElementById(inputNames[i]);
		let inputVal = trim(input.value);
		if(inputVal == "")
		{
			errorFlag = true;
			showError(input, input.id+"_error", false);
		}
	}

	let input = document.getElementById(inputNames[1]);
	let phVal = input.value;
	if(phVal.length !=10)
	{
		errorFlag = true;
		showError(input, "phFormat_error",false);
	}

	input = document.getElementById(inputNames[2]);
	let emailRgx = new RegExp(/^\S+@\S+$/);
	input.value= trim(input.value);
	if(!emailRgx.test(input.value))
	{
		errorFlag = true;
		showError(input,"emailformat_error", false);
	}
	
	return errorFlag;
}

function hideAllErrors()
{
	var errorFields = document.getElementsByClassName("error");
	for(var i = 0; i < errorFields.length;i++)
	{

		errorFields[i].style.display = "none";
	}
}

function showError(formField, errorId, errorFlag)
{
	document.getElementById(errorId).style.display = "block";
	if(!errorFlag)
	{
		formField.focus();
		if(formField == "text")
		{
			formField.select();
		}
	}

}

function trim(str){
	// Uses a regex to remove spaces from a string.
	return str.replace(/^\s+|\s+$/g,"");
}