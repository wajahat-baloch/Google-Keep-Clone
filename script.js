const addButton = document.querySelector("#add");

const updateLSDtata = () => {
  const textAreaData = document.querySelectorAll("textarea");
  const notes = [];

  console.log(textAreaData);
  textAreaData.forEach((note) => {
    return notes.push(note.value);
  });

  console.log(notes);

  localStorage.setItem("notes", JSON.stringify(notes));
};

const addNewNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");

  const htmlData = `
    <div class="operation">
      <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
      <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
    </div>

    <div class="main ${text ? "" : "hidden"}">${text}</div>
    <textarea class="note-textarea ${text ? "hidden" : ""}">${text}</textarea>`;

  note.insertAdjacentHTML("afterbegin", htmlData);

  // Getting the references
  const editButton = note.querySelector(".edit");
  const delButton = note.querySelector(".delete");
  const mainDiv = note.querySelector(".main");
  const textArea = note.querySelector(".note-textarea"); // Updated the class name

  // Deleting the note
  delButton.addEventListener("click", () => {
    note.remove();
    updateLSDtata();
  });

  // Toggle edit button
  editButton.addEventListener("click", () => {
    mainDiv.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  textArea.addEventListener("input", (event) => {
    const value = event.target.value;
    mainDiv.innerHTML = value;

    updateLSDtata();
  });

  document.body.appendChild(note);
};

// getting a data from local storage
const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => addNewNote(note));
}

addButton.addEventListener("click", () => addNewNote());
