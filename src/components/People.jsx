import React from "react";

const People = (props) => {
  const { data, status } = props;

  return (
    <div>
      <h2>Peoples</h2>
      {status === "loading" ? (
        "Loading Peoples"
      ) : status === "error" ? (
        "Error loading data"
      ) : (
        <ul>
          {data.results.map((people) => {
            return <li>{people.name}</li>;
          })}
        </ul>
      )}
    </div>
  );
};

export default People;
