import React, {  useState } from "react";
import MyComponent from "./MyComponent";

const EnquireNow11 = () => {
  const [isOpen, setIsOpen] = useState(true);
  const openDialog = () => {
    console.log(isOpen, "clicked 1st");
    setIsOpen((prev) => {
      
      console.log(prev);
      return !prev;
    });
    console.log(isOpen, "clicked 2nd");
  };

  return (
    <>
      
      {isOpen && <MyComponent />}
    </>
  );
};
export default EnquireNow11;
