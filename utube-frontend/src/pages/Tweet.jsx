import React, { useEffect, useState } from 'react'
import Container from '../components/Container'
import { deleteTweet, getAllTweet } from '../api/tweet'
import TweetCard from '../components/TweetCard'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { likeTweet } from '../api/like'

function Tweet() {
  const [allTweet, setAllTweet] = useState([])
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const userId = useSelector((state) => state.auth.user?._id)

  const onEdit = async (tweetId) => {
    navigate(`/edit-tweet/${tweetId}`)
  }

  const onDelete = async (tweetId) => {
    const response = await deleteTweet(tweetId)

    if (response.success) {
      toast.success(response.message)
    } else {
      toast.error(response.message || "Something wenr wrong")
    }

    // Remove deleted tweet from the state
    setAllTweet((prevTweets) =>
      prevTweets.filter((tweet) => tweet._id !== tweetId)
    )
  }

  const handleLike = async (tweetId) => {
    // Step 1: Optimistic UI update
    setAllTweet((prev) =>
      prev.map((tweet) =>
        tweet._id === tweetId
          ? {
              ...tweet,
              isLiked: !tweet.isLiked,
              likeCount: tweet.isLiked
                ? tweet.likeCount - 1
                : tweet.likeCount + 1,
            }
          : tweet
      )
    )

    // Step 2: API call
    const response = await likeTweet(tweetId)

    // Step 3: Revert UI if API fails
    if (!response.success) {
      setAllTweet((prev) =>
        prev.map((tweet) =>
          tweet._id === tweetId
            ? {
                ...tweet,
                isLiked: !tweet.isLiked,
                likeCount: tweet.isLiked
                  ? tweet.likeCount - 1
                  : tweet.likeCount + 1,
              }
            : tweet
        )
      )

      toast.error(response.message || "something went wrong while toggle like")
    }
  }

  useEffect(() => {
    ;(async () => {
      const response = await getAllTweet()

      if (!response.success) {
        console.error(response.message || "something went wrong")
        setError(response.message || "something went wrong")
      } else {
        setAllTweet(response.data)
        setError("")
      }
    })()
  }, [])

  return (
    <div className="min-h-screen bg-black p-1">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm border-b">
        <Container>
          <div className="flex justify-between items-center py-3">
            
            <Link
              to="/create-tweet"
              className="px-4 py-2 rounded-full bg-white text-black hover:bg-gray-200 cursor-pointer transition font-bold"
            >
              + Create Tweet
            </Link>
          </div>
        </Container>
      </div>

      {/* Content */}
      <Container>
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {allTweet.length === 0 ? (
          <p className="text-gray-500 text-center mt-6">No Tweet available</p>
        ) : (
          <div className="space-y-4 mt-6 mb-10">
            {allTweet.map((tweet) => (
              <TweetCard
                key={tweet._id}
                tweet={tweet}
                userId={userId}
                onEdit={onEdit}
                onDelete={onDelete}
                handleLike={handleLike}
              />
            ))}

            <div className='p-10 '></div>
          </div>
 
        )}
      </Container>
    </div>
  )
}

export default Tweet
