import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet"; // Leaflet icon оруулж ирэх

// Улаан өнгөтэй тэмдэг (marker) үүсгэх
const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41], // Маркерийн хэмжээ
  iconAnchor: [12, 41], // Маркерийн доод хэсэг байршлын цэг болно
  popupAnchor: [1, -34], // Popup байршил
  shadowSize: [41, 41], // Сүүдрийн хэмжээ
});

const CountryDetails = ({ dark }) => {
  const navigate = useNavigate();
  const params = useParams();
  const countryName = params.countryName;
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState({
    name: "",
    official: "",
    flagImg: "",
    population: 0,
    region: "",
    subregion: "",
    capital: "",
    latlng: [0, 0],
    currencies: {},
    languages: [],
    borders: [],
  });

  const url = "https://restcountries.com/v3.1/name/";
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchData = await fetch(`${url}${countryName}`);
      const res = await fetchData.json();
      setCountry({
        ...country,
        name: res[0].name.common,
        official: res[0].name.official,
        flagImg: res[0].flags.png,
        population: res[0].population,
        region: res[0].region,
        subregion: res[0].subregion,
        capital: res[0].capital,
        latlng: res[0].latlng,
        currencies: res[0].currencies,
        languages: res[0].languages,
        borders: res[0].borders,
      });
      setLoading(false);
    };
    fetchData();
  }, [countryName]);

  let languages = Object.values(country.languages);
  let borders = country.borders || [];
  let currencies = Object.values(country.currencies);

  return loading ? (
    <div className={dark ? "loading dark" : "loading"}>Ачааллаж байна . . .</div>
  ) : (
    <div className={dark ? "country-details dark" : "country-details"}>
      <button
        className={dark ? "back-btn dark" : "back-btn"}
        onClick={() => navigate(-1)}
      >
        <BsArrowLeft />
        Буцах
      </button>
      <div className="country-details-body">
        <div className="img-container">
          <img src={country.flagImg} alt="Улсын далбаа" />
        </div>
        <div className="country-details-content">
          <div className="country-details-name">
            <h1>{country.name}</h1>
          </div>
          <div className="country-details-info">
            <section>
              <p>
                Албан ёсны нэршил: <span>{country.official}</span>
              </p>
              <p>
                Хүн ам: <span>{country.population}</span>
              </p>
              <p>
                Бүс нутаг: <span>{country.region}</span>
              </p>
              <p>
                Дэд бүс нутаг: <span>{country.subregion}</span>
              </p>
              <p>
                Хот: <span>{country.capital}</span>
              </p>
            </section>
            <section>
              <p>
                Мөнгөн тэмдэгт:{" "}
                <span>
                  {currencies?.map(
                    (currency, index) =>
                      currency.name +
                      `${index === currencies.length - 1 ? "" : " , "} `
                  )}
                </span>
              </p>
              <p>
                Хэл:{" "}
                <span>
                  {languages?.map(
                    (language, index) =>
                      language +
                      `${index === languages.length - 1 ? "" : " , "} `
                  )}
                </span>
              </p>
            </section>
          </div>
          <div>
            <p>
              Хил залгаа улсууд:
              {borders !== undefined &&
                borders.map((border, index) => (
                  <span key={index}>{border}{index !== borders.length - 1 ? ", " : ""}</span>
                ))}
            </p>
          </div>
        </div>
      </div>
      <div className="country-map">
        <MapContainer
          center={country.latlng}
          zoom={4}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={country.latlng} icon={redIcon}>
            <Popup>{country.name} байршил энд байна.</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default CountryDetails;
