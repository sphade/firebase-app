import Button from "./Button";
import { useState } from "react";
import Chip from "./Chip";
import DateAndTimePicker from "./DateAndTimePicker";
// import SelectInput from "./SelectInput";
import SwitchCustomized from "./SwitchCustomized";
import { useForm } from "react-hook-form";
import SelectInput from "./SelectInput";

const MaintenanceForm = () => {
  const [bar, setBar] = useState<boolean>(true);
  const [starting, setStarting] = useState<any>(new Date());
  const [ending, setEnding] = useState<any>(new Date());
  const { control } = useForm();
  return (
    <div className="px-[65px] py-10 border border-[#BDBDBD] w-[520px] rounded-md ">
      <h1 className="font-bold    capitalize text-tertiary text-2xl mb-6">
        maintenance form
      </h1>
      <form className="divide-y space-y-6 divide-[#BDBDBD]">
        <div className="space-y-6">
          <SelectInput
            label="choose aircraft"
            control={control}
            options={[
              {
                value: "charter",
                name: "Charter",
              },
              { value: "jet pooling", name: "jet pooling" },
              { value: "any", name: "Any" },
            ]}
            rules={{
              required: "this field is required",
            }}
            name="id"
            size="medium"
          />
        </div>
        <div className="space-y-6">
          <h2 className="capitalize text-tertiary text-lg font-semibold    pt-6">
            Set Maintenance Date and Time
          </h2>
          <div className="space-y-2">
            <Chip variant="success"> starting</Chip>
            <DateAndTimePicker date={starting} setDate={setStarting} />
          </div>

          <div className="space-y-2">
            <Chip variant="warning"> ending</Chip>
            <DateAndTimePicker date={ending} setDate={setEnding} />
          </div>
        </div>
        <div>
          <h2 className="capitalize text-tertiary text-lg font-semibold    py-6">
            Set Aircraft Availability Status
          </h2>
          <div className="flex items-center justify-between">
            <p className="text-gray-700">status</p>

            <div>
              <SwitchCustomized checked={bar} setChecked={setBar} />
              {bar ? (
                <p className="capitalize -ml-5">available</p>
              ) : (
                <p className="capitalize -ml-5 text-gray-500">Unavailable</p>
              )}
            </div>
          </div>
        </div>
        <div className="py-6">
          <Button full={true} variant="primary">
            set
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MaintenanceForm;
