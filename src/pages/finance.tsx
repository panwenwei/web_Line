import { Suspense } from "solid-js";
import { useData } from "solid-app-router";
import Chart from '../composnt/line/chart';

const people = [
  {
    name: '医药商用',
    code:'600406',
    title: 'Regional',
    department: 'Opti',
    role: 'Admin',
    email: 'jane.',
   },
   {
    name: 'Jane',
    code:'600406',
    title: 'Regional',
    department: 'Opti',
    role: 'Admin',
    email: 'jane.',
   },
   {
    name: 'Jane',
    code:'600406',
    title: 'Regional',
    department: 'Opti',
    role: 'Admin',
    email: 'jane.',
   },
  // More people...
]


export default function Finance() {
  const data = useData();
  
  return (
    <div>
    <div class="grid grid-cols-24 gap-4">
      <div class="col-span-9 shadow inline-block">
          <div class="flex justify-between h-10 bg-rose-500  text-white">
            <div class="pl-4 flex items-center">福建自贸区 885617</div>
          </div>
          <Chart></Chart>
      </div>
      <div class="col-span-9 shadow inline-block">
          <div class="flex justify-between h-10 bg-rose-500 text-white">
            <div class="pl-4 flex items-center ">实时行情</div>
          </div>
          <Chart></Chart>
      </div>
      <div class="col-span-6 shadow inline-block">
          <div class="flex justify-between h-10 bg-rose-500 text-white">
            <div class="pl-4 flex items-center ">简介</div>
          </div>
          <div >
            canvas
          </div>
      </div>
    </div>
    <div class="grid grid-cols-24 gap-4 mt-4">
      <div class="col-span-9 shadow inline-block">
          <div class="flex justify-between h-10 bg-rose-500  text-white">
            <div class="pl-4 flex items-center">福建自贸区 885617</div>
          </div>
          <div class="h-160">
          <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    板块
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    涨跌幅
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    涨跌速
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    净流入
                  </th>
                  <th scope="col" className="relative px-4 py-2">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {people.map((person,key) => (
                  <tr key={person.email} class={key%2==1?'bg-gray-100':''}>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="flex items-start">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{person.name}</div>
                          <div className="text-sm text-gray-500">{person.code}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{person.title}</div>
                      <div className="text-sm text-gray-500">{person.department}</div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{person.role}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        Edit
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>
      <div class="col-span-9 shadow inline-block">
          <div class="flex justify-between h-10 bg-rose-500 text-white">
            <div class="pl-4 flex items-center ">实时行情</div>
          </div>
          <Chart></Chart>
      </div>
      <div class="col-span-6 shadow inline-block">
          <div class="flex justify-between h-10 bg-rose-500 text-white">
            <div class="pl-4 flex items-center ">可转债</div>
          </div>
          <div >
            canvas
          </div>
      </div>
    </div>
    </div>
  );
}
