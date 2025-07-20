
import { useNavigate } from 'react-router';
import { FaUserCircle } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';

const UserAvatarDropdown = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0}>
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="User Avatar"
            className="w-10 h-10 rounded-full cursor-pointer"
            referrerPolicy="no-referrer"
          />
        ) : (
          <FaUserCircle className="text-4xl cursor-pointer" />
        )}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 mt-3 shadow bg-base-100 rounded-box w-40"
      >
        <li>
          <span className="font-medium">{user?.displayName || 'User'}</span>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="text-red-600 font-semibold"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserAvatarDropdown;
