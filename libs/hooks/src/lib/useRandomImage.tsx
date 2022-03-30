import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "..";

const MobileImages = [
  "https://images.unsplash.com/photo-1647935925078-dd7188bb23aa?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1920&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0ODEwMzA1MA&ixlib=rb-1.2.1&q=80&w=1080",
  "https://images.unsplash.com/photo-1646776701870-f79b655f1a6f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1920&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0ODEwMzExNg&ixlib=rb-1.2.1&q=80&w=1080",
  "https://images.unsplash.com/photo-1646641382381-0955ec94a97a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1920&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0ODEwMzEzOQ&ixlib=rb-1.2.1&q=80&w=1080",
];

export const useRandomImage = () => {
  const [randomImage, setRandomImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const isSmall = useMediaQuery("(max-width: 600px)");

  const url = useMemo(() => {
    if (isSmall) {
      return MobileImages[Math.floor(Math.random() * MobileImages.length)];
    }
    return "https://source.unsplash.com/random/1920x1080";
  }, [isSmall]);

  useEffect(() => {
    const fetchRandomImage = async () => {
      //https://source.unsplash.com/random/1080x1920
      const response = await fetch(url);

      setRandomImage(response.url);
      setIsLoading(false);
    };
    fetchRandomImage();
  }, [url]);

  return { randomImage, isLoading };
};
