export default function SizeChart({ chart }) {


  return (
    <div className="hidden lg:block">


        
      <h1 className="text-md text-blue-800 py-2 ">Size chart</h1>
      <div className="flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-md">
              <table className="min-w-full divide-y divide-blue-800">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Hook size
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Hook gap
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Length
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {chart.map((hook, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                        {hook.size}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">
                        {hook.gap ? hook.gap : 'N/A'}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                        {hook.length_inch} in / {hook.length_metric} mm
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
