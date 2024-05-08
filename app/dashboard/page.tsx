import Link from "next/link";
import { Plus } from "lucide-react";
import { fetchUserPosts } from "@/lib/actions/post.actions";
import { auth } from "@clerk/nextjs/server";
import MasonryComponent from "@/components/masonry";

export default async function Dashboard() {
  const { userId } = auth();

  if (!userId) throw new Error("Something went wrong, refresh the page");

  const data = await fetchUserPosts(userId);

  return (
    <div className="w-full">
      <div className="w-full py-5 flex justify-between items-center">
        <p className="text-3xl">Your Posts</p>
        <Link href="/dashboard/create">
          <button className="btn btn-primary btn-sm">
            Create <Plus size="15px" />
          </button>
        </Link>
      </div>
      {data?.length === 0 ? (
        <div className="py-5 grid place-items-center">
          <p>No posts yet</p>
        </div>
      ) : (
        <MasonryComponent images={data} />
      )}
    </div>
  );
}
