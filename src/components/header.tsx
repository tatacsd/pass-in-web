
import nlwUnitedIcon from '../assets/nwl-united-icon.svg';

export function Header() {
  return (
    <div className='flex items-center gap-5 py-2'>
    <img src={nlwUnitedIcon} alt="" />
    <nav className='flex items-center gap-5'>
        <a className="font-medium text-sm text-zinc-300" href="">Events</a>
        <a className="font-medium text-sm" href="">Attendees</a>
    </nav>
    </div>
  );
}