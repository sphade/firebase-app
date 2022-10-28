import {
  ActivitiesCard,
  Loading,
  NotificationProfileHeader,
  TotalCard,
} from "../../../components";
import {
  NoOfTripsIcon,
  PolygonOrangeIcon,
  TotalAirIcon,
  TotalAmountIcon,
} from "../../../assets/images/icons";
import { Link } from "react-router-dom";
// import useFormatNumber from "../../../hooks/useFormatNumber";
import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { transactionColumn } from "../../../table/Columns";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";
import { formatNumberToCurrency } from "../../../hooks/useFormatNumberToCurrency";
import CustomPagination from "../../../components/CustomPagination";
import { useAuth } from "../../../hooks";
const Overview = () => {
  // const formatedNum = useFormatNumber(1000000000);
  const user = useAuth();

  const row = [
    {
      name: "lawal",
      calories: "lawal",
      fat: "987788",
      crab: 9890999,
      protien: "very well rich",
    },  {
      name: "lawal",
      calories: "lawal",
      fat: "987788",
      crab: 9890999,
      protien: "very well rich",
    },  {
      name: "lawal",
      calories: "lawal",
      fat: "987788",
      crab: 9890999,
      protien: "very well rich",
    },  {
      name: "lawal",
      calories: "lawal",
      fat: "987788",
      crab: 9890999,
      protien: "very well rich",
    },  {
      name: "lawal",
      calories: "lawal",
      fat: "987788",
      crab: 9890999,
      protien: "very well rich",
    },  {
      name: "lawal",
      calories: "lawal",
      fat: "987788",
      crab: 9890999,
      protien: "very well rich",
    },  {
      name: "lawal",
      calories: "lawal",
      fat: "987788",
      crab: 9890999,
      protien: "very well rich",
    },  {
      name: "lawal",
      calories: "lawal",
      fat: "987788",
      crab: 9890999,
      protien: "very well rich",
    },  {
      name: "lawal",
      calories: "lawal",
      fat: "987788",
      crab: 9890999,
      protien: "very well rich",
    },  {
      name: "lawal",
      calories: "lawal",
      fat: "987788",
      crab: 9890999,
      protien: "very well rich",
    },
  ];
  return (
    <div>
      <header className="flex items-center justify-between">
        <div className="flex items-center justify-between max-w-3xl  w-full">
          <div className="space-y-2">
            <h1 className="text-base text-tertiary    font-semibold">
              DashBoard Overview
            </h1>
            <p className="text-gray-600 font-medium text-sm">
              {format(new Date(), "dd/MMM/yyyy")}
            </p>
          </div>
        </div>
        <NotificationProfileHeader />
      </header>
      <main>
        <div className=" grid gap-5 grid-cols-4 grid-flow-col mt-10 ">
          <TotalCard
            color="#E5FFF0"
            text="total No of aircraft"
            num={
              // overviewLoading ? (
              //   <Skeleton
              //     animation="wave"
              //     variant="circular"
              //     width={40}
              //     height={40}
              //   />
              // ) : (
              //   overviewData?.totalAircraft
              // )
              "lawal"
            }
            Logo={TotalAirIcon}
          />
          <TotalCard
            color="#FFF9E5"
            text="Total No of trips"
            num={"lawal"}
            Logo={NoOfTripsIcon}
          />
          {/* format the response */}
          <TotalCard
            color="#F3E6FF"
            text="Total amount"
            num={"lawal"}
            Logo={TotalAmountIcon}
          />
          <ActivitiesCard
            loading={false}
            revenue={"revenue"}
            booking={"totalBooking"}
          />
        </div>
        <div className="border rounded-lg mt-10">
          <div className="flex items-center justify-between py-5 px-5">
            <h3 className="font-semibold    text-lg text-tertiary  capitalize">
              aircraft Transactions
            </h3>

            <Link
              to="table-of-aircraft"
              className="rounded-lg py-2 cursor-pointer bg-[#FFF6F4] font-medium text-base text-primary border-2 border-[#FFDED6] flex gap-2 px-3 items-center"
            >
              <span>View more</span>
              <PolygonOrangeIcon />
            </Link>
          </div>
          {/* <DataGrid
          rows={ []}
          getCellClassName={() =>
            "text-tertiary font-medium capitalize  !font-hind  "
          }
          rowHeight={70}
          columns={transactionColumn}
          autoHeight={true}
          // pageSize={4}
          rowsPerPageOptions={[10]}
          checkboxSelection
          disableSelectionOnClick
     
          keepNonExistentRowsSelected
          // loading={transactionTable.isLoading}
          components={{
            LoadingOverlay: Loading,
            Pagination: CustomPagination,

          }}
          /> */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 360 }}>
            <TableHead >
              <TableRow>
                  <TableCell align='left' >lawal adebola</TableCell>
                  <TableCell>lawal adebola</TableCell>
                  <TableCell>lawal adebola</TableCell>
                  <TableCell>lawal adebola</TableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {row.map((r) => (
                  <TableRow key={r.name}>
                    <TableCell align='left'>{r.name}</TableCell>
                    <TableCell>{r.calories}</TableCell>
                    <TableCell>{r.crab}</TableCell>
                    <TableCell>{r.fat}</TableCell>
                  
                   
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </main>
    </div>
  );
};

export default Overview;
