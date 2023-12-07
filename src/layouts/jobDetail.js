import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Card } from 'flowbite-react';

const DetailJob = () => {
    const location = useLocation();
    const idData = location.state.id;
    const [data, setData] = useState(null)
    const [fetchStatus, setFetchStatus] = useState(true);

    useEffect(() => {
        if (fetchStatus === true) {
            axios
                .get(`https://dev-example.sanbercloud.com/api/job-vacancy/${idData}`)
                .then((res) => {
                    console.log(res);
                    setData(res.data);

                    console.log(data)
                })
                .catch((error) => {
                    console.log(error);
                });
            setFetchStatus(false);
        }
    }, [data, setData]);

    const rupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
    };

    const showData = (job) => {
        return (
            <div className="w-1/2 mx-auto mt-5">
                <h1 className="font-semibold text-3xl text-center">{job.title}</h1>
                <table class="table w-full mt-5">
                    <tr className="">
                        <th className="text-left">Company Logo</th>
                        <td>
                            {
                                <img
                                    src={job.company_image_url}
                                    className="w-48 h-48 mx-auto"
                                />
                            }
                        </td>

                    </tr>
                    <tr>
                        <th className="text-left">Job Tenure</th>
                        <td> {job.job_tenure}</td>
                    </tr>

                    <tr>
                        <th className="text-left">Company Name</th>
                        <td>{job.company_name}</td>
                    </tr>

                    <tr>
                        <th className="text-left">Job Qualification</th>
                        <td>{job.job_qualification}</td>
                    </tr>

                    <tr>
                        <th className="text-left">Job Description</th>
                        <td>{job.job_description}</td>
                    </tr>

                    <tr>
                        <th className="text-left">Company Location</th>
                        <td>{job.company_city}</td>
                    </tr>

                    <tr>
                        <th className="text-left">Job Tenure</th>
                        <td>{job.job_tenure}</td>
                    </tr>

                    <tr>
                        <th className="text-left">Salary</th>
                        <td>{rupiah(job.salary_min)} - {rupiah(job.salary_max)}</td>
                    </tr>
                </table>
            </div>
        );
    };

    return (
        <>
            <div className="container w-full  mx-auto">
                {data != null && showData(data)}
            </div>
        </>
    )
}

export default DetailJob