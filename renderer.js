let form = document.querySelector("form");
let openFileButton = document.getElementById("openFile");
let filePathElement = document.getElementById("filePath");

openFileButton.addEventListener("click", async () => {
  const filePath = await window.electronAPI.openFile();
  filePathElement.value = filePath;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  //   window.electronAPI.submitForm(input.value);
  //   console.log(input.value);

  //   input.value = "";
});
