import { Link, useParams } from "react-router-dom";
import Container from "../components/Container";
import { useEffect, useState } from "react";
import { fetchProfile } from "../api/profile";
 import { toggleSubscription } from "../api/subscription";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import AllVideos from "../components/AllVideos";
import Wait from "../components/Wait";


function UserProfile() {
  const { userId } = useParams();

  const loggedInUserId = useSelector((state) => state.auth.user?._id);

  const [profile, setProfile] = useState();
  const [error, setError] = useState("");
  const subsriber = "subscriber";
  const subscribed = "subscribed";

  const handleSubscription = async () => {
    console.log("subscibe toggle");

    const response = await toggleSubscription(userId);

    if (!response.success) {
      toast.error(response.message);
    } else {
      toast.success(response.message);

      setProfile((prev) => ({
        ...prev,
        isSubscribe: !prev.isSubscribe,
        subscriberCount: prev.isSubscribe
          ? prev.subscriberCount - 1
          : prev.subscriberCount + 1,
      }));
    }
  };

  useEffect(() => {
    (async () => {
      // profile
      const response = await fetchProfile(userId);

      console.log(response);

      if (!response.success) {
        setError(response.message || "Not able to fetch profile");
      } else {
        setProfile(response.data);
        setError("");
      }
     
    })();
  }, [userId]);

  if (!profile && !error) {
    return (
       <Wait msg="Loading..."/>
    );
  }

  
  return (
    <Container>
      <div>
        {error && <p>{error}</p>}

        <div className="w-full border-b-1 border-gray-400">
          {/* cover image */}

          {profile?.coverImage && (
            <div className="w-full ">
              <img
                src={profile.coverImage}
                alt="Cover"
                className="w-full h-40 md:h-60 object-cover "
              />
            </div>
          )}

          {/* Profile Pic */}

          <div className="flex items-center md:gap-10 gap-4 md:p-7 p-3">
            <div className="">
              <img
                src={profile.avatar}
                alt="avatar"
                className="w-32 h-32 md:w-54 md:h-54 rounded-full  "
              />
            </div>

            <div className="">
              <p className="  text-gray-500 font-bold">{profile.username}</p>
              <p className="font-bold text-3xl text-white">
                {profile.fullname}
              </p>

              <div className="md:pt-5 pt-3 flex md:gap-5 flex-col md:flex-row font-bold md:text-2xl">
                <Link to={`/channel-list/${userId}/${subsriber}`}>
                  <p>subscriber {profile.subscriberCount}</p>
                </Link>

                <Link to={`/channel-list/${userId}/${subscribed}`}>
                  <p>subscribing {profile.channelSubscribedToCount}</p>
                </Link>
              </div>

              {loggedInUserId !== userId && (
                <button
                  onClick={handleSubscription}
                  className={`pt-2 pb-2 px-4 font-extrabold mt-2 rounded-3xl cursor-pointer
    ${
      profile.isSubscribe
        ? "bg-white text-black hover:bg-gray-200" // already subscribed
        : "bg-red-500 text-white hover:bg-red-600" // not subscribed
    }`}
                >
                  {profile.isSubscribe ? "UnSubscribe" : "Subscribe"}
                </button>
              )}
            </div>
          </div>
        </div>

         
         <AllVideos user={`&userId=${userId}`}/>
          
      </div>
    </Container>
  );
}

export default UserProfile;
