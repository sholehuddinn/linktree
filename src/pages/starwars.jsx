import { useEffect, useState } from "react";

const GetApiData = () => {
  const [dataStarwars, setDataStarwars] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [detail, setDetail] = useState();

  const getStarWars = async () => {
    setIsLoading(true);
    const data = await fetch("https://swapi.dev/api/people");
    const result = await data.json();
    setDataStarwars(result);
    setIsLoading(false);
  };

  const getStarWarsNextPrev = async (url) => {
    setIsLoading(true);
    const data = await fetch(url);
    const result = await data.json();
    setDataStarwars(result);
    setIsLoading(false);
  };

  const getDetailPeople = async (url) => {
    const data = await fetch(url);
    const result = await data.json(); // Object
    setDetail(result);
  };

  useEffect(() => {
    getStarWars();
  }, []);

  return (
    <div>
      <div className="join">
        <button
          className="join-item btn btn-outline"
          onClick={() => getStarWarsNextPrev(dataStarwars.previous)}
          disabled={
            dataStarwars === undefined || dataStarwars.previous === null
          }
        >
          Previous page
        </button>
        <button
          className="join-item btn btn-outline"
          onClick={() => getStarWarsNextPrev(dataStarwars.next)}
          disabled={dataStarwars === undefined}
        >
          Next
        </button>
      </div>

      {detail !== undefined && (
        <div>
          <p>Nama: {detail.name}</p>
          <p>Tinggi: {detail.height}</p>
          <p>Berat: {detail.mass}</p>
          <p>Warna Rambut: {detail.hair_color}</p>
          <p>Warna Kulit: {detail.skin_color}</p>
          <p>Warna Mata: {detail.eye_color}</p>
        </div>
      )}

      {isLoading ? (
        <>
          <span className="loading loading-dots loading-xs"></span>
          <span className="loading loading-dots loading-sm"></span>
          <span className="loading loading-dots loading-md"></span>
          <span className="loading loading-dots loading-lg"></span>
        </>
      ) : (
        <div className="overflow-x-auto max-w-96">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Gender</th>
                <th>Berat</th>
                <th>Tinggi</th>
              </tr>
            </thead>
            <tbody>
              {dataStarwars !== undefined &&
                dataStarwars.results.map((row, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <button
                          className="text-left"
                          onClick={() => getDetailPeople(row.url)}
                        >
                          {row.name}
                        </button>
                      </td>
                      <td>{row.gender}</td>
                      <td>{row.mass}</td>
                      <td>{row.height}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GetApiData;