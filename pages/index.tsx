/* This example requires Tailwind CSS v2.0+ */
import { MailIcon, PhoneIcon } from "@heroicons/react/solid";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext } from "react";
import KeyContext from "../components/KeyContext";

const people = [
  {
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    role: "Admin",
    email: "janecooper@example.com",
    telephone: "+1-202-555-0170",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  // More people...
];

export default function Example(props) {
  let cars = props.data;
  let bmwcars = cars.reduce((bmw, car) => {
    if (car.engine.maker === "BMW") {
      bmw.push(car);
    }
    return bmw;
  }, []);
  const { data: session } = useSession();
  const router = useRouter();
  const keyInfo = useContext(KeyContext);
  keyInfo.setKey(cars[3].key.id);
  return (
    <div>
      {session ? (
        <button
          onClick={() => signOut()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded"
        >
          Logout
        </button>
      ) : (
        <button
          onClickCapture={() => router.push("api/auth/signin")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded"
        >
          Login
        </button>
      )}
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {people.map((person) => (
          <li
            key={person.email}
            className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
          >
            <div className="w-full flex items-center justify-between p-6 space-x-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="text-gray-900 text-sm font-medium truncate">
                    {person.name}
                  </h3>
                  <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                    {person.role}
                  </span>
                </div>
                <p className="mt-1 text-gray-500 text-sm truncate">
                  {person.title}
                </p>
              </div>
              <img
                className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
                src={person.imageUrl}
                alt=""
              />
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="w-0 flex-1 flex">
                  <a
                    href={`mailto:${person.email}`}
                    className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                  >
                    <MailIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="ml-3">Email</span>
                  </a>
                </div>
                <div className="-ml-px w-0 flex-1 flex">
                  <a
                    href={`tel:${person.telephone}`}
                    className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                  >
                    <PhoneIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="ml-3">Call</span>
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <h1 className="m-2">BMW cars</h1>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {bmwcars.map((car) => (
          <li
            key={car.key ? car.key.id : car.car_name}
            className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
          >
            <div className="w-full flex items-center justify-between p-6 space-x-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="text-gray-900 text-sm font-medium truncate">
                    {car.car_name}
                  </h3>
                  {/* <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                    {person.role}
                  </span> */}
                </div>
                <p className="mt-1 text-gray-500 text-sm truncate">
                  {car.engine.maker}
                </p>
              </div>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="w-0 flex-1 flex">
                  Disp: {car.engine.displacement}
                </div>
                <div className="w-0 flex-1 flex">Power: {car.engine.power}</div>
                <div className="w-0 flex-1 flex">Price: {car.price.price}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={() => router.push("/seeFourthKey")}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded"
      >
        See Key of Fourth Object
      </button>
    </div>
  );
}

export async function getStaticProps() {
  const { data } = await axios.get(
    `http://35.154.223.120:8000/app/car/?format=json`
  );

  return {
    props: {
      data: data || {},
    },
    revalidate: 10,
  };
}
