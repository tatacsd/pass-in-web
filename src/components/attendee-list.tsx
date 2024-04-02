import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
} from "lucide-react";
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
      <div className="rounded-lg border border-white/10">
        <table className="w-full">
          <thead>
            <tr className="border border-white/10">
              <th
                style={{ width: "64px" }}
                className="py-3 px-4 text-sm font-semibold text-left"
              >
                <input type="checkbox"  className="bg-black/20 rounded size-4 border border-white/10 "/>
              </th>
              <th className="py-3 px-4 font-semibold text-left">Code</th>
              <th className="py-3 px-4 font-semibold text-left">Attendee</th>
              <th className="py-3 px-4 font-semibold text-left">
                Inscription Date
              </th>
              <th className="py-3 px-4 font-semibold text-left">
                Check in Date
              </th>
              <th
                style={{ width: "64px" }}
                className="py-3 px-4 font-semibold text-left"
              ></th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, index) => {
              return (
                <tr key={index} className="border border-white/10 hover:bg-white/5">
                  <td className="py-3 px-4 text-sm text-zinc-300">
                    <input type="checkbox"  className="bg-black/20 rounded size-4 border border-white/10 "/>
                  </td>
                  <td className="py-3 px-4 text-sm text-zinc-300">001</td>
                  <td className="py-3 px-4 text-sm text-zinc-300">
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-white">John Doe</span>
                      <span>john.doe@mail.com</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-zinc-300">
                    7 days ago
                  </td>
                  <td className="py-3 px-4 text-sm text-zinc-300">
                    7 days ago
                  </td>
                  <td className="py-3 px-4 text-sm text-zinc-300">
                    <button className="bg-black/20 border border-white/10 rounded-md p-1.5">
                      <MoreHorizontal className="size-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td className="py-3 px-4 text-sm text-zinc-300" colSpan={3}>
                Showing 10 of 100 attendees
              </td>
              <td
                className="py-3 px-4 text-sm text-zinc-300 text-right"
                colSpan={3}
              >
                <div className="inline-flex gap-8 items-center">
                  <strong>Page 1 of 10</strong>

                  <div className="flex gap-1.5">
                    <button className="bg-white/10 border border-white/10 rounded-md p-1.5">
                      <ChevronsLeft className="size-4" />
                    </button>
                    <button className="bg-white/10 border border-white/10 rounded-md p-1.5">
                      <ChevronLeft className="size-4" />
                    </button>
                    <button className="bg-white/10 border border-white/10 rounded-md p-1.5">
                      <ChevronRight className="size-4" />
                    </button>
                    <button className="bg-white/10 border border-white/10 rounded-md p-1.5">
                      <ChevronsRight className="size-4" />
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
