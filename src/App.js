import { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";
const url = "https://course-api.com/react-tours-project";
function App() {
  const [laoding, setLooading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const fetchTours = async () => {
    setLooading(true);
    const response = await fetch(url);
    const tours = await response.json();
    setTours(tours);
    setLooading(false);
  };
  useEffect(() => {
    fetchTours();
  }, []);

  if (laoding) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if (tours.length === 0) {
    return (
      <div className="title">
        <h2>no tours left refresh to show again</h2>
        <button onClick={() => fetchTours()} className="btn">
          refresh
        </button>
      </div>
    );
  } else
    return (
      <main>
        <Tours tours={tours} removeTour={removeTour} />
      </main>
    );
}

export default App;
