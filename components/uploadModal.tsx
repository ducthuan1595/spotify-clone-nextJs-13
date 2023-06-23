"use client";

import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import uniqid from "uniqid";

import { useUser } from "@/hooks/useUser";
import Modal from "./modal";
import Input from "./input";
import useUploadModal from "@/hooks/useUploadModal";
import Button from "./button";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });
  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (value) => {
    try {
      setIsLoading(true);
      const imageFile = value.image?.[0];
      const songFile = value.song?.[0];
      
      if (!imageFile && !songFile && !user) {  
        return toast.error("Missing fields");
      }
      const uniqueId = uniqid();
      console.log(uniqueId);
      

      // upload song
      const { 
        data: songData, 
        error: songError 
      } = await supabaseClient
        .storage
        .from('songs')
        .upload(`song-${value.title}-${uniqueId}`, songFile, {
          cacheControl: '3600',
          upsert: false
        });   

      if (songError) {
        setIsLoading(false);
        return toast.error("Fail song upload");
      }

      // upload image
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${value.title}-${uniqueId}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

      if (songError) {
        setIsLoading(false);
        return toast.error("Failed image upload");
      }

      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user?.id,
          title: value.title,
          author: value.author,
          image_path: imageData?.path,
          song_path: songData.path,
        });
      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }
      router.refresh();
      setIsLoading(false);
      toast.success("Song created");
      uploadModal.onClose();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      title="Upload modal title"
      description="Upload modal description"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Song title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="Song author"
        />
        <div>
          <div className="pb-1">Select a song file</div>
          <Input
            id="song"
            type="file"
            disabled={isLoading}
            accept=".mp3"
            {...register("song", { required: true })}
          />
        </div>
        <div>
          <div className="pb-1">Select a image</div>
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register("image", { required: true })}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
