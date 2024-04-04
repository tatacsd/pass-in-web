import nlwUnitedIcon from "../assets/nwl-united-icon.svg";
import { NavLink } from "./nav-link";

export function Header() {
  return (
    <div className="flex items-center gap-5 py-2">
      <img src={nlwUnitedIcon} alt="" />
      <nav className="flex items-center gap-5">
        <NavLink href="/events">Events</NavLink>
        <NavLink href="/participants">Participants</NavLink>
      </nav>
    </div>
  );
}
