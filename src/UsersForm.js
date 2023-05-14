import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import "./UsersForm.css";
import { useNavigate } from "react-router-dom";

const userSchema = yup.object().shape({
  userName: yup.string().required("Name is Required"),
  userAge: yup.string().required("Age is Required"),
  userSex: yup.string().required("Gender is Required"),
  userMobile: yup
    .string()
    .matches(/^[6789]\d{9}$|^$/, "Enter Valid Mobile Number"),
  userEmergencyContact: yup
    .string()
    .matches(/^[6-9]\d{9}$|^$/, "Enter Valid Contact Number"),

  userIdType: yup.string().oneOf(["","Aadhar", "Pan Card"]),
  userIdDetail: yup
    .string()
    .test(
      "custom-validation",
      "Please Enter Valid ID Number ",
      function (value) {
        const userIdType = this.resolve(yup.ref("userIdType"));
        if (userIdType === "Aadhar") {
          return /^\d{12}$|^$/.test(value);
        } else if (userIdType === "Pan Card") {
          return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$|^$/.test(value);
        }
        return true;
      }
    ),

  userAddress: yup.string(),
  userGaurdianLabel: yup.string(),
  userGaurdianDetail: yup.string(),
  userNationality: yup.string(),
});

const UsersForm = (props) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const submitHandler = (data) => {
    props.userData(data);
    setTimeout(() => {
      navigate("/userList");
    }, 1000);
  };
  const navToUserList = () => {
    navigate("/userList");
  };

  return (
    <>
      <form className="userForm">
        <h3>Personal Details</h3>
        <div className="pd-row1">
          <div className="pd-name">
            <label htmlFor="name">
              Name<span className="asterisk">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              id="name"
              {...register("userName")}
            />
            <p>{errors.userName?.message}</p>
          </div>
          <div className="pd-dob">
            <label htmlFor="dob">
              Date of Birth or
              <br /> Age<span className="asterisk">*</span>
              <p>{errors.userAge?.message}</p>
            </label>
            <input
              type="text"
              placeholder="DD/MM/YYYY or Age in Years"
              id="dob"
              {...register("userAge")}
            />
          </div>
          <div className="pd-sex">
            <label htmlFor="sex">
              Sex<span className="asterisk">*</span>
            </label>
            <select id="sex" {...register("userSex")}>
              <option value="" disabled selected>
                Enter Sex
              </option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="T">Transgender</option>
              <option value="O">Others</option>
            </select>
            <p>{errors.userSex?.message}</p>
          </div>
        </div>

        <br />
        <div className="pd-row2">
          <div className="pd-mobile">
            <label htmlFor="mobile">Mobile</label>
            <input
              type="text"
              placeholder="Enter Mobile"
              id="mobile"
              {...register("userMobile")}
            />
            <p>{errors.userMobile?.message}</p>
          </div>

          <div className="pd-id">
            <label htmlFor="userIdType">Govt Issued ID</label>
            <select id="userIdType" {...register("userIdType")} defaultValue="">
              <option disabled value="">
                ID Type
              </option>
              <option value="Aadhar">Aadhar</option>
              <option value="Pan Card">Pan Card</option>
            </select>

            <input
              type="text"
              id="userIdDetail"
              placeholder="Enter Govt ID"
              {...register("userIdDetail")}
            />

            <p>{errors.userIdDetail?.message}</p>
          </div>
        </div>

        <h3>Contact Details</h3>

        <div className="contactDetails">
          <div className="cd-gaurdianDetails">
            <label htmlFor="gaurdian">Gaurdian Details</label>
            <select id="gaurdian" {...register("userGaurdianLabel")}>
              <option value="" disabled selected>
                Enter Label
              </option>
              <option value="Mr.">Mr.</option>
              <option value="Ms.">Ms.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Miss.">Miss</option>
            </select>
            <input
              type="text"
              placeholder="Enter Gaurdian Name"
              {...register("userGaurdianDetail")}
            />
          </div>
          <div className="cd-email">
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Enter Email" id="email" />
          </div>
          <div className="cd-emergencyContact">
            <label htmlFor="emergencyContact">
              Emergency Contact <br />
              Number
              <p>{errors.userEmergencyContact?.message}</p>
            </label>
            <input
              type="text"
              placeholder="Enter Emergency No"
              id="emergencyContact"
              {...register("userEmergencyContact")}
            />
          </div>
        </div>

        <h3>Address Details</h3>

        <div className="ad-row1">
          <div className="ad-address">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              placeholder="Enter Address"
              {...register("userAddress")}
            />
          </div>
          <div className="ad-state">
            <label htmlFor="state">State</label>
            <select id="state">
              <option value="" disabled selected>
                Enter State
              </option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Karnataka">Karnataka</option>
            </select>
          </div>
          <div className="ad-city">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              placeholder="Enter city/town/village"
            />
          </div>
        </div>

        <br />

        <div className="ad-row2">
          <div className="ad-country">
            <label htmlFor="country">Country</label>
            <select id="country">
              <option value="" disabled selected>
                Enter Country
              </option>
              <option value="India">India</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className="ad-pincode">
            <label htmlFor="pincode">Pincode</label>
            <input type="text" id="pincode" placeholder="Enter Pincode" />
          </div>
        </div>

        <h3>Other Details</h3>

        <div className="otherDetails">
          <label htmlFor="occupation">Occupation</label>
          <input type="text" id="occupation" placeholder="Enter Occupation" />
          <label htmlFor="religion">Religion</label>
          <select id="religion">
            <option value="" disabled selected>
              Enter Religion
            </option>
            <option value="Hinduism">Hinduism</option>
            <option value="Sikhism">Sikhism</option>
            <option value="Buddhism">Buddhism</option>
            <option value="Jainism">Jainism</option>
            <option value="Islam">Islam</option>
            <option value="Christianity">Christianity</option>
            <option value="Others">Others</option>
          </select>
          <label htmlFor="martialStatus">Martial Status</label>
          <select id="martialStatus">
            <option value="" disabled selected>
              Enter Martial Status
            </option>
            <option value="Single">Single/Unmarried</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
          <label htmlFor="bloodGroup">Blood Group</label>
          <select id="bloodGroup">
            <option value="" disabled selected>
              Group
            </option>
            <option value="A+">A+</option>
            <option value="B+">B+</option>
            <option value="O+">O+</option>
            <option value="AB+">AB+</option>
            <option value="A-">A-</option>
            <option value="B-">B-</option>
            <option value="O-">O-</option>
            <option value="AB-">AB-</option>
          </select>
        </div>
        <br />
        <div className="od-nationality">
          <label htmlFor="nationality">Nationality</label>
          <select id="nationality" {...register("userNationality")}>
            <option value="" disabled selected>
              Enter Nationality
            </option>
            <option value="Indian">Indian</option>
            <option value="NRI">NRI</option>
            <option value="PIO">PIO</option>
            <option value="OCI">OCI</option>
            <option value="Foreigner">Foreigner</option>
          </select>
        </div>
        <div className="formButtons">
          <button className="cancel" onClick={navToUserList}>
            CANCEL
          </button>
          <button className="submit" onClick={handleSubmit(submitHandler)}>
            SUBMIT
          </button>
        </div>
      </form>
    </>
  );
};

export default UsersForm;
