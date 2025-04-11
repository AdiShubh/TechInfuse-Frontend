import { useAuth } from "../context/hooks/useAuth";
import DefaultUserImage from "../assets/defailtuser.svg";


const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100 text-base-content">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );
  }

  

  return (
    <div className="min-h-screen bg-base-100 text-base-content py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-base-200 p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-primary">
          Your Profile
        </h1>

        <div className="flex flex-col items-center space-y-4">
          <div className="avatar">
            <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={user?.profileImage || DefaultUserImage}
                alt={user.name || "User avatar"}
              />
            </div>
          </div>

          <div className="w-full">
            <div className="form-control mb-4">
              <label className="label font-semibold text-base-content">
                Name
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-base-100 text-base-content"
                value={user.name}
                disabled
              />
            </div>

            <div className="form-control mb-4">
              <label className="label font-semibold text-base-content">
                Username
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-base-100 text-base-content"
                value={user.username}
                disabled
              />
            </div>

            <div className="form-control mb-4">
              <label className="label font-semibold text-base-content">
                Email
              </label>
              <input
                type="email"
                className="input input-bordered w-full bg-base-100 text-base-content"
                value={user.email}
                disabled
              />
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Profile;
