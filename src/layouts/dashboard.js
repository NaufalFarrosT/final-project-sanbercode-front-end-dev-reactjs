import JobTable from "../components/jobTable";
import ContentSeparator from "../components/sidebar";
import { Sidebar_Component } from "../components/sidebar";

const Dashboard = () =>{
  return (
    <div className="flex w-ull">
      <Sidebar_Component/>
      <JobTable/>
    </div>
  )
}

export default Dashboard