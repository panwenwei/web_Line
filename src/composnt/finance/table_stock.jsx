import "./table.css";

const people = []
for( let i =0;i<26;i++){
  people.push( {
    name: '医药商用',
    code:'600406',
    id:'123',
    pctChg:'123',
    turn:'12.2',
    tradestatus:'1',
    volume:'123',
    amplitude: 'Regional',
    department: 'Opti',
    role: 'Admin',
    email: 'jane.',
   })
}
export default function Table() {
    return (
        <table class="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              个股
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              价格
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              涨幅
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              涨速
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              净流入
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              换手率
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              流通值
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              股东数
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200 overflow-auto h-160">
          {people.map((person,key) => (
            <tr key={person.email} class={key%2==1?'bg-gray-100':''} className="w-full cursor-pointer">
              <td className="px-4 py-2 whitespace-nowrap">
                <div className="flex items-start">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{person.name}</div>
                    <div className="text-sm text-gray-500">{person.code}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                <div className="text-sm text-red-500">{person.department}</div>
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                <div className="text-sm text-red-500">{person.department}</div>
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                <div className="text-sm text-red-500">{person.department}</div>
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                <div className="text-sm text-red-500">{person.department}</div>
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                <div className="text-sm text-red-500">{person.department}</div>
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                <div className="text-sm text-red-500">{person.department}</div>
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                <div className="text-sm text-red-500">{person.department}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  