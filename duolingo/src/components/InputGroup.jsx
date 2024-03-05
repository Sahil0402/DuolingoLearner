import { useState } from "react";
import Alert from "./Alert";
import Dropdown from "./Dropdown";
const InputGroup = () => {
  const [engWord, setEnglishWord] = useState("");
  const [newWord, setNewWord] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [language, setLanguage] = useState("");

  function handleEngWordChange(e) {
    setEnglishWord(e.target.value);
  }

  function handleNewWordChange(e) {
    setNewWord(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (engWord !== "" && newWord !== "") {
      const user = JSON.parse(sessionStorage.getItem("apnaUser"));
      try {
        const response = await fetch("http://localhost:5000/addword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: user.email,
            english: engWord,
            word: newWord,
            language: language,
          }),
        });

        if (response.ok) {
          setAlertMessage("Word added successfully!");
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 3000); // Hide the alert after 3 seconds
          setEnglishWord("");
          setNewWord("");
        } else {
          setAlertMessage("Failed to add word. Please try again.");
          setShowAlert(true);
        }
      } catch (error) {
        setAlertMessage("An error occurred. Please try again.");
        setShowAlert(true);
      }
    } else {
      setAlertMessage("Failed to add word. Please give inputs.");
      setShowAlert(true);
      return;
    }
  };

  return (
    <div className="min-h-screen relative">
      {showAlert && (
        <Alert
          message={alertMessage}
          type={
            alertMessage === "Word added successfully!" ? "Success" : "Error"
          }
          onClose={() => setShowAlert(false)}
        />
      )}
      <div className="flex justify-center items-center h-screen">
        <form
          action="/"
          onSubmit={handleSubmit}
          method="POST"
          className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full"
        >
          <h4 className="text-xl font-semibold mb-4">Add a word</h4>
          <div className="mb-2">
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="english"
              name="english"
              placeholder="English word"
              value={engWord}
              onChange={handleEngWordChange}
            />
          </div>
          <Dropdown setLanguage={setLanguage} />
          <div className="mb-6">
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="word"
              name="word"
              placeholder={
                language ? `Word in ${language}` : "Choose a language"
              }
              value={newWord}
              onChange={handleNewWordChange}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add word
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputGroup;
