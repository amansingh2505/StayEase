import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function HotelSkeleton() {
  return (
    <main className="bg-slate-100">

      <section className="mx-auto max-w-7xl px-6 pt-8">

        <Skeleton
          height={560}
          borderRadius={32}
          baseColor="#e5e7eb"
          highlightColor="#f8fafc"
        />

      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">

        <div className="mb-8">
          <Skeleton
            height={70}
            borderRadius={20}
          />
        </div>

        <div className="mb-10">
          <Skeleton width={120} height={18} />
          <Skeleton
            className="mt-3"
            width={260}
            height={40}
          />
          <Skeleton
            className="mt-3"
            width={220}
            height={18}
          />
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-3xl bg-white shadow-md"
            >

              <Skeleton
                height={256}
                borderRadius="24px 24px 0 0"
              />

              <div className="space-y-4 p-5">

                <Skeleton height={28} width="80%" />

                <Skeleton height={18} width="55%" />

                <Skeleton count={2} />

                <div className="flex items-center justify-between pt-3">

                  <div>
                    <Skeleton
                      width={90}
                      height={28}
                    />

                    <Skeleton
                      className="mt-2"
                      width={60}
                    />
                  </div>

                  <Skeleton
                    width={120}
                    height={45}
                    borderRadius={12}
                  />

                </div>

              </div>

            </div>
          ))}

        </div>

      </section>

    </main>
  );
}

export default HotelSkeleton;