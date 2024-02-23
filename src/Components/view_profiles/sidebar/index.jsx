import {
  AiFillHome,
  AiFillIdcard,
  AiFillInfoCircle,
  AiFillBook,
  AiFillLayout,
  AiFillAliwangwang,
} from "react-icons/ai";

function SideBarVewProfile() {
  return (
    <div className="leftProfilePage">
      <div className="cardProfile">
        <p>My Picture:</p>
        <div className="flex">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/99/Elon_Musk_Colorado_2022_%28cropped2%29.jpg"
            alt="avatar"
            className="avatar"
          />
          <p>Elon Musk</p>
        </div>
      </div>
      <div className="sidebar-list">
        <div className="sidebar-item">
          <AiFillHome />
          Home
        </div>
        <div className="sidebar-item">
          <AiFillLayout />
          View Teamshare Project
        </div>
        <div className="sidebar-item">
          <AiFillAliwangwang />
          Post Your Timeshare
        </div>
        <div className="sidebar-item active">
          <AiFillIdcard />
          View Profile
        </div>
        <div className="sidebar-item">
          <AiFillInfoCircle />
          How it works
        </div>
        <div className="sidebar-item">
          <AiFillBook />
          Book now
        </div>
      </div>
    </div>
  );
}

export default SideBarVewProfile;
