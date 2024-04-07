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
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    const url = new URL(window.location.toString());
    const search = url.searchParams.get("search");

    if (search) {
      return search;
    }

    return "";
  });
  const [page, setPage] = useState<number>(() => {
    const url = new URL(window.location.toString());
    const page = url.searchParams.get("page");

    if (page) {
      return parseInt(page);
    }

    return 1;
  });
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [eventId] = useState(
    "d97443ca-71ff-4e22-93b0-2c0fe0981b51"
  );
  const [totalAttendees, setTotalAttendees] = useState(0);
  const total = Math.ceil(totalAttendees / 10);

  useEffect(() => {
    const url = new URL(`http://localhost:3333/events/${eventId}/attendees`);

    url.searchParams.set("page_index", (page - 1).toString());

    if (searchQuery.length > 0) {
      url.searchParams.set("query", searchQuery);
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setAttendees(data.attendees);
        setTotalAttendees(data.total);
      });
  }, [page, searchQuery]);



  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString());

    url.searchParams.set("page", String(page));

    window.history.pushState({}, "", url);

    setPage(page);
  }

  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString());

    url.searchParams.set("search", search);

    window.history.pushState({}, "", url);

    setSearchQuery(search);
  }

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentSearch(event.target.value);
    setCurrentPage(1);
  };

  const getTotalAttendees = () => {
    return totalAttendees;
  };

  const goToPreviousPage = () => {
    if (page > 1) {
      setCurrentPage(page - 1);
    }
  };

  const goToNextPage = () => {
    if (page < total) {
      setCurrentPage(page + 1);
    }
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(total);
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
          {attendees.map((attendee) => {
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
                  {attendee.checkedInAt === null ? (
                    <span className="text-zinc-500">Not checked in</span>
                  ) : (
                    dayjs().to(attendee.checkedInAt)
                  )}
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
              Showing {attendees.length} of {getTotalAttendees()} attendees
            </TableCell>
            <TableCell className="text-right" colSpan={3}>
              <div className="inline-flex gap-8 items-center">
                <span>
                  Page {page} of {total}
                </span>

                <div className="flex gap-1.5">
                  <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToNextPage} disabled={page === total}>
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToLastPage} disabled={page === total}>
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
