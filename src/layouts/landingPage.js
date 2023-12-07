import axios from "axios";
import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ListJob = () => {
  const [originalData, setOriginalData] = useState(null);
  let [data, setData] = useState(null);
  const [fetchStatus, setFetchStatus] = useState(true);
  const navigate = useNavigate();

  const [input, setInput] = useState({
    title: "",
    location: "",
    salary_min: ""
  });

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    if (name === "title") {
      setInput({ ...input, title: value });
    } else if (name === "location") {
      setInput({ ...input, location: value });
    } else if (name === "salary_min") {
      setInput({ ...input, salary_min: value });
    }
  };

  const HandleSearch = (event) => {
    event.preventDefault();

    let { title, location, salary_min } = input;

    if (title !== "" || location !== "" || salary_min !== "") {
      data = originalData

      if (location !== "") {
        data = data.filter((job) =>
          job.company_city.toUpperCase().includes(location.toUpperCase())
        );
      }

      if (title !== "") {
        data = data.filter((job) =>
          job.title.toUpperCase().includes(title.toUpperCase())
        );
      }

      if (salary_min !== "") {
        data = data.filter((job) => job.salary_min >= parseInt(salary_min))
      }

      setData([...data]);
    } else {
      setFetchStatus(true);
    }
  };

  const handleDetail = (idData) => {
    navigate("/job-detail", { state: { id: idData } });
  };

  const showData = (job) => {
    return (
      <button onClick={(e) => handleDetail(job.id)}>
        <div className="mt-10 w-96 flex max-w-xl bg-white shadow-lg rounded-lg overflow-hidden">
          {
            <img
              src={job.company_image_url}
              className="w-1/3 w-40 h-48 bg-cover bg-center bg-landscape"
            />
          }
          <div className="w-2/3 p-4">
            <h1 className="text-gray-900 font-bold text-xl">
              {job.title} ( {job.job_tenure})
            </h1>
            <small>{job.company_name}</small>
            <p className="text-clip overflow-hidden h-5 mt-2 text-gray-600 text-sm">
              {job.company_city}, {job.job_type}
            </p>
            <small>{rupiah(job.salary_min)}</small>
          </div>
        </div>
      </button>
    );
  };

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  useEffect(() => {
    if (fetchStatus === true) {
      axios
        .get("https://dev-example.sanbercloud.com/api/job-vacancy")
        .then((res) => {
          console.log(res.data.data);
          setData([...res.data.data]);
          setOriginalData([...res.data.data])
        })
        .catch((error) => { });
      setFetchStatus(false);
    }
  }, [fetchStatus, setFetchStatus, data, setData]);

  return (
    <>
      <section className="bg-gray-200 p-5 h-full">
        <div className="container mx-auto w-full">
          <form onSubmit={HandleSearch}>
            <div className="flex flex-col justify-evenly h-64 w-3/4 mx-auto border-2 border-slate-500 p-3 md:flex-row md:h-fit">
              <input
                id="title"
                name="title"
                sizing="sm"
                type="text"
                onChange={handleInput}
                value={input.title}
                placeholder="Job Title"
              />

              <input
                id="location"
                name="location"
                sizing="sm"
                type="text"
                onChange={handleInput}
                value={input.location}
                placeholder="Lokasi"
                className="h-30"
              />

              <input
                id="salary_min"
                name="salary_min"
                sizing="sm"
                type="number"
                onChange={handleInput}
                value={input.salary_min}
                placeholder="Salary Min."
                className="h-30"
              />
              <Button className="h-30" type={"submit"}>
                Search
              </Button>
            </div>
          </form>
        </div>
        <div className="container w-3/4  mx-auto flex-wrap flex justify-around">
          {data != null &&
            data.map((res) => {
              return showData(res);
            })}
        </div>
      </section>
    </>
  );
};

export default ListJob;
