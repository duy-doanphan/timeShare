import InformationUser from "../../Components/view_profiles/information_user";
import SideBarVewProfile from "../../Components/view_profiles/sidebar";
import "./ViewProfile.css";

function ViewProfile() {
  return (
    <div className="profilePage">
      <SideBarVewProfile />
      <InformationUser />
    </div>
  );
}

export default ViewProfile;
