import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth, logOut } from "../../firebase";
import { updateProfile } from "firebase/auth";
import null_user from "../../assets/null_user.svg";
import phoneNum from "../../assets/phone.svg";
import addressIcon from "../../assets/address.svg";


const Profile = () => {
  // Handle Log out
  const navigate = useNavigate();

  // Get User Account Created and updating name to firebase
  const user = useAuth();

  const displayNameRef = useRef();
  const displayEmailRef = useRef();

  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(true);

  const [displayName, setDisplayName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [displayEmail, setDisplayEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [storedPhoneNumber, setStoredPhoneNumber] = useState("");
  const [storedAddress, setStoredAddress] = useState("");

  // Logout
  async function handleLogOut() {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      alert("LogOut Unsuccessful");
    }
  }

  // Toggles between edit form and profile card
  const handleEditUIChange = () => {
    setShowDetails((prevState) => !prevState);
    setShowForm((prevState) => !prevState);
  };

  useEffect(() => {
    const storedPhoneNumber = localStorage.getItem("phone");
    const storedAddress = localStorage.getItem("address");
    if (storedPhoneNumber && storedAddress) {
      setStoredPhoneNumber(storedPhoneNumber);
      setStoredAddress(storedAddress);
    }

    setDisplayName(user?.displayName);
    setDisplayEmail(user?.email);

  }, [user]);

  // User's Profile update/edit
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    //  Verify user credentials field is not empty before editing
    if (phone.trim() === "" || address.trim() === "" || name.trim() === "" || email.trim() === "") {
      alert("Please fill all fields");
      return;
    }

    try {
      // updates/edit user data in firebase
      updateProfile(user, {
        displayName: name,
        email: email,
      })
        .then(() => {
          setDisplayName(name);
          setDisplayEmail(email);
          console.log("User profile updated successfully");
        })
        .catch((error) => {
          console.error("Error updating user profile: ", error);
        });

      // Setting Phone Number and Address to Localstorage of device
      localStorage.setItem("phone", phone);
      localStorage.setItem("address", address);
      setStoredPhoneNumber(phone);
      setStoredAddress(address);
      handleEditUIChange();
      // Toast Notification if successful
      toast.success("Edited Successfully!", {
        pauseOnHover: false,
      });
    } catch (error) {
      // Toast Notification if unsuccessful
      toast.error("Edit Unsuccessful", {
        pauseOnHover: false,
      });
    }
  };

  return (
    <section className="my-10 px-5 flex w-full h-full justify-center items-center">
      {showDetails && (
        <div className="bg-[#fefefe] w-full mt-12 shadow-md border-2 py-8 px-4 rounded-md md:w-[500px] md:max-w-2xl">
          <div className="flex items-center gap-x-6 mb-12">
            <img
              className="w-20 h-20 rounded-full"
              src={user?.photoURL || null_user}
              alt="My Photo"
            />
            <div className="">
              <h1 className="font-bold text-lg text-[#303030]">
                {displayName}
              </h1>
              <h2 className="text-sm italic  text-[rgba(48,48,48,0.7)]">
                {displayEmail}
              </h2>
              <button
                onClick={handleEditUIChange}
                className="mt-4 bg-green-600 text-white rounded-sm py-1 px-6"
              >
                Edit Profile
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-y-2 text-[rgba(48,48,48,0.8)]">
            <div className="flex gap-x-3 items-center">
              <img className="w-5" src={phoneNum} alt=" phone number icon" />
              <p className="text-lg ">{storedPhoneNumber}</p>
            </div>
            <div className="flex gap-x-3 items-center">
              <img className="w-5" src={addressIcon} alt=" address icon" />
              <p className="text-lg ">{storedAddress}</p>
            </div>
          </div>
          <button
            onClick={handleLogOut}
            className="bg-red-500 text-white  w-full mt-32 p-2 rounded-full font-bold hover:bg-red-400"
          >
            Log Out
          </button>
        </div>
      )}

      {showForm && (
        <form
        autoComplete="true"
          onSubmit={handleProfileUpdate}
          className="w-full flex border shadow-md p-4 rounded-md flex-col gap-y-3 mt-12 md:max-w-md lg:max-w-lg"
        >
          <div className=" flex flex-col gap-y-2 mb-3 justify-center items-center">
            <img
              className="w-20 h-20 rounded-full"
              src={user?.photoURL || null_user}
              alt="user image"
            />
          </div>
          <h3 className="font-semibold text-lg mb-3">Your Information</h3>
          <div className="flex flex-col gap-y-1">
            <label htmlFor="name">Name:</label>
            <input
              className="border py-2"
              ref={displayNameRef}
              onChange={() => setName(displayNameRef.current.value)}
              defaultValue={displayName}
              id="name"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <label htmlFor="email">Email:</label>
            <input
              className="border py-2"
              ref={displayEmailRef}
              onChange={() => setEmail(displayEmailRef.current.value)}
              defaultValue={displayEmail}
              id="email"
              type="email"
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <label htmlFor="name">Phone Number:</label>
            <input
              className="border py-2"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              id="phone"
              type="tel"
              autoFocus
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <label htmlFor="address">Address:</label>
            <input
              className="border py-2"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              id="address"
              type="text"
            />
          </div>
          <button className="mt-4 bg-teal-300 text-white rounded-sm p-2">
            Edit Profile
          </button>
        </form>
      )}
      <ToastContainer />
    </section>
  );
};

export default Profile;
