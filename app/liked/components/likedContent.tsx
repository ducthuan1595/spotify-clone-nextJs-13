"use client"

import { useRouter } from "next/navigation";
import { useEffect } from 'react';

import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/likeButton";
import useOnplay from "@/hooks/useOnPlay";

interface LikedContentProps {
  songs: Song[];
}
 

const LikedContent: React.FC<LikedContentProps> = ({songs}) => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  const onPlay = useOnplay(songs);

  useEffect(() => {
    if(!isLoading && !user) {
      router.replace('/');
    }
  }, [isLoading, user, router]);

  if(songs.length === 0) {
    return (
      <div className="
      flex
      flex-col
      gap-y-2
      w-full
      px-6
      text-neutral-400
      ">No liked songs.</div>
    )
  }
  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      {songs.map((s:any) => (
        <div key={s.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem onClick={(id: string) => onPlay(id)} data={s} />
          </div>
          <LikeButton songId={s.id} />
        </div>
      ))}
    </div>
  )
}

export default LikedContent;