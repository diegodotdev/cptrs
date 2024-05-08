"use client";

import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@clerk/nextjs";
import { UploadDropzone } from "@/lib/uploadthing";
import { toast } from "sonner";
import { createPost } from "@/lib/actions/post.actions";
import { useState } from "react";
import Image from "next/image";
import { Trash } from "lucide-react";

const formSchema = z.object({
  userId: z.string().min(1),
  image_url: z.string().min(1).optional(),
  user: z.string().min(1),
  avatar: z.string(),
  caption: z.string().optional(),
});

export default function UploadForm() {
  const { user } = useUser();
  const [image, setImage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: user?.id,
      image_url: "",
      user: user?.firstName || "",
      avatar: user?.imageUrl,
      caption: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createPost(values);
      toast.success("Post Created");
      form.reset();
      setImage(null);
    } catch (error) {
      toast.error("Something went wrong, try again");
    }
  };
  return (
    <form
      className="w-full flex py-5 gap-5 flex-col"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      {!image ? (
        <UploadDropzone
          className="md:w-1/2 w-full h-[40vh] md:h-[80vh] border border-gray-500"
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            setImage(res[0].url);
            form.setValue("image_url", res[0].url);
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      ) : (
        <div className="w-full md:w-1/2 h-[40vh] md:h-[80vh] border rounded-lg relative p-4 grid place-items-center">
          <button
            className="btn btn-warning btn-square absolute top-4 right-4 btn-sm"
            type="button"
            onClick={() => setImage(null)}
          >
            <Trash size="15px" />
          </button>
          <Image
            src={image}
            alt="uploaded image"
            width={1000}
            height={1000}
            className="w-full object-contain rounded-lg"
          />
        </div>
      )}
      <div className="w-full md:w-1/2 h-[40vh] md:h-[80vh] flex flex-col gap-5 justify-center items-center">
        <Controller
          control={form.control}
          name="caption"
          render={({ field }) => (
            <textarea
              className="textarea textarea-bordered resize-none w-full md:w-4/5 h-[200px]"
              placeholder="Caption"
              {...field}
            />
          )}
        />
        <button className="btn btn-primary w-full md:w-4/5" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}
