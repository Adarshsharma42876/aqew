import "./styles.css";

import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [planets, setPlanets] = useState([]);
  const [nextPage, setNextPage] = useState(null);

  useEffect(() => {
    fetchPlanets("https://swapi.dev/api/planets/?format=json");
  }, []);

  const fetchPlanets = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPlanets(data.results);
      setNextPage(data.next);
    } catch (error) {
      console.error("Error fetching planets:", error);
    }
  };

  const fetchNextPage = () => {
    if (nextPage) {
      fetchPlanets(nextPage);
    }
  };

  return (
    <div className="App">
      <h1>Star Wars Planets</h1>
      <div className="planets-container">
        {planets.map((planet, index) => (
          <div key={index} className="planet-card">
            <h2>{planet.name}</h2>
            <p>
              <strong>Climate:</strong> {planet.climate}
            </p>
            <p>
              <strong>Population:</strong> {planet.population}
            </p>
            <p>
              <strong>Terrain:</strong> {planet.terrain}
            </p>
            {planet.residents.length > 0 && (
              <div>
                <h3>Residents:</h3>
                <ul>
                  {planet.residents.map((resident, i) => (
                    <li key={i}>
                      <span>{resident.name}</span>
                      <span>Height: {resident.height}</span>
                      <span>Mass: {resident.mass}</span>
                      <span>Gender: {resident.gender}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      {nextPage && (
        <button onClick={fetchNextPage} className="load-more-btn">
          Load More
        </button>
      )}
    </div>
  );
}

export default App;
