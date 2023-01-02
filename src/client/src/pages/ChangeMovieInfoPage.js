import React from "react";

import { Button, Input, Text, NavBar, Footer, Card } from "../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ChangeMovieInfoPage() {
  const navigate = useNavigate();
  const [textInput, setTextInput] = React.useState("");
  const [movies, setMovies] = React.useState([]);
  const [isChosen, setIsChosen] = React.useState(null);
  const [tagsChange, setTagsChange] = React.useState([null, null, null]);
  const [allEpisode, setAllEpisode] = React.useState([]);
  const [episodeChosen, setEpisodeChosen] = React.useState(null);
  const [createEp, setCreateEp] = React.useState(false);
  const [collectionName, setCollectionName] = React.useState("");
  const [upload, setUpload] = React.useState(false);
  const [file, setFile] = React.useState({});

  const categoryType = [
    { value: "null", text: "null" },
    { value: "action", text: "Action" },
    { value: "anime", text: "Anime" },
    { value: "comedy", text: "Comedy" },
    { value: "dramas", text: "Dramas" },
    { value: "romance", text: "Romance" },
  ];

  const getAllEpisode = async () => {
    axios
      .post(`${process.env.REACT_APP_ENDPOINT}videos/getAllEp`)
      .then((res) => {
        console.log(res.data.data);
        setAllEpisode(res.data.data);
      });
  };
  const createCollection = async (e) => {
    e.preventDefault();

    if (collectionName.length === 0) return;
    axios
      .post(`${process.env.REACT_APP_ENDPOINT}videos/createEp`, {
        name: collectionName,
      })
      .then((res) => {
        console.log(res.data.data);
        if (res.data.message === "success") {
          toast.success("Created successfully", {
            autoClose: 2000,
            position: "bottom-left",
          });
          getAllEpisode();
          setCreateEp(false);
        } else {
          toast.error("Please try again", {
            autoClose: 2000,
            position: "bottom-left",
          });
        }
      });
  };
  const saveSubmit = async (e) => {
    let typeString = "";
    tagsChange.forEach((each) => {
      if (each !== "null") {
        if (typeString.length > 0) {
          typeString += ",";
        }
        typeString += each;
      }
    });

    var d2 = new Date(
      new Date().getUTCFullYear(),
      new Date().getUTCMonth(),
      new Date().getUTCDate(),
      new Date().getUTCHours(),
      new Date().getUTCMinutes(),
      new Date().getUTCSeconds()
    );
    axios
      .post(`${process.env.REACT_APP_ENDPOINT}videos/changeVideo`, {
        vid: isChosen.vid,
        link: isChosen.link,
        ratting: isChosen.ratting,
        name: isChosen.name,
        image: isChosen.image,
        haveEp: episodeChosen,
        review: isChosen.review,
        type: typeString,
        uid: localStorage.getItem("uid"),
        time: d2.toUTCString(),
      })
      .then((res) => {
        if (res.data.message === "success") {
          toast.success("Uploaded successfully", {
            autoClose: 2000,
            position: "bottom-left",
          });
          setIsChosen(res.data.data);
        } else {
          toast.error("Try again", {
            autoClose: 2000,
            position: "bottom-left",
          });
        }
      });
    //vid,link,name,image,ratting,haveEp,review,type
  };
  const submit = async (e) => {
    if (textInput.length > 0) {
      axios
        .post(`${process.env.REACT_APP_ENDPOINT}videos/search`, {
          name: textInput,
        })
        .then((res) => {
          console.log(res.data.data);
          setMovies(res.data.data);
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_ENDPOINT}videos/getall`)
        .then((res) => {
          console.log(res.data.data);
          setMovies(res.data.data);
        });
    }
    setTextInput("");
  };
  React.useEffect(() => {
    if (localStorage.getItem("per") !== "true") {
      window.location.href = "/";
    } else {
      try {
        let value = decodeURI(window.location.search).split("?")[1].split("=");
        axios
          .post(`${process.env.REACT_APP_ENDPOINT}videos/search`, {
            name: value[1].replace("+", " "),
          })
          .then((res) => {
            console.log(res.data.data);
            setMovies(res.data.data);
          });
      } catch (err) {
        axios
          .post(`${process.env.REACT_APP_ENDPOINT}videos/getall`)
          .then((res) => {
            console.log(res.data.data);
            setMovies(res.data.data);
          });
      }
      getAllEpisode();
    }
  }, []);

  React.useEffect(() => {
    const temp = process.env.REACT_APP_ENDPOINT.concat("image/temp.jpg");
    setFile({
      imageSrc: temp,
      imageHash: Date.now(),
    });
  }, [upload]);

  const imageUpload = async () => {
    setUpload(false);
    var formData = new FormData();
    var imagefile = document.querySelector("#file");
    formData.append("imageUpload", imagefile.files[0]);

    axios
      .post(process.env.REACT_APP_ENDPOINT.concat("imageUpload"), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.messages !== "fail") {
          console.log(res);
          setUpload(true);
          setIsChosen({ ...isChosen, image: "/image/temp.jpg" });
          toast.success("Uploaded successfully", {
            autoClose: 2000,
          });
          // setInterval(() => {
          //   window.location.reload();
          // }, 1000);
        } else {
          toast.error("Please try again", {
            autoClose: 2000,
          });
        }
      });
  };
  return (
    <div className="App bg-[#082032]">
      <NavBar />
      <Text
        text="CHANGE MOVIE INFO"
        isHeader={true}
        customTheme="text-pink-600 text-[30px] font-button ml-[50px] mt-[50px]"
      />

      {isChosen ? (
        <div className="mx-20 max-sm:mx-0">
          <Card
            imgSrc={isChosen.image}
            vid={isChosen.vid}
            className="max-w-xs mt-8"
          />
          <div className="flex">
            <div className="pt-8 p-4 mb-2">
              <Text
                text="Movie ID:"
                customTheme="text-white font-button text-[25px] whitespace-nowrap"
              />
            </div>
            <Input
              inputTheme="p-4 h-10 max-w-xl w-full bg-black bg-opacity-25 border-2 rounded-xl text-white"
              id="video_link"
              containerTheme="w-full justify-center"
              value={isChosen.vid}
              required
              readonly={true}
            />
          </div>
          <div className="flex">
            <div className="pt-8 p-4 mb-2">
              <Text
                text="Movie Name:"
                customTheme="text-white font-button text-[25px] whitespace-nowrap"
              />
            </div>
            <Input
              inputTheme="p-4 h-10 max-w-xl w-full bg-black bg-opacity-25 border-2 rounded-xl text-white"
              id="movie_name"
              containerTheme="w-full justify-center"
              value={isChosen.name}
              required
              onChange={(e) => {
                setIsChosen({ ...isChosen, name: e.target.value });
              }}
            />
          </div>
          <div className="flex">
            <div className="pt-8 p-4 mb-2">
              <Text
                text="Movie Review:"
                customTheme="text-white font-button text-[25px] whitespace-nowrap"
              />
            </div>
            <Input
              inputTheme="p-4 h-10 max-w-xl w-full bg-black bg-opacity-25 border-2 rounded-xl text-white"
              id="movie_content"
              containerTheme="w-full justify-center"
              value={isChosen.review}
              required
              onChange={(e) =>
                setIsChosen({ ...isChosen, review: e.target.value })
              }
            />
          </div>
          <div className="flex">
            <div className="pt-8 p-4 mb-2">
              <Text
                text="Rating:"
                customTheme="text-white font-button text-[25px] whitespace-nowrap"
              />
            </div>
            <Input
              inputTheme="p-4 h-10 max-w-xl w-full bg-black bg-opacity-25 border-2 rounded-xl text-white"
              id="data_release"
              type="number"
              min="0"
              max="5"
              containerTheme="w-full justify-center"
              value={isChosen.ratting}
              required
              onChange={(e) =>
                setIsChosen({ ...isChosen, ratting: e.target.value })
              }
            />
          </div>
          <div className="flex items-center">
            <div className="flex space-x-7 pt-8 p-4 mb-3">
              <Text
                text="Banner URL:"
                customTheme="text-white font-button text-[25px] whitespace-nowrap"
              />
              <Input
                inputTheme="h-fit p-1 max-w-xl w-full bg-black bg-opacity-25 border-2 rounded-xl text-white"
                id="file"
                containerTheme="w-full justify-center"
                required
                onChange={(e) =>
                  setIsChosen({
                    ...isChosen,
                    image: e.target.value,
                  })
                }
                type="file"
                name="imageUpload"
                accept="image/png, image/jpeg"
              />
            </div>

            <Button
              theme="bg-pink-600 rounded-[5px] w-28 h-10 text-white"
              onClick={() => {
                setUpload(false);
                imageUpload();
              }}
            >
              UPLOAD
            </Button>
          </div>
          <img
            className="h-full w-auto max-h-72"
            key={Date.now()}
            id="uploadedImg"
            alt="img-preview"
            src={`${file.imageSrc}?${file.imageHash}`}
          />
          <div className="flex">
            <div className="pt-8 p-4 mb-2">
              <Text
                text="Video URL:"
                customTheme="text-white font-button text-[25px] whitespace-nowrap"
              />
            </div>
            <Input
              inputTheme="p-4 h-10 max-w-xl w-full bg-black bg-opacity-25 border-2 rounded-xl text-white"
              id="director"
              containerTheme="w-full justify-center"
              value={isChosen.link}
              required
              onChange={(e) =>
                setIsChosen({ ...isChosen, link: e.target.value })
              }
            />
          </div>
          <div className="flex">
            <div className="pt-8 p-4 mb-2">
              <Text
                text="TAGS"
                customTheme="text-white font-button text-[25px] whitespace-nowrap"
              />
            </div>
            <div className="flex flex-row flex-wrap space-y-3 w-8 pt-8 p-4 mb-2">
              <select
                id="tags"
                className="bg-[#082032] rounded-[5px] text-white border-2 border-white border-solid"
                value={tagsChange[0]}
                required
                onChange={(e) => {
                  setTagsChange([e.target.value, tagsChange[1], tagsChange[2]]);
                }}
              >
                {categoryType.map((option) => {
                  return (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  );
                })}
              </select>
              <select
                id="tags_1"
                className=" mr-10 bg-[#082032] rounded-[5px] text-white border-2 border-white border-solid"
                value={tagsChange[1]}
                onChange={(e) => {
                  setTagsChange([tagsChange[0], e.target.value, tagsChange[2]]);
                }}
              >
                {categoryType.map((option) => {
                  return (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  );
                })}
              </select>
              <select
                id="tags_2"
                className=" mr-10 bg-[#082032] rounded-[5px] text-white border-2 border-white border-solid"
                value={tagsChange[2]}
                onChange={(e) => {
                  setTagsChange([tagsChange[0], tagsChange[1], e.target.value]);
                }}
              >
                {categoryType.map((option) => {
                  return (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="flex">
            <div className="pt-8 p-4 mb-2">
              <Text
                text="Collection: "
                customTheme="text-white font-button text-[25px] whitespace-nowrap"
              />
            </div>
            <div className="flex w-8 pt-8 p-4 mb-2">
              <select
                id="tags"
                className="mr-10 bg-[#082032] rounded-[5px] text-white border-2 border-white border-solid"
                value={episodeChosen}
                onChange={(e) => {
                  setEpisodeChosen(e.target.value);
                  if (e.target.value === "addNew") {
                    setCreateEp(true);
                  } else {
                    setCreateEp(false);
                  }
                }}
              >
                <option value="null">null</option>
                {allEpisode.map((each) => {
                  return (
                    <option key={each.id} value={each.eid}>
                      {each.collectionName}
                    </option>
                  );
                })}
                <option value="addNew">+ New Episode</option>
              </select>
            </div>
          </div>
          {createEp && (
            <div className="flex flex-wrap">
              <div className="p-4 mb-2">
                <Text
                  text="Create Collection "
                  customTheme="text-white font-button text-[25px] whitespace-nowrap"
                />
              </div>
              <div className="flex flex-row p-4 mb-2 justify-center">
                <Text
                  text="Collection Name:"
                  customTheme="text-white font-button text-[25px] whitespace-nowrap pr-3"
                />

                <Input
                  inputTheme="p-4 h-10 max-w-xl w-full bg-black bg-opacity-25 border-2 rounded-xl text-white"
                  id="Episode_name"
                  containerTheme="w-full justify-center"
                  value={collectionName}
                  onChange={(e) => setCollectionName(e.target.value)}
                />
                <Button
                  theme="ml-3 bg-pink-600 rounded-[5px] min-w-fit w-full max-w-[7rem]"
                  onClick={(e) => createCollection(e)}
                >
                  <Text
                    text="CREATE"
                    customTheme="text-white font-button text-[25px]"
                  />
                </Button>
              </div>
            </div>
          )}
          <div className="flex py-20 justify-evenly">
            <Button
              theme="bg-pink-600 rounded-[5px] w-28 h-10 text-white font-button text-[25px]"
              onClick={saveSubmit}
            >
              SAVE
            </Button>
            <Button
              theme="bg-pink-600 rounded-[5px] w-28 h-10 text-white font-button text-[25px]"
              onClick={(e) => setIsChosen(null)}
            >
              BACK
            </Button>
          </div>
        </div>
      ) : (
        <div>
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
          <div className="grid items-center justify-items-center grid-cols-3 my-5 space-y-5">
            {movies &&
              movies.length > 0 &&
              movies.map((each, i) => {
                return (
                  <Card
                    key={i}
                    imgSrc={each.image}
                    vid={each.vid}
                    className="max-w-xs mt-8"
                    onClick={async (e) => {
                      setIsChosen(each);
                      setEpisodeChosen(each.haveEp);
                      if (each.type.split(",").length > 0) {
                        tagsChange[0] = each.type.split(",")[0];
                      }
                      if (each.type.split(",").length > 1) {
                        tagsChange[1] = each.type.split(",")[1];
                      }
                      if (each.type.split(",").length > 2) {
                        tagsChange[2] = each.type.split(",")[2];
                      }
                      console.log(tagsChange);
                    }}
                  />
                );
              })}
          </div>
        </div>
      )}

      <Footer />
      <ToastContainer />
    </div>
  );
}

export default {
  routeProps: {
    path: "/changemovie",
    main: ChangeMovieInfoPage,
  },
};
