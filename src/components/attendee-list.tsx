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
export function AttendeeList() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Attendee List</h1>
        <div className="w-72 px-3 py-1.5 border border-white/10 rounded-lg text-sm flex items-center gap-3">
          <Search className="size-4 text-emerald-300" />
          <input
            className="bg-transparent flex-1 outline-none"
            placeholder="Search for attendee"
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
          {Array.from({ length: 10 }).map((_, index) => {
            return (
              <TableRow
                key={index}              >
                <TableCell>
                  <input
                    type="checkbox"
                    className="bg-black/20 rounded size-4 border border-white/10 "
                  />
                </TableCell>
                <TableCell>001</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-white">John Doe</span>
                    <span>john.doe@mail.com</span>
                  </div>
                </TableCell>
                <TableCell>7 days ago</TableCell>
                <TableCell>7 days ago</TableCell>
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
              Showing 10 of 100 attendees
            </TableCell>
            <TableCell
              className="text-right"
              colSpan={3}
            >
              <div className="inline-flex gap-8 items-center">
                <span>Page 1 of 10</span>

                <div className="flex gap-1.5">
                  <IconButton>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton>
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton>
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
