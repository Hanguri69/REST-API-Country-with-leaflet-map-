import React from "react";

const Country = ({
  dark,
  name,
  capital,
  population,
  flag,
  region,
  showDetails,
  code,
}) => {
  const showDetailsHandler = () => {
    showDetails(code);
  };

  return (
    <div
      className={dark ? "country dark" : "country"}
      onClick={showDetailsHandler}
    >
      <picture>
        <img src={flag} alt="Country Flag" />
      </picture>
      <section>
        <h2>{name}</h2>
        <p>
          <span className="country-info-highlight">Хүн ам: </span>
          {population}
        </p>
        <p>
          <span className="country-info-highlight"> Хотын төв: </span>
          {capital}
        </p>
        <p>
          <span className="country-info-highlight">Тив: </span>
          {region}
        </p>
      </section>
    </div>
  );
};

export default Country;
