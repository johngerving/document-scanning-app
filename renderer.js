let form = document.querySelector("form");
let openFileButton = document.getElementById("openFile");
let filePathElement = document.getElementById("filePath");

// Add onclick to open file button
openFileButton.addEventListener("click", async () => {
  const filePath = await window.electronAPI.openFile(); // Call openFile in main process
  filePathElement.value = filePath; // Set value of input to selected file path
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  //   window.electronAPI.submitForm(input.value);
  //   console.log(input.value);

  //   input.value = "";
});
