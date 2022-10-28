import React from "react";

const Textinput = ({form,error}:any) => {
  return (
    <div>
      <input {...form} type="text" />
      {error&& 'an arror'}
    </div>
  );
};

export default Textinput;
