"use client";

import Masonry from "react-masonry-css";
import { breakpointColumnsObj } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type ImageProps = {
  image_url: string;
  id: string;
};

export default function MasonryComponent({ images }: { images: ImageProps[] }) {
  return (
    <Masonry
      className="w-full flex gap-5 py-5"
      breakpointCols={breakpointColumnsObj}
    >
      {images?.map((i) => (
        <div
          className="w-full overflow-hidden rounded-lg group mb-5"
          key={i.id}
        >
          <Link href={`/feed/${i.id}`} className="w-full">
            <Image
              key={i.id}
              src={i.image_url}
              alt="image"
              width={1000}
              height={1000}
              className="w-full object-cover rounded-lg group-hover:scale-105 duration-[.8s]"
            />
          </Link>
        </div>
      ))}
    </Masonry>
  );
}
