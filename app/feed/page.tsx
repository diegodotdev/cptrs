import { fetchAllPosts } from "@/lib/actions/post.actions";
import MasonryComponent from "@/components/masonry";

export default async function Feed() {
  const data = await fetchAllPosts();

  return (
    <div className="w-full">
      <MasonryComponent images={data} />
    </div>
  );
}
