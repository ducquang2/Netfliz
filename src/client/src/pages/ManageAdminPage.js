import React from "react";
import { Button, Input, Text, NavBar, Footer } from "../components";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ManageAdminPage() {
  const [textInput, setTextInput] = React.useState("");
  const [users, setUsers] = React.useState([]);

  // TODO: change to accounts search
  const submit = async (e) => {
    if (textInput.length > 0) {
      axios
        .post(`${process.env.REACT_APP_ENDPOINT}videos/search`, {
          name: textInput,
        })
        .then((res) => {
          console.log(res.data.data);
          setUsers(res.data.data);
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_ENDPOINT}videos/getall`)
        .then((res) => {
          console.log(res.data.data);
          setUsers(res.data.data);
        });
    }
    setTextInput("");
  };

  return (
    <div className="App h-screen bg-[#082032]">
      <NavBar />
      <Text
        text="CHANGE MOVIE INFO"
        isHeader={true}
        customTheme="text-pink-600 text-[30px] font-button ml-[50px] mt-[50px]"
      />

      <form
        onSubmit={submit}
        // method="post"
        // action="/videos/search"
        className="flex mr-10 max-w-screen-md w-full ml-auto"
      >
        <Input
          inputTheme="p-4 h-10 max-2w-xl w-auto bg-black bg-opacity-25"
          placeholder="Input movie name or category"
          containerTheme="pt-2 mb-2 w-full bg-opacity-25"
          textColor="white"
          name="name"
          onChange={(e) => setTextInput(e.target.value)}
        />
        <Button
          className="nav-toggle"
          type="submit"
          onClick={submit}
          theme="w-14 rounded-full ml-0"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} inverse size="2x" />
        </Button>
      </form>

      <table className="table w-3/4 mx-64 my-10">
        <thead>
          <th>ID</th>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>DOB</th>
          <th></th>
        </thead>
        <tbody>
          {/* Use map here ? */}
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tbody>
      </table>

      <Footer />
      <ToastContainer />
    </div>
  );
}
export default {
  routeProps: {
    path: "/addadmin",
    main: ManageAdminPage,
  },
};