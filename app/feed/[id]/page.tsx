import { fetchUniquePost } from "@/lib/actions/post.actions";
import Image from "next/image";
import Link from "next/link";

export default async function Post({ params }: { params: { id: string } }) {
  const data = await fetchUniquePost(params?.id);

  return (
    <div className="w-full h-[80vh] py-5 flex flex-col md:flex-row gap-5">
      <div className="w-full h-[40vh] md:w-1/2 md:h-full grid place-items-center">
        <Image
          src={data?.image_url as string}
          alt="post image"
          width={1000}
          height={1000}
          className="w-full object-contain rounded-lg"
        />
      </div>
      <div className="w-full md:w-1/2 min-h-[40vh] md:h-full grid place-items-center">
        <div className="w-full md:w-4/5 flex flex-col gap-5">
          <p>{data?.caption}</p>

          <div className="w-full flex justify-start items-center">
            <Link
              href={`/users/${data?.userId}`}
              className="flex items-center gap-2"
            >
              <div className="avatar">
                <div className="w-8 rounded-full relative">
                  <Image
                    src={data?.avatar as string}
                    alt="avatar"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <p>{data?.user}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
