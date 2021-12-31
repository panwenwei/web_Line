import { Suspense } from "solid-js";
import { useData } from "solid-app-router";
import Chart from '../composnt/line/chart';
import Table from './../composnt/finance/table';
import TableStock from './../composnt/finance/table_stock';
import TableBond from './../composnt/finance/table_bond';

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
            <div class="pl-4 flex items-center ">宁德时代</div>
          </div>
          <Chart></Chart>
      </div>
      <div class="col-span-6 shadow inline-block">
          <div class="flex justify-between h-10 bg-rose-500 text-white">
            <div class="pl-4 flex items-center ">简介</div>
          </div>
          <div class="h-full">
            <p>主营</p>
            <p>概念</p>
            <p>市盈率</p>
            <p>股东人数</p>
            <p>负债率</p>
            <p>净利率</p>
            <p>净利同比</p>
            <p>营收同比</p>
          </div>
      </div>
    </div>
    <div class="grid grid-cols-24 gap-4 mt-4">
      <div class="col-span-8 shadow inline-block">
          <div class="flex justify-between items-center px-4 h-12 border-b">
            <div class=" flex items-center text-gray-900">板块</div>
            <div>
              <button class="px-2 py-1 border border-red-500  mr-2" type="button">板块</button>
              <button class="px-2 py-1 border  border-red-500 mr-2" type="button">概念</button>
              <button class="px-2 py-1 border border-red-500 " type="button">主营</button>
            </div>
          </div>
          <Table></Table>
      </div>
      <div class="col-span-10 shadow inline-block">
          <div class="flex justify-between pl-4 h-12 border-b">
            <div class=" flex items-center text-gray-900">个股</div>
          </div>
          <TableStock></TableStock>
      </div>
      <div class="col-span-6 shadow inline-block">
          <div class="flex justify-between pl-4 h-12 border-b">
            <div class=" flex items-center text-gray-900">可转债</div>
          </div>
          <div>
            <TableBond></TableBond>
          </div>
      </div>
    </div>
    </div>
  );
}
