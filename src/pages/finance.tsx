import { Suspense } from "solid-js";
import { useData } from "solid-app-router";
import Chart from '../composnt/line/chart';
import Table from './../composnt/finance/table';


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
            <div class="pl-4 flex items-center">板块</div>
          </div>
          <Table></Table>
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
