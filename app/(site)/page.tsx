import Header from "@/components/header"
import ListItem from "@/components/listItem";
import getSongs from "@/actions/getSong";
import PageContent from "./components/pageContent";

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();
    
  return (
    <div className='
    bg-neutral-900
    rounded-lg
    w-full
    h-full
    overflow-hidden
    overflow-y-auto
    '>
      <Header>
        <div className="mb-2">
        <h1 className="text-white text-3xl font-semibold">
          Welcome back
        </h1>
        <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-3
        2xl:grid-cols-4
        gap-3
        mt-4
        "
        >
          <ListItem image='/images/liked.png' name="Liked Song" href="/liked" />
        </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">
            Newest songs
          </h1>
        </div>
        <div>
          <PageContent songs={songs} />
        </div>
      </div>
    </div>
  )
}
