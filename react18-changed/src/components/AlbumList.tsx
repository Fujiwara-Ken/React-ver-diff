import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// 指定時間秒待たせる関数
const sleep = (ms: number): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

type Album = {
  userId: number;
  id: number;
  title: string;
};

const fetchAlbums = async () => {
  const result = await axios
    .get<Album[]>("https://jsonplaceholder.typicode.com/albums")
    .then(await sleep(5000));
  return result.data;
};

export const AlbumList = () => {
  const { data } = useQuery<Album[]>(["albums"], fetchAlbums, {
    suspense: true,
  });
  return (
    <div
      style={{
        height: "300px",
        border: "2px solid gray",
        background: "cornsilk",
        overflowY: "scroll",
      }}
    >
      <h2>アルバム</h2>
      <p>React Query</p>
      {data?.map((album) => (
        <p key={album.id}>{album.title}</p>
      ))}
    </div>
  );
};
