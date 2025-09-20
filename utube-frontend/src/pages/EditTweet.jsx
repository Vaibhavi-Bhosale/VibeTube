import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import { useNavigate, useParams } from "react-router-dom";
import TweetPostForm from "../components/TweetPostForm";
import { getTweet } from "../api/tweet";
import Wait from "../components/Wait";

function EditTweet() {
  const [tweet, setTweet] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/tweet");
      return;
    }

    (async () => {
      const response = await getTweet(id);
      if (response.success) {
        setTweet(response.data.tweet);
      } else {
        navigate("/tweet");
      }
      setLoading(false);
    })();
  }, [id, navigate]);

  return (
    <Container>
      {loading ?  <Wait msg="Loading.."/>: <TweetPostForm tweet={tweet} />}
    </Container>
  );
}

export default EditTweet;
