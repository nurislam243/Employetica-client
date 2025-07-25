import useAuth from '../../../hooks/useAuth';
import { CiDark, CiLight } from 'react-icons/ci';
import { Tooltip } from 'react-tooltip';

const ThemeToggle = () => {
  const { theme, setTheme } = useAuth();

  const handleToggle = () => {
    setTheme(!theme);
  };

  return (
    <div>
      <div
        onClick={handleToggle}
        className="relative w-14 h-7 bg-primary/80 rounded-full flex items-center px-1 cursor-pointer transition-colors duration-300 hover:ring hover:ring-secondary"
        data-tooltip-id="theme-tooltip"
        data-tooltip-content={theme ? 'Enable Dark Mode' : 'Enable Light Mode'}
        data-tooltip-place="top"
      >
        <div
          className={`absolute w-6 h-6 bg-neutral rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
            theme ? 'translate-x-7' : 'translate-x-0'
          }`}
        >
          {theme ? <CiDark size={20} /> : <CiLight size={20} />}
        </div>
      </div>
      <Tooltip id="theme-tooltip" />
    </div>
  );
};

export default ThemeToggle;
