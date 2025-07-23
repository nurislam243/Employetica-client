
import { useNavigate } from 'react-router';
import { FaUserCircle } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const UserAvatarDropdown = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out of your account.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        await logOut();
        await Swal.fire(
          'Logged out!',
          'You have been successfully logged out.',
          'success'
        );
        navigate('/');
      } catch (error) {
        console.error('Logout error:', error);
        await Swal.fire(
          'Error!',
          'Something went wrong while logging out.',
          'error'
        );
      }
    } else {
      console.log('Logout cancelled by user.');
    }
  };

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} >
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="User Avatar"
            className="w-10 h-10 rounded-full border-1 border-primary cursor-pointer"
            referrerPolicy="no-referrer"
          />
        ) : (
          <FaUserCircle className="text-[40px] rounded-full border-1 border-primary cursor-pointer" />
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
