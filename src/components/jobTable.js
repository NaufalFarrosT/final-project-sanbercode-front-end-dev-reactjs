import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Table, Button } from "flowbite-react";
import {  useNavigate } from "react-router-dom";

const JobTable = () => {
  const [originalData, setOriginalData] = useState(null);
  const [fetchStatus, setFetchStatus] = useState(true);
  
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  
  let number = 0;
  let [data, setData] = useState(null);

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

  useEffect(() => {
    if (fetchStatus === true) {
      axios
        .get("https://dev-example.sanbercloud.com/api/job-vacancy")
        .then((res) => {
          setData([...res.data.data]);
          setOriginalData([...res.data.data])
        })
        .catch((error) => { });
      setFetchStatus(false);
    }
  }, [fetchStatus, setFetchStatus]);

  const handleEdit = (idData) => {
    navigate("/dashboard/list-job-vacancy/edit", { state: { id: idData } });
  };

  const handleDelete = (idData) => {
    console.log(idData)
    console.log(token)

    axios.delete(`https://dev-example.sanbercloud.com/api/job-vacancy/${idData}`, { data: { token: token } })
      .then((res) => {
        setFetchStatus(true);
        console.log(res)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  return (
    <>
      <div className="h-screen w-screen m-5">
        <div className="container w-screen my-5">
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
        <div className="w-full h-5/6 overflow-auto">
          <Table className="">
            <Table.Head>
              <Table.HeadCell className="bg-slate-500 text-white">
                NO
              </Table.HeadCell>
              <Table.HeadCell className="bg-slate-500 text-white">
                company name & title
              </Table.HeadCell>
              <Table.HeadCell className="bg-slate-500 text-white">
                Job Description
              </Table.HeadCell>
              <Table.HeadCell className="bg-slate-500 text-white">
                Job Qualification
              </Table.HeadCell>
              <Table.HeadCell className="bg-slate-500 text-white">
                Job Type & Tenure
              </Table.HeadCell>
              <Table.HeadCell className="bg-slate-500 text-white">
                Job Status
              </Table.HeadCell>
              <Table.HeadCell className="bg-slate-500 text-white">
                Company City
              </Table.HeadCell>
              <Table.HeadCell className="bg-slate-500 text-white">
                Salary
              </Table.HeadCell>
              <Table.HeadCell className="bg-slate-500 text-white">
                Action
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {data !== null &&
                data.map((res) => {
                  number++;
                  return (
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {number}
                      </Table.Cell>
                      <Table.Cell><b>{res.company_name}</b> - {res.title}</Table.Cell>
                      <Table.Cell>{res.job_description}</Table.Cell>
                      <Table.Cell>{res.job_qualification}</Table.Cell>
                      <Table.Cell>{res.job_type} {res.job_tenure}</Table.Cell>
                      <Table.Cell>{res.job_status}</Table.Cell>
                      <Table.Cell>{res.company_city}</Table.Cell>
                      <Table.Cell>{rupiah(res.salary_min)} - {rupiah(res.salary_max)}</Table.Cell>
                      <Table.Cell>
                        <div className="flex flex-row">
                          <div>
                            <Button
                              color="warning"
                              value={res.id}
                              onClick={(e) => handleEdit(res.id)}
                            >
                              Edit
                            </Button>
                          </div>
                          <div>
                            <Button
                              color="failure"
                              value={res.id}
                              onClick={(e) => handleDelete(res.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
};

export default JobTable;
