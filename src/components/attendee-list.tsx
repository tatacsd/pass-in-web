import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table-row";
import { ChangeEvent, useEffect, useState } from "react";
// import { attendees } from "../data/attendees";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/en-ca";

dayjs.extend(relativeTime);
dayjs.locale("en-ca");

interface Attendee {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  checkedInAt: string | null;
}

export function AttendeeList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [eventId, setEventId] = useState(
    "a1b2c3d4-e5f6-g7h8-i6j0-k1l2t9n4o3p6"
  );

  useEffect(() => {
    fetch(
      `http://localhost:3333/events/f36cbf54-1432-4120-8952-8f8c601bed2a/attendees`
    )
      .then((response) => response.json())
      .then((data) => {
        setAttendees(data.attendees);
      });
  }, [currentPage]);

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const getTotalAttendees = () => {
    return attendees.length;
  };

  const getNumberOfPages = () => {
    return Math.ceil(attendees.length / 10);
  };

  const getSliceRangeForCurrentPage = () => {
    return {
      start: (currentPage - 1) * 10,
      end: currentPage * 10,
    };
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < getNumberOfPages()) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(getNumberOfPages());
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Attendee List</h1>
        <div className="w-72 px-3 py-1.5 border border-white/10 rounded-lg text-sm flex items-center gap-3">
          <Search className="size-4 text-emerald-300" />
          <input
            className="bg-transparent flex-1 outline-none border-0 p-0 text-sm"
            placeholder="Search for attendee"
            onChange={handleSearchInputChange}
          />
        </div>
      </div>

      {/* Attendees Table */}
      <Table>
        <thead>
          <tr className="border border-white/10">
            <TableHeader style={{ width: "64px" }}>
              <input
                type="checkbox"
                className="bg-black/20 rounded size-4 border border-white/10 "
              />
            </TableHeader>
            <TableHeader> Code</TableHeader>
            <TableHeader> Attendee</TableHeader>
            <TableHeader> Inscription Date </TableHeader>
            <TableHeader> Check in Date</TableHeader>
            <TableHeader style={{ width: "64px" }} />
          </tr>
        </thead>
        <tbody>
          {attendees
            .slice(
              getSliceRangeForCurrentPage().start,
              getSliceRangeForCurrentPage().end
            )
            .map((attendee) => {
              return (
                <TableRow key={attendee.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      className="bg-black/20 rounded size-4 border border-white/10 "
                    />
                  </TableCell>
                  <TableCell>{attendee.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-white">
                        {attendee.name}
                      </span>
                      <span>{attendee.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
                  <TableCell>
                    {attendee.checkedInAt === null
                      ? <span className="text-zinc-500">Not checked in</span>
                      : dayjs().to(attendee.checkedInAt)}
                  </TableCell>
                  <TableCell>
                    <IconButton transparent>
                      <MoreHorizontal className="size-4" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
        </tbody>
        <tfoot>
          <tr>
            <TableCell colSpan={3}>
              Showing 10 of {getTotalAttendees()} attendees
            </TableCell>
            <TableCell className="text-right" colSpan={3}>
              <div className="inline-flex gap-8 items-center">
                <span>
                  Page {currentPage} of {getNumberOfPages()}
                </span>

                <div className="flex gap-1.5">
                  <IconButton
                    onClick={goToFirstPage}
                    disabled={currentPage === 1}
                  >
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToNextPage}
                    disabled={currentPage === getNumberOfPages()}
                  >
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToLastPage}
                    disabled={currentPage === getNumberOfPages()}
                  >
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}
