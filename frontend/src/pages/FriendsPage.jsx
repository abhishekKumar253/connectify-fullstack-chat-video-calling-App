import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";

const FriendsPage = () => {
  const {
    data: friends = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myFriends"],
    queryFn: getUserFriends,
  });

  if (isLoading) return <p className="p-4">Loading friends...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Failed to load friends.</p>;

  return (
    <div className="p-4 space-y-6">
      <section>
        <h2 className="text-xl font-semibold mb-4">Your Friends</h2>
        {friends.length === 0 ? (
          <p>You don’t have any friends yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <UserCard key={friend._id} user={friend} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

const UserCard = ({ user }) => {
  return (
    <div className="border p-3 rounded shadow-sm flex items-center gap-3 bg-base-100">
      <img
        src={user.profilePic}
        alt={user.fullName}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex-1">
        <h4 className="font-semibold">{user.fullName}</h4>
        <p className="text-sm opacity-70">
          {user.nativeLanguage} → {user.learningLanguage}
        </p>
      </div>
    </div>
  );
};

export default FriendsPage;
