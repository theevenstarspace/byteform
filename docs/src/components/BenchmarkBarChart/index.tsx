import * as echarts from 'echarts';
import { useEffect, useRef } from "react";
import { useColorMode } from '@docusaurus/theme-common';
import { Summary } from "benny/lib/internal/common-types";
import { CallbackDataParams } from 'echarts/types/dist/shared';

export type BenchmarkDataset = Summary & { version: string };

const getBenchmarkOptions = (data: BenchmarkDataset, isDark: boolean): echarts.EChartsCoreOption => {
  const opts: echarts.EChartsCoreOption = {
    // backgroundColor: '#141418',
    backgroundColor: isDark ? '#141418' : '#fff',
    title: {
      // text: data.name,
      subtext: `Version: ${data.version}`,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: ['Ops/Sec'],
      right: 0,
      top: 0,
      selectedMode: false,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '5%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: data.results.map((result) => result.name),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Ops/Sec',
        type: 'bar',
        data: data.results.map((result) => result.ops),
        label: {
          show: false,
          rotate: 90,
          align: 'left',
          verticalAlign: 'middle',
          position: 'insideBottom',
          distance: 8,
          formatter: (params: CallbackDataParams) => {
            const percentage = data.results.find((result) => result.name === params.name)?.percentSlower;

            return !percentage ? 'Fastest' : `${percentage}% Slower`;
          }
        },
      },
    ]
  };

  return opts;
}

export default function BenchmarkBarChart({ data }: { data: BenchmarkDataset }): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);

  const { colorMode } = useColorMode();

  useEffect(() => {
    const isDark = colorMode === 'dark';
    const domNode = ref.current;
    const chart = echarts.init(domNode, isDark ? 'dark' : null);
    chart.setOption(getBenchmarkOptions(data, isDark));

    const onResize = () => {
      chart.resize();
    }

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      chart.dispose();
    };
  }, [data, colorMode]);

  return (
    <div ref={ref} style={{ width: '100%', aspectRatio: '16 / 9' }} />
  );
}