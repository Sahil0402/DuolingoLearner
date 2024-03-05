import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Allwords = () => {
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem("apnaUser");
    if (!user) {
      navigate("/"); // Redirect to home page
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const user = JSON.parse(sessionStorage.getItem("apnaUser"));
    const queryParams = new URLSearchParams({
      emailId: user.email,
    }).toString();

    fetch(`http://localhost:5000/allwords?${queryParams}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const rowsPerPage = 25;

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/allwords/delete/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          const newData = data.filter((item) => item._id !== id);
          setData(newData);
        } else {
          console.error("Failed to delete the item");
        }
      })
      .catch((error) => console.error("Error deleting item:", error));
  };

  return (
    <>
      <div className="styled-table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Word</th>
              <th>Meaning</th>
              <th>Language</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map((row, index) => (
                <tr key={index}>
                  <td>{row.english}</td>
                  <td>{row.word}</td>
                  <td>{row.language}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(row._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button
          onClick={() => handleChangePage(page - 1)}
          disabled={page === 0}
          className="page-button"
        >
          Previous
        </button>
        <button
          onClick={() => handleChangePage(page + 1)}
          disabled={(page + 1) * rowsPerPage >= data.length}
          className="page-button"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Allwords;
