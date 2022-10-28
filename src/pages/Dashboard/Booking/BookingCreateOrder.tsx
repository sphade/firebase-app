import { useState ,useEffect} from "react";
import {
  BackButton,
  CTabs,
  EmptyCard,
  NotificationProfileHeader,
  SearchBar,
  TabPanel,
} from "../../../components";
import BookingCard from "../../../components/cards/BookingCard";
import Error from "../../../components/Error";
import BookingJetCardSkeleton from "../../../skeleton/BookingJetCardSkeleton";

const BookingCreateOrder = () => {
  const [value, setValue] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  useEffect(() => {
    setSearch((value: string)=>value='')
  }, [setSearch, value])

  return (
    <div>
      <header className="header !mb-5">
        <div className="space-x-3 flex items-center">
          <BackButton />

          <h1 className="header-heading">schedule flight</h1>
        </div>

        <NotificationProfileHeader />
      </header>
      <main>
        <div className="flex items-center justify-between">
          <CTabs
            tabLabel={[{ label: "Private jet" }, { label: "helicopter" }]}
            value={value}
            setValue={setValue}
            
          />
          <SearchBar size="medium" value={search} setValue={setSearch}/>
        </div>
        <TabPanel value={value} index={0}>
          <div className="flex  min-h-[500px]  flex-wrap p-2 border shadow rounded mt-5 gap-1">
           private jet
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className="flex  min-h-[500px]  flex-wrap p-2 border shadow rounded mt-5 gap-1">
            helicopter 
          
          </div>
        </TabPanel>
      </main>
    </div>
  );
};

export default BookingCreateOrder;
