"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import toast from "react-hot-toast";

import styles from "./LikeButton.module.scss";

interface LikeButtonProps {
  songId: string;
}

const LikeButton: React.FC<LikeButtonProps> = (props) => {
  const { songId } = props;

  const router = useRouter();
  const { supabaseClient } = useSessionContext();

  const authModal = useAuthModal();
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songId)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    };
    
    fetchData();
  }, [songId, supabaseClient, user?.id]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {
    if (!user) {
        return authModal.onOpen();
    }

    if (isLiked) {
        const { error } = await supabaseClient
        .from('liked_songs')
        .delete()
        .eq('user_id', user.id)
        .eq('song_id', songId);
        
        if (error) {
            toast.error(error.message);
        } else {
            setIsLiked(false);
        }
    } else {
        const { error } = await supabaseClient
        .from('liked_songs')
        .insert({
            song_id: songId,
            user_id: user.id,
        })

        if (error) {
            toast.error(error.message);
        } else {
            setIsLiked(true);
            toast.success('Liked!');
        }
    }

    router.refresh();
  }

  return (
    <button className={styles.likeButton} onClick={handleLike}>
        <Icon color={isLiked ? '#A084C9' : 'white'} size={25}/>
    </button>
  );
};

export default LikeButton;
