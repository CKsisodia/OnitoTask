import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import UsersForm from "./UsersForm";
import UsersList from "./UsersList";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    userApiPost();
  }, [data]);

  const userData = (user) => {
    setData(user);
  };

  const userApiPost = async () => {
    const user = { ...data };
    await axios.post(
      "https://test-task-abc-default-rtdb.firebaseio.com/userData.json",
      {
        name: user.userName,
        age: user.userAge,
        gender: user.userSex,
        address: user.userAddress,
        mobile: user.userMobile,
        IdType: user.userIdType,
        IdDetail: user.userIdDetail,
        nationality: user.userNationality,
        gaurdianLabel: user.userGaurdianLabel,
        gaurdianDetail: user.userGaurdianDetail,
      }
    );
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<UsersForm userData={userData} />}></Route>
        <Route path="/userList" element={<UsersList />}></Route>
      </Routes>
    </>
  );
}

export default App;
