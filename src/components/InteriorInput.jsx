import classNames from "classnames";

const InteriorInput = ({ placeholder, register, name, rule, errors,defaultValue }) => {
  return (
    <>
    
    <div className="flex w-full  gap-5 h-[50px] mb-5">
      <div className="bg-gray-200  px-6 flex items-center  h-full rounded-lg">Meter</div>
        <div>
        
      <div
        className={classNames(
          "text-[#828282] font-[500]  border rounded focus-within:text-blue-500 focus-within:hover:border-blue-500 focus-within:ring-1  focus-within:border-blue-500 focus:border-blue-500  py-1 h-[50px] w-full items-center hover:border-tertiary default-transition relative flex   border-[#cac8c8]",
          {
            " border border-red-600 hover:!border-red-600 focus-within:ring-1 ring-red-600 focus-within:border-red-600  focus:border-red-600 !text-red-600":
              errors,
          }
        )}
      >
        <div className="px-3  border-r border-[#828282] ">
          <h1 className="text-lg">{placeholder}</h1>
        </div>
        <input
          {...register(name, rule)}
          type="number"
          min={1}
          defaultValue={defaultValue}
          className=" text-tertiary flex-1 px-3 text-lg outline-none bg-transparent w-full"
        />
       
        </div>
        <p className="text-red-600 pl-4 font-semibold pt-1    text-xs">
        {errors && errors.message}
          </p>
        </div>
          
      </div>
     
    </>
      
  );
};

export default InteriorInput;
