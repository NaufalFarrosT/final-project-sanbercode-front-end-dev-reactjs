import { Card, Label, TextInput, Button } from "flowbite-react";
import { useState, useContext } from "react";
import axios from "axios";
import {
  useNavigate
} from "react-router-dom";
import ContentSeparator from "../components/sidebar";

const CreateData = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  console.log(token)

  const [input, setInput] = useState({
    title: "",
    job_description: "",
    job_qualification: "",
    job_type: "",
    job_tenure: "",
    job_status: "",
    company_name: "",
    company_image_url: "",
    company_city: "",
    salary_min: 0,
    salary_max: 0,
  });

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    if (name === "title") {
      setInput({ ...input, title: value });
    } else if (name === "job_description") {
      setInput({ ...input, job_description: value });
    } else if (name === "job_qualification") {
      setInput({ ...input, job_qualification: value });
    } else if (name === "job_type") {
      setInput({ ...input, job_type: value });
    } else if (name === "job_tenure") {
      setInput({ ...input, job_tenure: value });
    } else if (name === "job_status") {
      setInput({ ...input, job_status: value });
    } else if (name === "company_name") {
      setInput({ ...input, company_name: value });
    } else if (name === "company_image_url") {
      setInput({ ...input, company_image_url: value });
    } else if (name === "company_city") {
      setInput({ ...input, company_city: value });
    } else if (name === "salary_min") {
      setInput({ ...input, salary_min: value });
    } else if (name === "salary_max") {
      setInput({ ...input, salary_max: value });
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let {
      title,
      job_description,
      job_qualification,
      job_type,
      job_tenure,
      job_status,
      company_name,
      company_image_url,
      company_city,
      salary_min,
      salary_max,
    } = input;

    console.log(token)
    axios
      .post("https://dev-example.sanbercloud.com/api/job-vacancy", {
        title,
        job_description,
        job_qualification,
        job_type,
        job_tenure,
        job_status,
        company_name,
        company_image_url,
        company_city,
        salary_min,
        salary_max,
        token
      })
      .then((res) => {
        console.log(res);
        navigate('/dashboard/list-job-vacancy')
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="flex">

        <ContentSeparator />
        <Card className="w-full">
          <h2>Create Data</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex max-w-l flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="small" value="Job Title" />
                </div>
                <TextInput
                  id="title"
                  name="title"
                  sizing="sm"
                  type="text"
                  onChange={handleInput}
                  value={input.title}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="small" value="Job Description" />
                </div>
                <TextInput
                  id="job_description"
                  name="job_description"
                  sizing="sm"
                  type="text"
                  onChange={handleInput}
                  value={input.job_description}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="small" value="Job Qualification" />
                </div>
                <TextInput
                  id="job_qualification"
                  name="job_qualification"
                  sizing="sm"
                  type="text"
                  onChange={handleInput}
                  value={input.job_qualification}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="small" value="Job Type" />
                </div>
                <TextInput
                  id="job_type"
                  name="job_type"
                  sizing="sm"
                  type="text"
                  onChange={handleInput}
                  value={input.job_type}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="small" value="Job Tenure" />
                </div>
                <TextInput
                  id="job_tenure"
                  name="job_tenure"
                  sizing="sm"
                  type="text"
                  onChange={handleInput}
                  value={input.job_tenure}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="small" value="Job Status" />
                </div>
                <TextInput
                  id="job_status"
                  name="job_status"
                  sizing="sm"
                  type="text"
                  onChange={handleInput}
                  value={input.job_status}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="small" value="Company Name" />
                </div>
                <TextInput
                  id="company_name"
                  name="company_name"
                  sizing="sm"
                  type="text"
                  onChange={handleInput}
                  value={input.company_name}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="small" value="Company Image Url" />
                </div>
                <TextInput
                  id="company_image_url"
                  name="company_image_url"
                  sizing="sm"
                  type="text"
                  onChange={handleInput}
                  value={input.company_image_url}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="small" value="Company City" />
                </div>
                <TextInput
                  id="company_city"
                  name="company_city"
                  sizing="sm"
                  type="text"
                  onChange={handleInput}
                  value={input.company_city}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="small" value="Salary Min." />
                </div>
                <TextInput
                  id="salary_min"
                  name="salary_min"
                  sizing="sm"
                  type="text"
                  onChange={handleInput}
                  value={input.salary_min}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="small" value="Salary  Max." />
                </div>
                <TextInput
                  id="salary_max"
                  name="salary_max"
                  sizing="sm"
                  type="text"
                  onChange={handleInput}
                  value={input.salary_max}
                  required
                />
              </div>
              <Button type={"submit"}>Create</Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default CreateData;
