import { PlusIcon } from "@heroicons/react/solid";
import { SearchIcon } from "@heroicons/react/solid";
import { SearchBox } from "../utilities/SearchBox";


import { BrowseCategories } from "../promotional/BrowseCategories";
export default function NoProductsFound() {
  return (
    <div className="text-center mt-28">
      <h3 className="mt-2 text-xl font-medium text-gray-900">
        Sorry, no products found
      </h3>
        <SearchBox />
      <BrowseCategories />
    </div>
  );
}
