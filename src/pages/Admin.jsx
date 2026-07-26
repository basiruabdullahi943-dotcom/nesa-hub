import { useState, useEffect } from "react";
import { useNavigate }
from "react-router-dom";
import {
  getNotifications,
  saveNotifications
} from "../data/notificationStore";
import { sendNotification } from "../data/notificationHelper";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  doc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase";

function Admin() {
  const navigate = useNavigate();

useEffect(() => {

  const isAdmin =
    localStorage.getItem(
      "adminLoggedIn"
    );

  if (!isAdmin) {

    navigate("/admin-login");

  }

}, []);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [savedNews, setSavedNews] = useState([]);
  const [image, setImage] = useState("");
  const [pinned, setPinned] =
  useState(false);
  const [editingNewsId, setEditingNewsId] =
  useState(null);
  const [execName, setExecName] = useState("");
const [execPosition, setExecPosition] = useState("");
const [execSession, setExecSession] = useState("2025");
const [executiveSessions, setExecutiveSessions] = useState([]);
const [execImage, setExecImage] = useState("");
const [editingExecutiveId, setEditingExecutiveId] =
  useState(null);
const [activeTab, setActiveTab] = useState("news");
const [execBio, setExecBio] = useState("");
const [materialTitle, setMaterialTitle] =
  useState("");

  const [showAddExecutiveSession, setShowAddExecutiveSession] =
  useState(false);

const [showDeleteExecutiveSession, setShowDeleteExecutiveSession] =
  useState(false);

const [newExecutiveSession, setNewExecutiveSession] =
  useState("");

  const [timetableTitle, setTimetableTitle] =
  useState("");

  const [candidateName, setCandidateName] = useState("");
const [candidatePosition, setCandidatePosition] = useState("");
const [candidateImage, setCandidateImage] = useState("");
const [candidateLevel, setCandidateLevel] = useState("");

const [showAddCandidatePosition,
  setShowAddCandidatePosition] =
  useState(false);

const [showDeleteCandidatePosition,
  setShowDeleteCandidatePosition] =
  useState(false);

const [newCandidatePosition,
  setNewCandidatePosition] =
  useState("");

const [savedCandidates, setSavedCandidates] = useState([]);

const [candidatePositions, setCandidatePositions] = useState([]);

const [timetableFile, setTimetableFile] =
  useState("");

const [electionOpen, setElectionOpen] = useState(false);

const [savedTimetables, setSavedTimetables] = useState([]);

const [searchMaterial, setSearchMaterial] = useState("");

const [editingTimetableId, setEditingTimetableId] =
  useState(null);

const [materialLevel, setMaterialLevel] =
  useState("100");

const [materialSemester, setMaterialSemester] =
  useState("First");

const [materialSession, setMaterialSession] =
  useState("");

const [materialSessions, setMaterialSessions] = useState([]);

const [showDeleteMaterialSession, setShowDeleteMaterialSession] =
  useState(false);

const [showAddMaterialSession, setShowAddMaterialSession] = useState(false);

const [newMaterialSession, setNewMaterialSession] = useState("");

  const [pastQuestionTitle, setPastQuestionTitle] =
  useState("");

const [pastQuestionCourseCode,
  setPastQuestionCourseCode] =
  useState("");

const [pastQuestionLevel,
  setPastQuestionLevel] =
  useState("100");

const [pastQuestionSemester,
  setPastQuestionSemester] =
  useState("First");

const [pastQuestionSession,
  setPastQuestionSession] =
  useState("");

const [pastQuestionType,
  setPastQuestionType] =
  useState("pdf");

const [pastQuestionFile,
  setPastQuestionFile] =
  useState("");

const [pastQuestionLink,
  setPastQuestionLink] =
  useState("");

  const [savedPastQuestions, setSavedPastQuestions] = useState([]);

const [editingPastQuestionId,
  setEditingPastQuestionId] =
  useState(null);

const [materialFile, setMaterialFile] =
  useState("");

  const [searchPastQuestion, setSearchPastQuestion] = useState("");

  const [materialType, setMaterialType] =
  useState("pdf");

const [materialLink, setMaterialLink] =
  useState("");

  const [searchExecutive, setSearchExecutive] = useState("");

const [materialCourseCode, setMaterialCourseCode] =
  useState("");

const [savedMaterials, setSavedMaterials] = useState([]);

  const [selectedFeedback, setSelectedFeedback] =
  useState(null);

const [pastQuestionSessions, setPastQuestionSessions] = useState([]);

  const [editingMaterialId,
  setEditingMaterialId] =
  useState(null);
  
const [eligibleInput, setEligibleInput] = useState("");

const [eligibleVoters, setEligibleVoters] = useState([]);

const [showAddPastQuestionSession, setShowAddPastQuestionSession] =
  useState(false);

const [showDeletePastQuestionSession, setShowDeletePastQuestionSession] =
  useState(false);

const [newPastQuestionSession, setNewPastQuestionSession] =
  useState("");

  const [searchNews, setSearchNews] = useState("");

const [savedFeedback, setSavedFeedback] = useState([]);

const [registeredUsers, setRegisteredUsers] = useState([]);

const [savedExecutives, setSavedExecutives] = useState([]);

const totalMaterials =
  savedMaterials.length;

  const totalTimetables =
  savedTimetables.length;

  const totalPastQuestions = savedPastQuestions.length;

const totalNews =
  savedNews.length;

const totalExecutives =
  savedExecutives.length;

  const totalRegisteredUsers =
  registeredUsers.length;

  const darkMode =
  localStorage.getItem("darkMode") === "true";

  useEffect(() => {
  loadNews();
  loadMaterials();
  loadPastQuestions();
  loadExecutives();
   loadTimetables();
   loadCandidates();
   loadFeedback();
   loadRegisteredUsers();
   loadElectionStatus();
   loadEligibleVoters();
   loadExecutiveSessions();
   loadCandidatePositions();
   loadMaterialSessions();
   loadPastQuestionSessions();
}, []);


const loadNews = async () => {
  try {
    const snapshot = await getDocs(collection(db, "news"));

    const news = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setSavedNews(news);
  } catch (error) {
    console.error(error);
  }
};

const loadMaterials = async () => {
  try {
    const snapshot = await getDocs(collection(db, "materials"));

    const materials = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setSavedMaterials(materials);

  } catch (error) {
    console.error(error);
  }
};

const loadTimetables = async () => {
  try {
    const snapshot = await getDocs(collection(db, "timetables"));

    const timetables = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setSavedTimetables(timetables);

  } catch (error) {
    console.error(error);
  }
};

const loadPastQuestions = async () => {
  try {
    const snapshot = await getDocs(
      collection(db, "pastQuestions")
    );

    const questions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setSavedPastQuestions(questions);

  } catch (error) {
    console.error(error);
  }
};

const loadExecutives = async () => {

  try {

    const snapshot = await getDocs(
      collection(db, "executives")
    );

    const executives = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setSavedExecutives(executives);

  } catch (error) {

    console.error(error);

  }

};


  const loadEligibleVoters = async () => {

    try {

      const snapshot = await getDoc(
        doc(db, "settings", "eligibleVoters")
      );

      if (snapshot.exists()) {

        const data = snapshot.data();

        setEligibleVoters(data.voters || []);

        setEligibleInput(
          (data.voters || []).join("\n")
        );

      }

    } catch (error) {

      console.error(error);

    }

  };

const loadCandidates = async () => {

  try {

    const snapshot = await getDocs(
      collection(db, "candidates")
    );

    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setSavedCandidates(data);

  } catch (error) {

    console.error(error);

  }

};

const loadFeedback = async () => {
  try {

    const snapshot = await getDocs(
      collection(db, "feedback")
    );

    const feedback = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setSavedFeedback(feedback);

  } catch (error) {

    console.error(error);

  }
};

const loadExecutiveSessions = async () => {
  try {

    const snapshot = await getDocs(
      collection(db, "executiveSessions")
    );

    const sessions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setExecutiveSessions(sessions);

  } catch (error) {

    console.error(error);

  }
};

const loadRegisteredUsers = async () => {
  try {

    const snapshot = await getDocs(
      collection(db, "users")
    );

    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setRegisteredUsers(users);

  } catch (error) {

    console.error(error);

  }
};

const loadElectionStatus = async () => {
  try {
    const snapshot = await getDoc(
      doc(db, "settings", "election")
    );

    if (snapshot.exists()) {
      setElectionOpen(snapshot.data().open);
    } else {
      await setDoc(
        doc(db, "settings", "election"),
        {
          open: false
        }
      );

      setElectionOpen(false);
    }

  } catch (error) {
    console.error(error);
  }
};

const loadCandidatePositions = async () => {
  try {

    const snapshot = await getDocs(
      collection(db, "candidatePositions")
    );

    const positions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setCandidatePositions(positions);

  } catch (error) {

    console.error(error);

  }
};

const loadMaterialSessions = async () => {
  try {

    const snapshot = await getDocs(
      collection(db, "materialSessions")
    );

    const sessions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setMaterialSessions(sessions);

  } catch (error) {

    console.error(error);

  }
};

const loadPastQuestionSessions = async () => {
  try {

    const snapshot = await getDocs(
      collection(db, "pastQuestionSessions")
    );

    const sessions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setPastQuestionSessions(sessions);

  } catch (error) {

    console.error(error);

  }
};

const deleteNews = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this announcement?"
  );

  if (!confirmDelete) return;

  try {
    await deleteDoc(doc(db, "news", id));

    await loadNews();

    alert("Announcement deleted successfully");
  } catch (error) {
    console.error(error);
    alert("Failed to delete announcement");
  }
};

const editNews = (item) => {

  setEditingNewsId(item.id);

  setTitle(item.title);

  setText(item.text);

  setImage(item.image || "");

  setPinned(item.pinned || false);

};

const handleAddNews = async () => {
  if (!title || !text) {
    alert("Please fill in all fields");
    return;
  }

  try {
    if (editingNewsId) {
      await updateDoc(doc(db, "news", editingNewsId), {
        title,
        text,
        image,
        pinned
      });

      alert("Announcement updated successfully");
    } else {
      await addDoc(collection(db, "news"), {
        title,
        text,
        image,
        pinned,
        createdAt: serverTimestamp()
      });

      alert("Announcement added successfully");

      sendNotification(
  "New Announcement",
  `${title} has been published.`
);

    }

    setTitle("");
    setText("");
    setImage("");
    setPinned(false);
    setEditingNewsId(null);

    await loadNews();

  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};

const addCandidate = async () => {
  if (
  !candidateName ||
  !candidatePosition ||
  !candidateLevel
) {
    alert("Please fill all candidate fields");
    return;
  }

const newCandidate = {
  name: candidateName,
  position: candidatePosition,
  level: candidateLevel,
  image: candidateImage || "",
  votes: 0,
  createdAt: serverTimestamp()
};

await addDoc(
  collection(db, "candidates"),
  newCandidate
);

await loadCandidates();

setCandidateName("");
setCandidatePosition("");
setCandidateLevel("");
setCandidateImage("");

alert("Candidate added successfully");
};

const addExecutive = async () => {

  if (
    !execName ||
    !execPosition ||
    !execImage
  ) {
    alert("Please fill all executive fields");
    return;
  }

  try {

    if (editingExecutiveId) {

      await updateDoc(
        doc(db, "executives", editingExecutiveId),
        {
          name: execName,
          position: execPosition,
          image: execImage,
          session: execSession,
          bio: execBio
        }
      );

      alert("Executive updated successfully");

      setEditingExecutiveId(null);

    } else {

      await addDoc(
        collection(db, "executives"),
        {
          name: execName,
          position: execPosition,
          image: execImage,
          session: execSession,
          bio: execBio,
          createdAt: serverTimestamp()
        }
      );

      alert("Executive added successfully");

      sendNotification(
  "New Executive Added",
  `${execName} has been added as ${execPosition} for the ${execSession} executive session.`
);

    }

    setExecName("");
    setExecPosition("");
    setExecImage("");
    setExecSession("");
    setExecBio("");
    setEditingExecutiveId(null);

    await loadExecutives();

  } catch (error) {

    console.error(error);

    alert("Something went wrong");

  }

};

const addExecutiveSession = async () => {

  if (!newExecutiveSession.trim()) {
    alert("Enter a session.");
    return;
  }

  try {

    await addDoc(
      collection(db, "executiveSessions"),
      {
        session: newExecutiveSession.trim()
      }
    );

    setNewExecutiveSession("");

    await loadExecutiveSessions();

    alert("Executive session added successfully.");

  } catch (error) {

    console.error(error);

    alert("Failed to save session.");

  }

};

const editMaterial = (item) => {

  setEditingMaterialId(item.id);

  setMaterialTitle(item.title);

  setMaterialCourseCode(
    item.courseCode || ""
  );

  setMaterialLevel(item.level);

  setMaterialSemester(
    item.semester
  );
  setMaterialSession(item.session || "2025/2026");

  setMaterialType(item.type);

  setMaterialFile(
    item.file || ""
  );

  setMaterialLink(
    item.link || ""
  );
};

const editPastQuestion = (item) => {

  setEditingPastQuestionId(item.id);

  setPastQuestionTitle(item.title);

  setPastQuestionCourseCode(
    item.courseCode || ""
  );

  setPastQuestionLevel(item.level);

  setPastQuestionSemester(
    item.semester
  );

   setPastQuestionSession(
    item.session || "2023/2024"
  );

  setPastQuestionType(item.type);

  setPastQuestionFile(
    item.file || ""
  );

  setPastQuestionLink(
    item.link || ""
  );
};

const addMaterial = async () => {

  if (
    !materialTitle ||
    !materialCourseCode ||
    (
      materialType === "pdf"
        ? !materialFile
        : !materialLink
    )
  ) {
    alert("Please fill all fields");
    return;
  }

  if (editingMaterialId) {

  try {

  await updateDoc(
    doc(db, "materials", editingMaterialId),
    {
      title: materialTitle,
      courseCode: materialCourseCode,
      level: materialLevel,
      semester: materialSemester,
      session: materialSession,
      type: materialType,
      file: materialFile,
      link: materialLink
    }
  );
  await loadMaterials();

  setEditingMaterialId(null);

  alert("Material updated successfully");

} catch (error) {

  console.error(error);

  alert("Update failed");

}

  } else {

    const newMaterial = {
  title: materialTitle,
  courseCode: materialCourseCode,
  level: materialLevel,
  semester: materialSemester,
  session: materialSession,
  type: materialType,
  file: materialFile,
  link: materialLink
};

    try {

  await addDoc(
    collection(db, "materials"),
    newMaterial
  );
  
  await loadMaterials();

  alert("Material uploaded successfully");

  sendNotification(
  "New Material Uploaded",
  `${materialTitle} has been added for ${materialLevel} Level.`
);

} catch (error) {

  console.error(error);

  alert("Upload failed");

}
    
  }

  setMaterialTitle("");
  setMaterialCourseCode("");
  setMaterialFile("");
  setMaterialLink("");
  setMaterialType("pdf");
  setMaterialSession("2025/2026");

  window.dispatchEvent(
    new Event(
      "materialsUpdated"
    )
  );
};

const addPastQuestion = async () => {

  if (
    !pastQuestionTitle ||
    !pastQuestionCourseCode ||
     !pastQuestionSession ||
    (
      pastQuestionType === "pdf"
        ? !pastQuestionFile
        : !pastQuestionLink
    )
  ) {
    alert("Please fill all fields");
    return;
  }

  try {

  if (editingPastQuestionId) {

    await updateDoc(
      doc(db, "pastQuestions", editingPastQuestionId),
      {
        title: pastQuestionTitle,
        courseCode: pastQuestionCourseCode,
        level: pastQuestionLevel,
        semester: pastQuestionSemester,
        session: pastQuestionSession,
        type: pastQuestionType,
        file: pastQuestionFile,
        link: pastQuestionLink
      }
    );

    alert("Past Question updated successfully");

  } else {

    await addDoc(
      collection(db, "pastQuestions"),
      {
        title: pastQuestionTitle,
        courseCode: pastQuestionCourseCode,
        level: pastQuestionLevel,
        semester: pastQuestionSemester,
        session: pastQuestionSession,
        type: pastQuestionType,
        file: pastQuestionFile,
        link: pastQuestionLink,
        createdAt: serverTimestamp()
      }
    );

    alert("Past Question uploaded successfully");

    
sendNotification(
  "New Past Question Uploaded",
  `${pastQuestionTitle} (${pastQuestionCourseCode}) has been uploaded for ${pastQuestionLevel} Level - ${pastQuestionSemester} Semester (${pastQuestionSession}).`
);


  }

  await loadPastQuestions();

} catch (error) {

  console.error(error);

  alert("Something went wrong");
}

  setPastQuestionTitle("");
  setPastQuestionCourseCode("");
  setPastQuestionFile("");
  setPastQuestionLink("");
  setPastQuestionType("pdf");
  setPastQuestionSession("2023/2024");
  setEditingPastQuestionId(null);
};

async function addTimetable() {

  if (
    timetableTitle.trim() === "" ||
    !timetableFile
  ) {
    alert("Please complete all fields.");
    return;
  }

  try {

    if (editingTimetableId) {

      await updateDoc(
        doc(db, "timetables", editingTimetableId),
        {
          title: timetableTitle,
          file: timetableFile,
          uploadedAt: new Date().toLocaleDateString()
        }
      );

      alert("Timetable updated successfully");

      setEditingTimetableId(null);

    } else {

      await addDoc(
        collection(db, "timetables"),
        {
          title: timetableTitle,
          file: timetableFile,
          uploadedAt: new Date().toLocaleDateString(),
          createdAt: serverTimestamp()
        }
      );

      alert("Timetable uploaded successfully");


      sendNotification(
        "New Timetable Uploaded",
        `${timetableTitle} timetable has been uploaded.`
      );

    }

    await loadTimetables();

    setTimetableTitle("");
    setTimetableFile("");

  } catch (error) {

    console.error(error);

    alert("Failed to upload timetable");

  }

}

const addCandidatePosition = async () => {

  if (!newCandidatePosition.trim()) {
    alert("Enter a candidate position.");
    return;
  }

  try {

    const exists = candidatePositions.some(
      (item) =>
        item.position.toLowerCase() ===
        newCandidatePosition.trim().toLowerCase()
    );

    if (exists) {
      alert("Position already exists.");
      return;
    }

    await addDoc(
      collection(db, "candidatePositions"),
      {
        position: newCandidatePosition.trim(),
        createdAt: serverTimestamp()
      }
    );

    await loadCandidatePositions();

    setCandidatePosition(newCandidatePosition.trim());

    setNewCandidatePosition("");

    setShowAddCandidatePosition(false);

    alert("Position added successfully.");

  } catch (error) {

    console.error(error);

    alert("Failed to add position.");

  }

};

const deleteMaterial = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this material?"
  );

  if (!confirmDelete) return;

  try {

    await deleteDoc(doc(db, "materials", id));

    await loadMaterials();

    alert("Material deleted successfully");

  } catch (error) {

    console.error(error);

    alert("Failed to delete material");

  }

};

const deletePastQuestion = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this past question?"
  );

  if (!confirmDelete) return;

  try {

    await deleteDoc(doc(db, "pastQuestions", id));

    await loadPastQuestions();

    alert("Past Question deleted successfully");

  } catch (error) {

    console.error(error);

    alert("Failed to delete past question");

  }

};

const editTimetable = (item) => {

  setEditingTimetableId(item.id);

  setTimetableTitle(item.title);

  setTimetableFile(item.file);

};

const deleteTimetable = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this timetable?"
  );

  if (!confirmDelete) return;

  try {

    await deleteDoc(doc(db, "timetables", id));

    await loadTimetables();

    alert("Timetable deleted successfully");

  } catch (error) {

    console.error(error);

    alert("Failed to delete timetable");

  }

};

const editExecutive = (exec) => {

  setEditingExecutiveId(exec.id);

  setExecName(exec.name);

  setExecPosition(exec.position);

  setExecSession(exec.session);

  setExecBio(exec.bio || "");

  setExecImage(exec.image);
};

const deleteExecutive = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this executive?"
  );

  if (!confirmDelete) return;

  try {

    await deleteDoc(doc(db, "executives", id));

    await loadExecutives();

    alert("Executive deleted successfully");

  } catch (error) {

    console.error(error);

    alert("Failed to delete executive");

  }

};

const deleteCandidate = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to remove this candidate?"
  );

  if (!confirmDelete) return;

  try {

    await deleteDoc(
      doc(db, "candidates", id)
    );

    await loadCandidates();

    alert("Candidate removed successfully");

  } catch (error) {

    console.error(error);

    alert("Failed to delete candidate");

  }

};

const saveEligibleVoters = async () => {
  const list = eligibleInput
    .split("\n")
    .map((v) => v.trim().toUpperCase())
    .filter((v) => v !== "");

  try {

    await setDoc(
      doc(db, "settings", "eligibleVoters"),
      {
        voters: list,
        updatedAt: serverTimestamp()
      }
    );

    setEligibleVoters(list);
    setEligibleInput(list.join("\n"));

    alert("Eligible voters saved successfully!");

  } catch (error) {

    console.error(error);

    alert("Failed to save eligible voters.");

  }
};

const resetElection = async () => {
  const confirmReset = window.confirm(
    "Are you sure you want to reset the election?\n\nThis will delete ALL votes, verified voters and election results."
  );

  if (!confirmReset) return;

  try {

    // Delete verified voters
    const verifiedSnapshot = await getDocs(
      collection(db, "verifiedVoters")
    );

    for (const document of verifiedSnapshot.docs) {
      await deleteDoc(document.ref);
    }

    // Delete voted students
    const votedSnapshot = await getDocs(
      collection(db, "votedStudents")
    );

    for (const document of votedSnapshot.docs) {
      await deleteDoc(document.ref);
    }

    // Delete election results
    const resultsSnapshot = await getDocs(
      collection(db, "electionResults")
    );

    for (const document of resultsSnapshot.docs) {
      await deleteDoc(document.ref);
    }

    // Close election
    await setDoc(
      doc(db, "settings", "election"),
      {
        open: false
      }
    );

    setElectionOpen(false);

    alert("Election reset successfully.");

    window.location.reload();

  } catch (error) {

    console.error(error);

    alert("Failed to reset election.");

  }
};

  return (
    <div
  style={{
    padding: "20px",
    paddingBottom: "160px",
    fontFamily: "Arial"
  }}
>
      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  }}
>

  <h1>Admin Dashboard</h1>

  <button
    onClick={() => {

      localStorage.removeItem(
        "adminLoggedIn"
      );

      navigate("/admin-login");

    }}

    style={{
      background: "red",
      color: "white",
      border: "none",
      padding: "10px 15px",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: "bold"
    }}
  >
    Logout
  </button>

</div>

<div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(170px,1fr))",
    gap: "15px",
    marginBottom: "20px"
  }}
>

  <div
    style={{
      background: "#4f46e5",
      color: "white",
      padding: "20px",
      borderRadius: "15px",
      textAlign: "center"
    }}
  >
    <h2>{totalNews}</h2>
    <p>Announcements</p>
  </div>

  <div
    style={{
      background: "#059669",
      color: "white",
      padding: "20px",
      borderRadius: "15px",
      textAlign: "center"
    }}
  >
    <h2>{totalExecutives}</h2>
    <p>Executives</p>
  </div>

<div
  onClick={() => setActiveTab("election")}
  style={{
    background: electionOpen ? "#16a34a" : "#dc2626",
    color: "white",
    padding: "20px",
    borderRadius: "15px",
    textAlign: "center",
    cursor: "pointer"
  }}
>
  <h2>🗳️</h2>
  <p>Election</p>
  <small>
    {electionOpen ? "Open" : "Closed"}
  </small>
</div>

  <div
    style={{
      background: "#d97706",
      color: "white",
      padding: "20px",
      borderRadius: "15px",
      textAlign: "center"
    }}
  >
    <h2>{totalMaterials}</h2>
    <p>Materials</p>
  </div>

<div
  style={{
    background: "#0ea5e9",
    color: "white",
    padding: "20px",
    borderRadius: "15px",
    textAlign: "center"
  }}
>
  <h2>{totalRegisteredUsers}</h2>
  <p>Registered Users</p>
</div>

</div>

      <div
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "20px",
    marginBottom: "20px",
    flexWrap: "wrap"
  }}
>
  <button
    onClick={() => setActiveTab("news")}
    style={{
      padding: "10px 15px",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      background:
        activeTab === "news" ? "#4f46e5" : "#e5e7eb",
      color:
        activeTab === "news" ? "white" : "black"
    }}
  >
    📢 Announcements ({totalNews})
  </button>

  <button
    onClick={() => setActiveTab("executives")}
    style={{
      padding: "10px 15px",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      background:
        activeTab === "executives"
          ? "#4f46e5"
          : "#e5e7eb",
      color:
        activeTab === "executives"
          ? "white"
          : "black"
    }}
  >
    👨‍🎓 Executives ({totalExecutives})
  </button>

<button
  onClick={() => setActiveTab("users")}
  style={{
    padding: "10px 15px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    background:
      activeTab === "users"
        ? "#4f46e5"
        : "#e5e7eb",
    color:
      activeTab === "users"
        ? "white"
        : "black"
  }}
>
  👥 Registered Users ({totalRegisteredUsers})
</button>

<button
  onClick={() => setActiveTab("materials")}
  style={{
    padding: "10px 15px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    background:
      activeTab === "materials"
        ? "#4f46e5"
        : "#e5e7eb",
    color:
      activeTab === "materials"
        ? "white"
        : "black"
  }}
>
  📚 Materials ({totalMaterials})
</button>

<button
  onClick={() => setActiveTab("timetable")}
  style={{
    padding: "10px 15px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    background:
      activeTab === "timetable"
        ? "#4f46e5"
        : "#e5e7eb",
    color:
      activeTab === "timetable"
        ? "white"
        : "black"
  }}
>
  📅 Timetable ({totalTimetables})
</button>

<button
  onClick={() => setActiveTab("pastQuestions")}
  style={{
    padding: "10px 15px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    background:
      activeTab === "pastQuestions"
        ? "#4f46e5"
        : "#e5e7eb",
    color:
      activeTab === "pastQuestions"
        ? "white"
        : "black"
  }}
>
  📝 Past Questions ({totalPastQuestions})
</button>

<button
  onClick={() => setActiveTab("feedback")}
  style={{
    padding: "10px 15px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    background:
      activeTab === "feedback"
        ? "#4f46e5"
        : "#e5e7eb",
    color:
      activeTab === "feedback"
        ? "white"
        : "black"
  }}
>
  💬 Feedback ({savedFeedback.length})
</button>

<button
  onClick={() => setActiveTab("eligible")}
  style={{
    padding: "10px 15px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    background:
      activeTab === "eligible"
        ? "#4f46e5"
        : "#e5e7eb",
    color:
      activeTab === "eligible"
        ? "white"
        : "black"
  }}
>
  🆔 Eligible Voters
</button>

<button
  onClick={() => setActiveTab("candidates")}
  style={{
    padding: "10px 15px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    background:
      activeTab === "candidates"
        ? "#4f46e5"
        : "#e5e7eb",
    color:
      activeTab === "candidates"
        ? "white"
        : "black"
  }}
>
  🗳️ Candidates ({savedCandidates.length})
</button>


</div>

      {activeTab === "news" && (
<>
  <h3>Add News</h3>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          display: "block",
          padding: "10px",
          marginBottom: "10px",
          width: "100%"
        }}
      />

      <textarea
        placeholder="News text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          display: "block",
          padding: "10px",
          marginBottom: "10px",
          width: "100%",
          height: "100px"
        }}
      />

      <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

reader.onload = (event) => {
  const img = new Image();

  img.onload = () => {
    const canvas = document.createElement("canvas");

    const maxWidth = 400;
    const scale = maxWidth / img.width;

    canvas.width = maxWidth;
    canvas.height = img.height * scale;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      img,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const compressed = canvas.toDataURL(
      "image/jpeg",
      0.6
    );

    setImage(compressed);
  };

  img.src = event.target.result;
};

reader.readAsDataURL(file);
    }
  }}
  style={{
    display: "block",
    marginBottom: "10px"
  }}
/>

<label
  style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "15px"
  }}
>
  <input
    type="checkbox"
    checked={pinned}
    onChange={(e) =>
      setPinned(e.target.checked)
    }
  />

  📌 Pin this announcement
</label>

      <button
        onClick={handleAddNews}
        style={{
          padding: "10px 20px",
          background: "#4f46e5",
          color: "white",
          border: "none",
          borderRadius: "10px"
        }}
      >
        {
  editingNewsId
    ? "Update News"
    : "Publish News"
}
      </button>

<input
  type="text"
  placeholder="Search announcements..."
  value={searchNews}
  onChange={(e) => setSearchNews(e.target.value)}
  style={{
    width: "100%",
    padding: "12px",
    marginTop: "20px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "1px solid #d1d5db"
  }}
/>

      <h2 style={{ marginTop: "30px" }}>Posted News</h2>

      {savedNews.length === 0 ? (
  <p>No news available</p>
) : (
  savedNews
  .filter(
    (item) =>
      item.title
        .toLowerCase()
        .includes(searchNews.toLowerCase()) ||
      item.text
        .toLowerCase()
        .includes(searchNews.toLowerCase())
  )
  .map((item) => (
    <div
      key={item.id}
      style={{
        background: "#f3f4f6",
        padding: "15px",
        marginTop: "10px",
        borderRadius: "10px"
      }}
    >
      {item.image && (
        <img
          src={item.image}
          alt={item.title}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "10px",
            marginBottom: "10px"
          }}
        />
      )}

      <h3>{item.title}</h3>

      <p>{item.text}</p>

      <button
        onClick={() => editNews(item)}
        style={{
          marginTop: "10px",
          marginRight: "10px",
          background: "#f59e0b",
          color: "white",
          border: "none",
          padding: "8px 12px",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Edit
      </button>

      <button
        onClick={() => deleteNews(item.id)}
        style={{
          marginTop: "10px",
          background: "red",
          color: "white",
          border: "none",
          padding: "8px 12px",
          borderRadius: "8px"
        }}
      >
        Delete
      </button>
    </div>
  ))
)}
</>
)}

{activeTab === "executives" && (
<>
  <h2 style={{ marginTop: "40px" }}>
    Add Executive
  </h2>

<input
  type="text"
  placeholder="Executive Name"
  value={execName}
  onChange={(e) => setExecName(e.target.value)}
  style={inputStyle}
/>

<input
  type="text"
  placeholder="Position"
  value={execPosition}
  onChange={(e) => setExecPosition(e.target.value)}
  style={inputStyle}
/>
<select
  value={execSession}
  onChange={(e) => setExecSession(e.target.value)}
  style={inputStyle}
>
{executiveSessions.map((item) => (
  <option
    key={item.id}
    value={item.session}
  >
    {item.session}
  </option>
))}
</select>

<div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
  <button
    type="button"
    onClick={() =>
      setShowAddExecutiveSession(!showAddExecutiveSession)
    }
    style={{
      padding: "10px 15px",
      border: "none",
      borderRadius: "10px",
      background: "#16a34a",
      color: "white",
      cursor: "pointer",
      fontWeight: "bold"
    }}
  >
    ➕ Add Session
  </button>

  <button
    type="button"
    onClick={() =>
      setShowDeleteExecutiveSession(!showDeleteExecutiveSession)
    }
    style={{
      padding: "10px 15px",
      border: "none",
      borderRadius: "10px",
      background: "#dc2626",
      color: "white",
      cursor: "pointer",
      fontWeight: "bold"
    }}
  >
    🗑️ Delete Session
  </button>
</div>

{showAddExecutiveSession && (
  <div
    style={{
      display: "flex",
      gap: "10px",
      marginBottom: "15px"
    }}
  >
    <input
      type="text"
      placeholder="e.g. 2027/2028"
      value={newExecutiveSession}
      onChange={(e) =>
        setNewExecutiveSession(e.target.value)
      }
      style={{
        ...inputStyle,
        marginBottom: 0,
        flex: 1
      }}
    />

    <button
      type="button"
      onClick={addExecutiveSession}
      style={{
        padding: "10px 15px",
        border: "none",
        borderRadius: "10px",
        background: "#16a34a",
        color: "white",
        cursor: "pointer",
        fontWeight: "bold"
      }}
    >
      Save
    </button>
  </div>
)}

{showDeleteExecutiveSession && (
  <div
    style={{
      background: darkMode ? "#1f2937" : "#f9fafb",
      padding: "15px",
      borderRadius: "10px",
      border: darkMode
        ? "1px solid #374151"
        : "1px solid #e5e7eb",
      marginBottom: "15px"
    }}
  >
    <p
      style={{
        fontWeight: "bold",
        marginBottom: "10px"
      }}
    >
      Select a session to remove
    </p>

    {executiveSessions.map((item) => (
      <div
        key={item.id}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          marginBottom: "8px",
          borderRadius: "8px",
          background: darkMode ? "#111827" : "#ffffff",
          border: darkMode
            ? "1px solid #374151"
            : "1px solid #e5e7eb"
        }}
      >
        <span>{item.session}</span>

<button
  type="button"
  onClick={async () => {

    const confirmDelete = window.confirm(
      `Remove ${item.session} from the session list?`
    );

    if (!confirmDelete) return;

    try {

      await deleteDoc(
        doc(db, "executiveSessions", item.id)
      );

      await loadExecutiveSessions();

      if (execSession === item.session) {
        setExecSession("");
      }

      alert("Session removed successfully.");

    } catch (error) {

      console.error(error);

      alert("Failed to remove session.");

    }

  }}
  style={{
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "8px",
    cursor: "pointer"
  }}
>
  Remove
</button>
      </div>
    ))}
  </div>
)}

<textarea
  placeholder="Executive Biography"
  value={execBio}
  onChange={(e) => setExecBio(e.target.value)}
  style={{
    ...inputStyle,
    height: "120px"
  }}
/>

<input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setExecImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  }}
  style={{
    display: "block",
    marginBottom: "10px"
  }}
/>

<button
  onClick={addExecutive}
  style={{
    background: "#4f46e5",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer"
  }}
>
  {
  editingExecutiveId
    ? "Update Executive"
    : "Save Executive"
}
</button>

<h3 style={{ marginTop: "30px" }}>
  Saved Executives
</h3>
<input
  type="text"
  placeholder="Search executives..."
  value={searchExecutive}
  onChange={(e) =>
    setSearchExecutive(e.target.value)
  }
  style={inputStyle}
/>

{savedExecutives.length === 0 ? (
  <p>No executives added yet</p>
) : (
  savedExecutives
  .filter(
    (exec) =>
      exec.name
        .toLowerCase()
        .includes(searchExecutive.toLowerCase()) ||
      exec.position
        .toLowerCase()
        .includes(searchExecutive.toLowerCase()) ||
      exec.session
        .toLowerCase()
        .includes(searchExecutive.toLowerCase())
  )
  .map((exec) => (
    <div
      key={exec.id}
      style={{
        background: "#f3f4f6",
        padding: "15px",
        marginTop: "10px",
        borderRadius: "10px"
      }}
    >
      <img
        src={exec.image}
        alt={exec.name}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "10px"
        }}
      />

      <h3>{exec.name}</h3>
      <p>{exec.position}</p>
      <p>Session: {exec.session}</p>

      <button
  onClick={() => editExecutive(exec)}
  style={{
    marginRight: "10px",
    background: "#f59e0b",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer"
  }}
>
  Edit
</button>

<button
  onClick={() => deleteExecutive(exec.id)}
  style={{
    background: "red",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer"
  }}
>
  Delete
</button>
    </div>
  ))
)}
</>
)}
{activeTab === "materials" && (
<>
  <h2 style={{ marginTop: "20px" }}>
    Upload Material
  </h2>

  <input
    type="text"
    placeholder="Course Title"
    value={materialTitle}
    onChange={(e) =>
      setMaterialTitle(e.target.value)
    }
    style={inputStyle}
  />

<input
  type="text"
  placeholder="Course Code (e.g ECO321)"
  value={materialCourseCode}
  onChange={(e) =>
    setMaterialCourseCode(e.target.value)
  }
  style={inputStyle}
/>

  <select
    value={materialLevel}
    onChange={(e) =>
      setMaterialLevel(e.target.value)
    }
    style={inputStyle}
  >
    <option value="100">100 Level</option>
    <option value="200">200 Level</option>
    <option value="300">300 Level</option>
    <option value="400">400 Level</option>
  </select>

  <select
    value={materialSemester}
    onChange={(e) =>
      setMaterialSemester(e.target.value)
    }
    style={inputStyle}
  >
    <option value="First">
      First Semester
    </option>

    <option value="Second">
      Second Semester
    </option>
  </select>

  <select
  value={materialSession}
  onChange={(e) => setMaterialSession(e.target.value)}
  style={inputStyle}
>
  <option value="">Select Session</option>

  {materialSessions.map((item) => (
  <option
    key={item.id}
    value={item.session}
  >
    {item.session}
  </option>
))}
</select>

<button
  type="button"
  onClick={() =>
    setShowAddMaterialSession(!showAddMaterialSession)
  }
  style={{
    marginBottom: "10px",
    padding: "10px 15px",
    border: "none",
    borderRadius: "10px",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold"
  }}
>
  ➕ Add Session
</button>

<button
  type="button"
  onClick={() =>
    setShowDeleteMaterialSession(!showDeleteMaterialSession)
  }
  style={{
    marginBottom: "10px",
    marginLeft: "10px",
    padding: "10px 15px",
    border: "none",
    borderRadius: "10px",
    background: "#dc2626",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold"
  }}
>
  🗑️ Delete Session
</button>

{showAddMaterialSession && (
  <div
    style={{
      display: "flex",
      gap: "10px",
      marginBottom: "15px"
    }}
  >
    <input
      type="text"
      placeholder="e.g. 2027/2028"
      value={newMaterialSession}
      onChange={(e) =>
        setNewMaterialSession(e.target.value)
      }
      style={{
        ...inputStyle,
        marginBottom: 0,
        flex: 1
      }}
    />

    <button
      type="button"
      onClick={async () => {
        const value = newMaterialSession.trim();

if (!value) return;

const exists = materialSessions.some(
  (item) =>
    item.session.toLowerCase() === value.toLowerCase()
);

if (exists) {
  alert("Session already exists");
  return;
}

try {

  await addDoc(
    collection(db, "materialSessions"),
    {
      session: value
    }
  );

  await loadMaterialSessions();

  setMaterialSession(value);

  setNewMaterialSession("");

  setShowAddMaterialSession(false);

  alert("Session added successfully");

} catch (error) {

  console.error(error);

  alert("Failed to add session.");

}
      }}
      style={{
        padding: "10px 15px",
        border: "none",
        borderRadius: "10px",
        background: "#16a34a",
        color: "white",
        cursor: "pointer",
        fontWeight: "bold"
      }}
    >
      Save
    </button>
  </div>
)}

{showAddPastQuestionSession && (
  <div
    style={{
      display: "flex",
      gap: "10px",
      marginBottom: "15px"
    }}
  >
    <input
      type="text"
      placeholder="e.g. 2027/2028"
      value={newPastQuestionSession}
      onChange={(e) =>
        setNewPastQuestionSession(e.target.value)
      }
      style={{
        ...inputStyle,
        marginBottom: 0,
        flex: 1
      }}
    />

    <button
      type="button"
      onClick={async () => {

  const value = newPastQuestionSession.trim();

  if (!value) return;

  try {

    await addDoc(
      collection(db, "pastQuestionSessions"),
      {
        session: value
      }
    );

    await loadPastQuestionSessions();

    setPastQuestionSession(value);

    setNewPastQuestionSession("");

    setShowAddPastQuestionSession(false);

    alert("Session added successfully.");

  } catch (error) {

    console.error(error);

    alert("Failed to add session.");

  }

}}
      style={{
        padding: "10px 15px",
        border: "none",
        borderRadius: "10px",
        background: "#16a34a",
        color: "white",
        cursor: "pointer",
        fontWeight: "bold"
      }}
    >
      Save
    </button>
  </div>
)}

{showDeletePastQuestionSession && (
  <div
    style={{
      background: darkMode ? "#1f2937" : "#f9fafb",
      padding: "15px",
      borderRadius: "10px",
      border: darkMode
        ? "1px solid #374151"
        : "1px solid #e5e7eb",
      marginBottom: "15px"
    }}
  >
    <p
      style={{
        fontWeight: "bold",
        marginBottom: "10px"
      }}
    >
      Select a session to remove
    </p>

    {pastQuestionSessions.map((item) => (
      <div
        key={item.id}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          marginBottom: "8px",
          borderRadius: "8px",
          background: darkMode ? "#111827" : "#ffffff",
          border: darkMode
            ? "1px solid #374151"
            : "1px solid #e5e7eb"
        }}
      >
        <span>{item.session}</span>

        <button
          type="button"
          onClick={async () => {

            const confirmDelete = window.confirm(
              `Remove ${item.session}?`
            );

            if (!confirmDelete) return;

            try {

              await deleteDoc(
                doc(db, "pastQuestionSessions", item.id)
              );

              await loadPastQuestionSessions();

              if (pastQuestionSession === item.session) {
                setPastQuestionSession("");
              }

              alert("Session removed successfully.");

            } catch (error) {

              console.error(error);

              alert("Failed to remove session.");

            }

          }}
          style={{
            background: "#dc2626",
            color: "white",
            border: "none",
            padding: "6px 10px",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Remove
        </button>
      </div>
    ))}
  </div>
)}
    
{showDeleteMaterialSession && (
  <div
    style={{
      background: darkMode ? "#1f2937" : "#f9fafb",
      padding: "15px",
      borderRadius: "10px",
      border: darkMode
        ? "1px solid #374151"
        : "1px solid #e5e7eb",
      marginBottom: "15px"
    }}
  >
    <p
      style={{
        fontWeight: "bold",
        marginBottom: "10px"
      }}
    >
      Select a session to remove
    </p>

    {materialSessions.map((item) => (
      <div
        key={item.id}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          marginBottom: "8px",
          borderRadius: "8px",
          background: darkMode ? "#111827" : "#ffffff",
          border: darkMode
            ? "1px solid #374151"
            : "1px solid #e5e7eb"
        }}
      >
        <span>{item.session}</span>

        <button
          type="button"
          onClick={async () => {

  const confirmDelete = window.confirm(
    `Remove ${item.session}?`
  );

  if (!confirmDelete) return;

  try {

    await deleteDoc(
      doc(db, "materialSessions", item.id)
    );

    await loadMaterialSessions();

    if (materialSession === item.session) {
      setMaterialSession("");
    }

    alert("Session removed successfully.");

  } catch (error) {

    console.error(error);

    alert("Failed to remove session.");

  }

}}
          style={{
            background: "#dc2626",
            color: "white",
            border: "none",
            padding: "6px 10px",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Remove
        </button>
      </div>
    ))}
  </div>
)}

  <select
  value={materialType}
  onChange={(e) =>
    setMaterialType(e.target.value)
  }
  style={inputStyle}
>
  <option value="pdf">
    PDF Upload
  </option>

  <option value="link">
    Google Drive Link
  </option>
</select>

  {materialType === "pdf" ? (

  <input
    type="file"
    accept=".pdf"
    onChange={(e) => {

      const file = e.target.files[0];

      if (file) {

        const reader =
          new FileReader();

        reader.onloadend = () => {

          setMaterialFile(
            reader.result
          );

        };

        reader.readAsDataURL(file);

      }

    }}
    style={{
      display: "block",
      marginBottom: "10px"
    }}
  />

) : (

  <input
    type="text"
    placeholder="Paste Google Drive Link"
    value={materialLink}
    onChange={(e) =>
      setMaterialLink(
        e.target.value
      )
    }
    style={inputStyle}
  />

)}

  <button
    onClick={addMaterial}
    style={{
      background: "#4f46e5",
      color: "white",
      padding: "12px 20px",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer"
    }}
  >
  {
    editingMaterialId
      ? "Update Material"
      : "Upload Material"
  }
</button>

  <h3 style={{ marginTop: "30px" }}>
    Uploaded Materials
  </h3>

  <input
  type="text"
  placeholder="Search materials..."
  value={searchMaterial}
  onChange={(e) => setSearchMaterial(e.target.value)}
  style={inputStyle}
/>

  {savedMaterials.length === 0 ? (
    <p>No materials uploaded yet</p>
  ) : (
    savedMaterials
  .filter((item) =>
    item.title.toLowerCase().includes(searchMaterial.toLowerCase()) ||
    item.courseCode.toLowerCase().includes(searchMaterial.toLowerCase())
  )
  .map((item) => (
      <div
        key={item.id}
        style={{
          background: "#f3f4f6",
          padding: "15px",
          marginTop: "10px",
          borderRadius: "10px"
        }}
      >
        <h3>{item.title}</h3>

        <p>
  {item.session} Session • {item.level} Level • {item.semester} Semester
</p>

       <button
  onClick={() =>
    editMaterial(item)
  }
  style={{
    marginTop: "10px",
    marginRight: "10px",
    background: "#f59e0b",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer"
  }}
>
  Edit
</button>

        <button
          onClick={() =>
            deleteMaterial(item.id)
          }
          style={{
            marginTop: "10px",
            background: "red",
            color: "white",
            border: "none",
            padding: "8px 12px",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Delete
        </button>
      </div>
    ))
  )}
</>
)}

{activeTab === "users" && (
  <>
    <h2>👥 Registered Users</h2>

    {registeredUsers.length === 0 ? (
      <p>No registered users found.</p>
    ) : (
      registeredUsers.map((user) => (
        <div
          key={user.id}
          style={{
            background: "#f3f4f6",
            padding: "15px",
            marginTop: "12px",
            borderRadius: "10px",
            border: "1px solid #ddd"
          }}
        >
          <h3>{user.fullName}</h3>

          <p><strong>Email:</strong> {user.email}</p>

          <p><strong>Phone:</strong> {user.phone}</p>

          <p><strong>Matric:</strong> {user.matric}</p>

          <p><strong>Level:</strong> {user.level}</p>

          <p>
            <strong>Status:</strong>{" "}
            {user.verified ? (
              <span style={{ color: "green", fontWeight: "bold" }}>
                ✅ Verified
              </span>
            ) : (
              <span style={{ color: "red", fontWeight: "bold" }}>
                ❌ Not Verified
              </span>
            )}
          </p>

          <p>
            <strong>Registered:</strong>{" "}
            {user.createdAt
              ? new Date(user.createdAt).toLocaleString()
              : "N/A"}
          </p>
        </div>
      ))
    )}
  </>
)}

{activeTab === "candidates" && (
  <div
    style={{
      background: "white",
      padding: "20px",
      borderRadius: "15px",
      marginTop: "20px"
    }}
  >
    <h2>🗳️ Add Candidate</h2>

    <input
      placeholder="Candidate Name"
      value={candidateName}
      onChange={(e) =>
        setCandidateName(e.target.value)
      }
      style={{
        width: "100%",
        padding: "12px",
        marginTop: "10px",
        borderRadius: "10px",
        border: "1px solid #ccc"
      }}
    />

    <select
  value={candidateLevel}
  onChange={(e) =>
    setCandidateLevel(e.target.value)
  }
  style={{
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    borderRadius: "10px",
    border: "1px solid #ccc"
  }}
>
  <option value="">Select Contesting Level</option>
  <option value="400L">400L</option>
  <option value="300L">300L</option>
  <option value="200L">200L</option>
  <option value="100L">100L</option>
</select>

  <select
  value={candidatePosition}
  onChange={(e) =>
    setCandidatePosition(e.target.value)
  }
  style={{
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    borderRadius: "10px",
    border: "1px solid #ccc"
  }}
>
  <option value="">Select Position</option>

{candidatePositions.map((item) => (
  <option
    key={item.id}
    value={item.position}
  >
    {item.position}
  </option>
))}
</select>

<div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
  <button
    type="button"
    onClick={() =>
      setShowAddCandidatePosition(
        !showAddCandidatePosition
      )
    }
    style={{
      padding: "10px 15px",
      border: "none",
      borderRadius: "10px",
      background: "#16a34a",
      color: "white",
      cursor: "pointer",
      fontWeight: "bold"
    }}
  >
    ➕ Add Position
  </button>

  <button
    type="button"
    onClick={() =>
      setShowDeleteCandidatePosition(
        !showDeleteCandidatePosition
      )
    }
    style={{
      padding: "10px 15px",
      border: "none",
      borderRadius: "10px",
      background: "#dc2626",
      color: "white",
      cursor: "pointer",
      fontWeight: "bold"
    }}
  >
    🗑️ Delete Position
  </button>
</div>

    <label
      style={{
        display: "block",
        marginTop: "15px",
        marginBottom: "10px",
        fontWeight: "bold"
      }}
    >
      Upload Candidate Photo
    </label>

    <input
      type="file"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files[0];

        if (file) {
          const reader = new FileReader();

          reader.onloadend = () => {
            setCandidateImage(reader.result);
          };

          reader.readAsDataURL(file);
        }
      }}
      style={{
        width: "100%",
        padding: "10px",
        borderRadius: "10px",
        border: "1px solid #ccc"
      }}
    />

{showAddCandidatePosition && (
  <div
    style={{
      display: "flex",
      gap: "10px",
      marginTop: "10px",
      marginBottom: "10px"
    }}
  >
    <input
      type="text"
      placeholder="e.g. Director of Media"
      value={newCandidatePosition}
      onChange={(e) =>
        setNewCandidatePosition(e.target.value)
      }
      style={{
        flex: 1,
        padding: "10px",
        borderRadius: "10px",
        border: "1px solid #ccc"
      }}
    />

    <button
      type="button"
      onClick={async () => {
        const value = newCandidatePosition.trim();

        if (!value) return;

        if (candidatePositions.includes(value)) {
          alert("Position already exists");
          return;
        }

      try {

  await addDoc(
    collection(db, "candidatePositions"),
    {
      position: value
    }
  );

  await loadCandidatePositions();

  setCandidatePosition(value);

  setNewCandidatePosition("");

  setShowAddCandidatePosition(false);

  alert("Position added successfully");

} catch (error) {

  console.error(error);

  alert("Failed to add position.");

}

      }}
      style={{
        padding: "10px 15px",
        border: "none",
        borderRadius: "10px",
        background: "#16a34a",
        color: "white",
        cursor: "pointer",
        fontWeight: "bold"
      }}
    >
      Save
    </button>
  </div>
)}

{showDeleteCandidatePosition && (
  <div
    style={{
      background: "#fff7ed",
      padding: "15px",
      borderRadius: "10px",
      border: "1px solid #fed7aa",
      marginBottom: "10px"
    }}
  >
    <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
      Select a position to remove
    </p>

    {candidatePositions.length === 0 ? (
      <p>No positions available</p>
    ) : (
     candidatePositions.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 0",
            borderBottom: "1px solid #fde68a"
          }}
        >
          <span>{item.position}</span>

          <button
            type="button"
            onClick={async () => {
              const confirmDelete = window.confirm(
                `Remove ${item.position}?`
              );

              if (!confirmDelete) return;

              try {

  await deleteDoc(
    doc(db, "candidatePositions", item.id)
  );

  await loadCandidatePositions();

  if (candidatePosition === item.position) {
    setCandidatePosition("");
  }

  alert("Position removed successfully");

} catch (error) {

  console.error(error);

  alert("Failed to remove position.");

}
            }}
            style={{
              background: "#dc2626",
              color: "white",
              border: "none",
              padding: "6px 10px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Remove
          </button>
        </div>
      ))
    )}
  </div>
)}

    {candidateImage && (
      <div style={{ textAlign: "center", marginTop: "15px" }}>
        <img
          src={candidateImage}
          alt="Preview"
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "3px solid #4f46e5"
          }}
        />
      </div>
    )}

    <button
      onClick={addCandidate}
      style={{
        width: "100%",
        padding: "12px",
        marginTop: "20px",
        border: "none",
        borderRadius: "10px",
        background: "#4f46e5",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer"
      }}
    >
      Save Candidate
    </button>

<h3 style={{ marginTop: "30px" }}>
  Uploaded Candidates
</h3>

{savedCandidates.map((candidate) => (
  <div
    key={candidate.id}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px",
      marginTop: "10px",
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      background: "#ffffff"
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      {candidate.image ? (
  <img
    src={candidate.image}
    alt={candidate.name}
    style={{
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      objectFit: "cover"
    }}
  />
) : (
  <div
    style={{
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      background: "#4f46e5",
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "28px",
      fontWeight: "bold"
    }}
  >
    {candidate.name.charAt(0).toUpperCase()}
  </div>
)}

      <div>
        <strong>{candidate.name}</strong>
        <div style={{ fontSize: "13px", color: "#6b7280" }}>
          {candidate.position} • {candidate.level}
        </div>
      </div>
    </div>

    <button
      onClick={() => deleteCandidate(candidate.id)}
      style={{
        padding: "8px 12px",
        border: "none",
        borderRadius: "8px",
        background: "#dc2626",
        color: "white",
        cursor: "pointer",
        fontWeight: "bold"
      }}
    >
      Remove
    </button>
  </div>
))}

  </div>
)}

{activeTab === "election" && (
  <div
    style={{
      background: "white",
      padding: "25px",
      borderRadius: "15px",
      marginTop: "20px",
      textAlign: "center"
    }}
  >
    <h2>🗳️ Election Control</h2>

    <p
      style={{
        fontSize: "18px",
        fontWeight: "bold",
        color: electionOpen ? "#16a34a" : "#dc2626"
      }}
    >
      Current Status:{" "}
      {electionOpen ? "OPEN" : "CLOSED"}
    </p>

    <button
      onClick={async () => {
  try {
    const newStatus = !electionOpen;

    await setDoc(
      doc(db, "settings", "election"),
      {
        open: newStatus
      }
    );

    setElectionOpen(newStatus);

    alert(
      newStatus
        ? "Election opened successfully."
        : "Election closed successfully."
    );

  } catch (error) {

    console.error(error);

    alert("Failed to update election status.");

  }
}}
      style={{
        marginTop: "15px",
        padding: "12px 25px",
        border: "none",
        borderRadius: "10px",
        background: electionOpen
          ? "#dc2626"
          : "#16a34a",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer"
      }}
    >
      {electionOpen
        ? "🔒 Close Election"
        : "🟢 Open Election"}
    </button>
<button
  onClick={resetElection}
  style={{
    marginTop: "12px",
    padding: "12px 25px",
    border: "none",
    borderRadius: "10px",
    background: "#b91c1c",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  }}
>
  🔄 Reset Election
</button>
  </div>
)}


{activeTab === "pastQuestions" && (
<>
  <h2 style={{ marginTop: "20px" }}>
    Upload Past Question
  </h2>
  <input
  type="text"
  placeholder="Course Title"
  value={pastQuestionTitle}
  onChange={(e) =>
    setPastQuestionTitle(e.target.value)
  }
  style={inputStyle}
/>

<input
  type="text"
  placeholder="Course Code (e.g ECO321)"
  value={pastQuestionCourseCode}
  onChange={(e) =>
    setPastQuestionCourseCode(e.target.value)
  }
  style={inputStyle}
/>

<select
  value={pastQuestionLevel}
  onChange={(e) =>
    setPastQuestionLevel(e.target.value)
  }
  style={inputStyle}
>
  <option value="100">100 Level</option>
  <option value="200">200 Level</option>
  <option value="300">300 Level</option>
  <option value="400">400 Level</option>
</select>

<select
  value={pastQuestionSemester}
  onChange={(e) =>
    setPastQuestionSemester(e.target.value)
  }
  style={inputStyle}
>
  <option value="First">
    First Semester
  </option>

  <option value="Second">
    Second Semester
  </option>
</select>

<select
  value={pastQuestionSession}
  onChange={(e) => setPastQuestionSession(e.target.value)}
  style={inputStyle}
>
  <option value="">Select Session</option>

{pastQuestionSessions.map((item) => (
  <option
    key={item.id}
    value={item.session}
  >
    {item.session}
  </option>
))}
</select>

<div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
  <button
    type="button"
    onClick={() =>
      setShowAddPastQuestionSession(!showAddPastQuestionSession)
    }
    style={{
      padding: "10px 15px",
      border: "none",
      borderRadius: "10px",
      background: "#16a34a",
      color: "white",
      cursor: "pointer",
      fontWeight: "bold"
    }}
  >
    ➕ Add Session
  </button>

  <button
    type="button"
    onClick={() =>
      setShowDeletePastQuestionSession(!showDeletePastQuestionSession)
    }
    style={{
      padding: "10px 15px",
      border: "none",
      borderRadius: "10px",
      background: "#dc2626",
      color: "white",
      cursor: "pointer",
      fontWeight: "bold"
    }}
  >
    🗑️ Delete Session
  </button>
</div>

{showAddPastQuestionSession && (
  <div
    style={{
      display: "flex",
      gap: "10px",
      marginBottom: "15px"
    }}
  >
    <input
      type="text"
      placeholder="e.g. 2027/2028"
      value={newPastQuestionSession}
      onChange={(e) =>
        setNewPastQuestionSession(e.target.value)
      }
      style={{
        ...inputStyle,
        marginBottom: 0,
        flex: 1
      }}
    />

    <button
      type="button"
      onClick={async () => {
        const value = newPastQuestionSession.trim();

        if (!value) return;

        if (pastQuestionSessions.includes(value)) {
          alert("Session already exists");
          return;
        }

        try {

  await addDoc(
    collection(db, "pastQuestionSessions"),
    {
      session: value
    }
  );

  await loadPastQuestionSessions();

  setPastQuestionSession(value);

  setNewPastQuestionSession("");

  setShowAddPastQuestionSession(false);

  alert("Session added successfully");

} catch (error) {

  console.error(error);

  alert("Failed to add session.");

}
      }}
      style={{
        padding: "10px 15px",
        border: "none",
        borderRadius: "10px",
        background: "#16a34a",
        color: "white",
        cursor: "pointer",
        fontWeight: "bold"
      }}
    >
      Save
    </button>
  </div>
)}

{showDeletePastQuestionSession && (
  <div
    style={{
      background: darkMode ? "#1f2937" : "#f9fafb",
      padding: "15px",
      borderRadius: "10px",
      border: darkMode
        ? "1px solid #374151"
        : "1px solid #e5e7eb",
      marginBottom: "15px"
    }}
  >
    <p
      style={{
        fontWeight: "bold",
        marginBottom: "10px"
      }}
    >
      Select a session to remove
    </p>

    {pastQuestionSessions.map((item) => (
      <div
      key={item.id}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          marginBottom: "8px",
          borderRadius: "8px",
          background: darkMode ? "#111827" : "#ffffff",
          border: darkMode
            ? "1px solid #374151"
            : "1px solid #e5e7eb"
        }}
      >
        <span>{item.session}</span>

        <button
          type="button"
          onClick={async () => {
            const confirmDelete = window.confirm(
              `Remove ${item.session} from the session list?`
            );

            if (!confirmDelete) return;

            try {

  await deleteDoc(
    doc(db, "pastQuestionSessions", item.id)
  );

  await loadPastQuestionSessions();

  if (pastQuestionSession === item.session) {
    setPastQuestionSession("");
  }

  alert("Session removed successfully");

} catch (error) {

  console.error(error);

  alert("Failed to remove session.");

}
          }}
          style={{
            background: "#dc2626",
            color: "white",
            border: "none",
            padding: "6px 10px",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Remove
        </button>
      </div>
    ))}
  </div>
)}

<select
  value={pastQuestionType}
  onChange={(e) =>
    setPastQuestionType(e.target.value)
  }
  style={inputStyle}
>
  <option value="pdf">
    PDF Upload
  </option>

  <option value="link">
    Google Drive Link
  </option>
</select>

{pastQuestionType === "pdf" ? (

<input
type="file"
accept=".pdf"
onChange={(e) => {

const file = e.target.files[0];

if (file) {

const reader = new FileReader();

reader.onloadend = () => {
setPastQuestionFile(reader.result);
};

reader.readAsDataURL(file);

}

}}
style={{
display: "block",
marginBottom: "10px"
}}
/>

) : (

<input
type="text"
placeholder="Paste Google Drive Link"
value={pastQuestionLink}
onChange={(e) =>
setPastQuestionLink(e.target.value)
}
style={inputStyle}
/>

)}

<button
  onClick={addPastQuestion}
  style={{
    background: "#4f46e5",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer"
  }}
>
  {
    editingPastQuestionId
      ? "Update Past Question"
      : "Upload Past Question"
  }
</button>

<h3 style={{ marginTop: "30px" }}>
  Uploaded Past Questions
</h3>
<input
  type="text"
  placeholder="Search past questions..."
  value={searchPastQuestion}
  onChange={(e) => setSearchPastQuestion(e.target.value)}
  style={inputStyle}
/>

{savedPastQuestions.length === 0 ? (
  <p>No past questions uploaded yet</p>
) : (
  savedPastQuestions
  .filter((item) =>
    item.title.toLowerCase().includes(searchPastQuestion.toLowerCase()) ||
    item.courseCode.toLowerCase().includes(searchPastQuestion.toLowerCase())
  )
  .map((item) => (
    <div
      key={item.id}
      style={{
        background: "#f3f4f6",
        padding: "15px",
        marginTop: "10px",
        borderRadius: "10px"
      }}
    >
      <h3>{item.title}</h3>

      <p>
  {item.session || "2026/2027"} • {item.level} Level • {item.semester} Semester
</p>

      <button
        onClick={() => editPastQuestion(item)}
        style={{
          marginTop: "10px",
          marginRight: "10px",
          background: "#f59e0b",
          color: "white",
          border: "none",
          padding: "8px 12px",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Edit
      </button>

      <button
        onClick={() => deletePastQuestion(item.id)}
        style={{
          marginTop: "10px",
          background: "red",
          color: "white",
          border: "none",
          padding: "8px 12px",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Delete
      </button>
    </div>
  ))
)}
</>
)}

{activeTab === "timetable" && (
<>
  <h2 style={{ marginTop: "20px" }}>
    Upload Timetable
  </h2>

  <input
    type="text"
    placeholder="Timetable Title"
    value={timetableTitle}
    onChange={(e) =>
      setTimetableTitle(e.target.value)
    }
    style={inputStyle}
  />

  <input
    type="file"
    accept=".pdf"
    onChange={(e) => {

      const file = e.target.files[0];

      if (file) {

        const reader =
          new FileReader();

        reader.onloadend = () => {
          setTimetableFile(reader.result);
        };

        reader.readAsDataURL(file);

      }

    }}
    style={{
      display: "block",
      marginBottom: "10px"
    }}
  />

  <button
    onClick={addTimetable}
    style={{
      background: "#4f46e5",
      color: "white",
      padding: "12px 20px",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer"
    }}
  >
    {
      editingTimetableId
        ? "Update Timetable"
        : "Upload Timetable"
    }
  </button>

  <h3 style={{ marginTop: "30px" }}>
    Uploaded Timetables
  </h3>

 {savedTimetables.length === 0 ? (
  <p>No timetables uploaded yet.</p>
) : (
  savedTimetables.map((item) => (
    <div
      key={item.id}
      style={{
        background: "#f3f4f6",
        padding: "15px",
        marginTop: "10px",
        borderRadius: "10px"
      }}
    >
      <h3>{item.title}</h3>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "15px",
          flexWrap: "wrap"
        }}
      >

        <button
          onClick={() => editTimetable(item)}
          style={{
            background: "#f59e0b",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Edit
        </button>

        <button
          onClick={() => deleteTimetable(item.id)}
          style={{
            background: "red",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Delete
        </button>
      </div>
    </div>
  ))
)}

</>
)}

{activeTab === "eligible" && (
  <div
    style={{
      background: "white",
      padding: "20px",
      borderRadius: "15px",
      marginTop: "20px"
    }}
  >
    <h2>🆔 Eligible Voters</h2>

    <p>
      Paste one matric number per line.
      Only these students will be allowed to vote.
    </p>

    <textarea
      value={eligibleInput}
      onChange={(e) =>
        setEligibleInput(e.target.value)
      }
      placeholder="ECO/22/001&#10;ECO/22/002&#10;ECO/22/003"
      style={{
        width: "100%",
        minHeight: "220px",
        padding: "12px",
        borderRadius: "10px",
        border: "1px solid #d1d5db",
        marginTop: "15px",
        fontFamily: "monospace"
      }}
    />

    <button
      onClick={saveEligibleVoters}
      style={{
        marginTop: "15px",
        padding: "12px 20px",
        border: "none",
        borderRadius: "10px",
        background: "#16a34a",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer"
      }}
    >
      Save Eligible Voters
    </button>

    <div
      style={{
        marginTop: "20px",
        background: "#f3f4f6",
        padding: "15px",
        borderRadius: "10px"
      }}
    >
      <strong>Total Eligible Voters:</strong>{" "}
      {eligibleVoters.length}
    </div>
  </div>
)}

{activeTab === "feedback" && (
<>
  <h2>Student Feedback</h2>

  {savedFeedback.length === 0 ? (

    <p>No feedback yet.</p>

  ) : (

    savedFeedback.map((item) => (

      <div
        key={item.id}
        style={{
          background: "#f3f4f6",
          padding: "15px",
          marginTop: "10px",
          borderRadius: "10px"
        }}
      >

        <h3>{item.subject}</h3>

        <small>{item.date}</small>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "15px"
          }}
        >

          <button
            onClick={() =>
              setSelectedFeedback(item)
            }
            style={{
              background: "#4f46e5",
              color: "white",
              border: "none",
              padding: "8px 12px",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            👁 View
          </button>

          <button
  onClick={async () => {

    if (!window.confirm("Delete this feedback?")) return;

    try {

      await deleteDoc(
        doc(db, "feedback", item.id)
      );

      await loadFeedback();

      alert("Feedback deleted successfully");

    } catch (error) {

      console.error(error);

      alert("Failed to delete feedback");

    }

  }}

  style={{
    background: "red",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer"
  }}
>
  🗑 Delete
</button>


        </div>

      </div>

    ))

  )}

  {selectedFeedback && (

    <div
      style={{
        marginTop: "25px",
        background: "#ffffff",
        border: "2px solid #4f46e5",
        padding: "20px",
        borderRadius: "12px"
      }}
    >

      <h2>
        {selectedFeedback.subject}
      </h2>

      <p
        style={{
          whiteSpace: "pre-wrap",
          marginTop: "15px"
        }}
      >
        {selectedFeedback.message}
      </p>

      <small>
        {selectedFeedback.date}
      </small>

      <br /><br />

      <button
        onClick={() =>
          setSelectedFeedback(null)
        }
        style={{
          background: "#4f46e5",
          color: "white",
          border: "none",
          padding: "10px 15px",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Close
      </button>
    </div>
  )}

</>
)}

</div>
  );
}
const inputStyle = {
  display: "block",
  width: "100%",
  padding: "12px",
  marginBottom: "10px",
  borderRadius: "10px",
  border: "1px solid #d1d5db"
};

export default Admin;