import React, { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import "./App.css";
import Country from "./Country";
import CountryDetails from "./components/CountryDetails/CountryDetails";
import { Fragment } from "react";
import ScrollButton from "./components/ScrollButton/ScrollButton";

const url = "https://restcountries.com/v3.1/all";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const noCountries = countries.status || countries.message;

  const showDetails = (code) => {
    navigate(`/${code}`);
  };

  let response = [];
  const fetchData = async () => {
    setLoading(true);
    response = await fetch(url)
      .then((res) => {
        return res.json();
      })
      .then(setLoading(false));
    setCountries(response);
  };

  const handleSearch = (e) => {
    let name = e.target.value;
    name = name.replace(/[^A-Za-z]/g, "");
    if (name) {
      const fetchSearch = async () => {
        const fetchData = await fetch(
          `https://restcountries.com/v3.1/name/${name}`
        );
        const response = await fetchData.json();

        if (response.status !== 404) {
          setCountries(response);
        }
      };

      try {
        fetchSearch();
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1>Дэлхийн улс орнууд</h1>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            loading ? (
              <div className="loading">Ачааллаж байна . . .</div>
            ) : (
              <>
                <div className="countries">
                  <section className="search-filter">
                    <section>
                      <AiOutlineSearch />
                      <input
                        onChange={handleSearch}
                        type="text"
                        placeholder="Улс хайх..."
                      />
                    </section>
                  </section>
                  <section className="countries-info">
                    {!noCountries ? (
                      countries?.map((country, index) => {
                        return (
                          <Country
                            key={index}
                            code={country.name.common}
                            name={country.name.common}
                            capital={country.capital ? country.capital : "Мэдэгдэхгүй"}
                            population={country.population.toLocaleString()} // Тоог илүү ойлгомжтой болгох
                            flag={country.flags.png}
                            region={country.region}
                            showDetails={showDetails}
                            capitalLabel="Нийслэл" // Нийслэл гэсэн үг
                            populationLabel="Хүн ам" // Хүн ам гэсэн үг
                          />
                        );
                      })
                    ) : (
                      <p>Улс олдсонгүй</p>
                    )}
                  </section>
                </div>
              </>
            )
          }
        ></Route>
        <Route
          path="/:countryName"
          element={<CountryDetails />}
        ></Route>
      </Routes>
      <Fragment>
        <ScrollButton />
      </Fragment>
    </div>
  );
};

export default App;
