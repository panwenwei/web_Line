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
    title: 'Regional',
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
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              涨跌比
            </th>
            <th scope="col" className="relative px-4 py-2">
              <span className="sr-only">Edit</span>
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
                <div className="text-sm text-gray-900">{person.title}</div>
                <div className="text-sm text-gray-500">{person.department}</div>
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{person.role}</td>
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
    );
  }
  