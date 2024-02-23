function InformationUser() {
  return (
    <div className="rightProfilePage">
      <h1>MY PROFILE</h1>
      <div className="flexProfile">
        <div className="profileLeft">
          <div className="radioGroup">
            <div className="radio">
              <label>
                <input type="radio" />
                Mr.
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" />
                Ms.
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" />
                Mrs.
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" />
                Miss.
              </label>
            </div>
          </div>
          <div className="inputProfile">
            <label>Full name</label>
            <input />
          </div>
          <div className="inputProfile">
            <label>Phone</label>
            <input />
          </div>
          <div className="inputProfile">
            <label>Date of birth</label>
            <input />
          </div>
          <div className="inputProfile">
            <label>Address</label>
            <input />
          </div>
          <button className="profileActionButton">SAVE CHANGES</button>
        </div>
        {/* /////////////////// */}
        <div className="profileRight">
          <div className="cardProfile">
            <p>My Password:</p>
            <p>**********</p>
            <button className="profileActionButton sizeSM">CHANGE</button>
          </div>
          <div className="cardProfile">
            <p>My Email:</p>
            <p>abcd@fpt.edu.vn</p>
            <button className="profileActionButton sizeSM">CHANGE</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InformationUser;
