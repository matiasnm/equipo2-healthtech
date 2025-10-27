import { useAuthStore } from "../store/useAuthStore";
import { Layout, Navbar } from "../components/ui";
import PractitionerDashboard from "./PractitionerDashboard";

const Dashboard = () => {
  const { role } = useAuthStore();
  return (
    <Layout>
      <Navbar />
      {role === "PRACTITIONER" && <PractitionerDashboard />}
      {/* <div>Dashboard</div> */}
    </Layout>
  );
};

export default Dashboard;
