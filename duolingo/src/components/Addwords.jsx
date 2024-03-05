import InputGroup from "./InputGroup";
import Blob from "./Blob";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

const Addwords = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem("apnaUser");
    if (!user) {
      navigate("/"); // Redirect to home page
    }
  }, [navigate]);
  
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Blob />
        <InputGroup />
      </div>
    </div>
  );
};

export default Addwords;
