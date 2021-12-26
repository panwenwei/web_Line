import { Suspense } from "solid-js";
import { useData } from "solid-app-router";
import Chart from '../composnt/line/chart';


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
          <table class="border-collapse border border-green-800 ...">
            <thead>
              <tr>
                <th class="border border-green-600 ...">代码</th>
                <th class="border border-green-600 ...">最新价</th>
                <th class="border border-green-600 ...">涨跌幅</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-green-600 ...">Indiana</td>
                <td class="border border-green-600 ...">Indianapolis</td>
                <td class="border border-green-600 ...">Indianapolis</td>
              </tr>
              <tr>
                <td class="border border-green-600 ...">Ohio</td>
                <td class="border border-green-600 ...">Columbus</td>
                <td class="border border-green-600 ..."></td>
              </tr>
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
