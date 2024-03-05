/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const pages = [
  { text: "Add words", href: "/addwords" },
  { text: "All words", href: "/allwords" },
  { text: "Test", href: "/test" },
  { text: "About us", href: "/aboutus" },
];

const welcomeWords = [
  "Welcome",
  "Bienvenido", // Spanish
  "Bienvenue", // French
  "Willkommen", // German
  "स्वागत", // Hindi
];

function Navbar() {
  const [user, setUser] = useState({});
  const [welcomeMessage, setWelcomeMessage] = useState("");

  function handleCallbackResponse(response) {
    fetch("http://localhost:5000/verify_creds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: response.credential }),
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("signInDiv").hidden = true;
        sessionStorage.setItem("apnaUser", JSON.stringify(data));
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function safelyParseJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && typeof parsed === "object") {
        return parsed;
      }
    } catch (e) {
      return null;
    }
    return null;
  }

  useEffect(() => {
    const apnaUserString = sessionStorage.getItem("apnaUser");
    const apnaUser = safelyParseJSON(apnaUserString);

    if (apnaUser) {
      setUser(apnaUser);
    } else {
      google.accounts.id.initialize({
        client_id:
          "190519096389-adfldfsk42g37r6ib460focvgqn6jusc.apps.googleusercontent.com",
        callback: handleCallbackResponse,
      });

      google.accounts.id.renderButton(document.getElementById("signInDiv"), {
        theme: "outline",
        size: "large",
      });

      // This condition should be reviewed
      if (Object.keys(user).length === 0) {
        google.accounts.id.prompt();
      }
    }
  }, []); // Empty dependency array to run only on mount

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      const queryParams = new URLSearchParams({
        emailId: user.email,
      }).toString();

      fetch(`http://localhost:5000/users?${queryParams}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("User not found");
          }
          return response.json();
        })
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            const randomMessage =
              welcomeWords[Math.floor(Math.random() * welcomeWords.length)];
            setWelcomeMessage(randomMessage);
            document.getElementById("greetings").style.display = "block";
            //means user exist in the db and no need to create new one
            // fetch("http://localhost:5000/updateTimeStamp", {
            //   method: "PUT",
            //   headers: {
            //     "Content-Type": "application/json",
            //   },
            //   body: JSON.stringify({
            //     lastLoginTimeStamp: new Date().getTime(),
            //   }),
            // });
          } else {
            //user does'nt exist
            fetch("http://localhost:5000/createuser", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: user.name,
                emailid: user.email,
                picture: user.picture,
              }),
            });
            const randomMessage =
              welcomeWords[Math.floor(Math.random() * welcomeWords.length)];
            setWelcomeMessage(randomMessage);
            document.getElementById("greetings").style.display = "block";
          }
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [user]);

  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="p-4" style={{ backgroundColor: "#57cc02" }}>
      <div className="container mx-auto flex items-center justify-between flex-wrap">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link className="font-semibold text-2xl tracking-tight" to={"/"}>
            LinguaLounge
          </Link>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={toggleNav}
            className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0zM10 9h10v2H10zM0 15h20v2H0z" />
            </svg>
          </button>
        </div>
        <div
          className={`${
            isNavOpen ? "block" : "hidden"
          } w-full block flex-grow lg:flex lg:items-center lg:w-auto`}
        >
          <div className="text-md lg:flex-grow">
            {pages.map((page) => (
              <Link
                to={page.href}
                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
                key={page.text}
              >
                {page.text}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div id="signInDiv"></div>
          <span id="greetings" style={{ display: "none" }}>
            {welcomeMessage + "!!!"}&nbsp;
          </span>
          <div id="userName">
            <div className="mr-2">{user.name}</div>
          </div>
          <div className="userpic">
            {Object.keys(user).length !== 0 && (
              <img
                className="w-8 h-8 rounded-full"
                src={user.picture}
                alt="user photo"
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
