/* Fully updated dashboard.js */
import { auth, db, logout } from "./firebase.js";
import { collection, addDoc, getDocs, query, where, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const notesContainer = document.getElementById("notesContainer");
const addNoteButton = document.getElementById("AddNote");
const noteEditor = document.getElementById("noteEditor");
const saveNoteButton = document.getElementById("saveNote");
const closeEditorButton = document.getElementById("closeEditor");
const noteTitle = document.getElementById("noteTitle");
const noteDescription = document.getElementById("noteDescription");
let editingNoteId = null;

addNoteButton?.addEventListener("click", () => {
    editingNoteId = null;
    noteTitle.value = "";
    noteDescription.innerHTML = "";
    noteEditor.style.display = "block";
});

closeEditorButton?.addEventListener("click", () => {
    noteEditor.style.display = "none";
});

export async function loadNotes() {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(collection(db, "notes"), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    notesContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
        const noteData = doc.data();
        let noteDiv = document.createElement("div");
        noteDiv.classList.add("note");
        noteDiv.innerHTML = `
            <h3>${noteData.title}</h3>
            <p>${noteData.description}</p>
            <button class="editNote" data-id="${doc.id}" data-title="${noteData.title}" data-description="${noteData.description}">Edit</button>
            <button class="deleteNote" data-id="${doc.id}">Delete</button>
        `;
        notesContainer.appendChild(noteDiv);
    });

    document.querySelectorAll(".editNote").forEach(button => {
        button.addEventListener("click", () => editNote(button.dataset.id, button.dataset.title, button.dataset.description));
    });

    document.querySelectorAll(".deleteNote").forEach(button => {
        button.addEventListener("click", () => deleteNote(button.dataset.id));
    });
}

auth.onAuthStateChanged((user) => {
    if (!user) {
        window.location.href = "login.html";
    } else {
        document.getElementById("welcomeMessage").innerText = `Welcome, ${user.email}!`;
        loadNotes();
    }
});

async function deleteNote(noteId) {
    if (confirm("Are you sure you want to delete this note?")) {
        try {
            await deleteDoc(doc(db, "notes", noteId));
            alert("Note deleted!");
            loadNotes();
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    }
}

function editNote(noteId, title, description) {
    editingNoteId = noteId;
    noteTitle.value = title;
    noteDescription.innerHTML = description;
    noteEditor.style.display = "block";

    saveNoteButton.onclick = async () => {
        const updatedTitle = noteTitle.value.trim();
        const updatedDescription = noteDescription.innerHTML.trim();

        if (!updatedTitle || !updatedDescription) {
            alert("Title and description cannot be empty.");
            return;
        }

        try {
            await updateDoc(doc(db, "notes", noteId), {
                title: updatedTitle,
                description: updatedDescription,
                timestamp: new Date(),
            });
            alert("Note updated!");
            noteEditor.style.display = "none";
            loadNotes();
        } catch (error) {
            console.error("Error updating note:", error);
        }
    };
}

document.getElementById("logoutButton")?.addEventListener("click", async () => {
    await logout();
    window.location.href = "login.html";
});
