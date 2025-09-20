import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getChannelSubscribed,
  getChannelSubscriber,
} from "../api/subscription";
import toast from "react-hot-toast";
import Container from "../components/Container"

function ChannelList() {
  const { id, type } = useParams();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (type === "subscriber") {
        const response = await getChannelSubscriber(id);

        if (response.success) {
          setList(response.data);
          setLoading(false);
        } else {
          toast.error(response.message);
        }
      } else {
        const response = await getChannelSubscribed(id);

        if (response.success) {
          setList(response.data);
          setLoading(false);
        } else {
          toast.error(response.message);
        }
      }
    })();
  }, [id]);

  if (loading) {
    return <h2>Loading....</h2>;
  }

  if (!list.length) {
    return <h2 className="text-gray-400">No {type}s found</h2>;
  }

  return (

    <Container>

       <div className="p-10 flex flex-col gap-5">
      {list.map((item) => {
        const user = type === "subscriber" ? item.subscriber : item.channel;
        return (
          
            <div
              key={user._id}
              className="flex items-center gap-4 p-3 bg-black rounded-lg shadow-md"
            >
             <Link
             className="flex items-center gap-4 p-3 bg-black rounded-lg shadow-md"
             to={`/profile/${user._id}`}>
                 <img
                src={user.avatar}
                alt={user.username}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-white">{user.fullname}</h3>
                <p className="text-gray-400">@{user.username}</p>
              </div>
             </Link>
            </div>
       
        );
      })}
       </div>
    </Container>
  );
}

export default ChannelList;
