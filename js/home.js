function handleAddPostClick() {
    const password = prompt("Enter passcode to add a new item:");
    
    if (password === null) return;
    
    if (password === "1234") {
        window.location.href = "create-post.html";
    } else {
        alert("Incorrect passcode!");
    }
}
