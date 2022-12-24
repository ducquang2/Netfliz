import React from "react";
import {
  Button,
  Input,
  Text,
  NavBar,
  Footer
} from "../components";

function AddMoviePage() {   
    return (
      <div className="App bg-[#082032]">
        <NavBar/>
        <div className="mx-12">
          <Text
          text={"add movie"}
          isHeader={true}
          customTheme={"text-pink-600 font-button text-4xl pt-10"}
          />
          <div className="flex py-16">
            <Button
                theme={
                  "bg-[#CD0574] mr-5 w-32 rounded-md text-2xl font-button text-gray-200"
                }
              >
            UPLOAD
            </Button>
            <Input
              inputTheme={"p-4 h-10 max-2w-xl w-auto bg-black bg-opacity-25 border-2 rounded-xl"}
              placeHolder={"VIDEO LINK"}
              containerTheme={"pt-0 mb-2 w-full mr-0 bg-opacity-25"}
              textColor={"white"}
            ></Input>
          </div>
          <div className="flex py-6">
            <Text
            text={"movie name"}
            isHeader={false}
            customTheme={"text-white font-button text-4xl w-56"}
            />
            <Input
              inputTheme={"p-4 h-10 max-2w-xl w-auto bg-black bg-opacity-25 border-2 rounded-xl"}
              containerTheme={"pt-0 mb-2 w-full mr-0 bg-opacity-25"}
              textColor={"white"}
            ></Input>
          </div>
          <div className="flex py-6">
            <Text
            text={"movie content"}
            isHeader={false}
            customTheme={"text-white font-button text-4xl w-56"}
            />
            <Input
              inputTheme={"p-4 h-10 max-2w-xl w-auto bg-black bg-opacity-25 border-2 rounded-xl"}
              containerTheme={"pt-0 mb-2 w-full mr-0 bg-opacity-25"}
              textColor={"white"}
            ></Input>
          </div>
          <div className="flex py-6">
            <Text
            text={"date release"}
            isHeader={false}
            customTheme={"text-white font-button text-4xl w-56"}
            />
            <Input
              inputTheme={"p-4 h-10 max-2w-xl w-auto bg-black bg-opacity-25 border-2 rounded-xl"}
              containerTheme={"pt-0 mb-2 w-full mr-0 bg-opacity-25"}
              textColor={"white"}
            ></Input>
          </div>
          <div className="flex py-6">
            <Text
            text={"date release"}
            isHeader={false}
            customTheme={"text-white font-button text-4xl w-56"}
            />
            <Input
              inputTheme={"p-4 h-10 max-2w-xl w-auto bg-black bg-opacity-25 border-2 rounded-xl"}
              containerTheme={"pt-0 mb-2 w-full mr-0 bg-opacity-25"}
              textColor={"white"}
            ></Input>
          </div>
          <div className="flex py-6">
            <Text
            text={"cast"}
            isHeader={false}
            customTheme={"text-white font-button text-4xl w-56"}
            />
            <Input
              inputTheme={"p-4 h-10 max-2w-xl w-auto bg-black bg-opacity-25 border-2 rounded-xl"}
              containerTheme={"pt-0 mb-2 w-full mr-0 bg-opacity-25"}
              textColor={"white"}
            ></Input>
          </div>
          <div className="flex py-6">
            <Text
            text={"director"}
            isHeader={false}
            customTheme={"text-white font-button text-4xl w-56"}
            />
            <Input
              inputTheme={"p-4 h-10 max-2w-xl w-auto bg-black bg-opacity-25 border-2 rounded-xl"}
              containerTheme={"pt-0 mb-2 w-full mr-0 bg-opacity-25"}
              textColor={"white"}
            ></Input>
          </div>
          <div className="flex py-6">
            <Text
            text={"banner img"}
            isHeader={false}
            customTheme={"text-white font-button text-4xl w-56"}
            />
            <Input
              inputTheme={"p-4 h-10 max-2w-xl w-auto bg-black bg-opacity-25 border-2 rounded-xl"}
              containerTheme={"pt-0 mb-2 w-full mr-0 bg-opacity-25"}
              textColor={"white"}
            ></Input>
            <Button
              theme={
                "bg-[#CD0574] ml-5 w-32 rounded-md text-2xl font-button text-gray-200"
              }
            >
            UPLOAD
            </Button>
          </div>
          <div className="flex py-6">
            <Text
            text={"trailer vid"}
            isHeader={false}
            customTheme={"text-white font-button text-4xl w-56"}
            />
            <Input
              inputTheme={"p-4 h-10 max-2w-xl w-auto bg-black bg-opacity-25 border-2 rounded-xl"}
              containerTheme={"pt-0 mb-2 w-full mr-0 bg-opacity-25"}
              textColor={"white"}
            ></Input>
            <Button
              theme={
                "bg-[#CD0574] ml-5 w-32 rounded-md text-2xl font-button text-gray-200"
              }
            >
            UPLOAD
            </Button>
          </div>
          <div className="flex py-6">
            <Text
            text={"tags"}
            isHeader={false}
            customTheme={"text-white font-button text-4xl w-56"}
            />
            <div className="relative lg:max-w-sm px-8">
                <select className=" p-2.5 text-2xl text-black bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                    <option>Action</option>
                    <option>Romance</option>
                    <option>Dramas</option>
                    <option>Anime</option>
                </select>
            </div>
            <div className="relative lg:max-w-sm px-8">
                <select className=" p-2.5 text-2xl text-black bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                    <option>Action</option>
                    <option>Romance</option>
                    <option>Dramas</option>
                    <option>Anime</option>
                </select>
            </div>
            <div className="relative lg:max-w-sm px-8">
                <select className=" p-2.5 text-2xl text-black bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                    <option>Action</option>
                    <option>Romance</option>
                    <option>Dramas</option>
                    <option>Anime</option>
                </select>
            </div>
        </div>

      </div>

      <div className="flex py-6 h-28">
        <Button
          theme={"bg-[#CD0574] w-32 rounded-md text-2xl font-button text-gray-200 ml-12"}
        >
        SAVE
        </Button>
        <Button
          theme={"bg-[#CD0574] w-32 rounded-md text-2xl font-button text-gray-200 mr-12 ml-auto"}
        >
        BACK
        </Button>
        </div>
        
        <Footer/>
    </div>
    )

}
export default {
  routeProps: {
    path: "/addMovie",
    main: AddMoviePage,
  },
};