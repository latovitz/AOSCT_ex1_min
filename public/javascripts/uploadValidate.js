
function validateSubmit()
{
    if (document.getElementById("uploadedFile").value == "")
    {
        alert("Must choose a file!");
        return false;
    }
    
    alert("File Uploaded & Sent!");
    window.location.reload();
    return true;
}