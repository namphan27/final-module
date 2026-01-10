export default function Explore() {
  const items = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    img: `https://picsum.photos/seed/${i}/800/800`,
  }));

  return (
    <div className="w-full min-h-screen bg-[#111] text-white">
      <div
        className="
          max-w-[1200px]
          mx-auto
          px-2
          grid
          grid-cols-3
          sm:grid-cols-4
          xl:grid-cols-5
          gap-[2px]
        "
      >
        {items.map((item) => (
          <div key={item.id} className="aspect-square overflow-hidden">
            <img
              src={item.img}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
}
