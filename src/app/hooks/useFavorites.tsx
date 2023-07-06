import { useCallback, useMemo } from "react";
import useLoginModal from "./useLoginModal";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { User } from "@prisma/client";

const useFavorites = ({
  currentUser,
  movieId,
}: {
  currentUser?: User | null;
  movieId: string;
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  // Function to detect already liked or not
  const hasFavorited = useMemo(() => {
    const lists = currentUser?.favoritedIds || [];
    return lists.includes(movieId);
  }, [currentUser?.favoritedIds, movieId]);

  // Function to handle onClick like
  const toggleFavorite = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!currentUser) {
        return loginModal.onOpen();
      }
      try {
        let req;
        if (hasFavorited) {
          req = () =>
            fetch(`/api/favorites/${movieId}`, { method: "DELETE" });
        } else {
          req = () => fetch(`/api/favorites/${movieId}`, { method: "POST" });
        }
        await req();
        router.refresh();
        toast.success(`Successfully ${hasFavorited ? "unliked" : "liked"}!`);
      } catch (err) {
        toast.error("Something went wrong");
      }
    },
    [currentUser, hasFavorited, movieId, loginModal, router]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorites;
