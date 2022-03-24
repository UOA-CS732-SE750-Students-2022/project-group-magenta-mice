import { useEffect, useState } from "react";

export const useRandomImage = () => {
  const [randomImage, setRandomImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRandomImage = async () => {
      const response = await fetch(
        "https://source.unsplash.com/random/1920x1080",
      );

      setRandomImage(response.url);
      setIsLoading(false);
    };
    fetchRandomImage();
  }, []);

  return { randomImage, isLoading };
};
