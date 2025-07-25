import uniqid from 'uniqid';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";

import toast from "react-hot-toast";

import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";

import Modal from "../Modal/Modal";
import Input from "../Input/Input";
import Button from "../Button/Button";

import styles from './UploadModal.module.scss';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

const UploadModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const uploadModal = useUploadModal();
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            artist: '',
            title: '',
            song: null,
            image: null,
        }
    });

    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            uploadModal.onClose();
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);
            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];

            if (!imageFile || !songFile || !user) {
                toast.error('Missing fields');
                return;
            }

            const uniqueId = uniqid();
            const {
                data: songData,
                error: songError,
            } = await supabaseClient
                .storage
                .from('songs')
                .upload(`song-${values.title}-${uniqueId}`, songFile, {
                    cacheControl: '3600',
                    upsert: false,
                })

            if (songError) {
                setIsLoading(false);
                return toast.error('Failed song upload');
            }
            
            const {
                data: imageData,
                error: imageError,
            } = await supabaseClient
                .storage
                .from('images')
                .upload(`image-${values.title}-${uniqueId}`, imageFile, {
                    cacheControl: '3600',
                    upsert: false,
                })

            if (imageError) {
                setIsLoading(false);
                return toast.error('Failed image upload');
            }

            const {
                error: supabaseError,
            } = await supabaseClient
                .from('songs')
                .insert({
                    user_id: user.id,
                    title: values.title,
                    artist: values.artist,
                    image_path: imageData.path,
                    song_path: songData.path,
                })

            if (supabaseError) {
                setIsLoading(false);
                return toast.error(supabaseError.message);
            }

            router.refresh();
            setIsLoading(false);
            toast.success('Song created!');
            reset();
            uploadModal.onClose();
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }   

    return ( 
        <Modal
            title="Add a song"
            description="Upload an mp3 file"
            isOpen={uploadModal.isOpen}
            onChange={onChange}
        >
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className={styles.uploadForm}
            >
                <Input 
                    id="title"
                    disabled={isLoading}
                    {...register('title', { required: true })}
                    placeholder="Song title"
                />
                <Input 
                    id="artist"
                    disabled={isLoading}
                    {...register('artist', { required: true })}
                    placeholder="Song artist"
                />
                <div>
                    <div className={styles.fileSelect}>
                        Select a song file
                    </div>
                    <Input 
                        id="song"
                        type="file"
                        disabled={isLoading}
                        {...register('song', { required: true })}
                        accept=".mp3"
                    />
                </div>
                <div>
                    <div className={styles.fileSelect}>
                        Select an image
                    </div>
                    <Input 
                        id="image"
                        type="file"
                        disabled={isLoading}
                        {...register('image', { required: true })}
                        accept="image/*"
                    />
                </div>
                <Button className={styles.uploadButton} disabled={isLoading} type="submit">
                    Create
                </Button>
            </form>
        </Modal>
     );
}
 
export default UploadModal;