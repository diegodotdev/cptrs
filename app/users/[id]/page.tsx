import MasonryComponent from "@/components/masonry";
import { fetchUserData } from "@/lib/actions/post.actions";
import Image from "next/image";

export default async function User({ params }: { params: { id: string } }) {
  const data = await fetchUserData(params?.id);

  return (
    <div className="w-full">
      <div className="w-full py-5 flex justify-start items-center gap-2">
        <div className="avatar">
          <div className="w-20 rounded-full relative">
            <Image
              src={data?.user?.avatar}
              alt="avatar"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <p className="text-3xl">{data?.user?.name}</p>
      </div>
      <MasonryComponent images={data?.posts} />
    </div>
  );
}
