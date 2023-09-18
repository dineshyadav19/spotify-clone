import Header from '@/components/Header';
import ListItem from '@/components/ListItem';

export default function Home() {
  return (
    <div className="bg-neutral-900 w-full h-full overflow-hidden overscroll-y-auto rounded-lg">
      <Header>
        <div>
          <h1 className="text-3xl text-white font-semibold">Welcome back</h1>
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
            <ListItem image={'/images/liked.png'} name="Liked Songs" href="/" />
          </div>
        </div>
      </Header>
    </div>
  );
}
